import { useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

/* Interaktiver Vorher/Nachher-Vergleich — Slider per Maus/Touch ziehen */
function CompareSlider({ before, after, altBefore, altAfter }) {
  const containerRef = useRef(null)
  const [pos, setPos] = useState(50)
  const draggingRef = useRef(false)

  const updateFromClientX = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(96, Math.max(4, pct)))
  }, [])

  const onPointerDown = (e) => {
    draggingRef.current = true
    e.currentTarget.setPointerCapture?.(e.pointerId)
    updateFromClientX(e.clientX)
  }
  const onPointerMove = (e) => {
    if (!draggingRef.current) return
    updateFromClientX(e.clientX)
  }
  const stopDragging = () => { draggingRef.current = false }

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      className="relative w-full select-none overflow-hidden"
      style={{
        aspectRatio: '16/9',
        borderRadius: 20,
        touchAction: 'none',
        background: 'var(--color-surface-2)',
      }}
    >
      {/* Nachher (volle Breite, darunter) */}
      <img
        src={after}
        alt={altAfter}
        draggable="false"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top left' }}
      />

      {/* Vorher (oben, per clip-path beschnitten) */}
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={before}
          alt={altBefore}
          draggable="false"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top left' }}
        />
      </div>

      {/* Trennlinie + Griff */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${pos}%`, width: 2, background: 'var(--color-accent)', transform: 'translateX(-1px)' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 40, height: 40, borderRadius: '50%',
          background: 'var(--color-accent)', color: 'var(--color-bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2,
        }}>
          <svg width="9" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M15 18l-6-6 6-6" /></svg>
          <svg width="9" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6" /></svg>
        </div>
      </div>

      {/* Labels */}
      <span style={{ position: 'absolute', top: 12, left: 12, fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '5px 10px', borderRadius: 6, background: 'rgba(10,10,10,0.65)', color: '#EDE7DC', backdropFilter: 'blur(4px)', pointerEvents: 'none', opacity: pos > 18 ? 1 : 0, transition: 'opacity 0.25s ease' }}>
        Vorher
      </span>
      <span style={{ position: 'absolute', top: 12, right: 12, fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '5px 10px', borderRadius: 6, background: 'var(--color-accent)', color: 'var(--color-bg)', pointerEvents: 'none', opacity: pos < 82 ? 1 : 0, transition: 'opacity 0.25s ease' }}>
        Nachher
      </span>
    </div>
  )
}

const HIGHLIGHTS = [
  'Klare Positionierung und Ticket-Fokus statt austauschbarem Template',
  'Komplett neues Design, Struktur und Texte',
  'Konzept bis Launch aus einer Hand',
]

/* Case Study als eigenes Kapitel: Kopf zentriert, Slider gross und freigestellt, Highlights darunter */
export default function BeforeAfter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="case" className="section" style={{ background: 'var(--color-bg)' }}>
      <div ref={ref} className="container-page">

        <div className="section-head">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }} className="section-label">Case Study</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display h-section">
            InspireDay: vom Template zum <em className="font-display-italic" style={{ fontWeight: 500, color: 'var(--color-accent)' }}>Verkaufsauftritt.</em>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }} className="lead">
            Konferenz für Persönlichkeitsentwicklung in Zürich. Die alte Seite erklärte wenig und verkaufte kaum Tickets. Wir haben Positionierung, Design und Struktur neu aufgebaut.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto"
          style={{ maxWidth: 980 }}
        >
          <CompareSlider
            before="/before-after/inspireday-before.jpg"
            after="/before-after/inspireday-after.jpg"
            altBefore="InspireDay Webseite vor dem Redesign"
            altAfter="InspireDay Webseite nach dem Redesign durch Omnia Digital"
          />
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'var(--color-text-faint)', marginTop: 24, textAlign: 'center' }}>
            Regler ziehen und vergleichen
          </p>
        </motion.div>

        <ul
          className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mx-auto"
          style={{ listStyle: 'none', padding: 0, maxWidth: 980, marginTop: 'clamp(96px, 10vw, 128px)' }}
        >
          {HIGHLIGHTS.map((h) => (
            <li key={h} style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-accent)', margin: '0 auto 16px', display: 'block' }}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {h}
            </li>
          ))}
        </ul>

        <div className="text-center" style={{ marginTop: 64 }}>
          <a href="https://www.inspireday.ch" target="_blank" rel="noopener noreferrer" className="btn-link">
            inspireday.ch live ansehen
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </a>
        </div>
      </div>
    </section>
  )
}
