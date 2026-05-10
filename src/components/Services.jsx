import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const services = [
  {
    number: '01',
    title: 'Webdesign',
    description: 'Schöne, funktionale Interfaces — entworfen rund um Ihre Nutzer und Geschäftsziele. Jedes Detail ist bewusst gesetzt.',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 21V9" /></svg>,
  },
  {
    number: '02',
    title: 'Web-Entwicklung',
    description: 'Sauberer, schneller und wartbarer Code. Wir bauen mit modernen Frameworks, die mit Ihrem Unternehmen wachsen.',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  },
  {
    number: '03',
    title: 'Conversion-Optimierung',
    description: 'Datenbasierte Verbesserungen, die Besucher zu Kunden machen. Wir testen, messen und iterieren.',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>,
  },
  {
    number: '04',
    title: 'Markenidentität',
    description: 'Logo, Farben, Typografie — eine stimmige visuelle Identität, die im Gedächtnis bleibt.',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /></svg>,
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="services" className="bg-bg py-20 border-t border-border">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>

        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }} className="section-label mb-3">Was wir tun</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, letterSpacing: '-0.03em', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#EDE7DC', lineHeight: 1.1 }}>
              Vier Leistungen.<br />Aussergewöhnlich gut umgesetzt.
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">
          {services.map((s, i) => (
            <motion.div key={s.number}
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.08 }}
              className="service-card flex flex-col gap-5"
              style={{ borderRadius: 0, border: 'none' }}
            >
              <div className="flex items-start justify-between">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: '#1A1916', color: '#C4A46A' }}>
                  {s.icon}
                </div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#362F25', fontWeight: 600 }}>{s.number}</span>
              </div>
              <div>
                <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#EDE7DC', marginBottom: 8, letterSpacing: '-0.01em' }}>{s.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#7A7468', lineHeight: 1.6 }}>{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
