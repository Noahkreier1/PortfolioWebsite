/* Gemeinsames Setup: GSAP + ScrollTrigger + Lenis, mit Rücksicht auf reduzierte Bewegung.
   Gibt { reduced, lenis } zurück. Lenis hängt an window.__lenis (für Tests). */

// eslint-disable-next-line no-unused-vars
function setupMotion() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  gsap.registerPlugin(ScrollTrigger)

  let lenis = null
  if (!reduced && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((t) => lenis.raf(t * 1000))
    gsap.ticker.lagSmoothing(0)
    window.__lenis = lenis
  }
  return { reduced, lenis }
}

/* will-change nur während eine Szene aktiv ist, danach wieder frei */
// eslint-disable-next-line no-unused-vars
function toggleWillChange(els, value) {
  els.forEach((el) => { if (el) el.style.willChange = value })
}
