import { Link } from 'react-router-dom'
import { COMPANY } from '../data/company'

const navLinks = [
  { label: 'Referenzen', href: '/#work' },
  { label: 'Ablauf', href: '/#process' },
  { label: 'Leistungen', href: '/#services' },
  { label: 'Preise', href: '/#preis' },
  { label: 'Über uns', href: '/#about' },
  { label: 'Kontakt', href: '/#contact' },
]

const legalLinks = [
  { label: 'Impressum', to: '/impressum' },
  { label: 'Datenschutz', to: '/datenschutz' },
  { label: 'AGB', to: '/agb' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-bg-soft)', borderTop: '1px solid var(--color-border)' }}>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-8">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded flex items-center justify-center bg-accent flex-shrink-0">
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, color: 'var(--color-bg)', fontSize: 10 }}>O</span>
              </div>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 14, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>
                Omnia<span style={{ color: 'var(--color-text-faint)', fontWeight: 400 }}> Digital</span>
              </span>
            </Link>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'var(--color-text-faint)', lineHeight: 1.6 }}>
              {COMPANY.street}, {COMPANY.zip} {COMPANY.city}
              <br />
              <a
                href={`mailto:${COMPANY.email}`}
                style={{ color: 'inherit' }}
                className="hover:text-text-muted transition-colors"
              >
                {COMPANY.email}
              </a>
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-2">
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: 'var(--color-text-subtle)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>
              Navigation
            </p>
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'var(--color-text-faint)' }}
                className="hover:text-text-muted transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Legal links */}
          <div className="flex flex-col gap-2">
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color: 'var(--color-text-subtle)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>
              Rechtliches
            </p>
            {legalLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'var(--color-text-faint)' }}
                className="hover:text-text-muted transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid var(--color-border)' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--color-text-subtle)' }}>
            © {new Date().getFullYear()} {COMPANY.legalName} · Alle Rechte vorbehalten
          </span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--color-text-subtle)' }}>
            Gemacht mit <span style={{ color: 'var(--color-accent)' }}>✦</span> in der Schweiz
          </span>
        </div>
      </div>
    </footer>
  )
}
