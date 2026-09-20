import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { handleLogoClick } from '../lib/scrollToTop'

const links = [
  { label: 'Referenzen', anchor: '#work' },
  { label: 'Ablauf', anchor: '#process' },
  { label: 'Preise', anchor: '#preis' },
  { label: 'Über uns', anchor: '#about' },
  { label: 'FAQ', anchor: '#faq' },
]

/* Wortmarke: Inter Tight 600, Kleinschrift, Laufweite −0.02 em.
   Bewusst enger als der Fliesstext, aber offener als die Headlines (−0.025 em),
   damit „r i“ und „i o“ nicht ineinanderlaufen. */
export function Wordmark({ size = 17 }) {
  return (
    <span className="font-display" style={{ fontSize: size, color: 'var(--color-text)', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
      zurio
    </span>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  // Von Unterseiten zurück zur Startseite mit Anker
  const navHref = (anchor) => (onHome ? anchor : `/${anchor}`)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled || menuOpen ? 'color-mix(in srgb, var(--color-bg) 92%, transparent)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        transition: 'background 0.3s ease',
      }}
    >
      <nav className="container-page h-16 flex items-center justify-between" aria-label="Hauptnavigation">
        <Link
          to="/"
          aria-label="Zurio, zum Seitenanfang"
          onClick={(e) => { setMenuOpen(false); handleLogoClick(e, pathname) }}
        >
          <Wordmark />
        </Link>

        <div className="hidden lg:flex items-center gap-6 xl:gap-10">
          {links.map((l) => (
            <a key={l.label} href={navHref(l.anchor)} className="nav-link">{l.label}</a>
          ))}
          <Link
            to="/website-check"
            className="nav-link"
            aria-current={pathname === '/website-check' ? 'page' : undefined}
            style={pathname === '/website-check' ? { color: 'var(--color-text)' } : undefined}
          >
            Website-Check
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={navHref('#contact')}
            className="hidden lg:inline-flex items-center rounded-full"
            style={{ background: 'var(--color-accent)', color: 'var(--color-bg)', fontWeight: 500, fontSize: 14, padding: '10px 20px' }}
          >
            Erstgespräch vereinbaren
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 -mr-2"
            aria-label={menuOpen ? 'Menü schliessen' : 'Menü öffnen'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="block w-5 h-px origin-center" style={{ background: 'var(--color-text)', transform: menuOpen ? 'translateY(3.5px) rotate(45deg)' : 'none', transition: 'transform 0.22s ease' }} />
            <span className="block w-5 h-px" style={{ background: 'var(--color-text)', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.18s ease' }} />
            <span className="block w-5 h-px origin-center" style={{ background: 'var(--color-text)', transform: menuOpen ? 'translateY(-3.5px) rotate(-45deg)' : 'none', transition: 'transform 0.22s ease' }} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden"
            style={{ background: 'var(--color-bg)' }}
          >
            <div className="container-page flex flex-col gap-6" style={{ paddingBlock: 40 }}>
              {links.map((l) => (
                <a key={l.label} href={navHref(l.anchor)} onClick={() => setMenuOpen(false)} className="font-display" style={{ fontSize: 24, color: 'var(--color-text)' }}>
                  {l.label}
                </a>
              ))}
              <Link to="/website-check" onClick={() => setMenuOpen(false)} className="font-display" style={{ fontSize: 24, color: 'var(--color-text)' }}>
                Website-Check
              </Link>
              <a href={navHref('#contact')} onClick={() => setMenuOpen(false)} className="btn-accent self-start" style={{ marginTop: 16 }}>
                Erstgespräch vereinbaren
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
