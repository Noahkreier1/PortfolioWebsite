import { useEffect, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [variant, setVariant] = useState('default')
  const [visible, setVisible] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  useEffect(() => {
    // Only enable on devices with a fine pointer (mouse / trackpad), not touch
    const supportsFinePointer =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(pointer: fine)').matches
    setEnabled(supportsFinePointer)
  }, [])

  useEffect(() => {
    if (!enabled) return
    let initialized = false

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!initialized) {
        initialized = true
        setVisible(true)
      }
    }

    const handleHover = (e) => {
      const interactive = e.target.closest(
        'a, button, [role="button"], input, textarea, [data-cursor-hover]'
      )
      setVariant(interactive ? 'hover' : 'default')
    }

    const hide = () => setVisible(false)
    const show = () => setVisible(true)

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', handleHover)
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', handleHover)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
    }
  }, [enabled, x, y])

  if (!enabled || !visible) return null

  const isHover = variant === 'hover'

  return (
    <>
      {/* Outer ring — only on hover */}
      <motion.div
        className="pointer-events-none fixed z-[9998] rounded-full"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          width: isHover ? 32 : 0,
          height: isHover ? 32 : 0,
          background: 'transparent',
          border: '1.5px solid var(--color-accent)',
          boxShadow: '0 0 0 1px color-mix(in srgb, var(--color-bg) 80%, transparent)',
          opacity: isHover ? 1 : 0,
          transition:
            'width 0.18s cubic-bezier(0.25, 0.1, 0.25, 1), height 0.18s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.18s ease',
          willChange: 'transform',
        }}
      />
      {/* Inner dot — always visible, with contrast halo */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          width: isHover ? 6 : 10,
          height: isHover ? 6 : 10,
          background: 'var(--color-accent)',
          boxShadow:
            '0 0 0 1.5px color-mix(in srgb, var(--color-bg) 85%, transparent), 0 1px 3px rgba(0,0,0,0.15)',
          transition:
            'width 0.18s cubic-bezier(0.25, 0.1, 0.25, 1), height 0.18s cubic-bezier(0.25, 0.1, 0.25, 1)',
          willChange: 'transform',
        }}
      />
    </>
  )
}
