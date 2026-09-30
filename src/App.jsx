import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

// Unterseiten erst laden, wenn sie gebraucht werden: Die Startseite lädt dadurch schneller
const CaseInspireDay = lazy(() => import('./pages/CaseInspireDay'))
const WebsiteCheck = lazy(() => import('./pages/WebsiteCheck'))
const Impressum = lazy(() => import('./pages/Impressum'))
const Datenschutz = lazy(() => import('./pages/Datenschutz'))
const AGB = lazy(() => import('./pages/AGB'))

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
        <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/referenzen/inspireday" element={<CaseInspireDay />} />
          <Route path="/website-check" element={<WebsiteCheck />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/agb" element={<AGB />} />
          <Route path="*" element={<Home />} />
        </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  )
}
