import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const facts = [
  { value: '47+', label: 'Projekte umgesetzt' },
  { value: '4 J.', label: 'Am Markt' },
  { value: 'ZH', label: 'Zürich' },
]

const team = [
  {
    name: 'Noah Kreier',
    role: 'Applikationsentwickler EFZ',
    initials: 'NK',
    expertise: ['Verkauf', 'Brand Building', 'Web Development', 'Content Creation'],
  },
  {
    name: 'Leon Helg',
    role: 'Applikationsentwickler EFZ',
    initials: 'LH',
    expertise: ['Crypto-Experte', 'AI Enthusiast', 'Web Development', 'Content Creation', 'Brand Building', 'Verkauf'],
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

/* ─── Matterhorn + Alpine panorama ─── */
function MatterhornSVG() {
  return (
    <svg
      viewBox="0 0 400 200"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMax meet"
      style={{ width: '100%', display: 'block' }}
      aria-hidden="true"
    >
      {/* Horizon lake-reflection line */}
      <line x1="0" y1="178" x2="400" y2="178"
        stroke="#EDE7DC" strokeOpacity="0.06" strokeWidth="0.6" />

      {/* Far background range — soft, very faint */}
      <path
        d="M 0,200 L 0,184 C 30,181 60,178 90,180 C 115,181 130,174 148,178
           C 165,181 180,176 195,170 C 197,168 198,166 200,164
           C 202,166 204,168 210,172 C 228,178 260,178 300,176
           C 330,175 360,178 400,182 L 400,200 Z"
        fill="#EDE7DC" fillOpacity="0.025"
      />

      {/* Left secondary alpine peak */}
      <path
        d="M 0,200 L 0,188 C 18,185 36,182 55,180 L 78,168 L 96,178
           L 115,175 L 128,170 L 143,176 L 160,180 L 200,200 Z"
        fill="#EDE7DC" fillOpacity="0.035"
      />

      {/* Right secondary alpine peak */}
      <path
        d="M 400,200 L 400,184 C 382,181 365,178 348,176 L 328,162 L 310,174
           L 290,172 L 275,168 L 258,178 L 240,182 L 200,200 Z"
        fill="#EDE7DC" fillOpacity="0.035"
      />

      {/* Main Matterhorn silhouette */}
      <path
        d="M 0,200 L 0,188
           C 22,185 44,182 68,177
           L 92,168 L 114,156 L 133,140
           L 150,120 L 164,98 L 176,74
           L 186,50 L 193,32 L 197,18
           L 200,6
           L 203,18 L 208,32 L 216,52
           L 228,74 L 243,96 L 260,116
           L 279,135 L 300,151
           L 325,164 L 355,174
           C 375,179 390,182 400,184
           L 400,200 Z"
        fill="#EDE7DC" fillOpacity="0.065"
      />

      {/* Snow cap — brighter highlight at the very peak */}
      <path
        d="M 193,32 L 197,18 L 200,6 L 203,18 L 208,34
           L 200,26 L 192,30 Z"
        fill="#EDE7DC" fillOpacity="0.32"
      />

      {/* Subtle snow ridge line down left face */}
      <path
        d="M 193,32 L 186,50 L 181,66 L 176,74"
        fill="none" stroke="#EDE7DC" strokeOpacity="0.08" strokeWidth="0.8"
      />
    </svg>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="about" className="bg-bg py-20 border-t border-border">
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
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, letterSpacing: '-0.03em', fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', color: '#EDE7DC', lineHeight: 1.1, marginBottom: '1.25rem' }}>
              Kleines Team.<br />Hohe Ansprüche.
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18 }}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: '#7A7468', lineHeight: 1.75, maxWidth: 420 }}>
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
              background: '#0D0C0A',
              border: '1px solid #252018',
              minHeight: 240,
            }}
          >
            {/* Very subtle grid texture */}
            <div className="absolute inset-0 bg-grid" style={{ opacity: 0.5 }} />

            {/* Top bar — location + flag */}
            <div className="relative z-10 flex items-center justify-between px-6 pt-5 pb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-1 h-1 rounded-full bg-accent opacity-60" />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#4A4438', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  Zürich · Schweiz
                </span>
              </div>
              <SwissFlag size={24} />
            </div>

            {/* Matterhorn — fills the card background */}
            <div className="absolute bottom-0 left-0 right-0">
              <MatterhornSVG />
            </div>

            {/* Stats overlay — bottom of card */}
            <div
              className="relative z-10 grid grid-cols-3 mt-8"
              style={{ borderTop: '1px solid #1E1C18', marginTop: '3.5rem' }}
            >
              {facts.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                  className="flex flex-col items-center justify-center py-6 px-3 text-center"
                  style={{ borderRight: i < 2 ? '1px solid #1E1C18' : 'none' }}
                >
                  <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#C4A46A', lineHeight: 1, marginBottom: 5 }}>
                    {f.value}
                  </div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#4A4438', letterSpacing: '0.04em', lineHeight: 1.4 }}>
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
          className="mt-20 pt-12"
          style={{ borderTop: '1px solid #1E1C18' }}
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
                  background: '#0D0C0A',
                  border: '1px solid #1E1C18',
                  borderRadius: 16,
                  padding: '22px 22px 20px',
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                  transition: 'border-color 0.3s ease, transform 0.3s ease',
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: 54, height: 54, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1C1813 0%, #0F0E0B 100%)',
                  border: '1px solid rgba(196,164,106,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Inter, sans-serif', fontWeight: 700,
                  fontSize: 15, color: '#C4A46A', letterSpacing: '0.02em',
                  flexShrink: 0,
                }}>
                  {m.initials}
                </div>

                {/* Body */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{
                    fontFamily: 'Inter, sans-serif', fontWeight: 700,
                    fontSize: '1rem', color: '#EDE7DC',
                    letterSpacing: '-0.01em', marginBottom: 3,
                  }}>
                    {m.name}
                  </h4>
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 12,
                    color: '#7A7468', marginBottom: 12, letterSpacing: '0.01em',
                  }}>
                    {m.role}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {m.expertise.map((skill) => (
                      <span key={skill} style={{
                        fontFamily: 'Inter, sans-serif', fontSize: 10.5,
                        color: '#7A7468',
                        background: '#16140F',
                        border: '1px solid #252018',
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
              color: '#4A4438', textAlign: 'center', marginTop: 22,
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
