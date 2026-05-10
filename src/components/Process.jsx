import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We learn everything about your business, goals, target audience, and competitors. Strategy before design.',
    detail: '1–2 days',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Design & Build',
    description:
      'We design and develop your website with precision and creative ambition — you see progress every week.',
    detail: '2–3 weeks',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Launch & Grow',
    description:
      'We ship, measure, and continuously improve. Your website gets better over time — not abandoned after launch.',
    detail: 'Ongoing',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
      </svg>
    ),
  },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="process" className="relative py-28 overflow-hidden" style={{ background: '#0D0D0D' }}>
      {/* Bg grid */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-60" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-label mb-5"
        >
          How We Work
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading font-black text-text-primary mb-20 leading-tight"
          style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)' }}
        >
          Simple process.<br />
          <span style={{ color: '#C4A46A' }}>Exceptional results.</span>
        </motion.h2>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-0 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[3.5rem] left-[17%] right-[17%] h-px" style={{ background: '#222' }} />
          <motion.div
            className="hidden lg:block absolute top-[3.5rem] h-px"
            style={{ left: '17%', background: 'linear-gradient(90deg, #C4A46A, transparent)' }}
            initial={{ width: 0 }}
            animate={inView ? { width: '66%' } : { width: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.18, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative flex flex-col"
            >
              {/* Step indicator */}
              <div className="flex items-center gap-5 mb-8 lg:flex-col lg:items-start lg:gap-3">
                <div className="relative flex-shrink-0">
                  {/* Outer ring */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      background: i === 0 ? 'rgba(196,164,106,0.1)' : '#141414',
                      border: `1px solid ${i === 0 ? 'rgba(196,164,106,0.4)' : '#2a2a2a'}`,
                    }}
                  >
                    <div style={{ color: i === 0 ? '#C4A46A' : '#666' }}>{step.icon}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 lg:hidden">
                  <span className="font-heading text-text-subtle text-xs font-bold">{step.number}</span>
                  <span className="font-body text-text-subtle text-xs">{step.detail}</span>
                </div>
              </div>

              <div className="lg:pr-8">
                <div className="hidden lg:flex items-center gap-3 mb-3">
                  <span className="font-heading text-text-subtle text-xs font-bold">{step.number}</span>
                  <span
                    className="font-body text-xs px-2 py-0.5 rounded-full"
                    style={{ background: '#1a1a1a', color: '#555' }}
                  >
                    {step.detail}
                  </span>
                </div>
                <h3
                  className="font-heading font-black text-2xl sm:text-3xl mb-4"
                  style={{ color: i === 0 ? '#C4A46A' : '#F5F5F0' }}
                >
                  {step.title}
                </h3>
                <p className="font-body text-text-muted text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-20 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between"
        >
          <p className="font-body text-text-muted text-sm max-w-md">
            Typically, we can get a polished, launch-ready website live in{' '}
            <span className="text-text-primary font-medium">under 4 weeks</span> — without compromising on quality.
          </p>
          <a href="#contact" className="btn-accent text-sm flex-shrink-0">
            Start your project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
