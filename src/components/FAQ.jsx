import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { COMPANY } from '../data/company'
import { ArrowUpRight } from './Icons'

const faqs = [
  {
    q: 'Was kostet eine Webseite bei Ihnen?',
    a: 'Kleine Webseiten beginnen bei rund CHF 700. Die meisten Projekte liegen zwischen CHF 1’000 und CHF 5’000, grosse Shops mit Branding auch darüber. Mit dem Preisrechner weiter oben sehen Sie Ihre Spanne sofort. Nach dem Erstgespräch erhalten Sie eine Festofferte, und dieser Preis gilt.',
  },
  {
    q: 'Wie läuft das Erstgespräch ab?',
    a: `Sie schicken uns über das Formular eine kurze Anfrage, wir melden uns innert 24 Stunden und schlagen Termine vor. Das Gespräch dauert rund 30 Minuten, ist kostenlos und unverbindlich. Sie können uns auch direkt anrufen: ${COMPANY.phone}.`,
  },
  {
    q: 'Wie lange dauert es bis zum Launch?',
    a: 'In der Regel ein bis zwei Wochen ab Auftrag. Grössere Projekte mit Shop oder vielen Seiten können etwas länger dauern. Den verbindlichen Termin nennen wir Ihnen in der Offerte.',
  },
  {
    q: 'Wir haben schon eine Webseite. Lohnt sich ein Neuaufbau?',
    a: 'Kommt darauf an, was sie heute leistet. Wenn über die Seite kaum Anfragen kommen oder sie auf dem Handy schlecht funktioniert: meistens ja. Messen Sie Ihre Seite mit dem kostenlosen Website-Check oder schicken Sie uns die Adresse. Wir sagen Ihnen ehrlich, ob sich ein Neuaufbau lohnt.',
    link: { to: '/website-check', label: 'Zum Website-Check' },
  },
  {
    q: 'Wem gehören Design, Code und Texte?',
    a: 'Ihnen. Mit der vollständigen Bezahlung erhalten Sie das zeitlich und örtlich unbeschränkte Nutzungsrecht an allem, was wir für Ihr Projekt erstellen. So steht es in unseren AGB.',
    link: { to: '/agb', label: 'AGB lesen' },
  },
  {
    q: 'Kann ich Inhalte später selbst anpassen?',
    a: 'Wenn Sie das möchten, bauen wir Ihre Seite so, dass Sie Texte und Bilder selbst pflegen können. Viele Kunden geben Änderungen lieber kurz an uns weiter. Mit dem Wartungspaket sind kleine Anpassungen abgedeckt.',
  },
  {
    q: 'Was passiert nach dem Launch?',
    a: 'Hosting und Domain sind im ersten Jahr inklusive. In den ersten 30 Tagen passen wir kostenlos an, was Ihnen noch nicht gefällt. Danach entscheiden Sie: Wartungspaket, einzelne Aufträge oder komplette Übergabe an Sie.',
  },
  {
    q: 'Wir haben keine Texte und keine Bilder. Geht das trotzdem?',
    a: 'Ja. Texte schreiben wir als Modul gleich mit. Für Bilder arbeiten wir mit Ihrem bestehenden Material oder mit hochwertigen Stockfotos, oder wir vermitteln bei Bedarf einen Fotografen.',
  },
]

function FaqItem({ faq, index, open, onToggle }) {
  const panelId = `faq-panel-${index}`
  return (
    <div style={{ background: 'var(--color-bg)', borderRadius: 20, overflow: 'hidden' }}>
      <h3>
        <button
          id={`faq-button-${index}`}
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="w-full flex items-center justify-between gap-6 text-left"
          style={{ padding: 'clamp(20px, 3vw, 28px) clamp(24px, 4vw, 36px)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text)', fontSize: 17, fontWeight: 600, lineHeight: 1.4 }}
        >
          {faq.q}
          <span
            aria-hidden="true"
            style={{ color: open ? 'var(--color-accent)' : 'var(--color-text-faint)', flexShrink: 0, display: 'flex', transform: `rotate(${open ? 45 : 0}deg)`, transition: 'transform 0.25s ease' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={`faq-button-${index}`}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 clamp(24px, 4vw, 36px) 32px', maxWidth: '68ch' }}>
              <p style={{ color: 'var(--color-text-muted)' }}>{faq.a}</p>
              {faq.link && (
                <Link to={faq.link.to} className="btn-link" style={{ marginTop: 12 }}>{faq.link.label}</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section id="faq" className="section" style={{ background: 'var(--color-bg-soft)' }}>
      <div className="container-page">
        <div className="section-head">
          <h2 className="font-display h-section">Häufige Fragen</h2>
        </div>

        <div className="flex flex-col gap-3" style={{ maxWidth: 820 }}>
          {faqs.map((faq, i) => (
            <FaqItem key={faq.q} faq={faq} index={i} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
          ))}
        </div>

        <div style={{ marginTop: 'clamp(64px, 8vw, 96px)', maxWidth: 600 }}>
          <p className="lead" style={{ marginBottom: 16 }}>
            Ihre Frage ist nicht dabei? Schreiben Sie uns, Sie erhalten innert 24 Stunden eine Antwort.
          </p>
          <a href={`mailto:${COMPANY.email}`} className="btn-link">
            {COMPANY.email}
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  )
}
