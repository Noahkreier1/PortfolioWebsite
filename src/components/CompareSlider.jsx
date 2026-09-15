import { useRef, useState, useCallback } from 'react'

const clamp = (v) => Math.min(96, Math.max(4, v))

const labelStyle = {
  position: 'absolute',
  top: 16,
  fontFamily: 'var(--font-label)',
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  padding: '6px 10px',
  borderRadius: 6,
  pointerEvents: 'none',
  transition: 'opacity 0.25s ease',
}

/* Vorher/Nachher-Vergleich — Regler per Maus, Touch oder Pfeiltasten */
export default function CompareSlider({ before, after, altBefore, altAfter }) {
  const containerRef = useRef(null)
  const draggingRef = useRef(false)
  const [pos, setPos] = useState(50)

  const updateFromClientX = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setPos(clamp(((clientX - rect.left) / rect.width) * 100))
  }, [])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); setPos((p) => clamp(p - 5)) }
    if (e.key === 'ArrowRight') { e.preventDefault(); setPos((p) => clamp(p + 5)) }
  }

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label="Vorher und nachher vergleichen"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      onKeyDown={onKeyDown}
      onPointerDown={(e) => {
        draggingRef.current = true
        e.currentTarget.setPointerCapture?.(e.pointerId)
        updateFromClientX(e.clientX)
      }}
      onPointerMove={(e) => { if (draggingRef.current) updateFromClientX(e.clientX) }}
      onPointerUp={() => { draggingRef.current = false }}
      onPointerCancel={() => { draggingRef.current = false }}
      className="relative w-full select-none overflow-hidden"
      style={{
        aspectRatio: '16/9',
        borderRadius: 20,
        touchAction: 'pan-y',
        cursor: 'ew-resize',
        background: 'var(--color-bg-soft)',
      }}
    >
      <img
        src={after}
        alt={altAfter}
        draggable="false"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top left' }}
      />

      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={before}
          alt={altBefore}
          draggable="false"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top left' }}
        />
      </div>

      <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${pos}%`, width: 2, background: 'var(--color-accent)', transform: 'translateX(-1px)' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 44, height: 44, borderRadius: '50%',
          background: 'var(--color-accent)', color: 'var(--color-bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2,
        }}>
          <svg width="9" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
          <svg width="9" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
        </div>
      </div>

      <span style={{ ...labelStyle, left: 16, background: 'rgba(20,17,13,0.7)', color: '#FAFAF7', opacity: pos > 18 ? 1 : 0 }}>
        Vorher
      </span>
      <span style={{ ...labelStyle, right: 16, background: 'var(--color-accent)', color: 'var(--color-bg)', opacity: pos < 82 ? 1 : 0 }}>
        Nachher
      </span>
    </div>
  )
}
