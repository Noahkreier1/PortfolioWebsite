import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CustomCursor from './components/CustomCursor'
import CookieConsent from './components/CookieConsent'
import Home from './pages/Home'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'
import AGB from './pages/AGB'

export default function App() {
  return (
    <BrowserRouter>
      <div
        className="text-text-primary min-h-screen"
        style={{ fontFamily: 'Inter, system-ui, sans-serif', background: 'var(--color-bg)' }}
      >
        <CustomCursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/agb" element={<AGB />} />
        </Routes>
        <CookieConsent />
      </div>
    </BrowserRouter>
  )
}
