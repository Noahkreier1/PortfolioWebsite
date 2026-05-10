import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 47, suffix: '+', label: 'Projects delivered', desc: 'From Geneva to St. Gallen' },
  { value: 98, suffix: '%', label: 'Client retention', desc: 'They come back, and bring friends' },
  { value: 3.2, suffix: 'x', label: 'Avg. conversion lift', desc: 'Measured, not guessed' },
  { value: 4, suffix: ' wks', label: 'Avg. time to launch', desc: 'Fast without cutting corners' },
]

function CountUp({ target, suffix, active }) {
  const [val, setVal] = useState(0)
  const isFloat = !Number.isInteger(target)

  useEffect(() => {
    if (!active) return
    const duration = 1800
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const current = target * eased
      setVal(isFloat ? +current.toFixed(1) : Math.round(current))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, isFloat])

  return (
    <span>
      {isFloat ? val.toFixed(1) : val}
      {suffix}
    </span>
  )
}

const clientLogos = [
  'Maison Rivet', 'Alpen Bäckerei', 'Studio Keller', 'FinTrack Pro', 'Valais Wellness',
]

export default function Trust() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative bg-bg py-24 border-t border-border overflow-hidden">
      {/* Dot bg */}
      <div className="absolute inset-0 bg-dots pointer-events-none opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-bg px-8 py-10 group hover:bg-surface transition-colors duration-300"
            >
              <div
                className="font-heading font-black text-4xl sm:text-5xl text-text-primary mb-2 leading-none tabular-nums"
                style={{ color: i === 0 ? '#C4A46A' : '#EDE7DC' }}
              >
                <CountUp target={s.value} suffix={s.suffix} active={inView} />
              </div>
              <div className="font-body font-medium text-text-primary text-sm mb-1">{s.label}</div>
              <div className="font-body text-text-muted text-xs">{s.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Client strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-col items-center gap-8"
        >
          <p className="font-body text-xs text-text-muted tracking-[0.2em] uppercase">
            Trusted by businesses across Switzerland
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {clientLogos.map((name, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="font-heading font-bold text-sm text-text-subtle hover:text-text-muted transition-colors duration-300 tracking-wide"
              >
                {name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
