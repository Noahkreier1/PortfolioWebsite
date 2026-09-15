import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const facts = [
  { value: '20+', label: 'Projekte umgesetzt' },
  { value: '24h', label: 'Antwortzeit' },
  { value: 'ZH', label: 'Winterthur, Zürich' },
]

const team = [
  {
    name: 'Noah Kreier',
    role: 'Applikationsentwickler EFZ',
    initials: 'NK',
    photo: '/noah.jpg',
    expertise: ['Verkauf', 'Brand Building', 'Web Development', 'Content Creation'],
  },
  {
    name: 'Leon Helg',
    role: 'Applikationsentwickler EFZ',
    initials: 'LH',
    photo: '/leon.jpg',
    expertise: ['AI Enthusiast', 'Web Development', 'Content Creation', 'Brand Building'],
  },
]

/* ─── Swiss flag icon ─── */
function SwissFlag({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-label="Swiss flag">
      <rect width="32" height="32" rx="3" fill="#B8001E" />
      <rect x="13" y="6"  width="6" height="20" fill="#F5F0E8" />
      <rect x="6"  y="13" width="20" height="6"  fill="#F5F0E8" />
    </svg>
  )
}

/* ─── Matterhorn sketch — drop public/matterhorn.png into the project ─── */
function MatterhornPhoto() {
  return (
    <img
      src="/matterhorn.png"
      alt=""
      aria-hidden="true"
      onError={(e) => { e.currentTarget.style.display = 'none' }}
      className="matterhorn-photo"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        objectPosition: 'center bottom',
        display: 'block',
      }}
    />
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="about" className="section" style={{ background: 'var(--color-bg-soft)' }}>
      <div className="container-page" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — text */}
          <div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }} className="section-label" style={{ marginBottom: 16 }}>
              Über uns
            </motion.p>

            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display h-section" style={{ marginBottom: 32, fontSize: 'clamp(2.5rem, 4.2vw, 3.5rem)' }}>
              Kleines Team.<br /><em className="font-display-italic" style={{ fontWeight: 500 }}>Hohe Ansprüche.</em>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="lead" style={{ maxWidth: 460 }}>
              Omnia Digital sind Noah und Leon: zwei ausgebildete Applikationsentwickler
              aus Winterthur. Bei uns sprechen Sie direkt mit den Leuten, die Ihre
              Webseite entwerfen und bauen. Keine Projektleiter-Schichten, keine
              weitergereichten Aufträge, keine Templates.
            </motion.p>
          </div>

          {/* Right — Swiss landscape card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative overflow-hidden"
            style={{
              background: 'var(--color-bg)',
              borderRadius: 28,
              minHeight: 440,
            }}
          >
            {/* Matterhorn photo — fills the upper card background */}
            <div className="absolute top-0 left-0 right-0 overflow-hidden" style={{ bottom: 128 }}>
              <MatterhornPhoto />
            </div>

            {/* Small Swiss flag — top right accent */}
            <div className="absolute z-10" style={{ top: 24, right: 24 }}>
              <SwissFlag size={20} />
            </div>

            {/* Stats — separated by space alone */}
            <div
              className="absolute bottom-0 left-0 right-0 grid grid-cols-3"
              style={{ background: 'var(--color-bg)', zIndex: 10, padding: '32px 16px 40px' }}
            >
              {facts.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                  className="flex flex-col items-center justify-center text-center"
                >
                  <div className="font-display" style={{ fontWeight: 500, fontSize: '2.25rem', color: 'var(--color-accent)', lineHeight: 1.1, marginBottom: 8, letterSpacing: '-0.02em' }}>
                    {f.value}
                  </div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                    {f.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

/* Team als eigenes Kapitel */
export function Team() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="team" className="section" style={{ background: 'var(--color-bg)' }}>
      <div className="container-page" ref={ref}>

        <div className="section-head">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }} className="section-label">Das Team</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display h-section">
            Noah &amp; <em className="font-display-italic" style={{ fontWeight: 500 }}>Leon.</em>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }} className="lead">
            Langjährige Erfahrung in Verkauf, Brand Building, Content Creation und Web Development. Gebündelt in einem Team.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto" style={{ maxWidth: 880 }}>
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.1 }}
              className="text-center"
              style={{
                background: 'var(--color-bg-soft)',
                borderRadius: 28,
                padding: 'clamp(40px, 5vw, 64px) clamp(24px, 4vw, 48px)',
              }}
            >
              {/* Avatar — photo if available, initials fallback */}
              <div style={{
                width: 112, height: 112, borderRadius: '50%',
                background: 'var(--color-bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Inter, sans-serif', fontWeight: 700,
                fontSize: 24, color: 'var(--color-accent)', letterSpacing: '0.02em',
                margin: '0 auto 32px',
                overflow: 'hidden',
              }}>
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt={m.name}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.parentElement.textContent = m.initials
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 25%',
                      display: 'block',
                    }}
                  />
                ) : (
                  m.initials
                )}
              </div>

              <h3 className="font-display" style={{
                fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.2,
                color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: 8,
              }}>
                {m.name}
              </h3>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 15,
                color: 'var(--color-text-muted)', marginBottom: 32,
              }}>
                {m.role}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
                {m.expertise.map((skill) => (
                  <span key={skill} style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 13,
                    color: 'var(--color-text-muted)',
                    background: 'var(--color-bg)',
                    borderRadius: 999,
                    padding: '6px 14px',
                    whiteSpace: 'nowrap',
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
