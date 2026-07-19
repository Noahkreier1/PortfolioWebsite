import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/* V5 — Kinetic Typography: die Schrift selbst ist die Interaktion.
   Buchstaben reagieren auf Cursor-Nähe mit ihrem variablen Schriftgewicht;
   auf Touch-Geräten läuft eine autonome Gewichts-Welle. */

const LINES = ['Design that', 'elevates your', 'digital presence']
const BASE_W = 520
const MAX_W = 800
const RADIUS = 260

function KineticLine({ text, lineIdx }) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay: 0.15 + lineIdx * 0.13, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginLeft: lineIdx === 1 ? 'clamp(1.5rem, 7vw, 8rem)' : 0 }}
      >
        {text.split('').map((ch, i) => (
          <span
            key={i}
            data-kinetic=""
            style={{
              display: 'inline-block',
              whiteSpace: 'pre',
              fontVariationSettings: `'wght' ${BASE_W}`,
              transition: 'font-variation-settings 0.35s cubic-bezier(0.22, 1, 0.36, 1), color 0.35s ease',
              color: lineIdx === 1 && i <= 7 ? 'var(--color-accent)' : 'inherit',
            }}
          >
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function HeroV5() {
  const sectionRef = useRef(null)
  const centersRef = useRef([])
  const rafRef = useRef(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const letters = Array.from(section.querySelectorAll('[data-kinetic]'))

    const measure = () => {
      centersRef.current = letters.map((el) => {
        const r = el.getBoundingClientRect()
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
      })
    }
    const measureTimer = setTimeout(measure, 700)
    window.addEventListener('resize', measure)

    const isTouch = window.matchMedia('(pointer: coarse)').matches
    let cleanupMode = () => {}

    if (!isTouch) {
      let pending = false
      const onMove = (e) => {
        if (pending) return
        pending = true
        rafRef.current = requestAnimationFrame(() => {
          pending = false
          const cs = centersRef.current
          letters.forEach((el, i) => {
            const c = cs[i]
            if (!c) return
            const d = Math.hypot(e.clientX - c.x, e.clientY - c.y)
            const t = Math.max(0, 1 - d / RADIUS)
            const w = Math.round(BASE_W + (MAX_W - BASE_W) * t * t)
            el.style.fontVariationSettings = `'wght' ${w}`
          })
        })
      }
      const onLeave = () => {
        letters.forEach((el) => { el.style.fontVariationSettings = `'wght' ${BASE_W}` })
      }
      section.addEventListener('mousemove', onMove)
      section.addEventListener('mouseleave', onLeave)
      cleanupMode = () => {
        section.removeEventListener('mousemove', onMove)
        section.removeEventListener('mouseleave', onLeave)
      }
    } else {
      // Autonome Welle
      let phase = 0
      const id = setInterval(() => {
        phase += 0.55
        letters.forEach((el, i) => {
          const w = Math.round(BASE_W + 150 * (Math.sin(phase - i * 0.45) * 0.5 + 0.5))
          el.style.fontVariationSettings = `'wght' ${w}`
        })
      }, 90)
      cleanupMode = () => clearInterval(id)
    }

    return () => {
      clearTimeout(measureTimer)
      window.removeEventListener('resize', measure)
      cancelAnimationFrame(rafRef.current)
      cleanupMode()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
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

      <div className="flex-1 flex flex-col justify-center px-5 sm:px-10">
        <h1
          className="font-display"
          style={{ fontSize: 'clamp(2.6rem, 8.5vw, 8.5rem)', lineHeight: 0.98, letterSpacing: '-0.04em', margin: 0, userSelect: 'none' }}
        >
          {LINES.map((l, i) => <KineticLine key={l} text={l} lineIdx={i} />)}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-10 mt-10 sm:mt-14"
        >
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.65, color: 'var(--color-text-muted)', maxWidth: 380 }}>
            Individuelles Design und saubere Entwicklung für Schweizer KMU — zum Fixpreis, online in 1–2 Wochen.
          </p>
          <a href="#contact"
            className="inline-flex items-center gap-3 hover:gap-5 transition-all duration-300 flex-shrink-0"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600 }}>
            Kostenloses Erstgespräch
            <span style={{ width: 42, height: 1, background: 'var(--color-accent)', display: 'inline-block' }} />
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </motion.div>
      </div>

      <motion.footer
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
        className="flex items-center justify-between px-5 sm:px-10 pb-6"
        style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--color-text-faint)' }}
      >
        <span>20+ Projekte · Fixpreis ab Offerte</span>
        <span className="hidden sm:block">Bewegen Sie die Maus über die Schrift</span>
        <span>Scroll ↓</span>
      </motion.footer>
    </section>
  )
}
