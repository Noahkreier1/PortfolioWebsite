import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function LegalLayout({ title, lastUpdated, children }) {
  useEffect(() => {
    document.title = `${title} · Omnia Digital`
    window.scrollTo(0, 0)
  }, [title])

  return (
    <>
      <Navbar />
      <main
        style={{ background: 'var(--color-bg)', minHeight: 'calc(100vh - 200px)' }}
        className="pt-28 sm:pt-32 pb-16 sm:pb-24"
      >
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 24,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Zurück zur Startseite
            </Link>

            <h1
              className="font-display"
              style={{
                fontWeight: 500,
                letterSpacing: '-0.035em',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                color: 'var(--color-text)',
                lineHeight: 1.05,
                marginBottom: 12,
              }}
            >
              {title}
            </h1>

            {lastUpdated && (
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 12,
                  color: 'var(--color-text-faint)',
                  marginBottom: 40,
                }}
              >
                Stand: {lastUpdated}
              </p>
            )}

            <div className="legal-content">{children}</div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
