import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Portfolio from '../components/Portfolio'
import Process from '../components/Process'
import Pricing from '../components/Pricing'
import About from '../components/About'
import CheckTeaser from '../components/CheckTeaser'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { usePageMeta } from '../lib/usePageMeta'

export default function Home() {
  usePageMeta()
  const { hash } = useLocation()

  // Von Unterseiten kommend (/#contact): zum Anker scrollen, sobald die Seite steht
  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) requestAnimationFrame(() => el.scrollIntoView())
  }, [hash])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <Process />
        <Pricing />
        <About />
        <CheckTeaser />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
