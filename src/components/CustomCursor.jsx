import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [variant, setVariant] = useState('default')
  const [visible, setVisible] = useState(false)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springCfg = { stiffness: 300, damping: 28, mass: 0.4 }
  const ringX = useSpring(mouseX, springCfg)
  const ringY = useSpring(mouseY, springCfg)

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
    }
    const enter = () => setVariant('hover')
    const leave = () => setVariant('default')
    const hide = () => setVisible(false)
    const show = () => setVisible(true)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)

    // Delegate hover detection
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, [role="button"], [data-cursor-hover]')) {
        setVariant('hover')
      } else {
        setVariant('default')
      }
    })

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
    }
  }, [mouseX, mouseY])

  if (!visible) return null

  return (
    <>
      {/* Dot — instant tracking */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: variant === 'hover' ? 6 : 8,
          height: variant === 'hover' ? 6 : 8,
          background: '#C4A46A',
          transition: 'width 0.15s, height 0.15s',
        }}
      />
      {/* Ring — spring lag */}
      <motion.div
        className="pointer-events-none fixed z-[9998] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: variant === 'hover' ? 52 : 36,
          height: variant === 'hover' ? 52 : 36,
          borderColor: variant === 'hover' ? 'rgba(196,164,106,0.7)' : 'rgba(196,164,106,0.4)',
          background: variant === 'hover' ? 'rgba(196,164,106,0.05)' : 'transparent',
          transition: 'width 0.2s cubic-bezier(0.25,0.1,0.25,1), height 0.2s cubic-bezier(0.25,0.1,0.25,1), border-color 0.2s ease, background 0.2s ease',
        }}
      />
    </>
  )
}
