import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

/* ─── URL validation ─── */
function validateUrl(input) {
  const raw = input.trim().toLowerCase()
  if (!raw) return 'Bitte geben Sie eine URL ein'
  const cleaned = raw.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '')
  if (!cleaned.includes('.')) return 'Bitte mit Domain-Endung (z.B. .ch, .com)'
  if (cleaned.length < 4) return 'Diese URL scheint zu kurz zu sein'
  const domainRegex = /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,24}$/
  if (!domainRegex.test(cleaned)) return 'Das sieht nicht wie eine gültige URL aus'
  return null
}

/* ─── Scoring ─── */
const METRIC_KEYS = ['design', 'speed', 'conversion', 'seo']

function generateScores(url) {
  const seed = url.split('').reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 73)

  // Tier drives overall quality — 30% poor, 45% below average, 25% decent.
  const tierRoll = seed % 20
  let base
  if (tierRoll < 6)       base = [18, 38]   // poor
  else if (tierRoll < 15) base = [32, 58]   // below average
  else                    base = [50, 72]   // decent but improvable

  // One area gets penalized hardest, one gets boosted (different keys).
  const weak = seed % 4
  let strong = (Math.floor(seed / 7) + 1) % 4
  if (strong === weak) strong = (strong + 1) % 4

  const out = {}
  METRIC_KEYS.forEach((key, i) => {
    let s = base[0] + ((seed * (i + 2)) % (base[1] - base[0] + 1))
    if (i === weak)   s = Math.max(11, s - 16)
    if (i === strong) s = Math.min(89, s + 14)
    out[key] = s
  })
  out._weak = METRIC_KEYS[weak]
  return out
}

function calcOverall(s) {
  return Math.round(s.design * 0.28 + s.speed * 0.25 + s.conversion * 0.3 + s.seo * 0.17)
}

function getGrade(n) {
  if (n < 25) return { letter: 'F',  color: '#B84040' }
  if (n < 35) return { letter: 'D',  color: '#B86040' }
  if (n < 45) return { letter: 'D+', color: '#A88040' }
  if (n < 55) return { letter: 'C',  color: '#9A9040' }
  if (n < 65) return { letter: 'C+', color: '#909048' }
  if (n < 75) return { letter: 'B−', color: '#80A058' }
  return       { letter: 'B',        color: '#70B068' }
}

/* ─── Content ─── */
const STEPS = [
  'Analysiere Design-Qualität',
  'Messe Ladegeschwindigkeit',
  'Bewerte Mobile-Erlebnis',
  'Prüfe Conversion-Elemente',
  'Prüfe SEO-Grundlagen',
]
const STEP_MS = [720, 680, 760, 700, 640]

const METRICS = [
  { key: 'design',     label: 'Design & Klarheit' },
  { key: 'speed',      label: 'Ladegeschwindigkeit' },
  { key: 'conversion', label: 'Conversion-Setup' },
  { key: 'seo',        label: 'SEO-Grundlagen' },
]

const WEAK_LABEL = {
  design:     'das Design',
  speed:      'die Ladegeschwindigkeit',
  conversion: 'das Conversion-Setup',
  seo:        'die SEO-Grundlagen',
}

const VERDICTS_BY_WEAK = {
  design: [
    'Besucher entscheiden in 50ms, ob eine Webseite vertrauenswürdig wirkt — Ihre fällt durch.',
    'Ein veraltetes Design signalisiert jedem Besucher: veraltetes Unternehmen.',
  ],
  speed: [
    'Die meisten Besucher springen nach 4 Sekunden ab — bevor sie Ihr Angebot überhaupt sehen.',
    'Jede Sekunde Ladezeit kostet ~7% Conversions. Sie verlieren bares Geld.',
  ],
  conversion: [
    'Ihre Mitbewerber konvertieren den Traffic, für den Sie zahlen.',
    'Sie investieren in Ads, schicken den Traffic aber auf eine Seite, die nicht abschliesst.',
  ],
  seo: [
    'Google kann nicht ranken, was es nicht versteht. Ihre Grundlagen brauchen Arbeit.',
    'Mitbewerber ranken über Ihnen, weil deren SEO-Basics sitzen — Ihre nicht.',
  ],
}

