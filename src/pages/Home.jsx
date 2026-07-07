import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Portfolio from '../components/Portfolio'
import Process from '../components/Process'
import WhyUs from '../components/WhyUs'
import Services from '../components/Services'
import Pricing from '../components/Pricing'
import About from '../components/About'
import WebsiteAudit from '../components/WebsiteAudit'
import FAQ from '../components/FAQ'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <Process />
        <WhyUs />
        <Services />
        <Pricing />
        <About />
        <WebsiteAudit />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
