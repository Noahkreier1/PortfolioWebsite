import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { track } from '@vercel/analytics'
import { setRequestContext } from '../lib/requestContext'
import { ArrowUpRight } from './Icons'

/* Echter Website-Check über Google PageSpeed Insights (Lighthouse).
   Ohne eigenen API-Schlüssel teilt man sich ein öffentliches Tageskontingent,
   das oft ausgeschöpft ist. Schlüssel als VITE_PSI_API_KEY hinterlegen
   (in der Google Cloud Console auf die eigene Domain beschränken). */
const API = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
const API_KEY = import.meta.env.VITE_PSI_API_KEY

const CATEGORIES = [
  { key: 'performance', label: 'Ladegeschwindigkeit (Handy)' },
  { key: 'seo', label: 'SEO-Grundlagen' },
  { key: 'accessibility', label: 'Barrierefreiheit' },
  { key: 'best-practices', label: 'Technische Qualität' },
]

function normalizeUrl(input) {
  let raw = input.trim()
  if (!raw) return { error: 'Bitte geben Sie eine Adresse ein, z. B. ihrefirma.ch.' }
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`
  try {
    const u = new URL(raw)
    if (!/\.[a-z]{2,}$/i.test(u.hostname)) return { error: 'Die Adresse braucht eine Domain-Endung, z. B. .ch oder .com.' }
    return { url: u.toString(), host: u.hostname.replace(/^www\./, '') }
  } catch {
    return { error: 'Das sieht nicht wie eine gültige Webadresse aus.' }
  }
}

async function runCheck(url) {
  const params = new URLSearchParams({ url, strategy: 'mobile', locale: 'de' })
  CATEGORIES.forEach((c) => params.append('category', c.key))
  if (API_KEY) params.set('key', API_KEY)

  const res = await fetch(`${API}?${params}`)
  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(json?.error?.message || 'PageSpeed-Fehler')
    err.status = res.status
    throw err
  }

  const lh = json.lighthouseResult
  const audits = lh.audits
  const scores = Object.fromEntries(CATEGORIES.map((c) => [c.key, Math.round((lh.categories[c.key]?.score ?? 0) * 100)]))

  const vitals = [
    { label: 'Hauptinhalt sichtbar (LCP)', value: audits['largest-contentful-paint']?.displayValue },
    { label: 'Blockierzeit (TBT)', value: audits['total-blocking-time']?.displayValue },
    { label: 'Layout-Verschiebung (CLS)', value: audits['cumulative-layout-shift']?.displayValue },
  ].filter((v) => v.value)

  // Grösste Bremsen: zuerst Lighthouse-«Opportunities», sonst schlecht bewertete Performance-Audits
  let issues = Object.values(audits)
    .filter((a) => a.details?.type === 'opportunity' && a.score !== null && a.score < 0.9 && a.details.overallSavingsMs > 100)
    .sort((a, b) => b.details.overallSavingsMs - a.details.overallSavingsMs)
  if (!issues.length) {
    issues = (lh.categories.performance?.auditRefs || [])
      .map((ref) => audits[ref.id])
      .filter((a) => a && a.score !== null && a.score < 0.5)
  }

  return {
    scores,
    vitals,
    issues: issues.slice(0, 3).map((a) => ({ title: a.title, value: a.displayValue })),
  }
}

const scoreColor = (s) => (s >= 90 ? 'var(--color-good)' : s >= 50 ? 'var(--color-warn)' : 'var(--color-bad)')

function ScoreRow({ label, value }) {
  return (
    <div>
      <div className="flex justify-between" style={{ marginBottom: 8, fontSize: 15 }}>
        <span style={{ color: 'var(--color-text)' }}>{label}</span>
        <span style={{ fontWeight: 600, color: scoreColor(value), fontVariantNumeric: 'tabular-nums' }}>
          {value}<span style={{ color: 'var(--color-text-faint)', fontWeight: 400 }}> / 100</span>
        </span>
      </div>
      <div style={{ height: 6, background: 'var(--color-border)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', background: scoreColor(value), borderRadius: 3 }} />
      </div>
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

  const startCheck = async (value) => {
    const normalized = normalizeUrl(value)
    if (normalized.error) {
      setError(normalized.error)
      setPhase('idle')
      return
    }
    setError(null)
    setTarget(normalized)
    setPhase('loading')
    track('website_check_started')
    try {
      setResult(await runCheck(normalized.url))
      setPhase('result')
    } catch (err) {
      setError(
        err.status === 429
          ? 'Das Messkontingent von Google ist im Moment ausgeschöpft. Versuchen Sie es später nochmals, oder lassen Sie uns Ihre Seite persönlich prüfen.'
          : 'Die Seite konnte nicht gemessen werden. Prüfen Sie die Adresse, oder lassen Sie uns Ihre Seite persönlich prüfen.'
      )
      setPhase('error')
    }
  }

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
      ? CATEGORIES.map((c) => `${c.label} ${result.scores[c.key]}/100`).join(', ')
      : 'Messung nicht möglich'
    setRequestContext(`Website-Check für ${target?.host || input}: ${summary}. Bitte persönlich einschätzen.`)
    track('cta_click', { location: 'website_check' })
    navigate('/#contact')
  }

  const panel = { background: 'var(--color-bg-soft)', borderRadius: 28, padding: 'clamp(24px, 4vw, 48px)' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <form onSubmit={onSubmit} style={panel} noValidate>
        <div className="field">
          <label htmlFor="check-url">Adresse Ihrer Webseite</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="check-url"
              name="url"
              type="text"
              inputMode="url"
              autoComplete="url"
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
          <p id="check-hint" style={{ fontSize: 14, color: error && phase === 'idle' ? 'var(--color-bad)' : 'var(--color-text-faint)' }}>
            {error && phase === 'idle' ? error : 'Kostenlos, ohne E-Mail. Die Messung läuft über Google PageSpeed Insights.'}
          </p>
        </div>
      </form>

      {phase === 'loading' && (
        <div style={panel} role="status">
          <p style={{ marginBottom: 16 }}>
            Google misst gerade <strong style={{ fontWeight: 600 }}>{target.host}</strong>. Das dauert meist 20 bis 60 Sekunden.
          </p>
          <div className="progress-indeterminate" />
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
        <div style={{ ...panel, display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div>
            <p className="meta-line" style={{ marginBottom: 8 }}>Ergebnis · Handy-Ansicht</p>
            <h2 className="font-display" style={{ fontSize: '1.75rem', lineHeight: 1.2 }}>{target.host}</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {CATEGORIES.map((c) => <ScoreRow key={c.key} label={c.label} value={result.scores[c.key]} />)}
          </div>

          {result.vitals.length > 0 && (
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {result.vitals.map((v) => (
                <div key={v.label}>
                  <dt style={{ fontSize: 14, color: 'var(--color-text-muted)', marginBottom: 4 }}>{v.label}</dt>
                  <dd className="font-display" style={{ fontSize: '1.5rem', fontVariantNumeric: 'tabular-nums' }}>{v.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {result.issues.length > 0 && (
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Grösste Bremsen laut Lighthouse</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, color: 'var(--color-text-muted)' }}>
                {result.issues.map((issue) => (
                  <li key={issue.title}>
                    {issue.title}{issue.value ? <span style={{ color: 'var(--color-text-faint)' }}> · {issue.value}</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <button type="button" className="btn-accent" onClick={requestPersonal}>
              Ergebnis persönlich besprechen
              <ArrowUpRight />
            </button>
            <button type="button" className="btn-link" onClick={() => { setPhase('idle'); setResult(null); setInput('') }}>
              Andere Seite messen
            </button>
          </div>

          <p style={{ fontSize: 13, color: 'var(--color-text-faint)' }}>
            Gemessen mit Google PageSpeed Insights (Lighthouse). Die Werte schwanken je nach Messung um einige Punkte.
          </p>
        </div>
      )}
    </div>
  )
}
