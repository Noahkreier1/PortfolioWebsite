import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { track } from '@vercel/analytics'
import { normalizeUrl } from '../lib/url'

// Was die Messung prüft (dieselben Kategorien wie auf /website-check)
const CHECKS = ['Ladezeit', 'Bedienung auf dem Handy', 'Technik und Sauberkeit', 'Barrierefreiheit', 'Auffindbarkeit bei Google']

/* Abschluss von «Vorher / Nachher»: Nach dem Beispiel von InspireDay misst der Besucher
   sein eigenes «Vorher». Die Messung selbst läuft auf /website-check (dauert 20–60 Sekunden),
   von dort führt «Persönlich einschätzen lassen» zurück ins Kontaktformular. */
export default function CheckTeaser() {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)

  // Gleiche Prüfung wie auf /website-check, damit Tippfehler hier auffallen und nicht erst dort
  const onSubmit = (e) => {
    e.preventDefault()
    const normalized = normalizeUrl(value)
    if (normalized.error) {
      setError(normalized.error)
      inputRef.current?.focus()
      return
    }
    track('website_check_teaser')
    navigate(`/website-check?url=${encodeURIComponent(value.replace(/\s+/g, ''))}`)
  }

  return (
    <div
      id="website-check"
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
      style={{
        marginTop: 'clamp(64px, 8vw, 96px)',
        background: 'var(--color-bg-soft)',
        borderRadius: 'var(--radius)',
        padding: 'clamp(28px, 4vw, 48px)',
      }}
    >
      <div>
        <h3 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.15, marginBottom: 16, textWrap: 'balance' }}>
          Und Ihre heutige Seite?
        </h3>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '46ch' }}>
          Messen Sie Ihr eigenes «Vorher»: kostenlos, ohne E-Mail, in weniger als einer Minute.
          Danach wissen Sie, ob sich ein Neuaufbau lohnt.
        </p>
      </div>

      <form onSubmit={onSubmit} noValidate className="field" style={{ alignSelf: 'center' }}>
        <label htmlFor="teaser-url">Adresse Ihrer Webseite</label>
        <div className="flex flex-col sm:flex-row sm:items-start gap-3">
          <div className="flex flex-col gap-2 flex-1">
            <input
              ref={inputRef}
              id="teaser-url"
              name="url"
              type="text"
              inputMode="url"
              autoComplete="url"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="ihrefirma.ch"
              value={value}
              onChange={(e) => { setValue(e.target.value); setError(null) }}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? 'teaser-url-error' : 'teaser-url-hint'}
            />
            {/* Fehler direkt unter dem Feld, auch auf dem Handy vor dem Button */}
            {error && (
              <p id="teaser-url-error" className="field-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 7v6M12 16.5v.5" /></svg>
                <span>{error}</span>
              </p>
            )}
          </div>
          <button type="submit" className="btn-accent" style={{ whiteSpace: 'nowrap' }}>
            Seite messen
          </button>
        </div>
        <ul
          id="teaser-url-hint"
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{ listStyle: 'none', marginTop: 20, borderTop: '1px solid var(--color-border)' }}
        >
          {CHECKS.map((c) => (
            <li key={c} style={{ fontSize: 13, lineHeight: 1.35, color: 'var(--color-text-muted)', paddingTop: 12, paddingRight: 12 }}>
              {c}
            </li>
          ))}
        </ul>
        <p style={{ fontSize: 13, color: 'var(--color-text-faint)', marginTop: 12 }}>
          Rund 30 Prüfpunkte, gemessen mit Google PageSpeed Insights und streng bewertet.
        </p>
      </form>
    </div>
  )
}
