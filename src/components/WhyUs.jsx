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
    <section id="whyus" className="py-14 sm:py-20 border-t border-border" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-6" ref={ref}>

        <div className="mb-12 max-w-2xl">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }} className="section-label mb-3">Ihre Optionen im Vergleich</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display"
            style={{ fontWeight: 500, letterSpacing: '-0.035em', fontSize: 'clamp(2rem, 3.8vw, 3rem)', color: 'var(--color-text)', lineHeight: 1.05, marginBottom: '0.75rem' }}>
            Es gibt viele Wege zur Webseite.<br />
            <em className="font-display-italic" style={{ fontWeight: 500 }}>Die meisten enttäuschen.</em>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {alternatives.map((alt, i) => (
            <motion.div
              key={alt.title}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.08 }}
              className="rounded-xl p-6 flex flex-col"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--color-text)', letterSpacing: '-0.01em', marginBottom: 2 }}>
                {alt.title}
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--color-text-faint)', marginBottom: 16 }}>
                {alt.subtitle}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {alt.points.map((p) => (
                  <li key={p.text} style={{ display: 'flex', gap: 9, fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                    <CrossIcon />
                    {p.text}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Omnia — hervorgehoben */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.34 }}
            className="rounded-xl p-6 flex flex-col relative overflow-hidden"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-accent)', boxShadow: '0 8px 32px var(--color-accent-glow)' }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)' }} />
            <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--color-accent)', letterSpacing: '-0.01em', marginBottom: 2 }}>
              Omnia Digital
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--color-text-faint)', marginBottom: 16 }}>
              Agentur-Qualität, ohne Agentur-Ballast
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
              {omniaPoints.map((p) => (
                <li key={p.text} style={{ display: 'flex', gap: 9, fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: 'var(--color-text)', lineHeight: 1.5 }}>
                  <CheckIcon />
                  {p.text}
                </li>
              ))}
            </ul>
            <a href="#contact" style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, color: 'var(--color-accent)', display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 'auto' }}>
              Erstgespräch buchen
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
