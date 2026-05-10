const links = [
  { label: 'Projekte', href: '#work' },
  { label: 'Leistungen', href: '#services' },
  { label: 'Über uns', href: '#about' },
  { label: 'Kontakt', href: '#contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#080807', borderTop: '1px solid #1a1610' }}>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded flex items-center justify-center bg-accent flex-shrink-0">
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, color: '#0B0A09', fontSize: 10 }}>O</span>
              </div>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, color: '#EDE7DC', letterSpacing: '-0.01em' }}>
                Omnia<span style={{ color: '#4A4438', fontWeight: 400 }}> Digital</span>
              </span>
            </a>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#4A4438' }}>
              Zürich, Schweiz · hello@omniadigital.ch
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-5">
            {links.map((l) => (
              <a key={l.label} href={l.href}
                style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#4A4438' }}
                className="hover:text-text-muted transition-colors duration-200">
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid #1a1610' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#362F25' }}>
            © {new Date().getFullYear()} Omnia Digital GmbH · Alle Rechte vorbehalten
          </span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#362F25' }}>
            Gemacht mit <span style={{ color: '#C4A46A' }}>✦</span> in der Schweiz
          </span>
        </div>
      </div>
    </footer>
  )
}
