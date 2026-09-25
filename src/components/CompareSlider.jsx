import { useRef, useState, useCallback, useEffect } from 'react'

const clamp = (v) => Math.min(96, Math.max(4, v))

/* Zu jedem JPEG liegt eine WebP-Fassung mit gleichem Namen; der Browser wählt selbst. */
const webp = (src) => src.replace(/\.jpe?g$/i, '.webp')

// Beide Screenshots sind im gleichen Viewport aufgenommen (1440 × 778 @1.25x),
// daher deckt sich der Ausschnitt ohne Zuschnitt.
const RATIO = '1800 / 973'
// Endstellung: Die neue Seite ist fast ganz sichtbar, vom alten Stand bleibt links ein Streifen.
const REST = 14

const labelStyle = {
  position: 'absolute',
  bottom: 16,
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

const imgStyle = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }

function Shot({ src, alt, width, height, priority, style }) {
  return (
    <picture style={{ display: 'contents' }}>
      <source srcSet={webp(src)} type="image/webp" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        decoding="async"
        fetchpriority={priority ? 'high' : undefined}
        loading={priority ? undefined : 'lazy'}
        draggable="false"
        style={style}
      />
    </picture>
  )
}

/* Vorher/Nachher-Vergleich — Regler per Maus, Touch oder Pfeiltasten.
   Beim ersten Sichtkontakt wischt der Regler einmal von der Mitte zur Endstellung,
   damit die neue Seite über die alte fährt. Auf kleinen Screens stehen beide Bilder untereinander. */
export default function CompareSlider({ before, after, altBefore, altAfter, priority = false }) {
  const containerRef = useRef(null)
  const draggingRef = useRef(false)
  const touchedRef = useRef(false)
  const [pos, setPos] = useState(50)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      if (touchedRef.current) return
      if (reduced) { setPos(REST); return }
      const start = performance.now()
      const duration = 1400
      const tick = (now) => {
        if (touchedRef.current) return
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 4)
        setPos(50 + (REST - 50) * eased)
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(frame) }
  }, [])

  const updateFromClientX = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setPos(clamp(((clientX - rect.left) / rect.width) * 100))
  }, [])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); touchedRef.current = true; setPos((p) => clamp(p - 5)) }
    if (e.key === 'ArrowRight') { e.preventDefault(); touchedRef.current = true; setPos((p) => clamp(p + 5)) }
    if (e.key === 'Home') { e.preventDefault(); touchedRef.current = true; setPos(4) }
    if (e.key === 'End') { e.preventDefault(); touchedRef.current = true; setPos(96) }
  }

  return (
    <>
      <div
        ref={containerRef}
        role="slider"
        tabIndex={0}
        aria-label="Vorher und nachher vergleichen"
        aria-valuemin={4}
        aria-valuemax={96}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)} Prozent alte Seite sichtbar`}
        onKeyDown={onKeyDown}
        onPointerDown={(e) => {
          // Verhindert, dass der Browser beim Ziehen Text markiert (Markierung ist rot)
          e.preventDefault()
          window.getSelection()?.removeAllRanges()
          draggingRef.current = true
          touchedRef.current = true
          e.currentTarget.setPointerCapture?.(e.pointerId)
          updateFromClientX(e.clientX)
        }}
        onPointerMove={(e) => { if (draggingRef.current) updateFromClientX(e.clientX) }}
        onPointerUp={() => { draggingRef.current = false }}
        onPointerCancel={() => { draggingRef.current = false }}
        onDragStart={(e) => e.preventDefault()}
        className="relative w-full select-none hidden sm:block"
        style={{
          aspectRatio: RATIO,
          borderRadius: 20,
          touchAction: 'pan-y',
          cursor: 'ew-resize',
          WebkitUserSelect: 'none',
        }}
      >
        {/* Eigene Clip-Ebene: clip-path mit Rundung schneidet auch bewegte Ebenen sauber ab
            (Safari ignoriert overflow + border-radius bei transformierten Kindern). Der Fokusring
            liegt auf dem äusseren Element und bleibt dadurch sichtbar. */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 20, clipPath: 'inset(0 round 20px)', isolation: 'isolate', background: 'var(--color-bg-soft)' }}>
        <Shot src={after} alt={altAfter} width="1800" height="973" priority={priority} style={imgStyle} />

        <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Shot src={before} alt={altBefore} width="1800" height="973" priority={priority} style={imgStyle} />
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

        <span style={{ ...labelStyle, left: 16, background: 'rgba(20,17,13,0.7)', color: '#FAFAF7', opacity: pos > 10 ? 1 : 0 }}>
          Vorher
        </span>
        <span style={{ ...labelStyle, right: 16, background: 'var(--color-accent)', color: 'var(--color-bg)', opacity: pos < 86 ? 1 : 0 }}>
          Nachher
        </span>
        </div>
      </div>

      {/* Handy: beide Stände untereinander, neuer Stand zuerst. Label über dem Bild,
          damit es nichts im Screenshot verdeckt */}
      <div className="flex flex-col gap-5 sm:hidden">
        {[
          { src: after, alt: altAfter, label: 'Nachher', bg: 'var(--color-accent)' },
          { src: before, alt: altBefore, label: 'Vorher', bg: 'rgba(20,17,13,0.7)' },
        ].map((s) => (
          <div key={s.label}>
            <span style={{ ...labelStyle, position: 'static', display: 'inline-block', marginBottom: 8, background: s.bg, color: '#FAFAF7' }}>{s.label}</span>
            <div className="relative overflow-hidden" style={{ aspectRatio: RATIO, borderRadius: 14, background: 'var(--color-bg-soft)' }}>
              <Shot src={s.src} alt={s.alt} width="1800" height="973" priority={priority && s.label === 'Nachher'} style={imgStyle} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
