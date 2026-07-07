import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const faqs = [
  {
    q: 'Was kostet eine Webseite bei Ihnen?',
    a: 'Die meisten Projekte liegen zwischen CHF 1’000 und CHF 5’000, je nach Umfang, Design-Niveau und Modulen wie Shop oder Copywriting. Mit dem Preisrechner weiter oben sehen Sie Ihre Spanne sofort. Nach dem Erstgespräch erhalten Sie eine Festofferte, und dieser Preis gilt. Ohne Nachträge.',
  },
  {
    q: 'Wie lange dauert es bis zum Launch?',
    a: 'In der Regel ein bis zwei Wochen ab Auftrag. Grössere Projekte mit Shop oder vielen Seiten können etwas länger dauern. Den verbindlichen Termin nennen wir Ihnen in der Offerte.',
  },
  {
    q: 'Wir haben schon eine Webseite. Lohnt sich ein Neuaufbau?',
    a: 'Kommt darauf an, was sie heute leistet. Wenn über die Seite kaum Anfragen kommen, sie auf dem Handy schlecht aussieht oder Sie sich dafür ein wenig schämen: ja. Reichen Sie Ihre URL bei der kostenlosen Analyse ein, wir sagen Ihnen ehrlich, ob sich ein Neuaufbau lohnt oder nicht.',
  },
  {
    q: 'Kann ich Inhalte später selbst anpassen?',
    a: 'Wenn Sie das möchten, bauen wir Ihre Seite so, dass Sie Texte und Bilder selbst pflegen können. Viele Kunden geben Änderungen lieber kurz an uns weiter. Mit dem Wartungspaket sind kleine Anpassungen abgedeckt.',
  },
  {
    q: 'Was passiert nach dem Launch?',
    a: 'Hosting und Domain sind im ersten Jahr inklusive. In den ersten 30 Tagen passen wir kostenlos an, was Ihnen noch nicht gefällt. Danach entscheiden Sie: Wartungspaket, punktuelle Aufträge oder komplette Übergabe an Sie.',
  },
  {
    q: 'Wir haben keine Texte und keine Bilder. Geht das trotzdem?',
    a: 'Ja. Texte, die verkaufen, schreiben wir als Modul gleich mit. Für Bilder arbeiten wir mit Ihrem bestehenden Material, hochwertigen Stock-Fotos oder vermitteln bei Bedarf einen Fotografen.',
  },
]

function FaqItem({ faq, open, onToggle }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: 'var(--color-surface)', border: `1px solid ${open ? 'var(--color-accent-soft)' : 'var(--color-border)'}`, transition: 'border-color 0.25s ease' }}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 text-left"
        style={{ padding: '18px 22px', background: 'transparent', border: 'none', cursor: 'pointer' }}
      >
        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: 'var(--color-text)', letterSpacing: '-0.01em', lineHeight: 1.4 }}>
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ color: open ? 'var(--color-accent)' : 'var(--color-text-faint)', flexShrink: 0, display: 'flex' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'var(--color-text-muted)', lineHeight: 1.7, padding: '0 22px 20px' }}>
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section id="faq" className="py-14 sm:py-20 border-t border-border" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

          {/* Header links */}
          <div className="lg:col-span-2">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }} className="section-label mb-3">Häufige Fragen</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display"
              style={{ fontWeight: 500, letterSpacing: '-0.035em', fontSize: 'clamp(2rem, 3.8vw, 3rem)', color: 'var(--color-text)', lineHeight: 1.05, marginBottom: '1rem' }}>
              Was Sie <em className="font-display-italic" style={{ fontWeight: 500 }}>wissen wollen</em>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'var(--color-text-muted)', lineHeight: 1.7, maxWidth: 340 }}>
              Ihre Frage ist nicht dabei? Schreiben Sie uns, Sie erhalten innert 24 Stunden eine Antwort.
            </motion.p>
            <motion.a initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              href="mailto:hello@omniadigital.ch"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: 'var(--color-accent)', display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 14 }}>
              hello@omniadigital.ch
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </motion.a>
          </div>

          {/* Fragen rechts */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 flex flex-col gap-3"
          >
            {faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
