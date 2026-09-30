import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { track } from '@vercel/analytics'
import { setRequestContext } from '../lib/requestContext'
import { scoreSite } from '../lib/siteScore'
import { normalizeUrl } from '../lib/url'
import { ArrowUpRight } from './Icons'

/* Website-Check: Rohdaten von Google PageSpeed Insights (Lighthouse, Handy),
   bewertet mit dem strengen Zurio-Score (siehe lib/siteScore.js).
   Ohne eigenen API-Schlüssel teilt man sich ein öffentliches Tageskontingent,
   das oft ausgeschöpft ist. Schlüssel als VITE_PSI_API_KEY hinterlegen
   (in der Google Cloud Console auf die eigene Domain beschränken). */
const API = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
const API_KEY = import.meta.env.VITE_PSI_API_KEY

/* Drei Messungen gleichzeitig, ausgewertet pro Einzelwert (Median).
   Identische Anfragen beantwortet Google aus dem Zwischenspeicher; mit
   unterschiedlicher Berichtssprache sind es drei unabhängige Läufe. Die
   Sprache ändert nur Texte im Bericht, die wir nicht verwenden. */
const RUN_LOCALES = ['de', 'en', 'fr']

async function runOnce(url, locale) {
  const params = new URLSearchParams({ url, strategy: 'mobile', locale })
  ;['performance', 'seo', 'accessibility', 'best-practices'].forEach((c) => params.append('category', c))
  if (API_KEY) params.set('key', API_KEY)
  const res = await fetch(`${API}?${params}`)
  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(json?.error?.message || 'PageSpeed-Fehler')
    err.status = res.status
    throw err
  }
  // Seite konnte im Test nicht geladen werden (z. B. Zeitüberschreitung, Weiterleitungsschleife)
  if (!json.lighthouseResult || json.lighthouseResult.runtimeError) throw new Error('Seite nicht messbar')
  return json
}

async function runCheck(url, onProgress) {
  let done = 0
  const settled = await Promise.allSettled(RUN_LOCALES.map((loc) => runOnce(url, loc).finally(() => onProgress(++done))))
  const ok = settled.filter((s) => s.status === 'fulfilled').map((s) => s.value)
  if (!ok.length) throw settled[0].reason
  return scoreSite(ok)
}

/* Ergebnis 24 Stunden im Browser merken: Dieselbe Adresse zeigt dasselbe Ergebnis,
   bis bewusst neu gemessen wird. Speicher kann fehlen (privater Modus), daher überall try/catch. */
