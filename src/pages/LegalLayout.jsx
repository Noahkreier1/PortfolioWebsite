import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { usePageMeta } from '../lib/usePageMeta'

export default function LegalLayout({ title, lastUpdated, children }) {
  usePageMeta(title)
  useEffect(() => { window.scrollTo(0, 0) }, [title])

  return (
    <>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 200px)', paddingTop: 'clamp(112px, 14vh, 144px)', paddingBottom: 'clamp(64px, 8vw, 96px)' }}>
        <div className="container-page" style={{ maxWidth: 800 }}>
          <Link to="/" className="btn-link" style={{ marginBottom: 32 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Zur Startseite
          </Link>

          <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15, marginBottom: 12 }}>
            {title}
          </h1>
          {lastUpdated && (
            <p style={{ fontSize: 14, color: 'var(--color-text-faint)', marginBottom: 48 }}>Stand: {lastUpdated}</p>
          )}

          <div className="legal-content">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  )
}
