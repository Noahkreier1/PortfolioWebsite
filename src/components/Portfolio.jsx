import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import BeforeAfter from './BeforeAfter'

const projects = [
  {
    id: '01',
    name: 'InspireDay',
    category: 'Event-Webseite',
    description: 'Konferenz für Persönlichkeitsentwicklung in Zürich. Tickets, Speaker und Community an einem Ort.',
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
    name: 'Hikebeast',
    category: 'Outdoor · Interaktive Karte',
    description: 'Interaktive Karte und PDF-Guide mit 122 versteckten Schweizer Wander- und Camping-Spots. Für Adventure-Reisende abseits der Touristenpfade.',
    url: 'https://hikebeast.ch/map/',
    urlLabel: 'hikebeast.ch',
    baseBg: 'linear-gradient(155deg, #0A1410 0%, #1A2820 100%)',
    blobs: [
      { color: 'rgba(120,180,140,0.20)', top: '35%', left: '55%', size: 230 },
      { color: 'rgba(80,140,160,0.12)', top: '70%', left: '25%', size: 150 },
    ],
  },
  {
    id: '03',
    name: 'Andrea Silk',
    category: 'Trauerbegleitung · Coaching',
    description: 'Webseite für Familientrauerbegleitung in Zürich. Einfühlsames, ruhiges Design für ein sensibles Thema. Vertrauensvoll und klar.',
    url: 'https://andrea-silk.vercel.app',
    urlLabel: 'andrea-silk.vercel.app',
    baseBg: 'linear-gradient(155deg, #0F1410 0%, #1E2820 100%)',
    blobs: [
      { color: 'rgba(140,180,140,0.18)', top: '35%', left: '55%', size: 220 },
      { color: 'rgba(196,164,106,0.10)', top: '70%', left: '25%', size: 150 },
    ],
  },
  {
    id: '04',
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
]

function ProjectVisual({ project }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const showScreenshot = project.url && !imgError
  const screenshotUrl = project.url
    ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(project.url)}?w=1280&h=720`
    : null

  return (
    <div className="relative overflow-hidden w-full" style={{ aspectRatio: '16/9', background: project.baseBg }}>
      {/* Gradient fallback (visible while screenshot loads or if no URL) */}
      {(!showScreenshot || !imgLoaded) && project.blobs.map((b, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{ top: b.top, left: b.left, width: b.size, height: b.size, transform: 'translate(-50%,-50%)', background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`, filter: 'blur(28px)' }}
        />
      ))}

      {/* Real website screenshot */}
      {showScreenshot && (
        <img
          src={screenshotUrl}
          alt={`${project.name} Webseite`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            opacity: imgLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        />
      )}

    </div>
  )
}

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  const Wrapper = project.url ? motion.a : motion.div
  const wrapperProps = project.url
    ? { href: project.url, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Wrapper
      ref={ref}
      {...wrapperProps}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="project-card group block"
    >
      <div className="relative overflow-hidden rounded-t-[15px]">
        <ProjectVisual project={project} />

        {/* Hover overlay (desktop) */}
        <div className="project-card-overlay rounded-t-[15px]">
          <span style={{ color: '#C4A46A', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 6 }}>
            {project.url ? 'Webseite besuchen' : 'Projekt ansehen'}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </span>
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-1.5">
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--color-text-faint)', fontWeight: 500 }}>{project.id}</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--color-text-muted)' }}>{project.category}</span>
        </div>
        <h3
          className="font-display group-hover:text-accent transition-colors duration-300"
          style={{ fontWeight: 500, fontSize: '1.25rem', color: 'var(--color-text)', marginBottom: 4, letterSpacing: '-0.02em' }}
        >
          {project.name}
        </h3>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{project.description}</p>
      </div>
    </Wrapper>
  )
}

export default function Portfolio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="work" className="py-14 sm:py-20 border-t border-border" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-6">

        <div ref={ref} className="flex items-end justify-between mb-10">
          <div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }} className="section-label mb-3">Referenzen</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display"
              style={{ fontWeight: 500, letterSpacing: '-0.035em', fontSize: 'clamp(2rem, 3.8vw, 3rem)', color: 'var(--color-text)', lineHeight: 1.05 }}>
              Sehen Sie selbst, <em className="font-display-italic" style={{ fontWeight: 500 }}>was wir liefern</em>
            </motion.h2>
          </div>
          <motion.a href="#contact" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'var(--color-text-muted)' }}
            className="hidden sm:inline-flex items-center gap-1.5 hover:text-text-primary transition-colors duration-200 flex-shrink-0">
            Erstgespräch buchen
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </motion.a>
        </div>

        <BeforeAfter />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}
