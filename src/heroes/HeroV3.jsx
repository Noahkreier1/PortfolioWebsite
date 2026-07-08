import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'

/* V3 — Interaktiv: Projektliste als Herzstück, Live-Vorschau folgt dem Cursor.
   Auf Touch-Geräten: statische Thumbnails statt Cursor-Follow. */

const projects = [
  { name: 'InspireDay', category: 'Event · Zürich', url: 'https://www.inspireday.ch' },
  { name: 'Hikebeast', category: 'Outdoor · Interaktive Karte', url: 'https://hikebeast.ch/map/' },
  { name: 'Andrea Silk', category: 'Coaching · Zürich', url: 'https://andrea-silk.vercel.app' },
  { name: 'Driven Co.', category: 'E-Commerce · Streetwear', url: 'https://www.driven-co.ch' },
]

const shotUrl = (url) => `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=800&h=500`

export default function HeroV3() {
  const [hovered, setHovered] = useState(null)
  const [isTouch, setIsTouch] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 260, damping: 28, mass: 0.6 })
  const py = useSpring(my, { stiffness: 260, damping: 28, mass: 0.6 })

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
    projects.forEach((p) => { const img = new Image(); img.src = shotUrl(p.url) })
  }, [])

  const onMouseMove = (e) => { mx.set(e.clientX); my.set(e.clientY) }

  return (
    <section
      onMouseMove={onMouseMove}
      className="relative flex flex-col"
      style={{ minHeight: '100svh', background: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      {/* Top bar */}
      <header className="flex items-center justify-between px-5 sm:px-10 pt-6 sm:pt-8">
        <Link to="/" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14 }}>
          Omnia<span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}> Digital</span>
        </Link>
        <a
          href="#contact"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, borderBottom: '1px solid var(--color-accent)', paddingBottom: 2 }}
          className="hover:opacity-60 transition-opacity"
        >
          Kostenloses Erstgespräch
        </a>
      </header>

      {/* Statement */}
      <div className="px-5 sm:px-10 pt-12 sm:pt-16 pb-8 sm:pb-10">
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 14 }}
        >
          Schweizer Webagentur · Winterthur ZH
        </motion.p>
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            className="font-display"
            initial={{ y: '105%' }} animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.6rem)', lineHeight: 1.02, letterSpacing: '-0.035em', margin: 0, maxWidth: 900 }}
          >
            Wir bauen Webseiten, die <span style={{ color: 'var(--color-accent)' }}>verkaufen</span> — zum Fixpreis, in 1–2 Wochen.
          </motion.h1>
        </div>
      </div>

      {/* Projektliste */}
      <div className="flex-1 px-5 sm:px-10 pb-10">
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-faint)', marginBottom: 4 }}
        >
          Ausgewählte Referenzen
        </motion.p>
        {projects.map((p, i) => (
          <motion.a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="group flex items-center justify-between gap-4 py-5 sm:py-6"
            style={{ borderTop: '1px solid var(--color-border)', textDecoration: 'none', color: 'inherit' }}
          >
            <div className="flex items-center gap-5 sm:gap-8 min-w-0">
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'var(--color-text-faint)', fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>
                0{i + 1}
              </span>
              {isTouch && (
                <img
                  src={shotUrl(p.url)}
                  alt=""
                  loading="lazy"
                  style={{ width: 86, height: 54, objectFit: 'cover', objectPosition: 'top', borderRadius: 6, border: '1px solid var(--color-border)', flexShrink: 0 }}
                />
              )}
              <span
                className="font-display transition-all duration-300 group-hover:translate-x-2"
                style={{
                  fontSize: 'clamp(1.7rem, 4.5vw, 3.4rem)', letterSpacing: '-0.03em', lineHeight: 1.05,
                  color: hovered === null || hovered === i ? 'var(--color-text)' : 'var(--color-text-subtle)',
                  transition: 'color 0.3s ease, transform 0.3s ease',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}
              >
                {p.name}
              </span>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <span className="hidden sm:block" style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'var(--color-text-muted)' }}>
                {p.category}
              </span>
              <svg
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>
          </motion.a>
        ))}
        <div style={{ borderTop: '1px solid var(--color-border)' }} />
      </div>

      {/* Cursor-Preview (nur Desktop) */}
      {!isTouch && (
        <motion.div
          style={{
            position: 'fixed', left: 0, top: 0, x: px, y: py,
            translateX: '-50%', translateY: '-110%',
            pointerEvents: 'none', zIndex: 40,
            width: 300, height: 188,
            borderRadius: 10, overflow: 'hidden',
            border: '1px solid var(--color-border-strong)',
            boxShadow: 'var(--shadow-card)',
            background: 'var(--color-surface)',
            opacity: hovered !== null ? 1 : 0,
            scale: hovered !== null ? 1 : 0.9,
            transition: 'opacity 0.25s ease, scale 0.25s ease',
          }}
        >
          {projects.map((p, i) => (
            <img
              key={p.name}
              src={shotUrl(p.url)}
              alt=""
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'top',
                opacity: hovered === i ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
            />
          ))}
        </motion.div>
      )}
    </section>
  )
}