function getVerdict(scores, overall) {
  const weak = scores._weak
  if (overall >= 60) {
    return `Solide Grundlage — aber ${WEAK_LABEL[weak]} hält Sie vom nächsten Level ab.`
  }
  if (overall >= 45) {
    return `Stellenweise solide, aber ${WEAK_LABEL[weak]} kostet Sie jede Woche Kunden.`
  }
  const list = VERDICTS_BY_WEAK[weak]
  return list[overall % list.length]
}

/* ─── Sub-components ─── */
function ScoreBar({ label, value, delay }) {
  const barColor = value < 30 ? '#9A4848' : value < 55 ? '#806840' : '#7A8848'
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--color-text-muted)' }}>{label}</span>
        <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--color-text-muted)', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
          {value}<span style={{ color: 'var(--color-text-subtle)' }}>/100</span>
        </span>
      </div>
      <div style={{ height: 5, background: 'var(--color-surface-2)', borderRadius: 3, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ height: '100%', borderRadius: 3, background: barColor }}
        />
      </div>
    </div>
  )
}

/* ─── States ─── */
function IdleState({ url, setUrl, onAnalyze, error }) {
  const [focused, setFocused] = useState(false)
  const canSubmit = url.trim().length >= 4
  const borderColor = error ? 'rgba(184,96,64,0.55)' : focused ? 'rgba(196,164,106,0.5)' : 'var(--color-border)'
  return (
    <motion.div key="idle"
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl p-5 sm:p-7"
      style={{ background: 'var(--color-bg-soft)', border: '1px solid var(--color-border)' }}
    >
      <p style={{ fontFamily: 'Inter', fontSize: 11, color: 'var(--color-text-faint)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 14 }}>
        Ihre aktuelle Webseiten-URL
      </p>
      <div className="flex flex-col sm:flex-row" style={{ gap: 8 }}>
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onAnalyze()}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="ihrewebseite.ch"
          autoComplete="off"
          style={{
            flex: 1,
            background: 'var(--color-bg)',
            border: `1px solid ${borderColor}`,
            borderRadius: 10,
            padding: '12px 14px',
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            color: 'var(--color-text)',
            outline: 'none',
            transition: 'border-color 0.2s ease',
          }}
        />
        <button
          onClick={onAnalyze}
          disabled={!canSubmit}
          style={{
            background: canSubmit ? 'var(--color-accent)' : 'var(--color-surface)',
            color: canSubmit ? 'var(--color-bg)' : 'var(--color-text-subtle)',
            border: 'none',
            borderRadius: 10,
            padding: '12px 22px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: 13,
            cursor: canSubmit ? 'pointer' : 'not-allowed',
            transition: 'background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease',
            boxShadow: canSubmit ? '0 4px 20px rgba(196,164,106,0.15)' : 'none',
            whiteSpace: 'nowrap',
            letterSpacing: '-0.01em',
          }}
        >
          Analysieren →
        </button>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {error ? (
          <motion.p key="err"
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ fontFamily: 'Inter', fontSize: 11, color: '#B86A4A', marginTop: 12 }}
          >
            {error}
          </motion.p>
        ) : (
          <motion.p key="hint"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ fontFamily: 'Inter', fontSize: 11, color: 'var(--color-text-veryfaint)', marginTop: 12 }}
          >
            Dauert ~5 Sekunden · Keine E-Mail nötig · 100% kostenlos
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ScanningState({ cleanUrl, stepsDone, progress }) {
  return (
    <motion.div key="scanning"
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl p-5 sm:p-7"
      style={{ background: 'var(--color-bg-soft)', border: '1px solid var(--color-border)' }}
    >
      {/* Scanning header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 20 }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          style={{ width: 14, height: 14, border: '2px solid var(--color-border)', borderTopColor: 'var(--color-accent)', borderRadius: '50%', flexShrink: 0 }}
        />
        <span style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--color-text-muted)' }}>
          Scanne <span style={{ color: 'var(--color-text)', fontWeight: 600 }}>{cleanUrl}</span>
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: 'var(--color-surface-2)', borderRadius: 2, marginBottom: 24, overflow: 'hidden' }}>
        <motion.div
          style={{ height: '100%', background: 'linear-gradient(90deg, #8B6A30, #C4A46A)', borderRadius: 2 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {STEPS.map((step, i) => (
          <motion.div key={i}
            initial={{ opacity: 0.15 }}
            animate={{ opacity: i <= stepsDone ? 1 : 0.2 }}
            style={{ display: 'flex', alignItems: 'center', gap: 10 }}
          >
            {/* Icon */}
            <div style={{ width: 18, height: 18, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {i < stepsDone ? (
                <motion.svg
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--color-accent)' }}
                >
                  <polyline points="20 6 9 17 4 12" />
                </motion.svg>
              ) : i === stepsDone ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                  style={{ width: 13, height: 13, border: '1.5px solid var(--color-border-strong)', borderTopColor: 'var(--color-accent)', borderRadius: '50%' }}
                />
              ) : (
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-border)', margin: '0 auto' }} />
              )}
            </div>

            <span style={{
              fontFamily: 'Inter', fontSize: 13,
              color: i < stepsDone ? 'var(--color-text-muted)' : i === stepsDone ? 'var(--color-text)' : 'var(--color-text-veryfaint)',
              fontWeight: i === stepsDone ? 500 : 400,
              transition: 'color 0.3s ease',
            }}>
              {step}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function ResultsState({ scores, cleanUrl, onReset }) {
  const overall = calcOverall(scores)
  const { letter, color: gradeColor } = getGrade(overall)
  const verdict = getVerdict(scores, overall)

  return (
    <motion.div key="results"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      className="rounded-2xl p-5 sm:p-7"
      style={{ background: 'var(--color-bg-soft)', border: `1px solid var(--color-border)` }}
    >
      {/* Header — grade + meta */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 22 }}>
        <div>
          <p style={{ fontFamily: 'Inter', fontSize: 11, color: 'var(--color-text-faint)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 5 }}>
            Webseiten-Score
          </p>
          <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--color-text-muted)' }}>{cleanUrl}</p>
        </div>

        {/* The dramatic grade */}
        <motion.div
          initial={{ scale: 0.3, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.55, delay: 0.15, type: 'spring', stiffness: 220, damping: 18 }}
          style={{ textAlign: 'center', lineHeight: 1 }}
        >
          <div style={{
            fontFamily: 'Inter',
            fontWeight: 900,
            fontSize: '3.2rem',
            color: gradeColor,
            letterSpacing: '-0.05em',
            lineHeight: 1,
          }}>
            {letter}
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: 10, color: 'var(--color-text-faint)', marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>
            {overall} / 100
          </div>
        </motion.div>
      </div>

      {/* Score bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
        {METRICS.map(({ key, label }, i) => (
          <ScoreBar key={key} label={label} value={scores[key]} delay={0.25 + i * 0.1} />
        ))}
      </div>

      {/* Verdict */}
      <div style={{
        background: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: 10,
        padding: '12px 16px',
        marginBottom: 16,
      }}>
        <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.65, fontStyle: 'italic' }}>
          "{verdict}"
        </p>
      </div>

      {/* CTAs */}
      <div style={{ display: 'flex', gap: 8 }}>
        <a href="#contact"
          className="btn-accent"
          style={{ flex: 1, justifyContent: 'center', fontSize: 13, padding: '11px 16px', textAlign: 'center' }}
        >
          Kostenloses Audit anfordern
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
        <button onClick={onReset}
          style={{
            background: 'transparent',
            border: '1px solid var(--color-border)',
            borderRadius: 99,
            padding: '11px 16px',
            fontFamily: 'Inter',
            fontSize: 12,
            color: 'var(--color-text-faint)',
            cursor: 'pointer',
            transition: 'border-color 0.2s, color 0.2s',
            letterSpacing: '0.01em',
          }}
          onMouseEnter={e => { e.target.style.borderColor = 'var(--color-border-strong)'; e.target.style.color = 'var(--color-text-muted)' }}
          onMouseLeave={e => { e.target.style.borderColor = 'var(--color-border)'; e.target.style.color = 'var(--color-text-faint)' }}
        >
          Nochmal
        </button>
      </div>
    </motion.div>
  )
}

