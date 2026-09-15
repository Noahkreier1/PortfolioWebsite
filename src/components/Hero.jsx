import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

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
  const rotateY = useTransform(springX, [-1, 1], [-3, 3])
  const rotateX = useTransform(springY, [-1, 1], [2, -2])

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
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative mx-auto w-full"
      style={{ maxWidth: 960, perspective: 1600, marginTop: 'clamp(96px, 11vw, 144px)' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="overflow-hidden"
        style={{
          borderRadius: 20,
          background: 'var(--color-bg-soft)',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Chrome bar */}
        <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--color-text-veryfaint)', display: 'inline-block', flexShrink: 0 }} />
          ))}
          <div style={{ flex: 1, maxWidth: 360, height: 28, borderRadius: 999, margin: '0 auto', background: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={active.label}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                style={{ fontSize: 12, color: 'var(--color-text-muted)', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}
              >
                {active.label}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="hidden sm:block" style={{ width: 46, flexShrink: 0 }} />
        </div>

        {/* Screenshot canvas */}
        <div style={{ aspectRatio: '16/9', position: 'relative', overflow: 'hidden', background: 'var(--color-bg-soft)' }}>
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
                objectFit: 'cover',
                objectPosition: 'top center',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Caption — metric per project, then progress dots */}
      <div className="flex flex-col items-center" style={{ marginTop: 40, gap: 24 }}>
        <div style={{ height: 24 }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={active.metric + active.metricLabel}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}
            >
              <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>{active.metric}</span> {active.metricLabel}
            </motion.p>
          </AnimatePresence>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {SHOWCASE.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              aria-label={`Projekt ${i + 1} anzeigen`}
              style={{
                width: i === activeIdx ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === activeIdx ? 'var(--color-accent)' : 'var(--color-text-veryfaint)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.4s cubic-bezier(0.25,0.1,0.25,1), background 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      <div
        className="container-page text-center"
        style={{ paddingTop: 'clamp(160px, 22vh, 224px)', paddingBottom: 'clamp(96px, 11vw, 160px)' }}
      >
        <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto" style={{ maxWidth: 960 }}>

          {/* Eyebrow */}
          <motion.div variants={item} className="flex items-center justify-center gap-3" style={{ marginBottom: 32 }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
            </span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
              Schweizer Webagentur<span className="hidden sm:inline"> · Winterthur ZH</span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-display"
            style={{ fontWeight: 500, lineHeight: 1.08, letterSpacing: '-0.035em', fontSize: 'clamp(2.75rem, 6.6vw, 5.5rem)', color: 'var(--color-text)', marginBottom: 32 }}
          >
            Design that <em className="font-display-italic" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>elevates</em><br className="hidden sm:block" />{' '}
            your digital presence
          </motion.h1>

          {/* Subline */}
          <motion.p
            variants={item}
            className="lead mx-auto"
            style={{ fontSize: 'clamp(1.125rem, 1.6vw, 1.375rem)', maxWidth: 600, marginBottom: 48 }}
          >
            Individuelles Design und saubere Entwicklung für Schweizer KMU: zum garantierten Fixpreis, in ein bis zwei Wochen online.
          </motion.p>

          {/* CTAs — one primary, one quiet text link */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            <a href="#contact" className="btn-accent">
              Kostenloses Erstgespräch
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
            <a href="#work" className="btn-link">
              Referenzen ansehen
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
            </a>
          </motion.div>
        </motion.div>

        <BrowserMockup />
      </div>
    </section>
  )
}

/* Stats as their own quiet chapter — three numbers, nothing else */
export function HeroStats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="stats" className="section" style={{ background: 'var(--color-bg)', paddingTop: 0 }}>
      <div ref={ref} className="container-page">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 sm:gap-8 text-center mx-auto" style={{ maxWidth: 980 }}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="font-display" style={{ fontWeight: 500, fontSize: 'clamp(2.75rem, 5vw, 4rem)', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--color-text)' }}>
                {s.value}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'var(--color-text-muted)', marginTop: 12 }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
