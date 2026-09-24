import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WebsiteAudit from '../components/WebsiteAudit'
import { usePageMeta } from '../lib/usePageMeta'

export default function WebsiteCheck() {
  usePageMeta(
    'Kostenloser Website-Check',
    'Messen Sie Ladegeschwindigkeit, SEO-Grundlagen, Barrierefreiheit und technische Qualität Ihrer Webseite mit Google PageSpeed Insights.'
  )
  useEffect(() => { window.scrollTo(0, 0) }, [])
  // Adresse aus dem Einstieg auf der Startseite (/website-check?url=…)
  const [params] = useSearchParams()

  return (
    <>
      <Navbar />
      <main id="main" style={{ paddingTop: 'clamp(128px, 16vh, 168px)', paddingBottom: 'clamp(96px, 11vw, 160px)' }}>
        <div className="container-page">
          <div className="section-head">
            <h1 className="font-display h-section">Wie gut ist Ihre heutige Webseite?</h1>
            <p className="lead">
              Geben Sie Ihre Adresse ein. Google PageSpeed Insights misst Ladegeschwindigkeit,
              SEO-Grundlagen, Barrierefreiheit und technische Qualität, so wie Google Ihre Seite sieht.
            </p>
          </div>
          <div style={{ maxWidth: 760 }}>
            <WebsiteAudit initialUrl={params.get('url') || ''} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
