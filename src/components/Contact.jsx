import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { track } from '@vercel/analytics'
import { COMPANY } from '../data/company'
import { getRequestContext, setRequestContext, subscribeRequestContext } from '../lib/requestContext'

// FormSubmit leitet Anfragen per E-Mail weiter. Beim allerersten Absenden
// schickt FormSubmit eine Aktivierungs-Mail an die Empfängeradresse.
const ENDPOINT = `https://formsubmit.co/ajax/${COMPANY.formEmail}`

// Eigene Prüfung statt Browser-Tooltips: Meldungen auf Deutsch, direkt am Feld
function validate(data) {
  const errors = {}
  if (!data.name?.trim()) errors.name = 'Bitte geben Sie Ihren Namen an.'
  const email = data.email?.trim() ?? ''
  if (!email) errors.email = 'Bitte geben Sie Ihre E-Mail-Adresse an, damit wir antworten können.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = 'Diese E-Mail-Adresse scheint unvollständig. Beispiel: name@firma.ch'
  return errors
}

function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p id={id} className="field-error">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 7v6M12 16.5v.5" /></svg>
      <span>{message}</span>
    </p>
  )
}

const linkStyle = { color: 'var(--color-accent-ink)', textDecoration: 'underline', textUnderlineOffset: 4 }

export default function Contact() {
  const [context, setContext] = useState(getRequestContext)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errors, setErrors] = useState({})
  const successRef = useRef(null)

  // Nach dem Absenden den Fokus auf die Bestätigung setzen, damit Screenreader sie vorlesen
  useEffect(() => {
    if (status === 'sent') successRef.current?.focus()
  }, [status])

  const clearError = (name) => setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
  const errorProps = (name) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
    onInput: () => clearError(name),
  })


  useEffect(() => subscribeRequestContext(setContext), [])

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    if (data._honey) return

    const found = validate(data)
    setErrors(found)
    const firstInvalid = ['name', 'email'].find((k) => found[k])
    if (firstInvalid) {
      form.querySelector(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Name: data.name,
          Firma: data.company || '–',
          'E-Mail': data.email,
          Webseite: data.website || '–',
          Nachricht: data.message || '–',
          Auswahl: context || '–',
          _replyto: data.email,
          _subject: `Anfrage Erstgespräch: ${data.name}${data.company ? ` (${data.company})` : ''}`,
          _template: 'table',
        }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || String(json.success) !== 'true') throw new Error(json.message || 'Senden fehlgeschlagen')
      setStatus('sent')
      track('form_submit')
      form.reset()
      setRequestContext('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section" style={{ background: 'var(--color-bg)' }}>
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          <div className="lg:col-span-2">
            <h2 className="font-display h-section" style={{ marginBottom: 24, fontSize: 'clamp(2.25rem, 3.6vw, 3rem)' }}>Erzählen Sie uns von Ihrem Projekt</h2>
            <p className="lead" style={{ marginBottom: 48 }}>
              Nach 30 Minuten Erstgespräch wissen Sie, was Sie brauchen und in welchem Preisrahmen Sie
              liegen. Die verbindliche Festofferte folgt innert 2–3 Tagen.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48, color: 'var(--color-text)' }}>
              <li>Antwort innert 24 Stunden</li>
              <li>Kostenlos und unverbindlich</li>
            </ul>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 8 }}>Lieber direkt?</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>
                Anrufen: <a href={COMPANY.phoneHref} style={{ ...linkStyle, whiteSpace: 'nowrap' }}>{COMPANY.phone}</a>
              </li>
              <li>
                Schreiben: <a href={`mailto:${COMPANY.email}`} style={linkStyle}>{COMPANY.email}</a>
              </li>
            </ul>
          </div>

          <div id="contact-form" className="lg:col-span-3" style={{ background: 'var(--color-bg-soft)', borderRadius: 28, padding: 'clamp(24px, 4vw, 48px)' }}>
            {status === 'sent' ? (
              <div ref={successRef} tabIndex={-1} role="status" className="appear" style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start', outline: 'none' }}>
                <h3 className="font-display" style={{ fontSize: '1.75rem', lineHeight: 1.2 }}>Danke, Ihre Anfrage ist angekommen.</h3>
                <p style={{ color: 'var(--color-text-muted)' }}>
                  Wir melden uns innert 24 Stunden per E-Mail bei Ihnen und schlagen Termine für das Erstgespräch vor.
                </p>
                <button type="button" className="btn-link" onClick={() => setStatus('idle')}>Weitere Anfrage senden</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {context && (
                  <div className="appear" style={{ background: 'var(--color-bg)', borderRadius: 16, padding: '16px 20px' }}>
                    <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Wird mitgeschickt</p>
                    <ul style={{ listStyle: 'none', fontSize: 14, color: 'var(--color-text-muted)', marginBottom: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {context.split(' · ').map((part) => <li key={part}>{part}</li>)}
                    </ul>
                    <button type="button" className="btn-link" style={{ fontSize: 14 }} onClick={() => setRequestContext('')}>
                      Entfernen
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="field">
                    <label htmlFor="contact-name">Name</label>
                    <input id="contact-name" name="name" type="text" autoComplete="name" required maxLength={120} {...errorProps('name')} />
                    <FieldError id="contact-name-error" message={errors.name} />
                  </div>
                  <div className="field">
                    <label htmlFor="contact-company">Firma <span>(optional)</span></label>
                    <input id="contact-company" name="company" type="text" autoComplete="organization" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="field">
                    <label htmlFor="contact-email">E-Mail</label>
                    <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={200} {...errorProps('email')} />
                    <FieldError id="contact-email-error" message={errors.email} />
                  </div>
                  <div className="field">
                    <label htmlFor="contact-website">Heutige Webseite <span>(optional)</span></label>
                    <input id="contact-website" name="website" type="text" inputMode="url" autoComplete="url" placeholder="ihrefirma.ch" />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="contact-message">Worum geht es? <span>(optional)</span></label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="z. B. neue Webseite für unsere Schreinerei, rund 5 Seiten, Launch im Frühling"
                  />
                </div>

                {/* Spam-Falle: für Menschen unsichtbar */}
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />

                {status === 'error' && (
                  <p role="alert" style={{ color: 'var(--color-bad)', fontSize: 15 }}>
                    Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es nochmals, schreiben Sie an{' '}
                    <a href={`mailto:${COMPANY.email}`} style={{ textDecoration: 'underline' }}>{COMPANY.email}</a> oder rufen Sie an:{' '}
                    <a href={COMPANY.phoneHref} style={{ textDecoration: 'underline', whiteSpace: 'nowrap' }}>{COMPANY.phone}</a>.
                  </p>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <button type="submit" className="btn-accent" disabled={status === 'sending'} style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {status === 'sending' ? 'Wird gesendet …' : 'Erstgespräch anfragen'}
                  </button>
                  <p style={{ fontSize: 13, color: 'var(--color-text-faint)', lineHeight: 1.5 }}>
                    Antwort innert 24 Stunden, kostenlos und unverbindlich. Wir verwenden Ihre Angaben nur zur
                    Beantwortung der Anfrage.{' '}
                    <Link to="/datenschutz" style={{ textDecoration: 'underline' }}>Datenschutz</Link>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