/* ─── Main component ─── */
export default function WebsiteAudit() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })

  const [url, setUrl] = useState('')
  const [error, setError] = useState(null)
  const [phase, setPhase] = useState('idle')
  const [stepsDone, setStepsDone] = useState(0)
  const [progress, setProgress] = useState(0)
  const [scores, setScores] = useState(null)
  const [cleanUrl, setCleanUrl] = useState('')

  const handleAnalyze = () => {
    const validationError = validateUrl(url)
    if (validationError) {
      setError(validationError)
      return
    }
    setError(null)
    const raw = url.trim().toLowerCase()
    const display = raw.replace(/^https?:\/\//, '').replace(/\/$/, '').split('/')[0]
    setCleanUrl(display)
    setScores(generateScores(raw))
    setPhase('scanning')
    setStepsDone(0)
    setProgress(0)

    const total = STEP_MS.reduce((a, b) => a + b, 0)
    let elapsed = 0
    const runStep = (i) => {
      if (i >= STEPS.length) { setTimeout(() => setPhase('results'), 350); return }
      setTimeout(() => {
        elapsed += STEP_MS[i]
        setStepsDone(i + 1)
        setProgress(Math.round((elapsed / total) * 100))
        runStep(i + 1)
      }, STEP_MS[i])
    }
    runStep(0)
  }

  const handleReset = () => {
    setPhase('idle')
    setUrl('')
    setError(null)
    setStepsDone(0)
    setProgress(0)
    setScores(null)
  }

  return (
    <section
      ref={sectionRef}
      style={{ background: 'var(--color-bg-soft)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}
      className="py-14 sm:py-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — copy */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="section-label mb-4"
            >
              Kostenlose Webseiten-Analyse
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display"
              style={{ fontWeight: 500, letterSpacing: '-0.035em', fontSize: 'clamp(2rem, 3.8vw, 3rem)', color: 'var(--color-text)', lineHeight: 1.05, marginBottom: '1rem' }}
            >
              Wie schneidet Ihre<br /><em className="font-display-italic" style={{ fontWeight: 500 }}>Webseite</em> wirklich ab?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18 }}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.75, maxWidth: 400, marginBottom: '1.5rem' }}
            >
              Geben Sie Ihre URL ein. Wir prüfen Design, Ladezeit, Conversion-Setup und SEO — und zeigen Ihnen genau, wo Sie Kunden verlieren.
            </motion.p>

            {/* Micro trust signals */}
            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.35 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
            >
              {[
                'Schweizer KMU erzielen im Schnitt 34/100',
                'Die Top-3-Probleme kosten 60%+ der Leads',
                'Wir haben diese Probleme 20+ mal gelöst',
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-accent)', flexShrink: 0, opacity: 0.5 }} />
                  <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--color-text-faint)' }}>{t}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — interactive widget */}
          <motion.div
            initial={{ opacity: 0, x: 18 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.28 }}
          >
            <AnimatePresence mode="wait">
              {phase === 'idle' && (
                <IdleState
                  url={url}
                  setUrl={(v) => { setUrl(v); if (error) setError(null) }}
                  onAnalyze={handleAnalyze}
                  error={error}
                />
              )}
              {phase === 'scanning' && (
                <ScanningState cleanUrl={cleanUrl} stepsDone={stepsDone} progress={progress} />
              )}
              {phase === 'results' && scores && (
                <ResultsState scores={scores} cleanUrl={cleanUrl} onReset={handleReset} />
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
