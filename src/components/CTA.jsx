import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="contact" className="relative py-16 sm:py-24 border-t border-border overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid pointer-events-none" style={{ opacity: 0.6 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, var(--color-accent-glow) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }} className="section-label justify-center mb-5">
          Lassen Sie uns zusammenarbeiten
        </motion.p>

        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display"
          style={{ fontWeight: 500, letterSpacing: '-0.04em', fontSize: 'clamp(2rem, 5.4vw, 4.6rem)', color: 'var(--color-text)', lineHeight: 1.05, marginBottom: '1.25rem' }}>
          Bereit für eine Webseite,<br />
          <em className="font-display-italic" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>die wirklich verkauft?</em>
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: 1.65, maxWidth: 460, margin: '0 auto 2.5rem' }}>
          Unverbindlich — einfach ein ehrliches Gespräch über Ihr Projekt und wie wir helfen können.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <a href="mailto:hello@omniadigital.ch" className="btn-accent">
            Kostenloses Gespräch buchen
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </a>
          <a href="mailto:hello@omniadigital.ch?subject=Offerte" className="btn-outline">
            Offerte anfragen
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'var(--color-text-faint)' }}>
          <span>⚡ Antwort innert 24h</span>
          <span>·</span>
          <span>🇨🇭 Team aus der Schweiz</span>
          <span>·</span>
          <span>✓ Keine versteckten Kosten</span>
        </motion.div>
      </div>
    </section>
  )
}
