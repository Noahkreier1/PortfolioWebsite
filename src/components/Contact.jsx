import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { track } from '@vercel/analytics'
import { COMPANY } from '../data/company'
import { getRequestContext, setRequestContext, subscribeRequestContext } from '../lib/requestContext'
import { ChevronRight } from './Icons'

// FormSubmit leitet Anfragen per E-Mail weiter. Beim allerersten Absenden
// schickt FormSubmit eine Aktivierungs-Mail an die Empfängeradresse.
const ENDPOINT = `https://formsubmit.co/ajax/${COMPANY.formEmail}`

export default function Contact() {
  const [context, setContext] = useState(getRequestContext)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  useEffect(() => subscribeRequestContext(setContext), [])

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    if (data._honey) return

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
              <li>
                Lieber direkt schreiben:{' '}
                <a href={`mailto:${COMPANY.email}`} style={{ color: 'var(--color-accent)', textDecoration: 'underline', textUnderlineOffset: 4 }}>
                  {COMPANY.email}
                </a>
              </li>
            </ul>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 8 }}>Sie möchten Ihre heutige Seite zuerst selbst messen?</p>
            <Link to="/website-check" className="btn-link">
              Zum kostenlosen Website-Check
              <ChevronRight />
            </Link>
          </div>

          <div className="lg:col-span-3" style={{ background: 'var(--color-bg-soft)', borderRadius: 28, padding: 'clamp(24px, 4vw, 48px)' }}>
            {status === 'sent' ? (
              <div role="status" style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
                <h3 className="font-display" style={{ fontSize: '1.75rem', lineHeight: 1.2 }}>Danke, Ihre Anfrage ist angekommen.</h3>
                <p style={{ color: 'var(--color-text-muted)' }}>
                  Wir melden uns innert 24 Stunden per E-Mail bei Ihnen und schlagen Termine für das Erstgespräch vor.
                </p>
                <button type="button" className="btn-link" onClick={() => setStatus('idle')}>Weitere Anfrage senden</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="field">
                    <label htmlFor="contact-name">Name</label>
                    <input id="contact-name" name="name" type="text" autoComplete="name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="contact-company">Firma <span>(optional)</span></label>
                    <input id="contact-company" name="company" type="text" autoComplete="organization" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="field">
                    <label htmlFor="contact-email">E-Mail</label>
                    <input id="contact-email" name="email" type="email" autoComplete="email" required />
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

                {context && (
                  <div style={{ background: 'var(--color-bg)', borderRadius: 16, padding: '16px 20px' }}>
                    <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Wird mitgeschickt</p>
                    <p style={{ fontSize: 14, color: 'var(--color-text-muted)', marginBottom: 8 }}>{context}</p>
                    <button type="button" className="btn-link" style={{ fontSize: 14 }} onClick={() => setRequestContext('')}>
                      Entfernen
                    </button>
                  </div>
                )}

                {/* Spam-Falle: für Menschen unsichtbar */}
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />

                {status === 'error' && (
                  <p role="alert" style={{ color: 'var(--color-bad)', fontSize: 15 }}>
                    Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es nochmals oder schreiben Sie direkt an{' '}
                    <a href={`mailto:${COMPANY.email}`} style={{ textDecoration: 'underline' }}>{COMPANY.email}</a>.
                  </p>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <button type="submit" className="btn-accent" disabled={status === 'sending'} style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {status === 'sending' ? 'Wird gesendet …' : 'Anfrage senden'}
                  </button>
                  <p style={{ fontSize: 13, color: 'var(--color-text-faint)', lineHeight: 1.5 }}>
                    Wir verwenden Ihre Angaben nur zur Beantwortung der Anfrage.{' '}
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
