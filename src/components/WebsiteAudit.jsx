import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { COMPANY } from '../data/company'

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

const CHECKS = [
  { title: 'Erster Eindruck & Design', desc: 'Wirkt die Seite vertrauenswürdig, klar und zeitgemäss?' },
  { title: 'Ladezeit & Mobile', desc: 'Wie schnell lädt die Seite und wie gut funktioniert sie auf dem Handy?' },
  { title: 'Conversion', desc: 'Führt die Seite Besucher zur Anfrage oder verliert sie sie unterwegs?' },
  { title: 'Google-Sichtbarkeit', desc: 'Stimmen die SEO-Grundlagen, damit Sie gefunden werden?' },
]

function IdleState({ url, setUrl, onSubmit, error }) {
  const [focused, setFocused] = useState(false)
  const canSubmit = url.trim().length >= 4
  const borderColor = error ? 'rgba(184,96,64,0.55)' : focused ? 'rgba(196,164,106,0.5)' : 'var(--color-border)'
  return (
    <motion.div key="idle"
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl p-5 sm:p-7"
      style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
    >
      <p style={{ fontFamily: 'Inter', fontSize: 11, color: 'var(--color-text-faint)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 14 }}>
        Ihre aktuelle Webseiten-URL
      </p>
      <div className="flex flex-col sm:flex-row" style={{ gap: 8 }}>
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSubmit()}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="ihrewebseite.ch"
          autoComplete="off"
          style={{
            flex: 1,
            background: 'var(--color-surface)',
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
          onClick={onSubmit}
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
          Analyse anfordern →
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
            style={{ fontFamily: 'Inter', fontSize: 11, color: 'var(--color-text-faint)', marginTop: 12 }}
          >
            Persönlich geprüft, kein automatischer Scan · Antwort innert 48h · Kostenlos & unverbindlich
          </motion.p>
        )}
      </AnimatePresence>

      {/* Was geprüft wird */}
      <div style={{ marginTop: 22, paddingTop: 20, borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 13 }}>
        {CHECKS.map((c) => (
          <div key={c.title} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: 2 }}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <div>
              <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>{c.title}</span>
              <span style={{ fontFamily: 'Inter', fontSize: 12.5, color: 'var(--color-text-muted)' }}> — {c.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function SentState({ cleanUrl, onReset }) {
  return (
    <motion.div key="sent"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      className="rounded-2xl p-5 sm:p-7"
      style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
    >
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 220, damping: 16 }}
        style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'var(--color-accent-glow)', border: '1px solid var(--color-accent-soft)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--color-accent)' }}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </motion.div>

      <h3 className="font-display" style={{ fontWeight: 500, fontSize: '1.4rem', color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: 10 }}>
        Fast geschafft
      </h3>
      <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 18 }}>
        Ihr E-Mail-Programm sollte sich soeben geöffnet haben, mit einer vorbereiteten Anfrage für{' '}
        <span style={{ color: 'var(--color-text)', fontWeight: 600 }}>{cleanUrl}</span>. Einfach absenden, den Rest übernehmen wir.
      </p>
      <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 20 }}>
        Sie erhalten innert 48 Stunden eine ehrliche Einschätzung mit den drei wichtigsten Verbesserungen. Auch wenn Sie danach nichts bei uns buchen.
      </p>
      <button onClick={onReset}
        style={{
          background: 'transparent',
          border: '1px solid var(--color-border)',
          borderRadius: 99,
          padding: '10px 18px',
          fontFamily: 'Inter',
          fontSize: 12,
          color: 'var(--color-text-muted)',
          cursor: 'pointer',
          transition: 'border-color 0.2s, color 0.2s',
        }}
      >
        Andere URL einreichen
      </button>
    </motion.div>
  )
}

export default function WebsiteAudit() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })

  const [url, setUrl] = useState('')
  const [error, setError] = useState(null)
  const [phase, setPhase] = useState('idle')
  const [cleanUrl, setCleanUrl] = useState('')

  const handleSubmit = () => {
    const validationError = validateUrl(url)
    if (validationError) {
      setError(validationError)
      return
    }
    setError(null)
    const display = url.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '').split('/')[0]
    setCleanUrl(display)

    const subject = encodeURIComponent(`Kostenlose Website-Analyse für ${display}`)
    const body = encodeURIComponent(
      `Guten Tag\n\nBitte analysieren Sie meine Webseite: ${display}\n\nFirma / Branche (optional):\n\nFreundliche Grüsse`
    )
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`
    setPhase('sent')
  }

  const handleReset = () => {
    setPhase('idle')
    setUrl('')
    setError(null)
  }

  return (
    <section
      id="analyse"
      ref={sectionRef}
      style={{ background: 'var(--color-bg-soft)', borderTop: '1px solid var(--color-border)' }}
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
              Noch nicht bereit für ein Gespräch?<br /><em className="font-display-italic" style={{ fontWeight: 500 }}>Starten Sie hier.</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18 }}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.75, maxWidth: 420, marginBottom: '1.5rem' }}
            >
              Reichen Sie Ihre URL ein. Wir schauen uns Ihre Webseite persönlich an, kein automatischer Scan, keine Software-Noten, und senden Ihnen innert 48 Stunden die drei Punkte, die Sie am meisten Kunden kosten.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.35 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
            >
              {[
                'Ehrliche Einschätzung, auch wenn Ihre Seite gut ist',
                'Konkrete Empfehlungen statt Fachchinesisch',
                'Kein Verkaufsdruck, keine Anruf-Lawine',
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-accent)', flexShrink: 0, opacity: 0.5 }} />
                  <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'var(--color-text-faint)' }}>{t}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — request widget */}
          <motion.div
            initial={{ opacity: 0, x: 18 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.28 }}
          >
            <AnimatePresence mode="wait">
              {phase === 'idle' && (
                <IdleState
                  url={url}
                  setUrl={(v) => { setUrl(v); if (error) setError(null) }}
                  onSubmit={handleSubmit}
                  error={error}
                />
              )}
              {phase === 'sent' && (
                <SentState cleanUrl={cleanUrl} onReset={handleReset} />
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
