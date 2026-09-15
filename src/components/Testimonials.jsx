import { TESTIMONIALS } from '../data/testimonials'

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
            {t.photo && (
              <img src={t.photo} alt="" width="48" height="48" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} />
            )}
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