const CACHE_PREFIX = 'zurio-check:v2:'
const CACHE_TTL = 24 * 60 * 60 * 1000
function readCache(url) {
  try {
    const hit = JSON.parse(localStorage.getItem(CACHE_PREFIX + url) || 'null')
    return hit && Date.now() - hit.at < CACHE_TTL ? hit : null
  } catch { return null }
}
function writeCache(url, result) {
  try {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith(CACHE_PREFIX))
    // Höchstens zehn Ergebnisse behalten, älteste zuerst entfernen
    if (keys.length >= 10) {
      keys.map((k) => [k, JSON.parse(localStorage.getItem(k) || '{}').at || 0]).sort((a, b) => a[1] - b[1]).slice(0, keys.length - 9).forEach(([k]) => localStorage.removeItem(k))
    }
    localStorage.setItem(CACHE_PREFIX + url, JSON.stringify({ at: Date.now(), result }))
  } catch { /* Speicher voll oder gesperrt: dann eben ohne */ }
}
const whenFmt = new Intl.DateTimeFormat('de-CH', { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
const oneDecimal = new Intl.NumberFormat('de-CH', { maximumFractionDigits: 1 })

const TONE = { good: 'var(--color-good)', warn: 'var(--color-warn)', bad: 'var(--color-bad)' }
const toneFor = (s) => (s >= 80 ? TONE.good : s >= 70 ? TONE.warn : TONE.bad)

const VERDICT = {
  Top: 'Technisch auf Top-Niveau: schnell, sauber und gut bedienbar.',
  Gut: 'Solide Basis mit einzelnen Schwachstellen.',
  Ausbaufähig: 'Spürbare Schwächen, die Besucher und Anfragen kosten.',
  Schwach: 'Die Seite bremst Ihre Besucher deutlich aus.',
}

function CheckIcon({ s }) {
  const tone = s >= 0.9 ? TONE.good : s >= 0.5 ? TONE.warn : TONE.bad
  const label = s >= 0.9 ? 'erfüllt' : s >= 0.5 ? 'teilweise erfüllt' : 'nicht erfüllt'
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={tone} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={label} style={{ flexShrink: 0, marginTop: 2 }}>
      {s >= 0.9 ? <path d="M5 12.5l4.5 4.5L19 7.5" /> : s >= 0.5 ? <path d="M6 12h12" /> : <path d="M7 7l10 10M17 7L7 17" />}
    </svg>
  )
}

function AreaRow({ area }) {
  return (
    <div>
      <div className="flex justify-between" style={{ marginBottom: 8, fontSize: 15, gap: 16 }}>
        <span style={{ color: 'var(--color-text)' }}>{area.label}</span>
        <span style={{ fontWeight: 600, color: toneFor(area.score), fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
          {area.score}<span style={{ color: 'var(--color-text-faint)', fontWeight: 400 }}> / 100</span>
        </span>
      </div>
      <div style={{ height: 6, background: 'var(--color-border)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${area.score}%`, height: '100%', background: toneFor(area.score), borderRadius: 3 }} />
      </div>
      {/* Warum dieser Bereich nicht voll ist: der Punkt, der hier am meisten kostet */}
      {area.reason && <p style={{ fontSize: 14, color: 'var(--color-text-muted)', marginTop: 8 }}>{area.reason}</p>}
    </div>
  )
}

export default function WebsiteAudit({ initialUrl = '' }) {
  const navigate = useNavigate()
  const [input, setInput] = useState(initialUrl)
  const [target, setTarget] = useState(null)
  const [phase, setPhase] = useState('idle') // idle | loading | result | error
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const [measuredAt, setMeasuredAt] = useState(null)
  const [fromCache, setFromCache] = useState(false)
  const [progress, setProgress] = useState(0)
  const resultRef = useRef(null)

  const startCheck = async (value, { fresh = false } = {}) => {
    const normalized = normalizeUrl(value)
    if (normalized.error) {
      setError(normalized.error)
      setPhase('idle')
      document.getElementById('check-url')?.focus()
      return
    }
    setError(null)
    setTarget(normalized)

    // Gleiche Adresse innert 24 Stunden: gespeichertes Ergebnis zeigen, statt neu zu würfeln
    const cached = !fresh && readCache(normalized.url)
    if (cached) {
      setResult(cached.result)
      setMeasuredAt(cached.at)
      setFromCache(true)
      setPhase('result')
      return
    }

    setProgress(0)
    setPhase('loading')
    track('website_check_started')
    try {
      const r = await runCheck(normalized.url, setProgress)
      const at = Date.now()
      writeCache(normalized.url, r)
      setResult(r)
      setMeasuredAt(at)
      setFromCache(false)
      setPhase('result')
      track('website_check_result', { band: r.band.label })
    } catch (err) {
      setError(
        err.status === 429
          ? 'Das Messkontingent von Google ist im Moment ausgeschöpft. Versuchen Sie es später nochmals, oder lassen Sie uns Ihre Seite persönlich prüfen.'
          : 'Die Seite konnte nicht gemessen werden. Prüfen Sie die Adresse, oder lassen Sie uns Ihre Seite persönlich prüfen.'
      )
      setPhase('error')
    }
  }

  // Ergebnis ankündigen und in Sicht bringen
  useEffect(() => {
    if (phase === 'result') resultRef.current?.focus({ preventScroll: false })
  }, [phase, result])

  const onSubmit = (e) => {
    e.preventDefault()
    startCheck(input)
  }

  // Vom Einstieg auf der Startseite: Messung sofort starten (Ref verhindert Doppelstart im StrictMode)
  const autoStarted = useRef(false)
  useEffect(() => {
    if (!initialUrl || autoStarted.current) return
    autoStarted.current = true
    startCheck(initialUrl)
  }, [initialUrl])

  const requestPersonal = () => {
    const summary = result
      ? [
          `Zurio-Score ${result.score}/100 (${result.band.label})`,
          result.areas.map((a) => `${a.label} ${a.score}`).join(', '),
          result.issues.length ? `Hebel: ${result.issues.map((i) => i.label + (i.value ? ` (${i.value})` : '')).join(', ')}` : null,
        ].filter(Boolean).join(' · ')
      : 'Messung nicht möglich'
    setRequestContext(`Website-Check für ${target?.host || input}: ${summary}. Bitte persönlich einschätzen.`)
    track('cta_click', { location: 'website_check' })
    navigate('/#contact')
  }

  const panel = { background: 'var(--color-bg-soft)', borderRadius: 'var(--radius)', padding: 'clamp(24px, 4vw, 48px)' }
  // Exakter Durchschnitt der Balken, damit die Rechnung nachvollziehbar ist
  const areaMean = result ? result.areas.reduce((s, a) => s + a.score, 0) / result.areas.length : 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <form onSubmit={onSubmit} style={panel} noValidate>
        <div className="field">
          <label htmlFor="check-url">Adresse Ihrer Webseite</label>
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Adressen nicht von Handy oder Safari «korrigieren» lassen (z. B. zurio → Zürich) */}
            <input
              id="check-url"
              name="url"
              type="text"
              inputMode="url"
              autoComplete="url"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="ihrefirma.ch"
              value={input}
              onChange={(e) => { setInput(e.target.value); if (error && phase !== 'error') setError(null) }}
              aria-invalid={Boolean(error && phase === 'idle')}
              aria-describedby="check-hint"
              disabled={phase === 'loading'}
            />
            <button type="submit" className="btn-accent" disabled={phase === 'loading'} style={{ whiteSpace: 'nowrap' }}>
              {phase === 'loading' ? 'Misst …' : 'Seite messen'}
            </button>
          </div>
          {error && phase === 'idle' ? (
            <p id="check-hint" className="field-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 7v6M12 16.5v.5" /></svg>
              <span>{error}</span>
            </p>
          ) : (
            <p id="check-hint" style={{ fontSize: 14, color: 'var(--color-text-faint)' }}>
              Kostenlos, ohne E-Mail. Gemessen mit Google PageSpeed Insights, bewertet nach strengen Massstäben.
            </p>
          )}
        </div>
      </form>

      {phase === 'loading' && (
        <div style={panel} role="status">
          <p style={{ marginBottom: 16 }}>
            Google misst <strong style={{ fontWeight: 600 }}>{target.host}</strong> dreimal auf einem simulierten
            Mittelklasse-Handy. Pro Messwert zählt der mittlere der drei Werte, damit Zufallsschwankungen nicht ins Gewicht fallen.
          </p>
          <div className="progress-indeterminate" />
          <p style={{ fontSize: 14, color: 'var(--color-text-muted)', marginTop: 12, fontVariantNumeric: 'tabular-nums' }}>
            {progress} von {RUN_LOCALES.length} Messungen fertig · meist 20 bis 60 Sekunden
          </p>
        </div>
      )}

      {phase === 'error' && (
        <div style={panel} role="alert">
          <p style={{ marginBottom: 24 }}>{error}</p>
          <button type="button" className="btn-accent" onClick={requestPersonal}>
            Persönliche Prüfung anfragen
            <ArrowUpRight />
          </button>
        </div>
      )}

      {phase === 'result' && result && (
        <div ref={resultRef} tabIndex={-1} className="appear" style={{ ...panel, display: 'flex', flexDirection: 'column', gap: 40, outline: 'none' }} aria-live="polite">
          {/* Kopf: Gesamtnote, Einordnung, Handy-Screenshot */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-8 items-start">
            <div>
              <p className="meta-line" style={{ marginBottom: 8 }}>
                Handy-Messung{measuredAt && <> vom <span style={{ whiteSpace: 'nowrap' }}>{whenFmt.format(measuredAt)}</span></>}
              </p>
              <h2 className="font-display" style={{ fontSize: '1.75rem', lineHeight: 1.2, marginBottom: 24, overflowWrap: 'anywhere' }}>{target.host}</h2>
              <div className="flex items-end gap-4" style={{ marginBottom: 12 }}>
                <p className="font-display" style={{ fontSize: 'clamp(4rem, 9vw, 5.5rem)', lineHeight: 0.85, color: TONE[result.band.tone], fontVariantNumeric: 'tabular-nums' }} aria-label={`${result.score} von 100 Punkten`}>
                  {result.score}
                </p>
                <div style={{ paddingBottom: 6 }}>
                  <p style={{ fontSize: 15, color: 'var(--color-text-faint)' }}>von 100</p>
                  <p style={{ fontSize: 18, fontWeight: 600, color: TONE[result.band.tone] }}>{result.band.label}</p>
                </div>
              </div>
              <p style={{ color: 'var(--color-text-muted)', maxWidth: '40ch' }}>{VERDICT[result.band.label]}</p>
            </div>
            {result.screenshot && (
              <figure className="hidden sm:block" style={{ width: 150 }}>
                <img
                  src={result.screenshot}
                  alt={`So sieht ${target.host} auf dem Handy aus`}
                  width="150"
                  style={{ width: 150, display: 'block', borderRadius: 14, border: '5px solid var(--color-text)', background: '#fff' }}
                />
                <figcaption style={{ fontSize: 12, color: 'var(--color-text-faint)', marginTop: 8, textAlign: 'center' }}>Ansicht im Test</figcaption>
              </figure>
            )}
          </div>

          {/* Bereiche, jeweils mit dem Grund, falls nicht voll */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              {result.areas.map((a) => <AreaRow key={a.key} area={a} />)}
            </div>
            {/* Nachvollziehbar: Gesamtnote ist genau der Durchschnitt der Balken */}
            <p style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--color-border)', fontSize: 14, color: 'var(--color-text-muted)', fontVariantNumeric: 'tabular-nums' }}>
              Gesamtnote = Durchschnitt der {result.areas.length} Bereiche: ({result.areas.map((a) => a.score).join(' + ')}) ÷ {result.areas.length}
              {' '}= {Number.isInteger(areaMean) ? '' : `${oneDecimal.format(areaMean)}, gerundet `}
              <strong style={{ color: 'var(--color-text)', fontWeight: 600 }}>{result.score}</strong>
            </p>
          </div>

          {/* Grösste Hebel mit konkretem Tipp */}
          {result.issues.length > 0 && (
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Die grössten Hebel</h3>
              <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 18 }}>
                {result.issues.map((issue, i) => (
                  <li key={issue.label} className="flex gap-4">
                    <span className="font-display" style={{ color: 'var(--color-accent-ink)', fontVariantNumeric: 'tabular-nums', minWidth: 18 }}>{i + 1}</span>
                    <div>
                      <p style={{ fontWeight: 600 }}>
                        {issue.label}
                        <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}> · kostet {issue.points} {issue.points === 1 ? 'Punkt' : 'Punkte'}</span>
                      </p>
                      {issue.value && <p style={{ fontSize: 14, color: 'var(--color-text-muted)', marginTop: 2 }}>{issue.value}</p>}
                      <p style={{ fontSize: 15, color: 'var(--color-text-muted)', marginTop: 2 }}>{issue.fix}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Alle Prüfpunkte, für Neugierige aufklappbar */}
          <details className="audit-details">
            <summary>Alle {result.areas.reduce((n, a) => n + a.checks.length, 0)} Prüfpunkte anzeigen</summary>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8" style={{ marginTop: 20 }}>
              {result.areas.map((a) => (
                <div key={a.key}>
                  <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>{a.label} <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}>· {a.score}</span></p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {a.checks.map((c) => (
                      <li key={c.key} className="flex gap-3" style={{ fontSize: 14, lineHeight: 1.45 }}>
                        <CheckIcon s={c.s} />
                        <span>
                          {c.label}
                          {c.value && <span style={{ color: 'var(--color-text-muted)' }}> · {c.value}</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>

          {/* Ehrlich: Was eine Messung nicht beurteilen kann */}
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 24 }}>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>Was keine Messung beurteilen kann</p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 15, maxWidth: '60ch' }}>
              Ob Ihre Seite überzeugt, verständlich ist und Vertrauen weckt, zeigt kein Messwert. Das schauen wir
              uns gerne persönlich an, kostenlos und mit ehrlicher Einschätzung.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <button type="button" className="btn-accent" onClick={requestPersonal}>
              Ergebnis persönlich besprechen
              <ArrowUpRight />
            </button>
            <div className="flex flex-wrap gap-x-6">
              <button type="button" className="btn-link" onClick={() => startCheck(target.url, { fresh: true })}>
                Neu messen
              </button>
              <button type="button" className="btn-link" onClick={() => { setPhase('idle'); setResult(null); setInput('') }}>
                Andere Seite messen
              </button>
            </div>
          </div>

          <p style={{ fontSize: 13, color: 'var(--color-text-faint)' }}>
            {result.runs > 1 ? `Ausgewertet aus ${result.runs} Messungen` : 'Eine Messung'} mit Google PageSpeed Insights (Lighthouse {result.lighthouseVersion})
            auf einem simulierten Mittelklasse-Handy{result.runs === 3 ? '; pro Messwert zählt der mittlere der drei Werte' : result.runs === 2 ? '; pro Messwert zählt der Durchschnitt beider Werte' : ''}.
            {result.field ? ` Die Tempo-Werte enthalten echte Besucherdaten aus Chrome (${result.field.scope === 'seite' ? 'für diese Seite' : 'für die ganze Website'}).` : ''}
            {' '}{fromCache ? 'Gespeichertes Ergebnis: ' : ''}Dieselbe Adresse zeigt 24 Stunden lang dasselbe Ergebnis, ausser Sie messen neu.
          </p>
        </div>
      )}
    </div>
  )
}
