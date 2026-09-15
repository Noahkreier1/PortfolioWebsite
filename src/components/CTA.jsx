import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="contact" className="section-xl" style={{ background: 'var(--color-bg-soft)' }} ref={ref}>
      <div className="container-page text-center">
        <div className="mx-auto" style={{ maxWidth: 880 }}>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }} className="section-label justify-center" style={{ marginBottom: 24 }}>
            Lassen Sie uns zusammenarbeiten
          </motion.p>

          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display"
            style={{ fontWeight: 500, letterSpacing: '-0.035em', fontSize: 'clamp(2.75rem, 6vw, 5rem)', color: 'var(--color-text)', lineHeight: 1.08, marginBottom: 32 }}>
            Bereit für eine Webseite,<br />
            <em className="font-display-italic" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>die wirklich verkauft?</em>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lead mx-auto"
            style={{ maxWidth: 560, marginBottom: 56 }}>
            30 Minuten über Ihr Projekt sprechen: was Sie brauchen, was es kostet, ob wir passen. Unverbindlich und kostenlos.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="flex flex-col items-center" style={{ gap: 32 }}>
            <a href="mailto:hello@omniadigital.ch?subject=Kostenloses%20Erstgespr%C3%A4ch" className="btn-accent">
              Kostenloses Erstgespräch buchen
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </a>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'var(--color-text-faint)' }}>
              Oder direkt per E-Mail:{' '}
              <a href="mailto:hello@omniadigital.ch" style={{ color: 'var(--color-text-muted)', textDecoration: 'underline', textUnderlineOffset: 4 }}>
                hello@omniadigital.ch
              </a>
            </span>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'var(--color-text-faint)', marginTop: 96 }}>
            <span>Antwort innert 24h</span>
            <span>Team aus der Schweiz</span>
            <span>Keine versteckten Kosten</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
