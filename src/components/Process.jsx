const steps = [
  {
    number: '1',
    title: 'Erstgespräch',
    detail: '30 Minuten · kostenlos',
    description:
      'Wir besprechen Ihre Ziele, Ihren aktuellen Auftritt und was Ihre Kunden brauchen. Danach wissen Sie, ob wir zusammenpassen. Ohne Verpflichtung.',
  },
  {
    number: '2',
    title: 'Festofferte & Konzept',
    detail: '2–3 Tage',
    description:
      'Sie erhalten eine verbindliche Offerte mit Fixpreis und Liefertermin, dazu einen klaren Vorschlag für Struktur und Inhalt. Zusatzleistungen gibt es nur mit schriftlicher Zusatzofferte.',
  },
  {
    number: '3',
    title: 'Design & Umsetzung',
    detail: '1–2 Wochen ab Auftrag',
    description:
      'Wir gestalten und programmieren Ihre Webseite. Sie sehen laufend den Stand und geben Ihr Feedback direkt an die Leute, die daran arbeiten.',
  },
  {
    number: '4',
    title: 'Launch & Betreuung',
    detail: '30 Tage inklusive',
    description:
      'Wir schalten die Seite auf, richten Domain und Hosting ein und passen in den ersten 30 Tagen kostenlos an. Auf Wunsch betreuen wir die Seite danach weiter.',
  },
]

export default function Process() {
  return (
    <section id="process" className="section" style={{ background: 'var(--color-bg)', paddingBlock: 'clamp(96px, 10vw, 128px)' }}>
      <div className="container-page">
        <div className="section-head">
          <h2 className="font-display h-section">So läuft ein Projekt ab</h2>
          <p className="lead">
            Ab Auftrag ist eine typische Webseite in ein bis zwei Wochen online. Sie wissen zu jedem Zeitpunkt,
            was passiert, was es kostet und wann es fertig ist.
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16" style={{ listStyle: 'none' }}>
          {steps.map((step) => (
            <li key={step.number}>
              <p
                className="font-display"
                aria-hidden="true"
                style={{ fontSize: '2.5rem', lineHeight: 1, color: 'var(--color-accent)', marginBottom: 24, fontVariationSettings: "'wght' 500" }}
              >
                {step.number}
              </p>
              <h3 className="font-display" style={{ fontSize: '1.375rem', lineHeight: 1.2, color: 'var(--color-text)', marginBottom: 8 }}>
                {step.title}
              </h3>
              <p className="meta-line" style={{ fontSize: 12, marginBottom: 16 }}>
                {step.detail}
              </p>
              <p style={{ color: 'var(--color-text-muted)' }}>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
