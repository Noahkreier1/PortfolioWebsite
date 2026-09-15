import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { track } from '@vercel/analytics'

/* Einstieg in den Website-Check auf der Startseite: Adresse eingeben,
   die Messung selbst läuft auf /website-check (dauert 20–60 Sekunden). */
export default function CheckTeaser() {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [value, setValue] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const url = value.trim()
    if (!url) {
      inputRef.current?.focus()
      return
    }
    track('website_check_teaser')
    navigate(`/website-check?url=${encodeURIComponent(url)}`)
  }

  return (
    <section id="website-check" className="section" style={{ background: 'var(--color-bg)', paddingTop: 0 }}>
      <div className="container-page">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          style={{ background: 'var(--color-bg-soft)', borderRadius: 28, padding: 'clamp(32px, 5vw, 64px)' }}
        >
          <div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.15, marginBottom: 16, textWrap: 'balance' }}>
              Wie schnell ist Ihre heutige Webseite?
            </h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '48ch' }}>
              Kostenlos und ohne E-Mail: Google PageSpeed Insights misst Ladegeschwindigkeit,
              SEO-Grundlagen, Barrierefreiheit und technische Qualität.
            </p>
          </div>

          <form onSubmit={onSubmit} className="field">
            <label htmlFor="teaser-url">Adresse Ihrer Webseite</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                ref={inputRef}
                id="teaser-url"
                name="url"
                type="text"
                inputMode="url"
                autoComplete="url"
                placeholder="ihrefirma.ch"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button type="submit" className="btn-accent" style={{ whiteSpace: 'nowrap' }}>
                Seite messen
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
