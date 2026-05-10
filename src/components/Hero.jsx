import { motion } from 'framer-motion'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

const STATS = [
  { value: '47+', label: 'Projekte' },
  { value: '98%', label: 'Kundenbindung' },
  { value: '4 Wo.', label: 'Ø Lieferzeit' },
]

function BrowserMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative hidden lg:block w-[360px] flex-shrink-0"
    >
      <div
        className="rounded-xl overflow-hidden"
        style={{
          border: '1px solid #2E2820',
          background: '#100F0D',
          boxShadow: '0 32px 64px rgba(0,0,0,0.5)',
        }}
      >
        {/* Chrome */}
        <div style={{ background: '#161410', padding: '10px 14px', borderBottom: '1px solid #2E2820', display: 'flex', alignItems: 'center', gap: 5 }}>
          {[0,1,2].map(i => (
            <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: '#2E2820', display: 'inline-block' }} />
          ))}
          <div style={{ flex: 1, height: 22, borderRadius: 4, marginLeft: 10, background: '#1C1A17', display: 'flex', alignItems: 'center', paddingLeft: 9 }}>
            <span style={{ fontSize: 10, color: '#4A4438', fontFamily: 'Inter, sans-serif' }}>inspireday.ch</span>
          </div>
        </div>

        {/* Project visual */}
        <div style={{ background: 'linear-gradient(155deg, #180810 0%, #2A0A1C 60%, #180810 100%)', height: 260, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '30%', left: '62%', width: 240, height: 240, transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, rgba(210,70,120,0.28) 0%, transparent 70%)', filter: 'blur(32px)' }} />
          <div style={{ position: 'absolute', top: '72%', left: '22%', width: 150, height: 150, transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, rgba(160,30,80,0.16) 0%, transparent 70%)', filter: 'blur(24px)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 24px 22px', background: 'linear-gradient(0deg, rgba(11,10,9,0.85), transparent)' }}>
            <div style={{ height: 2, width: 24, background: '#D4608A', borderRadius: 2, marginBottom: 10, opacity: 0.7 }} />
            <div style={{ height: 15, background: 'rgba(237,231,220,0.1)', borderRadius: 3, width: '58%', marginBottom: 7 }} />
            <div style={{ height: 10, background: 'rgba(237,231,220,0.06)', borderRadius: 3, width: '40%' }} />
          </div>
        </div>
      </div>

      {/* Floating stat */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: -16, left: -18, background: '#141210', border: '1px solid #2E2820', borderRadius: 12, padding: '12px 16px', boxShadow: '0 12px 32px rgba(0,0,0,0.4)' }}
      >
        <div style={{ color: '#C4A46A', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 20, lineHeight: 1 }}>+147%</div>
        <div style={{ color: '#7A7468', fontFamily: 'Inter, sans-serif', fontSize: 10, marginTop: 4, letterSpacing: '0.02em' }}>Conversion-Steigerung</div>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col overflow-hidden bg-bg">
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Swiss cross watermark */}
      <div className="absolute right-[6%] top-[10%] pointer-events-none select-none hidden lg:block" style={{ opacity: 0.025 }}>
        <svg width="420" height="420" viewBox="0 0 420 420">
          <rect x="147" y="52" width="126" height="316" rx="12" fill="#EDE7DC" />
          <rect x="52" y="147" width="316" height="126" rx="12" fill="#EDE7DC" />
        </svg>
      </div>

      {/* Ambient glow */}
      <div className="absolute top-0 right-0 pointer-events-none" style={{ width: 480, height: 480, background: 'radial-gradient(circle at 70% 25%, rgba(196,164,106,0.05) 0%, transparent 65%)' }} />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center max-w-6xl mx-auto px-6 w-full pt-24 pb-16">
        <div className="w-full flex items-center justify-between gap-12">

          {/* Text */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[600px] w-full">

            {/* Badge */}
            <motion.div variants={item} className="flex items-center gap-2.5 mb-7">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
              </span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A7468' }}>
                Schweizer Digitalagentur · Zürich
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.03em', fontSize: 'clamp(2.6rem, 6vw, 5rem)', color: '#EDE7DC', marginBottom: '1.25rem' }}
            >
              Wir bauen Webseiten,<br />
              die <span style={{ color: '#C4A46A' }}>verkaufen.</span>
            </motion.h1>

            {/* Subline */}
            <motion.p
              variants={item}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.05rem', color: '#7A7468', lineHeight: 1.65, maxWidth: 460, marginBottom: '2.5rem' }}
            >
              Premium Design und Entwicklung für Schweizer Unternehmen, die wachsen wollen — gebaut für Resultate, nicht nur fürs Auge.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-3 mb-10">
              <a href="#contact" className="btn-accent">
                Termin buchen
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
              <a href="#work" className="btn-outline">Projekte ansehen</a>
            </motion.div>

            {/* Inline stats */}
            <motion.div variants={item} className="flex items-center gap-6 flex-wrap">
              {STATS.map((s, i) => (
                <div key={i} className="flex items-center gap-6">
                  {i > 0 && <div className="w-px h-7 bg-border" />}
                  <div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#EDE7DC', lineHeight: 1.1 }}>{s.value}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#7A7468', marginTop: 2 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <BrowserMockup />
        </div>
      </div>

      {/* Bottom border */}
      <div className="h-px w-full flex-shrink-0" style={{ background: 'rgba(237,231,220,0.05)' }} />
    </section>
  )
}
