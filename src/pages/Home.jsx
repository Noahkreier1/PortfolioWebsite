import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import WebsiteAudit from '../components/WebsiteAudit'
import Portfolio from '../components/Portfolio'
import Services from '../components/Services'
import Pricing from '../components/Pricing'
import About from '../components/About'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WebsiteAudit />
        <Portfolio />
        <Services />
        <Pricing />
        <About />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
