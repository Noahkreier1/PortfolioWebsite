import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'cookie-consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        // Slight delay so it doesn't fight with the page-load animations
        const id = setTimeout(() => setVisible(true), 800)
        return () => clearTimeout(id)
      }
    } catch (e) {
      // If localStorage is blocked, show anyway
      setVisible(true)
    }
  }, [])

  const persist = (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ value, ts: Date.now() }))
    } catch (e) {
      /* ignore */
    }
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          role="dialog"
          aria-label="Cookie-Einstellungen"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-[100]"
          style={{
            maxWidth: 440,
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border-strong)',
            borderRadius: 14,
            padding: 20,
            boxShadow: 'var(--shadow-soft)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 11,
              fontWeight: 500,
              color: 'var(--color-text-muted)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            Cookies
          </p>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 13.5,
              color: 'var(--color-text)',
              lineHeight: 1.55,
              marginBottom: 16,
            }}
          >
            Wir nutzen Cookies, um Ihre Erfahrung zu verbessern und unsere
            Webseite zu optimieren. Notwendige Cookies sind immer aktiv.{' '}
            <Link
              to="/datenschutz"
              style={{
                color: 'var(--color-accent)',
                textDecoration: 'underline',
                textUnderlineOffset: 2,
              }}
            >
              Mehr erfahren
            </Link>
            .
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button
              type="button"
              onClick={() => persist('all')}
              style={{
                background: 'var(--color-accent)',
                color: 'var(--color-bg)',
                border: 'none',
                borderRadius: 10,
                padding: '11px 16px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: '-0.01em',
                cursor: 'pointer',
                transition: 'box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 6px 20px rgba(196,164,106,0.25)')}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              Alle akzeptieren
            </button>
            <button
              type="button"
              onClick={() => persist('necessary')}
              style={{
                background: 'transparent',
                color: 'var(--color-text-muted)',
                border: '1px solid var(--color-border)',
                borderRadius: 10,
                padding: '11px 16px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: 13,
                letterSpacing: '-0.01em',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-strong)'
                e.currentTarget.style.color = 'var(--color-text)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.color = 'var(--color-text-muted)'
              }}
            >
              Nur notwendige
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
