import { useEffect, useMemo, useRef, useState } from 'react'
import { track } from '@vercel/analytics'
import { setRequestContext } from '../lib/requestContext'

/* ─── Preislogik ─── */
// Liefert die einmalige CHF-Spanne [min, max] für die aktuelle Auswahl.
// Kalibriert auf Standardprojekte zwischen CHF 1'000 und 5'000.
// Wartung ist wiederkehrend und wird separat ausgewiesen (MAINTENANCE_PER_YEAR).
function computePrice({ pages, ecommerce, design, copywriting, animations, seo }) {
  let lo = 700
  let hi = 1200

  const extra = Math.max(0, pages - 1)
  lo += extra * 80
  hi += extra * 100

  if (ecommerce) { lo += 700; hi += 1200 }

  if (design === 'custom') { lo += 400; hi += 700 }
  else if (design === 'branding') { lo += 1000; hi += 1700 }

  if (copywriting) { lo += 200; hi += 400 }
  // Branding enthält Animationen bereits
  if (animations && design !== 'branding') { lo += 300; hi += 600 }
  if (seo) { lo += 200; hi += 400 }

  return [Math.round(lo / 100) * 100, Math.round(hi / 100) * 100]
}

const MAINTENANCE_PER_YEAR = [400, 600]

// Einheitlich mit typografischem Apostroph (’), wie im übrigen Text
const formatCHF = (n) => 'CHF ' + new Intl.NumberFormat('de-CH', { maximumFractionDigits: 0 }).format(n).replace(/['\u2019]/g, '’')

const DESIGN_OPTIONS = [
  { value: 'basis', label: 'Basis', description: 'Bewährter Aufbau, gestaltet in Ihrer Marke.' },
  { value: 'custom', label: 'Individuell', description: 'Komplett individuell entworfen.' },
  { value: 'branding', label: 'Mit Branding', short: 'Branding', description: 'Individuell entworfen, inklusive Logo, Markenauftritt, Illustrationen und Animationen.' },
]

// Einmalige Module mit einer Zeile, was man konkret bekommt
const MODULES = [
  { key: 'ecommerce', label: 'E-Commerce / Shop', hint: 'Produkte, Warenkorb und Bezahlung' },
  { key: 'animations', label: 'Animationen & Interaktion', hint: 'Bewegung, die durch die Seite führt' },
  { key: 'copywriting', label: 'Texte (Copywriting)', hint: 'Wir schreiben die Texte für alle Seiten' },
  { key: 'seo', label: 'SEO-Grundlagen', hint: 'Seitentitel, Beschreibungen und saubere Struktur für Google' },
]
// Wiederkehrend, darum getrennt von den einmaligen Modulen
const MAINTENANCE = { key: 'maintenance', label: 'Wartung', hint: 'Kleine Anpassungen übers Jahr, pro Jahr verrechnet' }

const MAX_PAGES = 20
const DEFAULTS = { pages: 5, design: 'custom', modules: { ecommerce: false, animations: true, copywriting: false, seo: true, maintenance: false } }
const FLOOR = computePrice({ pages: 1, design: 'basis' })[0]

const INCLUDED = [
  'Verbindlicher Fixpreis ab Offerte',
  'Hosting und Domain im ersten Jahr inklusive',
  'Online meist in ein bis zwei Wochen ab Auftrag',
  '30 Tage Anpassungen nach Launch inklusive',
]

const labelStyle = { fontSize: 15, fontWeight: 600, color: 'var(--color-text)', display: 'block', marginBottom: 16 }

function Toggle({ id, active, onChange, locked, note, children }) {
  return (
    <button
      id={id}
      type="button"
      role="checkbox"
      aria-checked={active}
      aria-disabled={locked || undefined}
      onClick={() => { if (!locked) onChange(!active) }}
      className="text-left pressable"
      style={{
        background: active ? 'var(--color-accent-glow)' : 'var(--color-bg-soft)',
        border: `1px solid ${active ? 'var(--color-accent-soft)' : 'transparent'}`,
        borderRadius: 16,
        padding: '16px 20px',
        color: active ? 'var(--color-text)' : 'var(--color-text-muted)',
        cursor: locked ? 'default' : 'pointer',
        transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 160ms var(--ease-out)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        fontSize: 15,
        fontWeight: 500,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 18, height: 18, borderRadius: 5, flexShrink: 0,
          background: active ? 'var(--color-accent)' : 'transparent',
          border: `1.5px solid ${active ? 'var(--color-accent)' : 'var(--color-border-strong)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.2s ease, border-color 0.2s ease',
        }}
      >
        {active && (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-bg)' }}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {children}
        {note && <span style={{ fontSize: 13, color: 'var(--color-text-muted)', fontWeight: 400, lineHeight: 1.4 }}>{note}</span>}
      </span>
    </button>
  )
}

export default function Pricing() {
  const [pages, setPages] = useState(DEFAULTS.pages)
  const [design, setDesign] = useState(DEFAULTS.design)
  const [modules, setModules] = useState(DEFAULTS.modules)
  const pagesLabel = pages === MAX_PAGES ? `${MAX_PAGES}+` : String(pages)
  const isDefault = pages === DEFAULTS.pages && design === DEFAULTS.design && JSON.stringify(modules) === JSON.stringify(DEFAULTS.modules)
  const reset = () => { setPages(DEFAULTS.pages); setDesign(DEFAULTS.design); setModules(DEFAULTS.modules) }
  const tracked = useRef(false)

  const [lo, hi] = useMemo(() => computePrice({ pages, design, ...modules }), [pages, design, modules])
  const includesAnimations = design === 'branding'
  const designRefs = useRef({})

  // Screenreader: Preis erst ansagen, wenn der Regler kurz stillsteht, nicht bei jedem Schritt
  const [announced, setAnnounced] = useState('')
  useEffect(() => {
    const t = setTimeout(() => setAnnounced(`Preisspanne ${formatCHF(lo)} bis ${formatCHF(hi)}`), 700)
    return () => clearTimeout(t)
  }, [lo, hi])

  const onDesignKey = (e) => {
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const i = DESIGN_OPTIONS.findIndex((o) => o.value === design)
    const next = DESIGN_OPTIONS[(i + dir + DESIGN_OPTIONS.length) % DESIGN_OPTIONS.length].value
    setDesign(next)
    markUsed()
    designRefs.current[next]?.focus()
  }

  const markUsed = () => {
    if (tracked.current) return
    tracked.current = true
    track('pricing_used')
  }

  const selectedDesign = DESIGN_OPTIONS.find((o) => o.value === design)

  const sendToContact = () => {
    // Wartung ist wiederkehrend und steht separat, deshalb nicht in der Modulliste
    const chosen = MODULES
      .filter((m) => modules[m.key] || (m.key === 'animations' && includesAnimations))
      .map((m) => m.label)
    setRequestContext(
      [
        `Preisrechner: ${pagesLabel} ${pages === 1 ? 'Seite' : 'Seiten'}`,
        `Design: ${selectedDesign.label}`,
        `Module: ${chosen.length ? chosen.join(', ') : 'keine'}`,
        `Richtpreis einmalig: ${formatCHF(lo)} bis ${formatCHF(hi)}`,
        modules.maintenance && `Wartung: ${formatCHF(MAINTENANCE_PER_YEAR[0])} bis ${formatCHF(MAINTENANCE_PER_YEAR[1])} pro Jahr`,
      ].filter(Boolean).join(' · ')
    )
    track('cta_click', { location: 'pricing' })
    // Nach dem Sprung direkt ins erste Feld, damit man sofort weiterschreiben kann
    requestAnimationFrame(() => document.getElementById('contact-name')?.focus({ preventScroll: true }))
  }

  return (
    <section id="preis" className="section" style={{ background: 'var(--color-bg-soft)' }}>
      <div className="container-page">
        <div className="section-head">
          <h2 className="font-display h-section">Was Ihre Webseite kostet</h2>
          <p className="lead">
            Stellen Sie Ihr Projekt zusammen und sehen Sie die Preisspanne sofort. Nach dem Erstgespräch
            erhalten Sie eine Festofferte, und dieser Preis gilt.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Konfigurator */}
          <div className="lg:col-span-3" style={{ background: 'var(--color-bg)', borderRadius: 28, padding: 'clamp(24px, 4vw, 48px)' }}>
            <div style={{ marginBottom: 48 }}>
              <div className="flex items-baseline justify-between" style={{ marginBottom: 16 }}>
                <label htmlFor="pricing-pages" style={{ ...labelStyle, marginBottom: 0 }}>Seitenanzahl</label>
                <span className="font-display" style={{ fontSize: 24, color: 'var(--color-text)', lineHeight: 1 }}>
                  {pagesLabel}
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--color-text-muted)', fontWeight: 500, marginLeft: 6, letterSpacing: 0 }}>
                    {pages === 1 ? 'Seite' : 'Seiten'}
                  </span>
                </span>
              </div>
              <input
                id="pricing-pages"
                type="range"
                min={1}
                max={MAX_PAGES}
                value={pages}
                aria-valuetext={`${pagesLabel} ${pages === 1 ? 'Seite' : 'Seiten'}`}
                aria-describedby="pricing-pages-hint"
                onChange={(e) => { setPages(parseInt(e.target.value, 10)); markUsed() }}
                className="pricing-slider"
                style={{ width: '100%' }}
              />
              <div className="flex justify-between" style={{ marginTop: 8, fontSize: 12, color: 'var(--color-text-faint)' }}>
                <span>1</span><span>20+</span>
              </div>
              <p id="pricing-pages-hint" style={{ fontSize: 14, color: 'var(--color-text-muted)', marginTop: 12 }}>
                {pages === MAX_PAGES
                  ? 'Mehr als 20 Seiten offerieren wir individuell, die Spanne gilt als Richtwert.'
                  : 'Eine Seite ist zum Beispiel Startseite, Leistungen, Team oder Kontakt.'}
              </p>
            </div>

            <div style={{ marginBottom: 48 }}>
              <span id="pricing-design-label" style={labelStyle}>Design</span>
              <div
                role="radiogroup"
                aria-labelledby="pricing-design-label"
                onKeyDown={onDesignKey}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, padding: 4, background: 'var(--color-bg-soft)', borderRadius: 999 }}
              >
                {DESIGN_OPTIONS.map((opt) => {
                  const active = design === opt.value
                  return (
                    <button
                      key={opt.value}
                      ref={(el) => { designRefs.current[opt.value] = el }}
                      id={`pricing-design-${opt.value}`}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      tabIndex={active ? 0 : -1}
                      className="pressable"
                      onClick={() => { setDesign(opt.value); markUsed() }}
                      style={{
                        padding: '12px 8px',
                        borderRadius: 999,
                        border: 'none',
                        background: active ? 'var(--color-accent)' : 'transparent',
                        color: active ? 'var(--color-bg)' : 'var(--color-text-muted)',
                        fontSize: 14,
                        lineHeight: 1.2,
                        fontWeight: active ? 600 : 500,
                        cursor: 'pointer',
                        transition: 'background 0.2s ease, color 0.2s ease, transform 160ms var(--ease-out)',
                      }}
                    >
                      {opt.short ? (
                        <>
                          <span className="sm:hidden">{opt.short}</span>
                          <span className="hidden sm:inline">{opt.label}</span>
                        </>
                      ) : opt.label}
                    </button>
                  )
                })}
              </div>
              {/* Alle Stufen sichtbar, damit man ohne Durchklicken vergleichen kann */}
              <dl style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14, lineHeight: 1.5 }}>
                {DESIGN_OPTIONS.map((opt) => (
                  <div key={opt.value} style={{ color: design === opt.value ? 'var(--color-text)' : 'var(--color-text-muted)', transition: 'color 0.2s ease' }}>
                    <dt style={{ display: 'inline', fontWeight: 600 }}>{opt.label}: </dt>
                    <dd style={{ display: 'inline' }}>{opt.description}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <span style={labelStyle}>Module <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}>einmalig</span></span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MODULES.map((m) => (
                <Toggle
                  key={m.key}
                  id={`pricing-module-${m.key}`}
                  active={modules[m.key] || (m.key === 'animations' && includesAnimations)}
                  locked={m.key === 'animations' && includesAnimations}
                  note={m.key === 'animations' && includesAnimations ? 'Im Branding enthalten' : m.hint}
                  onChange={(v) => { setModules((prev) => ({ ...prev, [m.key]: v })); markUsed() }}
                >
                  {m.label}
                </Toggle>
              ))}
            </div>

            <span style={{ ...labelStyle, marginTop: 40 }}>Laufend <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}>optional</span></span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Toggle
                id={`pricing-module-${MAINTENANCE.key}`}
                active={modules.maintenance}
                note={MAINTENANCE.hint}
                onChange={(v) => { setModules((prev) => ({ ...prev, maintenance: v })); markUsed() }}
              >
                {MAINTENANCE.label}
              </Toggle>
            </div>

            {!isDefault && (
              <button type="button" className="btn-link appear" onClick={reset} style={{ marginTop: 24, fontSize: 14 }}>
                Auswahl zurücksetzen
              </button>
            )}

            {/* Handy: Preis bleibt beim Konfigurieren sichtbar und führt direkt zur Anfrage */}
            <a
              href="#contact-form"
              onClick={sendToContact}
              aria-label={`Preisspanne ${formatCHF(lo)} bis ${formatCHF(hi)}. Erstgespräch mit dieser Auswahl anfragen`}
              className="lg:hidden flex items-center justify-between gap-4 pressable"
              style={{
                position: 'sticky', bottom: 12, marginTop: 32,
                background: 'var(--color-text)', color: 'var(--color-bg)',
                borderRadius: 14, padding: '14px 18px',
                boxShadow: '0 8px 24px rgba(20,17,13,0.18)',
              }}
            >
              <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span className="font-display" style={{ fontSize: 18, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                  {formatCHF(lo)} – {formatCHF(hi).replace('CHF ', '')}
                </span>
                {modules.maintenance && (
                  <span style={{ fontSize: 12, opacity: 0.8, fontVariantNumeric: 'tabular-nums' }}>
                    + Wartung {formatCHF(MAINTENANCE_PER_YEAR[0])}–{formatCHF(MAINTENANCE_PER_YEAR[1]).replace('CHF ', '')} pro Jahr
                  </span>
                )}
              </span>
              <span style={{ fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap' }}>Anfragen →</span>
            </a>
          </div>

          {/* Zusammenfassung */}
          <div
            className="lg:col-span-2"
            style={{
              background: 'var(--color-bg)',
              borderRadius: 28,
              padding: 'clamp(24px, 4vw, 48px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 32,
              position: 'sticky',
              top: 96,
              height: 'fit-content',
            }}
          >
            <p className="sr-only" aria-live="polite">{announced}</p>
            {/* Handy: Preis und Anfrage stehen in der Leiste oben, hier nur, was inklusive ist */}
            <div className="hidden lg:block">
              <p style={{ fontSize: 15, color: 'var(--color-text-muted)', marginBottom: 8 }}>Ihre Preisspanne, einmalig</p>
              <p className="font-display" style={{ fontSize: 'clamp(1.5rem, 2.1vw, 1.875rem)', color: 'var(--color-text)', lineHeight: 1.1, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                {formatCHF(lo)} – {formatCHF(hi).replace('CHF ', '')}
              </p>
              {lo > FLOOR && (
                <p style={{ fontSize: 14, color: 'var(--color-text-muted)', marginTop: 8 }}>
                  Kleinste Webseiten ab {formatCHF(FLOOR)}
                </p>
              )}
              {modules.maintenance && (
                <p className="appear" style={{ fontSize: 15, color: 'var(--color-text-muted)', marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--color-border)' }}>
                  Wartung zusätzlich{' '}
                  <span style={{ color: 'var(--color-text)', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                    {formatCHF(MAINTENANCE_PER_YEAR[0])} bis {formatCHF(MAINTENANCE_PER_YEAR[1]).replace('CHF ', '')}
                  </span>{' '}
                  pro Jahr
                </p>
              )}
            </div>

            {/* Wrapper, weil der Inline-Style display:block sonst lg:hidden überschreibt */}
            <div className="lg:hidden" style={{ marginBottom: -16 }}>
              <p style={labelStyle}>Immer inklusive</p>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15, color: 'var(--color-text)' }}>
              {INCLUDED.map((item) => <li key={item}>{item}</li>)}
            </ul>

            {/* Handy: Die Preisleiste ist dort der CTA. Wrapper, weil .btn-accent die hidden-Klasse überschreibt */}
            <div className="hidden lg:block">
              <a href="#contact-form" className="btn-accent w-full" onClick={sendToContact} style={{ textAlign: 'center', paddingInline: 24 }}>
                <span style={{ textWrap: 'balance' }}>Erstgespräch mit dieser Auswahl anfragen</span>
              </a>
            </div>

            <p style={{ fontSize: 13, color: 'var(--color-text-faint)', lineHeight: 1.6, marginTop: -8 }}>
              Richtpreis aus vergleichbaren Projekten. Die verbindliche Festofferte erhalten Sie nach dem Erstgespräch.
              Ihre Auswahl wird ins Kontaktformular übernommen.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
