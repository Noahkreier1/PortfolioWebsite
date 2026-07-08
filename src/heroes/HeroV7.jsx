import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'

/* V7 — Depth/Layering: drei Ebenen trennen sich beim Scrollen mit
   unterschiedlichen Geschwindigkeiten, dazu subtiles Maus-Parallax. */

export default function HeroV7() {
  const wrapRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] })

  // Scroll-Ebenen
  const backY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const backOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.25])
  const midY = useTransform(scrollYProgress, [0, 1], ['0%', '-16%'])
  const midScale = useTransform(scrollYProgress, [0, 1], [1, 0.88])
  const frontY = useTransform(scrollYProgress, [0, 1], ['0%', '-58%'])

  // Maus-Parallax (Desktop; auf Touch bewegt sich schlicht nichts)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 60, damping: 20 })
  const smy = useSpring(my, { stiffness: 60, damping: 20 })
  const backMX = useTransform(smx, [-1, 1], [14, -14])
  const backMY = useTransform(smy, [-1, 1], [10, -10])
  const midMX = useTransform(smx, [-1, 1], [-10, 10])
  const midMY = useTransform(smy, [-1, 1], [-7, 7])

  const onMouseMove = (e) => {
    mx.set((e.clientX / window.innerWidth) * 2 - 1)
    my.set((e.clientY / window.innerHeight) * 2 - 1)
  }

  return (
    <div ref={wrapRef} style={{ height: '260vh', background: 'var(--color-bg)' }}>
      <section
        onMouseMove={onMouseMove}
        className="sticky top-0 overflow-hidden flex flex-col"
        style={{ height: '100svh', color: 'var(--color-text)' }}
      >
        {/* Ebene 0 — Riesiges Konturwort, hinterste Schicht */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ y: backY, opacity: backOpacity }}
        >
          <motion.span
            className="font-display"
            style={{
              x: backMX, y: backMY,
              fontSize: 'clamp(6rem, 24vw, 24rem)',
              letterSpacing: '-0.03em',
              color: 'transparent',
              WebkitTextStroke: '1.5px var(--color-border-strong)',
              whiteSpace: 'nowrap',
            }}
          >
            OMNIA
          </motion.span>
        </motion.div>

        {/* Kopfleiste */}
        <header className="relative z-30 flex items-center justify-between px-5 sm:px-10 pt-6 sm:pt-8">
          <Link to="/" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14 }}>
            Omnia<span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}> Digital</span>
          </Link>
          <a href="#contact" className="hover:opacity-60 transition-opacity"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, borderBottom: '1px solid var(--color-accent)', paddingBottom: 2 }}>
            Erstgespräch
          </a>
        </header>

        {/* Ebene 1 — Referenz im Browser-Frame, mittlere Schicht */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ y: midY, scale: midScale, zIndex: 10 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              x: midMX, y: midMY,
              width: 'min(78vw, 860px)',
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid var(--color-border-strong)',
              boxShadow: 'var(--shadow-soft)',
              background: 'var(--color-surface)',
              transform: 'translateY(6%)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '10px 14px', borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-2)' }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-border-strong)' }} />
              ))}
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'var(--color-text-muted)', marginLeft: 8 }}>inspireday.ch — Referenz</span>
            </div>
            <img
              src="/before-after/inspireday-after.jpg"
              alt="Referenzprojekt InspireDay"
              style={{ display: 'block', width: '100%', aspectRatio: '16/8.2', objectFit: 'cover', objectPosition: 'top' }}
            />
          </motion.div>
        </motion.div>

        {/* Ebene 2 — Headline, vorderste Schicht */}
        <motion.div
          className="relative z-20 flex-1 flex flex-col justify-end px-5 sm:px-10 pb-14 pointer-events-none"
          style={{ y: frontY }}
        >
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              className="font-display"
              initial={{ y: '105%' }} animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: 'clamp(2.8rem, 7.5vw, 7rem)', lineHeight: 0.98, letterSpacing: '-0.04em', margin: 0,
                textShadow: '0 2px 24px var(--color-bg), 0 0 8px var(--color-bg)',
              }}
            >
              Webseiten,<br />die <span style={{ color: 'var(--color-accent)' }}>verkaufen.</span>
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mt-6 pointer-events-auto"
          >
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.6, color: 'var(--color-text-muted)', maxWidth: 380, textShadow: '0 1px 12px var(--color-bg)' }}>
              Design und Entwicklung für Schweizer KMU. Fixpreis, online in 1–2 Wochen.
            </p>
            <a href="#contact" className="btn-accent" style={{ fontSize: 13, padding: '13px 24px', flexShrink: 0, alignSelf: 'flex-start' }}>
              Kostenloses Erstgespräch
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll-Hinweis */}
        <motion.div
          className="absolute bottom-5 right-5 sm:right-10 z-30"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--color-text-faint)', letterSpacing: '0.14em', textTransform: 'uppercase' }}
        >
          Scrollen ↓
        </motion.div>
      </section>
    </div>
  )
}
