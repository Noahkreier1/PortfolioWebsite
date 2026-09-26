import SectionIndex from './SectionIndex'
import { useState } from 'react'

const team = [
  {
    name: 'Noah Kreier',
    role: 'Beratung, Marke & Umsetzung',
    initials: 'NK',
    photo: '/noah.jpg',
    expertise: ['Verkauf & Beratung', 'Markenaufbau', 'Webentwicklung', 'Inhalte & Texte'],
  },
  {
    name: 'Leon Helg',
    role: 'Entwicklung & Produkt',
    initials: 'LH',
    photo: '/leon.jpg',
    expertise: ['Webentwicklung', 'Inhalte & Texte', 'Markenaufbau'],
  },
]

function Avatar({ member }) {
  const [failed, setFailed] = useState(false)
  return (
    <div
      style={{
        width: 96, height: 96, borderRadius: '50%', flexShrink: 0, overflow: 'hidden',
        background: 'var(--color-bg)', color: 'var(--color-text-muted)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: 22,
      }}
    >
      {failed ? (
        member.initials
      ) : (
        <picture style={{ display: 'contents' }}>
          <source srcSet={member.photo.replace(/\.jpe?g$/i, '.webp')} type="image/webp" />
          <img
            src={member.photo}
            alt={`${member.name}, ${member.role} bei Zurio`}
            width="96"
            height="96"
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', display: 'block' }}
          />
        </picture>
      )}
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="section" style={{ background: 'var(--color-bg)' }}>
      <div className="container-page">
        <SectionIndex n="05" label="Über uns" />
        <div className="section-head">
          <h2 className="font-display h-section">Wer Ihre Webseite baut</h2>
          <p className="lead">
            Hinter Zurio stehen Noah Kreier und Leon Helg aus Winterthur, beide ausgebildete
            Applikationsentwickler EFZ. Vom ersten Gespräch bis nach dem Launch sprechen Sie mit den
            zwei Leuten, die Ihre Seite entwerfen und programmieren.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((m) => (
            <article
              key={m.name}
              style={{ background: 'var(--color-bg-soft)', borderRadius: 'var(--radius)', padding: 'clamp(32px, 4vw, 48px)', display: 'flex', flexDirection: 'column', gap: 32 }}
            >
              <div className="flex items-center gap-6">
                <Avatar member={m} />
                <div>
                  <h3 className="font-display" style={{ fontSize: '1.625rem', lineHeight: 1.2, color: 'var(--color-text)', marginBottom: 4 }}>
                    {m.name}
                  </h3>
                  <p style={{ fontSize: 15, color: 'var(--color-text-muted)' }}>{m.role}</p>
                </div>
              </div>
              <ul className="flex flex-wrap gap-2" style={{ listStyle: 'none' }}>
                {m.expertise.map((skill) => (
                  <li
                    key={skill}
                    style={{ fontSize: 13, color: 'var(--color-text-muted)', background: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', padding: '6px 14px', whiteSpace: 'nowrap' }}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
