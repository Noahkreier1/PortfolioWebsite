import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/* V6 — Minimal-Brutalist: roh, hart, ohne Rundungen.
   2px-Linien, Monospace-Metadaten, Marker-Block, Laufband. */

const MONO = "'SF Mono', ui-monospace, Menlo, 'Courier New', monospace"

const snap = {
  hidden: { opacity: 0 },
  show: (i) => ({ opacity: 1, transition: { duration: 0.01, delay: 0.15 + i * 0.09 } }),
}

const MARQUEE_ITEMS = ['WEBDESIGN', 'ENTWICKLUNG', 'CONVERSION-OPTIMIERUNG', 'MARKENIDENTITÄT']

export default function HeroV6() {
  const marqueeText = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((s) => `${s} — `).join('')

  return (
    <section
      className="flex flex-col"
      style={{ minHeight: '100svh', background: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      <style>{`
        @keyframes v6-marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        .v6-cta:hover { background: var(--color-accent) !important; color: var(--color-bg) !important; }
      `}</style>

      {/* Kopfleiste */}
      <motion.header
        variants={snap} custom={0} initial="hidden" animate="show"
        className="flex items-center justify-between px-4 sm:px-6 py-4"
        style={{ borderBottom: '2px solid var(--color-text)' }}
      >
        <Link to="/" style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 800, fontSize: 15, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
          Omnia Digital
        </Link>
        <span className="hidden md:block" style={{ fontFamily: MONO, fontSize: 11, color: 'var(--color-text-muted)' }}>
          WEBAGENTUR — CH-8400 WINTERTHUR
        </span>
        <a href="#contact" className="hover:opacity-60 transition-opacity"
          style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700 }}>
          ERSTGESPRÄCH -&gt;
        </a>
      </motion.header>

      {/* Hauptfläche */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 py-10">
        <motion.div variants={snap} custom={1} initial="hidden" animate="show"
          style={{ fontFamily: MONO, fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 22 }}>
          [FIXPREIS]&nbsp;&nbsp;[1–2 WOCHEN]&nbsp;&nbsp;[20+ PROJEKTE]
        </motion.div>

        <h1
          className="font-display"
          style={{ fontSize: 'clamp(2.9rem, 9.5vw, 9rem)', lineHeight: 0.96, letterSpacing: '-0.035em', margin: 0, textTransform: 'uppercase' }}
        >
          <motion.span variants={snap} custom={2} initial="hidden" animate="show" style={{ display: 'block' }}>
            Wir bauen
          </motion.span>
          <motion.span variants={snap} custom={3} initial="hidden" animate="show" style={{ display: 'block' }}>
            Webseiten, die
          </motion.span>
          <motion.span variants={snap} custom={4} initial="hidden" animate="show" style={{ display: 'inline-block', background: 'var(--color-accent)', color: 'var(--color-bg)', padding: '0 0.12em', marginTop: '0.05em' }}>
            verkaufen.
          </motion.span>
        </h1>

        <motion.div variants={snap} custom={5} initial="hidden" animate="show"
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mt-12"
        >
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.6, color: 'var(--color-text-muted)', maxWidth: 380 }}>
            Individuelles Design und saubere Entwicklung für Schweizer KMU. Kein Baukasten. Kein Agentur-Overhead. Keine Nachträge.
          </p>
          <a
            href="#contact"
            className="v6-cta inline-flex items-center justify-between gap-10 flex-shrink-0"
            style={{
              fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, fontSize: 15, textTransform: 'uppercase',
              background: 'var(--color-text)', color: 'var(--color-bg)',
              padding: '20px 26px', minWidth: 'min(360px, 100%)',
              transition: 'background 0.15s ease, color 0.15s ease',
            }}
          >
            Kostenloses Erstgespräch
            <span aria-hidden="true">-&gt;</span>
          </a>
        </motion.div>
      </div>

      {/* Fussleiste: Koordinaten + Laufband */}
      <motion.div variants={snap} custom={6} initial="hidden" animate="show">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3"
          style={{ borderTop: '2px solid var(--color-text)', fontFamily: MONO, fontSize: 11, color: 'var(--color-text-muted)' }}>
          <span>47.4989° N, 8.7286° E</span>
          <span className="hidden sm:block">HELLO@OMNIADIGITAL.CH</span>
          <span>SCROLL v</span>
        </div>
        <div style={{ borderTop: '2px solid var(--color-text)', overflow: 'hidden', padding: '10px 0', whiteSpace: 'nowrap' }}>
          <div style={{
            display: 'inline-block',
            fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, fontSize: 15, letterSpacing: '0.02em',
            animation: 'v6-marquee 24s linear infinite',
          }}>
            {marqueeText}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
