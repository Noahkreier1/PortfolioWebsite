import { Link } from 'react-router-dom'
import { track } from '@vercel/analytics'
import CompareSlider from './CompareSlider'
import { ArrowUpRight, ChevronRight } from './Icons'

export default function Hero() {
  return (
    <section id="hero" style={{ background: 'var(--color-bg)' }}>
      <div
        className="container-page"
        style={{ paddingTop: 'clamp(128px, 18vh, 184px)', paddingBottom: 'clamp(96px, 11vw, 160px)' }}
      >
        <div style={{ maxWidth: 900 }}>
          <h1
            className="font-display"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1, color: 'var(--color-text)', marginBottom: 32, textWrap: 'balance' }}
          >
            Ihre neue Webseite. Zum Fixpreis, in zwei Wochen online.
          </h1>

          <p className="lead" style={{ fontSize: 'clamp(1.125rem, 1.6vw, 1.375rem)', maxWidth: 640, marginBottom: 48 }}>
            Wir entwerfen und programmieren Webseiten für Schweizer Unternehmen. Den Preis und den
            Termin kennen Sie vor Projektstart, und Sie sprechen immer mit den zwei Leuten, die Ihre
            Seite bauen.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
            <a href="#contact" className="btn-accent" onClick={() => track('cta_click', { location: 'hero' })}>
              Erstgespräch vereinbaren
              <ArrowUpRight />
            </a>
            <a href="#work" className="btn-link">
              Referenzen ansehen
              <ChevronRight />
            </a>
          </div>
        </div>

        <figure style={{ marginTop: 'clamp(80px, 10vw, 128px)' }}>
          <CompareSlider
            before="/before-after/inspireday-before.jpg"
            after="/before-after/inspireday-after.jpg"
            altBefore="InspireDay Webseite vor dem Relaunch"
            altAfter="InspireDay Webseite nach dem Relaunch durch Omnia Digital"
          />
          <figcaption
            className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3"
            style={{ marginTop: 20, fontSize: 15, color: 'var(--color-text-muted)' }}
          >
            <span>
              <strong style={{ color: 'var(--color-text)', fontWeight: 600 }}>InspireDay</strong>, Konferenz im
              Volkshaus Zürich: die alte und die neue Webseite. Regler ziehen zum Vergleichen.
            </span>
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
