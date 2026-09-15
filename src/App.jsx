import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CaseInspireDay from './pages/CaseInspireDay'
import WebsiteCheck from './pages/WebsiteCheck'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'
import AGB from './pages/AGB'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/referenzen/inspireday" element={<CaseInspireDay />} />
          <Route path="/website-check" element={<WebsiteCheck />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/agb" element={<AGB />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
