const links = [
  { label: 'Projekte', href: '#work' },
  { label: 'Leistungen', href: '#services' },
  { label: 'Über uns', href: '#about' },
  { label: 'Kontakt', href: '#contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-bg-soft)', borderTop: '1px solid var(--color-border)' }}>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded flex items-center justify-center bg-accent flex-shrink-0">
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, color: 'var(--color-bg)', fontSize: 10 }}>O</span>
              </div>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>
                Omnia<span style={{ color: 'var(--color-text-faint)', fontWeight: 400 }}> Digital</span>
              </span>
            </a>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'var(--color-text-faint)' }}>
              Zürich, Schweiz · hello@omniadigital.ch
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-5">
            {links.map((l) => (
              <a key={l.label} href={l.href}
                style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'var(--color-text-faint)' }}
                className="hover:text-text-muted transition-colors duration-200">
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid var(--color-border)' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--color-text-subtle)' }}>
            © {new Date().getFullYear()} Omnia Digital GmbH · Alle Rechte vorbehalten
          </span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--color-text-subtle)' }}>
            Gemacht mit <span style={{ color: 'var(--color-accent)' }}>✦</span> in der Schweiz
          </span>
        </div>
      </div>
    </footer>
  )
}
