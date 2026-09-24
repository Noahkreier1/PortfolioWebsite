import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { handleLogoClick } from '../lib/scrollToTop'
import { COMPANY } from '../data/company'

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

  const toggleRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Menü offen: Fokus auf den ersten Link, Esc schliesst, Tab bleibt im Menü
  useEffect(() => {
    if (!menuOpen) return
    const focusables = () => [toggleRef.current, ...(menuRef.current?.querySelectorAll('a, button') ?? [])].filter(Boolean)
    requestAnimationFrame(() => menuRef.current?.querySelector('a')?.focus())
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      const items = focusables()
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
    <a href="#main" className="skip-link">Zum Inhalt springen</a>
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
          className="inline-flex items-center"
          style={{ minHeight: 44 }}
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
            className="hidden md:inline-flex items-center rounded-full"
            style={{ background: 'var(--color-accent)', color: 'var(--color-bg)', fontWeight: 500, fontSize: 14, padding: '10px 20px' }}
          >
            Erstgespräch anfragen
          </a>

          <button
            ref={toggleRef}
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col items-center justify-center gap-1.5 -mr-3"
            style={{ width: 44, height: 44, borderRadius: 12 }}
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
            ref={menuRef}
            initial={{ height: 0 }}
            animate={{ height: 'calc(100dvh - 64px)' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden"
            style={{ background: 'var(--color-bg)' }}
          >
            {/* Volle Höhe: Links oben, Kontakt unten in Daumen-Reichweite */}
            <div className="container-page flex flex-col justify-between h-full overflow-y-auto" style={{ paddingBlock: '32px 40px' }}>
              <div className="flex flex-col">
                {links.map((l) => (
                  <a key={l.label} href={navHref(l.anchor)} onClick={closeMenu} className="font-display" style={{ fontSize: 26, color: 'var(--color-text)', paddingBlock: 10 }}>
                    {l.label}
                  </a>
                ))}
                <Link to="/website-check" onClick={closeMenu} className="font-display" style={{ fontSize: 26, color: 'var(--color-text)', paddingBlock: 10 }}>
                  Website-Check
                </Link>
              </div>
              <div className="flex flex-col gap-4" style={{ paddingTop: 32 }}>
                <a href={navHref('#contact')} onClick={closeMenu} className="btn-accent">
                  Erstgespräch anfragen
                </a>
                <a href={COMPANY.phoneHref} className="text-center" style={{ fontSize: 16, color: 'var(--color-text)', fontWeight: 500, paddingBlock: 12 }}>
                  Anrufen: {COMPANY.phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  )
}
