import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const facts = [
  { value: '20+', label: 'Projekte umgesetzt' },
  { value: '4 J.', label: 'Am Markt' },
  { value: 'ZH', label: 'Zürich' },
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
    <section id="about" className="py-14 sm:py-20 border-t border-border" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — text */}
          <div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }} className="section-label mb-4">
              Über uns
            </motion.p>

            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display"
              style={{ fontWeight: 500, letterSpacing: '-0.035em', fontSize: 'clamp(1.9rem, 3.4vw, 2.8rem)', color: 'var(--color-text)', lineHeight: 1.05, marginBottom: '1.25rem' }}>
              Kleines Team.<br /><em className="font-display-italic" style={{ fontWeight: 500 }}>Hohe Ansprüche.</em>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18 }}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.75, maxWidth: 420 }}>
              Wir sind ein fokussiertes Team aus Designern und Entwicklern in Zürich.
              Jedes Projekt wird individuell gebaut — keine Templates, keine Abkürzungen.
              Wir verbinden Schweizer Präzision mit modernem Design für Webseiten,
              die echte Geschäftsergebnisse liefern.
            </motion.p>
          </div>

          {/* Right — Swiss landscape card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              minHeight: 320,
            }}
          >
            {/* Matterhorn photo — fills the upper card background */}
            <div className="absolute top-0 left-0 right-0 overflow-hidden" style={{ bottom: 90 }}>
              <div className="absolute inset-0 bg-grid" style={{ opacity: 0.4 }} />
              <MatterhornPhoto />
              {/* Theme-aware overlay for tonal balance */}
              <div className="matterhorn-overlay absolute inset-0 pointer-events-none" />
            </div>

            {/* Small Swiss flag — top right accent */}
            <div className="absolute top-4 right-4 z-10">
              <SwissFlag size={20} />
            </div>

            {/* Stats — clean band at the bottom, solid bg to ensure legibility */}
            <div
              className="absolute bottom-0 left-0 right-0 grid grid-cols-3"
              style={{
                background: 'var(--color-surface)',
                borderTop: '1px solid var(--color-border)',
                zIndex: 10,
              }}
            >
              {facts.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                  className="flex flex-col items-center justify-center py-5 px-3 text-center"
                  style={{ borderRight: i < 2 ? '1px solid var(--color-border)' : 'none' }}
                >
                  <div className="font-display" style={{ fontWeight: 600, fontSize: '1.9rem', color: 'var(--color-accent)', lineHeight: 1, marginBottom: 6, letterSpacing: '-0.02em' }}>
                    {f.value}
                  </div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--color-text-muted)', letterSpacing: '0.04em', lineHeight: 1.4, fontWeight: 500 }}>
                    {f.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 sm:mt-20 pt-10 sm:pt-12"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p className="section-label mb-8" style={{ justifyContent: 'center', display: 'flex' }}>
            Das Team
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {team.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.5 + i * 0.1 }}
                className="team-card"
                style={{
                  borderRadius: 16,
                  padding: '22px 22px 20px',
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                  transition: 'border-color 0.3s ease, transform 0.3s ease',
                  border: '1px solid var(--color-border)',
                }}
              >
                {/* Avatar — photo if available, initials fallback */}
                <div style={{
                  width: 54, height: 54, borderRadius: '50%',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-accent-soft)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Inter, sans-serif', fontWeight: 700,
                  fontSize: 15, color: 'var(--color-accent)', letterSpacing: '0.02em',
                  flexShrink: 0,
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

                {/* Body */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{
                    fontFamily: 'Inter, sans-serif', fontWeight: 700,
                    fontSize: '1rem', color: 'var(--color-text)',
                    letterSpacing: '-0.01em', marginBottom: 3,
                  }}>
                    {m.name}
                  </h4>
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 12,
                    color: 'var(--color-text-muted)', marginBottom: 12, letterSpacing: '0.01em',
                  }}>
                    {m.role}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {m.expertise.map((skill) => (
                      <span key={skill} style={{
                        fontFamily: 'Inter, sans-serif', fontSize: 10.5,
                        color: 'var(--color-text-muted)',
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 99,
                        padding: '3px 9px',
                        letterSpacing: '0.01em',
                        whiteSpace: 'nowrap',
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.75 }}
            style={{
              fontFamily: 'Inter, sans-serif', fontSize: 12,
              color: 'var(--color-text-faint)', textAlign: 'center', marginTop: 22,
              maxWidth: 460, margin: '22px auto 0',
            }}
          >
            Langjährige Erfahrung in Verkauf, Brand Building, Content Creation und Web Development — gebündelt in einem Team.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
