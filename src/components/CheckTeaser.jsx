import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { track } from '@vercel/analytics'

/* Einstieg in den Website-Check auf der Startseite: Adresse eingeben,
   die Messung selbst läuft auf /website-check (dauert 20–60 Sekunden). */
export default function CheckTeaser() {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [value, setValue] = useState('')
  const [missing, setMissing] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    const url = value.trim()
    if (!url) {
      setMissing(true)
      inputRef.current?.focus()
      return
    }
    track('website_check_teaser')
    navigate(`/website-check?url=${encodeURIComponent(url)}`)
  }

  return (
    <section id="website-check" className="section" style={{ background: 'var(--color-bg)', paddingBottom: 0 }}>
      <div className="container-page">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          style={{ background: 'var(--color-bg-soft)', borderRadius: 28, padding: 'clamp(32px, 5vw, 64px)' }}
        >
          <div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.15, marginBottom: 16, textWrap: 'balance' }}>
              Unsicher, ob sich ein Neuaufbau lohnt?
            </h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '48ch' }}>
              Messen Sie Ihre heutige Webseite zuerst selbst. Kostenlos und ohne E-Mail prüft Google
              PageSpeed Insights Ladegeschwindigkeit, SEO-Grundlagen, Barrierefreiheit und technische Qualität.
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
                onChange={(e) => { setValue(e.target.value); setMissing(false) }}
                aria-invalid={missing || undefined}
                aria-describedby={missing ? 'teaser-url-error' : undefined}
              />
              <button type="submit" className="btn-accent" style={{ whiteSpace: 'nowrap' }}>
                Seite messen
              </button>
            </div>
            {missing && (
              <p id="teaser-url-error" className="field-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 7v6M12 16.5v.5" /></svg>
                <span>Bitte geben Sie die Adresse Ihrer Webseite ein, zum Beispiel ihrefirma.ch.</span>
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
