import { Link } from 'react-router-dom'
import CompareSlider from './CompareSlider'
import { ChevronRight } from './Icons'

/* Vorher/Nachher nach den Referenzen: erst zeigen, was wir gebaut haben, dann den Unterschied */
export default function BeforeAfter() {
  return (
    <section id="vorher-nachher" className="section" style={{ background: 'var(--color-bg)', paddingBottom: 0 }}>
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
      </div>
    </section>
  )
}
