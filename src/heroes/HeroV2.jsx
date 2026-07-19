import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/* V2 — Cinematic: dunkle Bühne, invertierte Matterhorn-Zeichnung als Backdrop,
   Text wie Film-Credits in den Ecken. Bewusst immer dunkel, unabhängig vom Theme. */

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")"

const credit = {
  hidden: { opacity: 0, y: 8 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.9 + i * 0.15 } }),
}

export default function HeroV2() {
  return (
    <section
      className="relative overflow-hidden flex flex-col"
      style={{ minHeight: '100svh', background: '#0A0908', color: '#EDE7DC' }}
    >
      {/* Matterhorn — invertierte Zeichnung, langsame Drift */}
      <motion.img
        src="/matterhorn.png"
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ opacity: { duration: 2, ease: 'easeOut' }, scale: { duration: 22, ease: 'linear' } }}
        style={{
          position: 'absolute',
          right: '-8%',
          bottom: '-4%',
          width: 'min(75vw, 980px)',
          filter: 'invert(1) contrast(1.1)',
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
      />
      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 90% 70% at 30% 45%, transparent 0%, rgba(10,9,8,0.55) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,9,8,0.4) 0%, transparent 30%, transparent 60%, rgba(10,9,8,0.6) 100%)' }} />
      {/* Filmkorn */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: NOISE, opacity: 0.07, pointerEvents: 'none', mixBlendMode: 'overlay' }} />

      {/* Credits — obere Ecken */}
      <header className="relative z-10 flex items-start justify-between px-5 sm:px-10 pt-6 sm:pt-8">
        <Link to="/" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, color: '#EDE7DC' }}>
          Omnia<span style={{ opacity: 0.55, fontWeight: 400 }}> Digital</span>
        </Link>
        <motion.div variants={credit} custom={0} initial="hidden" animate="show"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.7, textAlign: 'right', lineHeight: 1.8 }}>
          Webagentur<br />Winterthur ZH
        </motion.div>
      </header>

      <div className="relative z-10 flex-1" />

      {/* Headline unten links, CTA unten rechts */}
      <div className="relative z-10 px-5 sm:px-10 pb-8 sm:pb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
        <div style={{ maxWidth: 820 }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 18 }}
          >
            Design &amp; Entwicklung für Schweizer KMU
          </motion.p>
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              className="font-display"
              initial={{ y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)', lineHeight: 1.0, letterSpacing: '-0.04em', margin: 0 }}
            >
              Design that <span style={{ color: '#C4A46A' }}>elevates</span><br />your digital presence
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.65, opacity: 0.7, maxWidth: 420, marginTop: 20 }}
          >
            Individuell entworfen, von Hand entwickelt. Zum Fixpreis, online in ein bis zwei Wochen.
          </motion.p>
        </div>

        <motion.div variants={credit} custom={1} initial="hidden" animate="show" className="flex flex-col items-start sm:items-end gap-4 flex-shrink-0">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 hover:gap-5 transition-all duration-300"
            style={{
              fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: '#0A0908',
              background: '#EDE7DC', borderRadius: 999, padding: '14px 26px',
            }}
          >
            Kostenloses Erstgespräch
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </a>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, opacity: 0.55 }}>
            20+ Projekte · Fixpreis · Antwort innert 24h
          </span>
        </motion.div>
      </div>
    </section>
  )
}
