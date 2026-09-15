import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: 3 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const CrossIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--color-text-subtle)', flexShrink: 0, marginTop: 3 }}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
)

const alternatives = [
  {
    title: 'Baukasten',
    subtitle: 'Wix, Squarespace & Co.',
    points: [
      { ok: false, text: 'Sieht aus wie tausend andere Seiten' },
      { ok: false, text: 'Sie bauen selbst und es bleibt Ihr Abend-Projekt' },
      { ok: false, text: 'Niemand denkt über Ihre Kunden und Texte nach' },
    ],
  },
  {
    title: 'Marktplatz-Freelancer',
    subtitle: 'Fiverr, Upwork & Co.',
    points: [
      { ok: false, text: 'Qualität ist ein Glücksspiel' },
      { ok: false, text: 'Kommunikation über Zeitzonen und Sprachbarrieren' },
      { ok: false, text: 'Nach der Abnahme meist nicht mehr erreichbar' },
    ],
  },
  {
    title: 'Grossagentur',
    subtitle: 'Der klassische Weg',
    points: [
      { ok: false, text: 'Ab CHF 20’000 aufwärts, Projektdauer in Monaten' },
      { ok: false, text: 'Sie sprechen mit Projektleitern, nicht mit den Machern' },
      { ok: false, text: 'KMU-Projekte laufen dort unter «Kleinkunde»' },
    ],
  },
]

const omniaPoints = [
  { ok: true, text: 'Individuelles Design, von Hand entwickelt' },
  { ok: true, text: 'Fixpreis und Liefertermin, garantiert ab Offerte' },
  { ok: true, text: 'In 1–2 Wochen online statt in Monaten' },
  { ok: true, text: 'Direkter Draht zu den zwei Leuten, die Ihre Seite bauen' },
  { ok: true, text: '30 Tage Anpassungen nach Launch inklusive' },
]

export default function WhyUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="whyus" className="section" style={{ background: 'var(--color-bg)' }}>
      <div className="container-page" ref={ref}>

        <div className="section-head">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }} className="section-label">Ihre Optionen im Vergleich</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display h-section">
            Es gibt viele Wege zur Webseite.<br />
            <em className="font-display-italic" style={{ fontWeight: 500 }}>Die meisten enttäuschen.</em>
          </motion.h2>
        </div>

        {/* Tension: the three alternatives, quiet and unboxed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16 mx-auto" style={{ maxWidth: 980 }}>
          {alternatives.map((alt, i) => (
            <motion.div
              key={alt.title}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.08 }}
            >
              <h3 className="font-display" style={{ fontWeight: 500, fontSize: '1.375rem', lineHeight: 1.2, color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: 8 }}>
                {alt.title}
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'var(--color-text-faint)', marginBottom: 24 }}>
                {alt.subtitle}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {alt.points.map((p) => (
                  <li key={p.text} style={{ display: 'flex', gap: 12, fontFamily: 'Inter, sans-serif', fontSize: 16, color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                    <CrossIcon />
                    {p.text}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Release: Omnia as its own isolated statement */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto text-center"
          style={{
            maxWidth: 980,
            marginTop: 'clamp(96px, 12vw, 160px)',
            background: 'var(--color-bg-soft)',
            borderRadius: 32,
            padding: 'clamp(48px, 8vw, 96px) clamp(24px, 6vw, 96px)',
          }}
        >
          <p className="section-label justify-center" style={{ color: 'var(--color-accent)', marginBottom: 16 }}>
            Omnia Digital
          </p>
          <h3 className="font-display" style={{ fontWeight: 500, fontSize: 'clamp(2rem, 3.6vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.028em', color: 'var(--color-text)', marginBottom: 'clamp(48px, 6vw, 64px)' }}>
            Agentur-Qualität,<br /><em className="font-display-italic" style={{ fontWeight: 500 }}>ohne Agentur-Ballast.</em>
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 text-left mx-auto" style={{ listStyle: 'none', padding: 0, maxWidth: 720 }}>
            {omniaPoints.map((p) => (
              <li key={p.text} style={{ display: 'flex', gap: 12, fontFamily: 'Inter, sans-serif', fontSize: 16, color: 'var(--color-text)', lineHeight: 1.55 }}>
                <CheckIcon />
                {p.text}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 'clamp(48px, 6vw, 64px)' }}>
            <a href="#contact" className="btn-accent">
              Erstgespräch buchen
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
