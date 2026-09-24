import { Link } from 'react-router-dom'
import Testimonials from './Testimonials'
import { ArrowUpRight, ChevronRight } from './Icons'

const projects = [
  {
    name: 'InspireDay',
    category: 'Event-Webseite · Zürich',
    description: 'Konferenz für Persönlichkeitsentwicklung im Volkshaus Zürich. Tickets, Programm und Speaker an einem Ort.',
    metric: 'Über 1’000 verkaufte Tickets über fünf Events',
    image: '/work/inspireday-desktop.jpg',
    to: '/referenzen/inspireday',
    linkLabel: 'Case Study lesen',
  },
  {
    name: 'Hikebeast',
    category: 'Eigenes Produkt · Web-App',
    description: 'Unser eigenes Produkt: eine Web-App mit über 140 Wander- und Wildcamping-Spots in der Schweiz, verkauft direkt über die Seite.',
    metric: 'Über CHF 60’000 Umsatz in sechs Monaten',
    image: '/work/hikebeast-desktop.jpg',
    href: 'https://hikebeast.ch/map/',
    linkLabel: 'hikebeast.ch',
  },
  {
    name: 'Cosac',
    category: 'E-Commerce · Eigene Marke',
    description: 'Leons eigene Marke für XXL-Sitzsäcke aus Memory-Schaum. In der Schweiz entworfen, verkauft über den eigenen Shop in die USA.',
    metric: '4.7 von 5 Sternen aus 348 Kundenbewertungen',
    image: '/work/cosac-desktop.jpg',
    href: 'https://www.cosac.store',
    linkLabel: 'cosac.store',
  },
  {
    name: 'Driven Co.',
    category: 'E-Commerce · Markenidentität',
    description: 'Schweizer Streetwear-Marke mit limitierten Drops. Minimales Design, klare Haltung.',
    metric: 'Über 400 verkaufte Einheiten in zwei Drops',
    image: '/work/driven-co-desktop.jpg',
    href: 'https://www.driven-co.ch',
    linkLabel: 'driven-co.ch',
  },
]

function ProjectCard({ project }) {
  const content = (
    <>
      <div className="project-card-media" style={{ aspectRatio: '16/10', background: 'var(--color-bg)' }}>
        <picture style={{ display: 'contents' }}>
          <source srcSet={project.image.replace(/\.jpe?g$/i, '.webp')} type="image/webp" />
          <img
            src={project.image}
            alt={`Startseite von ${project.name}: ${project.description}`}
            loading="lazy"
            decoding="async"
            width="1100"
            height="688"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
          />
        </picture>
      </div>
      <div style={{ paddingTop: 24 }}>
        <p className="meta-line" style={{ marginBottom: 12 }}>{project.category}</p>
        <h3
          className="font-display group-hover:text-accent transition-colors duration-300"
          style={{ fontSize: '1.625rem', lineHeight: 1.2, color: 'var(--color-text)', marginBottom: 12 }}
        >
          {project.name}
        </h3>
        {project.metric && (
          <p style={{ color: 'var(--color-text)', fontWeight: 600, marginBottom: 12 }}>{project.metric}</p>
        )}
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '46ch', marginBottom: 16 }}>{project.description}</p>
        <span className="btn-link">
          {project.linkLabel}
          {project.to ? <ChevronRight /> : <ArrowUpRight />}
        </span>
      </div>
    </>
  )

  return project.to ? (
    <Link to={project.to} className="project-card group">{content}</Link>
  ) : (
    <a href={project.href} target="_blank" rel="noopener noreferrer" className="project-card group">{content}</a>
  )
}

export default function Portfolio() {
  return (
    <section id="work" className="section" style={{ background: 'var(--color-bg-soft)' }}>
      <div className="container-page">
        <div className="section-head">
          <h2 className="font-display h-section">Webseiten, die wir zuletzt gebaut haben</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {projects.map((p) => <ProjectCard key={p.name} project={p} />)}
        </div>

        <Testimonials style={{ marginTop: 'clamp(96px, 10vw, 128px)' }} />
      </div>
    </section>
  )
}
