import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WebsiteAudit from './components/WebsiteAudit'
import Portfolio from './components/Portfolio'
import Services from './components/Services'
import About from './components/About'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-bg text-text-primary min-h-screen" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <WebsiteAudit />
        <Portfolio />
        <Services />
        <About />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
