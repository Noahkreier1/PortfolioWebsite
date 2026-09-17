import { useState } from 'react'
import { TESTIMONIALS } from '../data/testimonials'

/* Porträt: quadratische Bilder verwenden, ab 200×200 px, Gesicht mittig.
   Fehlt die Datei, verschwindet das Bild, statt als kaputtes Symbol zu erscheinen. */
function Portrait({ src, alt }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return null

  return (
    <img
      src={src}
      alt={alt}
      width="56"
      height="56"
      loading="lazy"
      onError={() => setFailed(true)}
      style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center', flexShrink: 0 }}
    />
  )
}

export default function Testimonials({ company, style }) {
  const items = company ? TESTIMONIALS.filter((t) => t.company === company) : TESTIMONIALS
  if (!items.length) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16" style={style}>
      {items.map((t) => (
        <figure key={t.name} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <blockquote
            className="font-display"
            style={{ fontSize: 'clamp(1.375rem, 2.2vw, 1.75rem)', lineHeight: 1.3, letterSpacing: '-0.015em', fontVariationSettings: "'wght' 500" }}
          >
            «{t.quote}»
          </blockquote>
          <figcaption className="flex items-center gap-4">
            <Portrait src={t.photo} alt={t.name} />
            <span style={{ fontSize: 15, lineHeight: 1.4 }}>
              <strong style={{ fontWeight: 600 }}>{t.name}</strong>
              <br />
              <span style={{ color: 'var(--color-text-muted)' }}>{t.role}, {t.company}</span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
