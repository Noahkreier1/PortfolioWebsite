import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/* V4 — Grid: sichtbares Schweizer Raster als Design-Statement.
   Modulare Zellen mit Hairline-Trennung, gestaffeltes Reveal. */

const cell = {
  hidden: { opacity: 0 },
  show: (i) => ({ opacity: 1, transition: { duration: 0.55, delay: 0.1 + i * 0.07, ease: 'easeOut' } }),
}

function Cell({ i, className = '', style = {}, children }) {
  return (
    <motion.div
      variants={cell}
      custom={i}
      initial="hidden"
      animate="show"
      className={className}
      style={{ background: 'var(--color-bg)', padding: 'clamp(16px, 2.2vw, 30px)', ...style }}
    >
      {children}
    </motion.div>
  )
}

const services = ['Webdesign', 'Entwicklung', 'Conversion', 'Marke']

export default function HeroV4() {
  return (
    <section
      className="flex flex-col justify-center"
      style={{ minHeight: '100svh', background: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      <div
        className="grid grid-cols-2 lg:grid-cols-12"
        style={{ gap: 1, background: 'var(--color-border)', border: '1px solid var(--color-border)', margin: 'clamp(10px, 1.6vw, 24px)', gridAutoRows: 'min-content' }}
      >
        {/* Zeile 1 — Kopf */}
        <Cell i={0} className="col-span-1 lg:col-span-3 flex items-center">
          <Link to="/" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14 }}>
            Omnia<span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}> Digital</span>
          </Link>
        </Cell>
        <Cell i={1} className="hidden lg:flex lg:col-span-6 items-center">
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
            Schweizer Webagentur · Winterthur ZH
          </span>
        </Cell>
        <Cell i={2} className="col-span-1 lg:col-span-3 flex items-center justify-end">
          <a href="#contact" className="hover:opacity-60 transition-opacity"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, borderBottom: '1px solid var(--color-accent)', paddingBottom: 2 }}>
            Erstgespräch
          </a>
        </Cell>

        {/* Zeile 2 — Headline + Kennzahlen */}
        <Cell i={3} className="col-span-2 lg:col-span-9 flex flex-col justify-between" style={{ minHeight: 'clamp(280px, 42vh, 460px)' }}>
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              className="font-display"
              initial={{ y: '106%' }} animate={{ y: 0 }}
              transition={{ duration: 0.95, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(2.6rem, 7vw, 7rem)', lineHeight: 0.98, letterSpacing: '-0.04em', margin: 0 }}
            >
              Design that<br /><span style={{ color: 'var(--color-accent)' }}>elevates</span> your<br />digital presence
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.9 }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.65, color: 'var(--color-text-muted)', maxWidth: 400, marginTop: 24 }}
          >
            Individuelles Design und saubere Entwicklung für Schweizer KMU. Kein Baukasten, kein Agentur-Overhead.
          </motion.p>
        </Cell>

        <div className="col-span-2 lg:col-span-3 grid" style={{ gap: 1 }}>
          {[
            ['20+', 'Projekte umgesetzt'],
            ['1–2', 'Wochen bis zum Launch'],
            ['Fix', 'Preis garantiert ab Offerte'],
          ].map(([big, small], idx) => (
            <Cell i={4 + idx} key={small} className="flex flex-col justify-center">
              <div className="font-display" style={{ fontSize: 'clamp(2rem, 3.4vw, 3.2rem)', letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--color-accent)' }}>
                {big}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'var(--color-text-muted)', marginTop: 6 }}>{small}</div>
            </Cell>
          ))}
        </div>

        {/* Zeile 3 — Leistungen + CTA */}
        {services.map((s, idx) => (
          <Cell i={7 + idx} key={s} className={`col-span-1 lg:col-span-2 ${idx > 1 ? 'hidden sm:block' : ''}`}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--color-text-faint)', marginBottom: 8 }}>0{idx + 1}</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600 }}>{s}</div>
          </Cell>
        ))}
        <Cell i={11} className="col-span-2 lg:col-span-4 flex items-center justify-between" style={{ background: 'var(--color-accent)' }}>
          <a href="#contact" className="flex items-center justify-between w-full group" style={{ color: 'var(--color-bg)', textDecoration: 'none' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700 }}>Kostenloses Erstgespräch</span>
            <svg className="transition-transform duration-300 group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </Cell>
      </div>
    </section>
  )
}
