import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CompareSlider from '../components/CompareSlider'
import Testimonials from '../components/Testimonials'
import { ArrowUpRight } from '../components/Icons'
import { usePageMeta } from '../lib/usePageMeta'

const CASE = {
  facts: [
    { label: 'Kunde', value: 'InspireDay' },
    { label: 'Branche', value: 'Events, Zürich' },
    { label: 'Leistungen', value: 'Konzept, Design, Texte, Entwicklung' },
  ],
  approach: [
    'Klare Positionierung und der Ticketverkauf als Hauptziel der Seite',
    'Komplett neues Design, neue Struktur und neue Texte',
    'Konzept bis Launch aus einer Hand',
  ],
  // Zahlen vom Kunden, Stand September 2026. Basis noch präzisieren:
  // exakter Zeitraum und ob alle fünf Events nach dem Relaunch stattfanden.
  result: {
    value: '1’000+',
    label: 'verkaufte Tickets',
    basis: 'über fünf Events seit dem Relaunch',
  },
}

export default function CaseInspireDay() {
  usePageMeta(
    'Case Study InspireDay',
    'Wie Zurio die Webseite der Konferenz InspireDay im Volkshaus Zürich neu aufgebaut hat: Positionierung, Design, Texte und Entwicklung.'
  )
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Navbar />
      <main id="main">
        <section style={{ paddingTop: 'clamp(128px, 16vh, 168px)', paddingBottom: 'clamp(64px, 8vw, 96px)' }}>
          <div className="container-page">
            <p className="meta-line" style={{ marginBottom: 24 }}>Case Study</p>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', lineHeight: 1.1, maxWidth: 900, marginBottom: 32, textWrap: 'balance' }}>
              InspireDay: neuer Auftritt für die Konferenz im Volkshaus Zürich
            </h1>
            <p className="lead" style={{ maxWidth: 680, marginBottom: 56 }}>
              InspireDay ist eine Konferenz für Persönlichkeitsentwicklung in Zürich. Die alte Webseite
              erklärte wenig und verkaufte kaum Tickets. Wir haben Positionierung, Design, Struktur und
              Texte neu aufgebaut.
            </p>
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {CASE.facts.map((f) => (
                <div key={f.label}>
                  <dt style={{ fontSize: 14, color: 'var(--color-text-muted)', marginBottom: 4 }}>{f.label}</dt>
                  <dd style={{ fontWeight: 500 }}>{f.value}</dd>
                </div>
              ))}
              <div>
                <dt style={{ fontSize: 14, color: 'var(--color-text-muted)', marginBottom: 4 }}>Live-Seite</dt>
                <dd>
                  <a href="https://www.inspireday.ch" target="_blank" rel="noopener noreferrer" className="btn-link" style={{ fontSize: 16 }}>
                    inspireday.ch
                    <ArrowUpRight />
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section style={{ paddingBottom: 'clamp(96px, 11vw, 160px)' }}>
          <div className="container-page">
            <figure>
              <CompareSlider
                before="/before-after/inspireday-before.jpg"
                after="/before-after/inspireday-after.jpg"
                altBefore="InspireDay Webseite vor dem Relaunch"
                altAfter="InspireDay Webseite nach dem Relaunch durch Zurio"
                priority
              />
              <figcaption style={{ marginTop: 16, fontSize: 15, color: 'var(--color-text-muted)' }}>
                Die alte und die neue Startseite.<span className="hidden sm:inline"> Regler ziehen zum Vergleichen.</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="section" style={{ background: 'var(--color-bg-soft)' }}>
          <div className="container-page">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
              <div>
                <h2 className="font-display" style={{ fontSize: '1.75rem', lineHeight: 1.2, marginBottom: 16 }}>Ausgangslage</h2>
                <p style={{ color: 'var(--color-text-muted)', maxWidth: '52ch' }}>
                  Die bisherige Seite basierte auf einem austauschbaren Template, erklärte wenig über die
                  Konferenz und verkaufte kaum Tickets.
                </p>
              </div>
              <div>
                <h2 className="font-display" style={{ fontSize: '1.75rem', lineHeight: 1.2, marginBottom: 16 }}>Vorgehen</h2>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, color: 'var(--color-text-muted)' }}>
                  {CASE.approach.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>

            {CASE.result && (
              <div style={{ marginTop: 'clamp(96px, 10vw, 128px)' }}>
                <h2 className="font-display" style={{ fontSize: '1.75rem', lineHeight: 1.2, marginBottom: 24 }}>Resultat</h2>
                <p className="font-display" style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', lineHeight: 1, color: 'var(--color-text)' }}>{CASE.result.value}</p>
                <p style={{ fontSize: 18, marginTop: 12 }}>{CASE.result.label}</p>
                <p style={{ color: 'var(--color-text-muted)' }}>{CASE.result.basis}</p>
              </div>
            )}

            <Testimonials company="InspireDay" style={{ marginTop: 'clamp(96px, 10vw, 128px)' }} />
          </div>
        </section>

        <section className="section">
          <div className="container-page">
            <h2 className="font-display h-section" style={{ maxWidth: 760, marginBottom: 32 }}>Sprechen wir über Ihr Projekt</h2>
            <Link to="/#contact" className="btn-accent">
              Erstgespräch anfragen
              <ArrowUpRight />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
