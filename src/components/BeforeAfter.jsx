import { Link } from 'react-router-dom'
import CompareSlider from './CompareSlider'
import Testimonials from './Testimonials'
import { ChevronRight } from './Icons'

// Was sich konkret verändert hat, direkt aus den beiden Screenshots ablesbar
const CHANGES = [
  { title: 'Tickets im ersten Bildschirm', text: 'Vorher war „Sag Hallo“ der einzige Button. Jetzt steht der Ticket-Button mit Early-Bird-Preis direkt unter der Headline.' },
  { title: 'Datum und Ort auf einen Blick', text: 'Wann und wo die Konferenz stattfindet, steht über der Headline, dazu ein Countdown bis zum Event.' },
  { title: 'Klare Botschaft auf Deutsch', text: 'Statt „A space created for greatness“ sagt die Headline in einem Satz, worum es geht.' },
]

/* Vorher/Nachher nach den Referenzen: erst zeigen, was wir gebaut haben, dann den Unterschied */
export default function BeforeAfter() {
  return (
    <section id="vorher-nachher" className="section" style={{ background: 'var(--color-bg)', paddingTop: 'clamp(96px, 10vw, 128px)', paddingBottom: 0 }}>
      <div className="container-page">
        <div className="section-head">
          <h2 className="font-display h-section">Vorher und nachher</h2>
          <p className="lead">
            Die Webseite der Konferenz InspireDay im Volkshaus Zürich, vor und nach dem Relaunch durch uns.
          </p>
        </div>

        <figure>
          <CompareSlider
            before="/before-after/inspireday-before.jpg"
            after="/before-after/inspireday-after.jpg"
            altBefore="InspireDay Webseite vor dem Relaunch"
            altAfter="InspireDay Webseite nach dem Relaunch durch Zurio"
          />
          <figcaption
            className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3"
            style={{ marginTop: 20, fontSize: 15, color: 'var(--color-text-muted)' }}
          >
            <span className="hidden sm:inline">Links die alte, rechts die neue Startseite. Regler ziehen zum Vergleichen.</span>
            <Link to="/referenzen/inspireday" className="btn-link" style={{ whiteSpace: 'nowrap' }}>
              Zur Case Study
              <ChevronRight />
            </Link>
          </figcaption>
        </figure>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10" style={{ marginTop: 'clamp(48px, 6vw, 72px)' }}>
          {CHANGES.map((c) => (
            <div key={c.title}>
              <h3 style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.35, marginBottom: 8 }}>{c.title}</h3>
              <p style={{ fontSize: 15, color: 'var(--color-text-muted)' }}>{c.text}</p>
            </div>
          ))}
        </div>

        <Testimonials company="InspireDay" style={{ marginTop: 'clamp(64px, 8vw, 96px)' }} />
      </div>
    </section>
  )
}
