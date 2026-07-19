import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

const STATS = [
  { value: '20+', label: 'Projekte umgesetzt' },
  { value: '1–2 Wo.', label: 'bis zum Launch' },
  { value: 'Fixpreis', label: 'ab Offerte garantiert' },
]

const SHOWCASE = [
  {
    url: 'https://www.inspireday.ch',
    label: 'inspireday.ch',
    metric: '+147%',
    metricLabel: 'Conversion-Steigerung',
  },
  {
    url: 'https://hikebeast.ch/map/',
    label: 'hikebeast.ch',
    metric: '342',
    metricLabel: 'Sales / Monat',
  },
  {
    url: 'https://andrea-silk.vercel.app',
    label: 'andrea-silk.vercel.app',
    metric: '98',
    metricLabel: 'Lighthouse-Score',
  },
  {
    url: 'https://www.driven-co.ch',
    label: 'driven-co.ch',
    metric: '+212%',
    metricLabel: 'Engagement',
  },
]

const shotUrl = (url) => `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1280&h=720`

function BrowserMockup() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  // Preload all screenshots once on mount so transitions are instant
  useEffect(() => {
    SHOWCASE.forEach((item) => {
      const img = new Image()
      img.src = shotUrl(item.url)
    })
  }, [])

  // Auto-rotate every 4 seconds unless hovered
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % SHOWCASE.length)
    }, 4000)
    return () => clearInterval(id)
  }, [paused])

  // 3D parallax tilt — subtle springy follow
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 200, damping: 22 })
  const springY = useSpring(mouseY, { stiffness: 200, damping: 22 })
  const rotateY = useTransform(springX, [-1, 1], [-7, 7])
  const rotateX = useTransform(springY, [-1, 1], [5, -5])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    mouseX.set(px * 2 - 1)
    mouseY.set(py * 2 - 1)
  }
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setPaused(false)
  }
  const handleMouseEnter = () => setPaused(true)

  const active = SHOWCASE[activeIdx]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative hidden lg:block w-[360px] flex-shrink-0"
      style={{ perspective: 1400 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="rounded-xl overflow-hidden"
        style={{
          border: '1px solid var(--color-border-strong)',
          background: 'var(--color-surface)',
          boxShadow: 'var(--shadow-soft)',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Chrome bar */}
        <div style={{ background: 'var(--color-surface-2)', padding: '10px 14px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 5 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-border-strong)', display: 'inline-block' }} />
          ))}
          <div style={{ flex: 1, height: 22, borderRadius: 4, marginLeft: 10, background: 'var(--color-bg-soft)', display: 'flex', alignItems: 'center', paddingLeft: 9, overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={active.label}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                style={{ fontSize: 10, color: 'var(--color-text-muted)', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}
              >
                {active.label}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Screenshot canvas */}
        <div style={{ height: 260, position: 'relative', overflow: 'hidden', background: 'var(--color-bg-soft)' }}>
          {SHOWCASE.map((p, i) => (
            <motion.img
              key={p.url}
              src={shotUrl(p.url)}
              alt=""
              aria-hidden="true"
              animate={{ opacity: i === activeIdx ? 1 : 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'top center',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating metric badge — animates per project */}
      <div style={{ position: 'absolute', bottom: -16, left: -18 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active.metric + active.metricLabel}
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border-strong)',
              borderRadius: 12,
              padding: '12px 16px',
              boxShadow: 'var(--shadow-card)',
              minWidth: 140,
            }}
          >
            <div style={{ color: 'var(--color-accent)', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 20, lineHeight: 1 }}>
              {active.metric}
            </div>
            <div style={{ color: 'var(--color-text-muted)', fontFamily: 'Inter, sans-serif', fontSize: 10, marginTop: 4, letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
              {active.metricLabel}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots — click to jump */}
      <div style={{ position: 'absolute', bottom: -34, right: 4, display: 'flex', gap: 6, alignItems: 'center' }}>
        {SHOWCASE.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            aria-label={`Projekt ${i + 1} anzeigen`}
            style={{
              width: i === activeIdx ? 22 : 6,
              height: 6,
              borderRadius: 3,
              background: i === activeIdx ? 'var(--color-accent)' : 'var(--color-border-strong)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'width 0.4s cubic-bezier(0.25,0.1,0.25,1), background 0.3s ease',
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Swiss cross watermark */}
      <div className="absolute right-[6%] top-[10%] pointer-events-none select-none hidden lg:block" style={{ opacity: 0.05 }}>
        <svg width="420" height="420" viewBox="0 0 420 420">
          <rect x="147" y="52" width="126" height="316" rx="12" fill="currentColor" style={{ color: 'var(--color-text)' }} />
          <rect x="52" y="147" width="316" height="126" rx="12" fill="currentColor" style={{ color: 'var(--color-text)' }} />
        </svg>
      </div>

      {/* Ambient glow */}
      <div className="absolute top-0 right-0 pointer-events-none" style={{ width: 480, height: 480, background: 'radial-gradient(circle at 70% 25%, var(--color-accent-glow) 0%, transparent 65%)' }} />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center max-w-6xl mx-auto px-5 sm:px-6 w-full pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="w-full flex items-center justify-between gap-12">

          {/* Text */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[600px] w-full">

            {/* Badge */}
            <motion.div variants={item} className="flex items-center gap-2.5 mb-7">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
              </span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                Schweizer Webagentur · Winterthur ZH
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="font-display"
              style={{ fontWeight: 500, lineHeight: 1.02, letterSpacing: '-0.035em', fontSize: 'clamp(2rem, 5.6vw, 4.6rem)', color: 'var(--color-text)', marginBottom: '1.25rem' }}
            >
              Design that <em className="font-display-italic" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>elevates</em><br />
              your digital presence
            </motion.h1>

            {/* Subline */}
            <motion.p
              variants={item}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: 1.65, maxWidth: 460, marginBottom: '2.5rem' }}
            >
              Individuelles Design und saubere Entwicklung für Schweizer KMU: zum garantierten Fixpreis, in ein bis zwei Wochen online. Kein Baukasten, kein Agentur-Overhead.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-3 mb-10">
              <a href="#contact" className="btn-accent">
                Kostenloses Erstgespräch
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
              <a href="#work" className="btn-outline">Referenzen ansehen</a>
            </motion.div>

            {/* Inline stats */}
            <motion.div variants={item} className="flex items-center gap-x-5 gap-y-3 flex-wrap">
              {STATS.map((s, i) => (
                <div key={i} className="flex items-center gap-x-5">
                  {i > 0 && <div className="hidden sm:block w-px h-7 bg-border" />}
                  <div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text)', lineHeight: 1.1 }}>{s.value}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--color-text-muted)', marginTop: 2 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <BrowserMockup />
        </div>
      </div>

      {/* Bottom border */}
      <div className="h-px w-full flex-shrink-0" style={{ background: 'var(--color-border)' }} />
    </section>
  )
}
