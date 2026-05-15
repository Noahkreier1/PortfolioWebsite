import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const links = [
  { label: 'Projekte', href: '#work' },
  { label: 'Leistungen', href: '#services' },
  { label: 'Preis', href: '#preis' },
  { label: 'Über uns', href: '#about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        background: scrolled ? 'color-mix(in srgb, var(--color-bg) 88%, transparent)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 bg-accent transition-transform duration-300 group-hover:rotate-12">
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, color: 'var(--color-bg)', fontSize: 11, lineHeight: 1 }}>O</span>
          </div>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, letterSpacing: '-0.01em', color: 'var(--color-text)' }}>
            Omnia<span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}> Digital</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 bg-accent text-bg font-semibold text-xs px-5 py-2.5 rounded-full transition-all duration-300 hover:gap-3"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Termin buchen
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            aria-label="Toggle menu"
          >
            <motion.span className="block w-5 h-px bg-text-primary origin-center"
              animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }} />
            <motion.span className="block w-5 h-px bg-text-primary"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.18 }} />
            <motion.span className="block w-5 h-px bg-text-primary origin-center"
              animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.22 }} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-surface border-t border-border"
          >
            <div className="px-6 py-7 flex flex-col gap-5">
              {links.map((l, i) => (
                <motion.a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="text-xl font-bold text-text-primary"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a href="#contact" onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                className="mt-2 btn-accent self-start"
              >
                Termin buchen
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
