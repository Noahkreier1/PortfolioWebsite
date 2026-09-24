import { track } from '@vercel/analytics'
import { COMPANY } from '../data/company'
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
            style={{ fontSize: 'clamp(2.25rem, 5.4vw, 4.5rem)', lineHeight: 1.1, color: 'var(--color-text)', marginBottom: 32, textWrap: 'balance' }}
          >
            Für Firmen, die den ersten Eindruck nicht dem Zufall überlassen.
          </h1>

          <p className="lead" style={{ fontSize: 'clamp(1.125rem, 1.6vw, 1.375rem)', maxWidth: 640, marginBottom: 48 }}>
            Wir entwerfen und programmieren Webseiten für Schweizer Unternehmen. Vom ersten Gespräch
            bis zum Launch sprechen Sie mit den zwei Leuten, die Ihre Seite bauen.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
            <a href="#contact" className="btn-accent" onClick={() => track('cta_click', { location: 'hero' })}>
              Erstgespräch anfragen
              <ArrowUpRight />
            </a>
            <a href="#work" className="btn-link">
              Referenzen ansehen
              <ChevronRight />
            </a>
          </div>
          <p style={{ marginTop: 20, fontSize: 15, color: 'var(--color-text-muted)' }}>
            30 Minuten, kostenlos und unverbindlich. Oder direkt anrufen:{' '}
            <a href={COMPANY.phoneHref} style={{ color: 'var(--color-text)', fontWeight: 500, whiteSpace: 'nowrap', textDecoration: 'underline', textUnderlineOffset: 4, textDecorationColor: 'var(--color-border-strong)' }}>
              {COMPANY.phone}
            </a>
          </p>
        </div>

      </div>
    </section>
  )
}
