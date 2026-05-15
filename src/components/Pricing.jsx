import { useMemo, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ─── Pricing logic ─── */
// Returns a CHF range [min, max] based on current configurator state.
// Calibrated for high-volume / bulk strategy: standard projects 1-5k,
// fully loaded max around 5-8k.
function computePrice({ pages, ecommerce, design, copywriting, animations, seo, maintenance }) {
  // Base: minimal 1-page template-style site
  let lo = 700
  let hi = 1200

  // Pages: each additional page adds cost
  const extra = Math.max(0, pages - 1)
  lo += extra * 80
  hi += extra * 100

  // E-Commerce module
  if (ecommerce) {
    lo += 700
    hi += 1200
  }

  // Design tier
  if (design === 'custom') {
    lo += 400
    hi += 700
  } else if (design === 'premium') {
    lo += 1000
    hi += 1700
  }

  // Copywriting
  if (copywriting) {
    lo += 200
    hi += 400
  }

  // Animations / interactive elements
  if (animations) {
    lo += 300
    hi += 600
  }

  // SEO foundation
  if (seo) {
    lo += 200
    hi += 400
  }

  // Maintenance (annual support package)
  if (maintenance) {
    lo += 400
    hi += 600
  }

  // Round to nearest 100 for a clean look
  return [Math.round(lo / 100) * 100, Math.round(hi / 100) * 100]
}

const formatCHF = (n) =>
  "CHF " + new Intl.NumberFormat('de-CH', { maximumFractionDigits: 0 }).format(n)

/* ─── UI building blocks ─── */
function Toggle({ active, onChange, children }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!active)}
      className="rounded-xl text-left"
      style={{
        background: active ? 'var(--color-accent-glow)' : 'var(--color-surface)',
        border: `1px solid ${active ? 'var(--color-accent)' : 'var(--color-border)'}`,
        padding: '14px 16px',
        fontFamily: 'Inter, sans-serif',
        color: active ? 'var(--color-text)' : 'var(--color-text-muted)',
        cursor: 'pointer',
        transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: '100%',
      }}
    >
      <div
        style={{
          width: 18, height: 18, borderRadius: 5,
          background: active ? 'var(--color-accent)' : 'transparent',
          border: `1.5px solid ${active ? 'var(--color-accent)' : 'var(--color-border-strong)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          transition: 'background 0.2s ease, border-color 0.2s ease',
        }}
      >
        {active && (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-bg)' }}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      <span style={{ fontSize: 14, fontWeight: 500, letterSpacing: '-0.01em' }}>{children}</span>
    </button>
  )
}

function SegmentedControl({ value, options, onChange }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${options.length}, 1fr)`,
        gap: 6,
        padding: 4,
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 12,
      }}
    >
      {options.map((opt) => {
        const active = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            style={{
              padding: '10px 12px',
              borderRadius: 8,
              border: 'none',
              background: active ? 'var(--color-accent)' : 'transparent',
              color: active ? 'var(--color-bg)' : 'var(--color-text-muted)',
              fontFamily: 'Inter, sans-serif',
              fontSize: 12,
              fontWeight: active ? 700 : 500,
              letterSpacing: '0.01em',
              cursor: 'pointer',
              transition: 'background 0.2s ease, color 0.2s ease',
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

/* ─── Main component ─── */
export default function Pricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [pages, setPages] = useState(5)
  const [ecommerce, setEcommerce] = useState(false)
  const [design, setDesign] = useState('custom') // 'template' | 'custom' | 'premium'
  const [copywriting, setCopywriting] = useState(false)
  const [animations, setAnimations] = useState(true)
  const [seo, setSeo] = useState(true)
  const [maintenance, setMaintenance] = useState(false)

  const [lo, hi] = useMemo(
    () => computePrice({ pages, ecommerce, design, copywriting, animations, seo, maintenance }),
    [pages, ecommerce, design, copywriting, animations, seo, maintenance]
  )

  return (
    <section
      id="preis"
      className="py-14 sm:py-20 border-t border-border"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6" ref={ref}>

        {/* Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-label justify-center mb-4"
          >
            Transparente Preise
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display"
            style={{
              fontWeight: 500,
              letterSpacing: '-0.035em',
              fontSize: 'clamp(2rem, 3.8vw, 3rem)',
              color: 'var(--color-text)',
              lineHeight: 1.05,
              marginBottom: '1rem',
            }}
          >
            Was kostet <em className="font-display-italic" style={{ fontWeight: 500 }}>Ihre</em> Webseite?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'var(--color-text-muted)', lineHeight: 1.6 }}
          >
            Konfigurieren Sie Ihr Projekt. Sehen Sie die Preisspanne live. Keine versteckten Kosten, keine Überraschungen.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">

          {/* Configurator (left) */}
          <motion.div
            initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-3"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 16,
              padding: '24px 24px 28px',
            }}
          >
            {/* Pages slider */}
            <div className="mb-7">
              <div className="flex items-baseline justify-between mb-3">
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>
                  Seitenanzahl
                </label>
                <span className="font-display" style={{ fontWeight: 600, fontSize: 22, color: 'var(--color-accent)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                  {pages}<span style={{ fontSize: 14, color: 'var(--color-text-muted)', fontWeight: 500, marginLeft: 4 }}>{pages === 1 ? 'Seite' : 'Seiten'}</span>
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                value={pages}
                onChange={(e) => setPages(parseInt(e.target.value, 10))}
                className="pricing-slider"
                style={{ width: '100%' }}
              />
              <div className="flex justify-between mt-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'var(--color-text-faint)', letterSpacing: '0.04em' }}>
                <span>1</span><span>20+</span>
              </div>
            </div>

            {/* Design tier */}
            <div className="mb-7">
              <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: 'var(--color-text)', letterSpacing: '-0.01em', display: 'block', marginBottom: 10 }}>
                Design-Niveau
              </label>
              <SegmentedControl
                value={design}
                onChange={setDesign}
                options={[
                  { value: 'template', label: 'Template' },
                  { value: 'custom', label: 'Individuell' },
                  { value: 'premium', label: 'Premium' },
                ]}
              />
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--color-text-faint)', marginTop: 8, lineHeight: 1.5 }}>
                {design === 'template' && 'Modernes Template, angepasst auf Ihre Marke.'}
                {design === 'custom' && 'Komplett individuell entworfen, kein Template.'}
                {design === 'premium' && 'Maßgeschneidert mit Brand-Identity, Illustrationen und Motion-Design.'}
              </p>
            </div>

            {/* Features grid */}
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: 'var(--color-text)', letterSpacing: '-0.01em', display: 'block', marginBottom: 10 }}>
              Module
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Toggle active={ecommerce} onChange={setEcommerce}>E-Commerce / Shop</Toggle>
              <Toggle active={animations} onChange={setAnimations}>Animationen & Interaktion</Toggle>
              <Toggle active={copywriting} onChange={setCopywriting}>Texte (Copywriting)</Toggle>
              <Toggle active={seo} onChange={setSeo}>SEO-Grundlagen</Toggle>
              <Toggle active={maintenance} onChange={setMaintenance}>Wartung (12 Monate)</Toggle>
            </div>
          </motion.div>

          {/* Price summary (right) */}
          <motion.div
            initial={{ opacity: 0, x: 12 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="lg:col-span-2"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-accent-soft)',
              borderRadius: 16,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              position: 'sticky',
              top: 80,
              height: 'fit-content',
            }}
          >
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: 'var(--color-text-muted)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              Ihre Preisspanne
            </p>

            <motion.div
              key={`${lo}-${hi}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="font-display" style={{ fontWeight: 600, fontSize: 'clamp(2.4rem, 5vw, 3.4rem)', color: 'var(--color-text)', lineHeight: 1, letterSpacing: '-0.03em' }}>
                {formatCHF(lo)}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'var(--color-text-muted)', marginTop: 6, letterSpacing: '0.01em' }}>
                bis <span className="font-display" style={{ fontWeight: 600, color: 'var(--color-accent)', fontSize: 16, letterSpacing: '-0.02em' }}>{formatCHF(hi)}</span>
              </div>
            </motion.div>

            <div style={{ height: 1, background: 'var(--color-border)', margin: '4px 0' }} />

            <ul style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'var(--color-text-muted)', lineHeight: 1.7, listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <li style={{ display: 'flex', gap: 8 }}>
                <span style={{ color: 'var(--color-accent)' }}>✓</span>
                Fixpreis-Garantie ab Briefing
              </li>
              <li style={{ display: 'flex', gap: 8 }}>
                <span style={{ color: 'var(--color-accent)' }}>✓</span>
                Hosting und Domain inklusive im 1. Jahr
              </li>
              <li style={{ display: 'flex', gap: 8 }}>
                <span style={{ color: 'var(--color-accent)' }}>✓</span>
                Lieferung in 1-2 Wochen
              </li>
              <li style={{ display: 'flex', gap: 8 }}>
                <span style={{ color: 'var(--color-accent)' }}>✓</span>
                30-Tage Anpassungs-Garantie
              </li>
            </ul>

            <a href="#contact" className="btn-accent" style={{ justifyContent: 'center', fontSize: 13, padding: '12px 16px' }}>
              Festofferte anfragen
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>

            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--color-text-faint)', lineHeight: 1.6, textAlign: 'center', margin: 0 }}>
              Schätzung basierend auf vergleichbaren Projekten. Finale Offerte nach Briefing-Gespräch.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
