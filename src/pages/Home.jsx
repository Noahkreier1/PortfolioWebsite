import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Portfolio from '../components/Portfolio'
import BeforeAfter from '../components/BeforeAfter'
import Process from '../components/Process'
import Pricing from '../components/Pricing'
import About from '../components/About'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { usePageMeta } from '../lib/usePageMeta'

export default function Home() {
  usePageMeta()
  const { hash } = useLocation()

  // Von Unterseiten kommend: zum Anker scrollen (/#contact) oder oben beginnen
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const el = document.getElementById(hash.slice(1))
    if (el) requestAnimationFrame(() => el.scrollIntoView())
  }, [hash])

  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Portfolio />
        <BeforeAfter />
        <Process />
        <Pricing />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
