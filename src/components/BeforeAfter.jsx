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
      className="relative w-full select-none overflow-hidden rounded-xl"
      style={{
        aspectRatio: '16/9',
        border: '1px solid var(--color-border-strong)',
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
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${pos}%`, width: 2, background: 'var(--color-accent)', transform: 'translateX(-1px)', boxShadow: '0 0 12px rgba(0,0,0,0.35)' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 38, height: 38, borderRadius: '50%',
          background: 'var(--color-accent)', color: 'var(--color-bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2,
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
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

export default function BeforeAfter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="mb-14">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">

        {/* Slider — nimmt den grösseren Teil ein */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="lg:col-span-3"
        >
          <CompareSlider
            before="/before-after/inspireday-before.jpg"
            after="/before-after/inspireday-after.jpg"
            altBefore="InspireDay Webseite vor dem Redesign"
            altAfter="InspireDay Webseite nach dem Redesign durch Omnia Digital"
          />
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--color-text-faint)', marginTop: 10, textAlign: 'center' }}>
            Regler ziehen und vergleichen
          </p>
        </motion.div>

        {/* Kontext */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-2"
        >
          <p className="section-label mb-3">Case Study</p>
          <h3 className="font-display" style={{ fontWeight: 500, fontSize: 'clamp(1.5rem, 2.6vw, 2rem)', color: 'var(--color-text)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 12 }}>
            InspireDay: vom Template zum <em className="font-display-italic" style={{ fontWeight: 500, color: 'var(--color-accent)' }}>Verkaufsauftritt</em>
          </h3>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 18 }}>
            Konferenz für Persönlichkeitsentwicklung in Zürich. Die alte Seite erklärte wenig und verkaufte kaum Tickets. Wir haben Positionierung, Design und Struktur neu aufgebaut.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
            {HIGHLIGHTS.map((h) => (
              <li key={h} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: 3 }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {h}
              </li>
            ))}
          </ul>
          <a
            href="https://www.inspireday.ch"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: 'var(--color-accent)', display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            inspireday.ch live ansehen
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </a>
        </motion.div>
      </div>
    </div>
  )
}
