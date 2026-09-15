import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'Erstgespräch',
    detail: '30 Min · kostenlos',
    description:
      'Wir besprechen Ihre Ziele, Ihren aktuellen Auftritt und was Ihre Kunden brauchen. Danach wissen Sie, ob wir passen. Ohne Verpflichtung.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Festofferte & Konzept',
    detail: '2–3 Tage',
    description:
      'Sie erhalten eine verbindliche Offerte mit Fixpreis und Liefertermin. Kein Stundenzähler, keine Nachträge. Dazu einen klaren Vorschlag für Struktur und Inhalt.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 15l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Design & Umsetzung',
    detail: '1–2 Wochen',
    description:
      'Wir gestalten und entwickeln Ihre Webseite. Sie sehen laufend den Stand und geben direkt Feedback, an die Macher, nicht an einen Projektleiter.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Launch & Betreuung',
    detail: '30 Tage inklusive',
    description:
      'Wir schalten die Seite auf, richten Domain und Hosting ein und passen in den ersten 30 Tagen kostenlos an. Auf Wunsch betreuen wir danach weiter.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
      </svg>
    ),
  },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="process" className="section" style={{ background: 'var(--color-bg-soft)' }}>
      <div className="container-page" ref={ref}>

        <div className="section-head">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }} className="section-label">So arbeiten wir</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display h-section">
            Vom Erstgespräch zum Launch<br />
            <em className="font-display-italic" style={{ fontWeight: 500, color: 'var(--color-accent)' }}>in zwei Wochen.</em>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }} className="lead">
            Sie wissen zu jedem Zeitpunkt, was passiert, was es kostet und wann es fertig ist.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div style={{ color: 'var(--color-accent)', marginBottom: 24 }}>
                {step.icon}
              </div>
              <h3 className="font-display" style={{ fontWeight: 500, fontSize: '1.375rem', lineHeight: 1.2, color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: 8 }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: 'var(--color-accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
                {step.detail}
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col items-center text-center"
          style={{ marginTop: 'clamp(96px, 10vw, 128px)', gap: 32 }}
        >
          <p className="lead" style={{ maxWidth: 520 }}>
            Der erste Schritt kostet nichts und verpflichtet zu nichts:{' '}
            <span style={{ color: 'var(--color-text)', fontWeight: 500 }}>ein Gespräch über Ihr Projekt.</span>
          </p>
          <a href="#contact" className="btn-accent">
            Kostenloses Erstgespräch
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
