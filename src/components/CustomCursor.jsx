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
    <motion.div
      className="pointer-events-none fixed z-[9999] rounded-full"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        width: isHover ? 36 : 12,
        height: isHover ? 36 : 12,
        background: isHover ? 'transparent' : 'var(--color-accent)',
        border: isHover ? '1.5px solid var(--color-accent)' : '1.5px solid transparent',
        transition:
          'width 0.18s cubic-bezier(0.25, 0.1, 0.25, 1), height 0.18s cubic-bezier(0.25, 0.1, 0.25, 1), background 0.2s ease, border-color 0.2s ease',
        willChange: 'transform',
      }}
    />
  )
}
