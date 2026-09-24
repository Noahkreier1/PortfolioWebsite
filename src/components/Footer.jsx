import { Link, useLocation } from 'react-router-dom'
import { COMPANY } from '../data/company'
import { Wordmark } from './Navbar'
import { handleLogoClick } from '../lib/scrollToTop'

const navLinks = [
  { label: 'Referenzen', href: '/#work' },
  { label: 'Ablauf', href: '/#process' },
  { label: 'Preise', href: '/#preis' },
  { label: 'Über uns', href: '/#about' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Kontakt', href: '/#contact' },
]

const moreLinks = [
  { label: 'Case Study InspireDay', to: '/referenzen/inspireday' },
  { label: 'Website-Check', to: '/website-check' },
]

const legalLinks = [
  { label: 'Impressum', to: '/impressum' },
  { label: 'Datenschutz', to: '/datenschutz' },
  { label: 'AGB', to: '/agb' },
]

const headingStyle = { fontSize: 14, fontWeight: 600, color: 'var(--color-text)', marginBottom: 4 }
const linkStyle = { fontSize: 15, color: 'var(--color-text-muted)' }

export default function Footer() {
  const { pathname } = useLocation()

  return (
    <footer style={{ background: 'var(--color-bg-soft)' }}>
      <div className="container-page" style={{ paddingBlock: 'clamp(64px, 8vw, 96px)' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link
              to="/"
              aria-label="Zurio, zum Seitenanfang"
              onClick={(e) => handleLogoClick(e, pathname)}
              style={{ display: 'inline-block', marginBottom: 16 }}
            >
              <Wordmark size={20} />
            </Link>
            <p style={{ fontSize: 15, color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
              Webseiten für Schweizer KMU, aus Winterthur.
              <br />
              <a href={`mailto:${COMPANY.email}`} className="hover:underline">{COMPANY.email}</a>
              <br />
              <a href={COMPANY.phoneHref} className="hover:underline">{COMPANY.phone}</a>
            </p>
          </div>

          <nav aria-label="Seiten" className="flex flex-col gap-3">
            <p style={headingStyle}>Startseite</p>
            {navLinks.map((l) => <a key={l.label} href={l.href} style={linkStyle} className="hover:underline">{l.label}</a>)}
          </nav>

          <nav aria-label="Weitere Seiten" className="flex flex-col gap-3">
            <p style={headingStyle}>Mehr</p>
            {moreLinks.map((l) => <Link key={l.label} to={l.to} style={linkStyle} className="hover:underline">{l.label}</Link>)}
          </nav>

          <nav aria-label="Rechtliches" className="flex flex-col gap-3">
            <p style={headingStyle}>Rechtliches</p>
            {legalLinks.map((l) => <Link key={l.label} to={l.to} style={linkStyle} className="hover:underline">{l.label}</Link>)}
          </nav>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ marginTop: 64, fontSize: 13, color: 'var(--color-text-faint)' }}>
          <span>© {new Date().getFullYear()} {COMPANY.brand}</span>
          <span>Winterthur, Schweiz</span>
        </div>
      </div>
    </footer>
  )
}
