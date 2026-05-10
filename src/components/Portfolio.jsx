import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const projects = [
  {
    id: '01',
    name: 'InspireDay',
    category: 'Event-Webseite',
    description: 'Konferenz für Persönlichkeitsentwicklung in Zürich. Tickets, Speaker und Community — alles an einem Ort.',
    url: 'https://www.inspireday.ch',
    urlLabel: 'inspireday.ch',
    baseBg: 'linear-gradient(155deg, #180810 0%, #2A0A1C 100%)',
    blobs: [
      { color: 'rgba(210, 70, 120, 0.3)', top: '30%', left: '62%', size: 250 },
      { color: 'rgba(160, 30, 80, 0.18)', top: '72%', left: '22%', size: 160 },
      { color: 'rgba(240, 130, 160, 0.1)', top: '15%', left: '35%', size: 120 },
    ],
  },
  {
    id: '02',
    name: 'Driven Co.',
    category: 'E-Commerce · Markenidentität',
    description: 'Premium Schweizer Streetwear-Marke. Limitierte Drops, minimales Design, klare Haltung.',
    url: 'https://www.driven-co.ch',
    urlLabel: 'driven-co.ch',
    baseBg: 'linear-gradient(155deg, #070707 0%, #111111 100%)',
    blobs: [
      { color: 'rgba(210, 210, 210, 0.07)', top: '35%', left: '55%', size: 260 },
      { color: 'rgba(160, 160, 160, 0.04)', top: '68%', left: '28%', size: 160 },
    ],
  },
  {
    id: '03',
    name: 'Studio Keller',
    category: 'Portfolio-Webseite',
    description: 'Innenarchitektur-Studio in Zürich. Klares, architektonisches Online-Portfolio.',
    url: null,
    urlLabel: null,
    baseBg: 'linear-gradient(155deg, #060C06 0%, #1A2A1A 100%)',
    blobs: [
      { color: 'rgba(92,175,92,0.22)', top: '35%', left: '55%', size: 200 },
      { color: 'rgba(42,106,42,0.14)', top: '72%', left: '25%', size: 130 },
    ],
  },
  {
    id: '04',
    name: 'FinTrack Pro',
    category: 'SaaS-Landingpage',
    description: 'B2B-Fintech-Startup in Zürich. 400 Wartelisten-Anmeldungen in 3 Wochen nach dem Launch.',
    url: null,
    urlLabel: null,
    baseBg: 'linear-gradient(155deg, #040810 0%, #0A1830 100%)',
    blobs: [
      { color: 'rgba(10,122,232,0.28)', top: '35%', left: '60%', size: 240 },
      { color: 'rgba(0,207,255,0.1)', top: '20%', left: '30%', size: 140 },
    ],
  },
]

function ProjectVisual({ project }) {
  return (
    <div className="relative overflow-hidden w-full" style={{ aspectRatio: '16/9', background: project.baseBg }}>
      {project.blobs.map((b, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{ top: b.top, left: b.left, width: b.size, height: b.size, transform: 'translate(-50%,-50%)', background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`, filter: 'blur(28px)' }}
        />
      ))}

      {/* URL badge bottom-left */}
      {project.urlLabel && (
        <div style={{
          position: 'absolute', bottom: 12, left: 14,
          background: 'rgba(11,10,9,0.7)',
          border: '1px solid rgba(237,231,220,0.08)',
          borderRadius: 6,
          padding: '4px 9px',
          backdropFilter: 'blur(8px)',
        }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(237,231,220,0.5)', letterSpacing: '0.03em' }}>
            {project.urlLabel}
          </span>
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="project-card group"
    >
      <div className="relative overflow-hidden rounded-t-[15px]">
        <ProjectVisual project={project} />

        {/* Hover overlay */}
        <div className="project-card-overlay rounded-t-[15px]">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#C4A46A', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              Webseite besuchen
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </a>
          ) : (
            <span style={{ color: '#C4A46A', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 6 }}>
              Projekt ansehen
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </span>
          )}
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-1.5">
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#4A4438', fontWeight: 500 }}>{project.id}</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#7A7468' }}>{project.category}</span>
        </div>
        <h3
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#EDE7DC', marginBottom: 4, letterSpacing: '-0.01em' }}
          className="group-hover:text-accent transition-colors duration-300"
        >
          {project.name}
        </h3>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#7A7468', lineHeight: 1.5 }}>{project.description}</p>
      </div>
    </motion.div>
  )
}

export default function Portfolio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="work" className="bg-bg py-20 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">

        <div ref={ref} className="flex items-end justify-between mb-10">
          <div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }} className="section-label mb-3">Unsere Arbeiten</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, letterSpacing: '-0.03em', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#EDE7DC', lineHeight: 1.1 }}>
              Ausgewählte Projekte
            </motion.h2>
          </div>
          <motion.a href="#contact" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#7A7468' }}
            className="hidden sm:inline-flex items-center gap-1.5 hover:text-text-primary transition-colors duration-200 flex-shrink-0">
            Projekt starten
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </motion.a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}
