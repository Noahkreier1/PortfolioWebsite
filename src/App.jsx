import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CustomCursor from './components/CustomCursor'
import CookieConsent from './components/CookieConsent'
import Home from './pages/Home'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'
import AGB from './pages/AGB'
import HeroV1 from './heroes/HeroV1'
import HeroV2 from './heroes/HeroV2'
import HeroV3 from './heroes/HeroV3'
import HeroV4 from './heroes/HeroV4'
import HeroV5 from './heroes/HeroV5'
import HeroV6 from './heroes/HeroV6'
import HeroV7 from './heroes/HeroV7'
import HeroV8 from './heroes/HeroV8'

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
          {/* Hero-Varianten zum Vergleich — nach Entscheid wieder entfernen */}
          <Route path="/v1" element={<HeroV1 />} />
          <Route path="/v2" element={<HeroV2 />} />
          <Route path="/v3" element={<HeroV3 />} />
          <Route path="/v4" element={<HeroV4 />} />
          <Route path="/v5" element={<HeroV5 />} />
          <Route path="/v6" element={<HeroV6 />} />
          <Route path="/v7" element={<HeroV7 />} />
          <Route path="/v8" element={<HeroV8 />} />
        </Routes>
        <CookieConsent />
      </div>
    </BrowserRouter>
  )
}
