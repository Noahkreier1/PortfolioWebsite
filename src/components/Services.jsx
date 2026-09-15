import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const services = [
  {
    number: '01',
    title: 'Webdesign',
    description: 'Individuelles Design, das Ihr Angebot klar positioniert und Besucher gezielt zur Anfrage führt. Kein Template von der Stange.',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 21V9" /></svg>,
  },
  {
    number: '02',
    title: 'Web-Entwicklung',
    description: 'Von Hand entwickelt statt zusammengeklickt: schnelle Ladezeiten, saubere Technik, Bestwerte bei Google. Wächst mit Ihrem Unternehmen mit.',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  },
  {
    number: '03',
    title: 'Conversion-Optimierung',
    description: 'Wir prüfen, wo Besucher abspringen, und verbessern gezielt: Struktur, Texte, Call-to-Actions. Gemessen statt geraten.',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>,
  },
  {
    number: '04',
    title: 'Markenidentität',
    description: 'Logo, Farben, Typografie: ein stimmiger Auftritt, der auf der Webseite, in Offerten und auf Social Media wiedererkennbar ist.',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /></svg>,
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="services" className="section" style={{ background: 'var(--color-bg-soft)' }}>
      <div className="container-page" ref={ref}>

        <div className="section-head">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }} className="section-label">Was wir tun</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display h-section">
            Vier Leistungen.<br />Alles <em className="font-display-italic" style={{ fontWeight: 500 }}>aus einer Hand.</em>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-16 lg:gap-y-24 mx-auto" style={{ maxWidth: 880 }}>
          {services.map((s, i) => (
            <motion.div key={s.number}
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.08 }}
            >
              <div style={{ color: 'var(--color-accent)', marginBottom: 24 }}>
                {s.icon}
              </div>
              <h3 className="font-display" style={{ fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.2, color: 'var(--color-text)', marginBottom: 12, letterSpacing: '-0.02em' }}>{s.title}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: 'var(--color-text-muted)', lineHeight: 1.6, maxWidth: '42ch' }}>{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
