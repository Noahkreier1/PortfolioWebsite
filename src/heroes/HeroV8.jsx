import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/* V8 — Bild-Text-Verwebung: ein Bildfenster lebt in der Headline
   und blättert durch die Referenzen. */

const projects = [
  { label: 'inspireday.ch', url: 'https://www.inspireday.ch' },
  { label: 'hikebeast.ch', url: 'https://hikebeast.ch/map/' },
  { label: 'andrea-silk', url: 'https://andrea-silk.vercel.app' },
  { label: 'driven-co.ch', url: 'https://www.driven-co.ch' },
]

const shotUrl = (url) => `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=800&h=500`

function InlineWindow() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    projects.forEach((p) => { const img = new Image(); img.src = shotUrl(p.url) })
    const id = setInterval(() => setIdx((i) => (i + 1) % projects.length), 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.a
      href="/#work"
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 'clamp(90px, 16vw, 230px)', opacity: 1 }}
      transition={{ duration: 1.1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
      className="group"
      style={{
        display: 'inline-block',
        height: '0.78em',
        borderRadius: 'clamp(8px, 1vw, 14px)',
        overflow: 'hidden',
        position: 'relative',
        verticalAlign: 'baseline',
        transform: 'translateY(0.1em)',
        margin: '0 0.06em',
        border: '1px solid var(--color-border-strong)',
        background: 'var(--color-surface-2)',
      }}
    >
      {projects.map((p, i) => (
        <img
          key={p.label}
          src={shotUrl(p.url)}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top',
            opacity: idx === i ? 1 : 0,
            transform: idx === i ? 'scale(1)' : 'scale(1.06)',
            transition: 'opacity 0.6s ease, transform 0.9s ease',
          }}
        />
      ))}
      <span
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(10,9,8,0.45)', color: '#EDE7DC',
          fontFamily: 'Inter, sans-serif', fontSize: 'clamp(9px, 0.8vw, 12px)', fontWeight: 600, letterSpacing: '0.08em',
        }}
      >
        {projects[idx].label} ↗
      </span>
    </motion.a>
  )
}

const lineIn = (delay) => ({
  initial: { y: '108%' },
  animate: { y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function HeroV8() {
  return (
    <section
      className="relative flex flex-col"
      style={{ minHeight: '100svh', background: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      <header className="flex items-center justify-between px-5 sm:px-10 pt-6 sm:pt-8">
        <Link to="/" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14 }}>
          Omnia<span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}> Digital</span>
        </Link>
        <span className="hidden sm:block" style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'var(--color-text-muted)' }}>
          Schweizer Webagentur · Winterthur ZH
        </span>
        <a href="#contact" className="hover:opacity-60 transition-opacity"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, borderBottom: '1px solid var(--color-accent)', paddingBottom: 2 }}>
          Erstgespräch
        </a>
      </header>

      <div className="flex-1 flex flex-col justify-center px-5 sm:px-10 py-12">
        <h1
          className="font-display"
          style={{ fontSize: 'clamp(2.9rem, 9vw, 9rem)', lineHeight: 1.02, letterSpacing: '-0.04em', margin: 0 }}
        >
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <motion.span {...lineIn(0.15)} style={{ display: 'block' }}>Wir bauen</motion.span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em' }}>
            <motion.span {...lineIn(0.28)} style={{ display: 'block' }}>
              Webseiten, <InlineWindow /> die
            </motion.span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <motion.span {...lineIn(0.41)} style={{ display: 'block' }}>
              <span style={{ color: 'var(--color-accent)' }}>verkaufen.</span>
            </motion.span>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-12"
        >
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.65, color: 'var(--color-text-muted)', maxWidth: 400 }}>
            Individuelles Design und saubere Entwicklung für Schweizer KMU — zum Fixpreis, online in ein bis zwei Wochen.
          </p>
          <div className="flex items-center gap-6 flex-shrink-0">
            <span className="hidden md:block" style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'var(--color-text-faint)' }}>
              20+ Projekte · Antwort innert 24h
            </span>
            <a href="#contact" className="btn-accent" style={{ fontSize: 13, padding: '14px 26px' }}>
              Kostenloses Erstgespräch
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
