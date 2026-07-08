import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/* V1 — Editorial: Typografie als Hauptgestaltungselement.
   Monumentale, versetzte Zeilen mit Reveal, ein Wort als Kontur. */

const lineReveal = {
  hidden: { y: '110%' },
  show: (i) => ({
    y: '0%',
    transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

function RevealLine({ children, index, style }) {
  return (
    <div style={{ overflow: 'hidden', ...style }}>
      <motion.div variants={lineReveal} custom={index} initial="hidden" animate="show">
        {children}
      </motion.div>
    </div>
  )
}

export default function HeroV1() {
  return (
    <section
      className="relative flex flex-col"
      style={{ minHeight: '100svh', background: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      {/* Top bar */}
      <header className="flex items-center justify-between px-5 sm:px-10 pt-6 sm:pt-8">
        <Link to="/" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, letterSpacing: '-0.01em' }}>
          Omnia<span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}> Digital</span>
        </Link>
        <div className="hidden sm:flex items-center gap-8" style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'var(--color-text-muted)' }}>
          <span>Webagentur · Winterthur ZH</span>
          <a href="mailto:hello@omniadigital.ch" style={{ color: 'var(--color-text)' }} className="hover:opacity-60 transition-opacity">
            hello@omniadigital.ch
          </a>
        </div>
        <a
          href="#contact"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: 'var(--color-text)', borderBottom: '1px solid var(--color-accent)', paddingBottom: 2 }}
          className="hover:opacity-60 transition-opacity"
        >
          Erstgespräch
        </a>
      </header>

      {/* Typo block */}
      <div className="flex-1 flex flex-col justify-center px-5 sm:px-10 py-12">
        <h1
          className="font-display"
          style={{ fontSize: 'clamp(3.2rem, 11.5vw, 12.5rem)', lineHeight: 0.94, letterSpacing: '-0.04em', margin: 0 }}
        >
          <RevealLine index={0}>Wir bauen</RevealLine>
          <RevealLine index={1} style={{ marginLeft: 'clamp(2rem, 12vw, 14rem)' }}>
            Webseiten,
          </RevealLine>
          <RevealLine index={2}>
            die{' '}
            <span
              style={{
                color: 'transparent',
                WebkitTextStroke: '2px var(--color-accent)',
              }}
            >
              verkaufen.
            </span>
          </RevealLine>
        </h1>

        {/* Versetzter Absatz rechts */}
        <div className="flex justify-end mt-10 sm:mt-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: 380, marginRight: 'clamp(0rem, 8vw, 10rem)' }}
          >
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.7, color: 'var(--color-text-muted)', marginBottom: 18 }}>
              Individuelles Design und saubere Entwicklung für Schweizer KMU. Zum garantierten Fixpreis, in ein bis zwei Wochen online.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 hover:gap-5 transition-all duration-300"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: 'var(--color-text)' }}
            >
              Kostenloses Erstgespräch
              <span style={{ display: 'inline-block', width: 42, height: 1, background: 'var(--color-accent)' }} />
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Meta-Fussleiste */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.05 }}
        className="grid grid-cols-2 sm:grid-cols-4 px-5 sm:px-10 pb-6"
        style={{ borderTop: '1px solid var(--color-border)', paddingTop: 18, gap: 12 }}
      >
        {[
          ['20+', 'Projekte umgesetzt'],
          ['1–2 Wochen', 'bis zum Launch'],
          ['Fixpreis', 'garantiert ab Offerte'],
          ['Scroll', 'Referenzen ↓'],
        ].map(([a, b], i) => (
          <div key={i}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: i === 3 ? 'var(--color-accent)' : 'var(--color-text)' }}>{a}</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--color-text-faint)', marginTop: 2 }}>{b}</div>
          </div>
        ))}
      </motion.footer>
    </section>
  )
}
