/* Nach oben scrollen — respektiert die Systemeinstellung für reduzierte Bewegung */
export function scrollToTop() {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

/* Klick auf das Logo: auf der Startseite nur nach oben scrollen (und den Anker
   aus der Adresszeile entfernen), von Unterseiten aus normal navigieren. */
export function handleLogoClick(event, pathname) {
  if (pathname !== '/') return
  event.preventDefault()
  if (window.location.hash) window.history.replaceState(null, '', '/')
  // Erst im nächsten Frame scrollen: Bei offenem Menü ist das Scrollen über
  // body noch gesperrt, und ein Scroll-Befehl bliebe wirkungslos.
  requestAnimationFrame(() => requestAnimationFrame(scrollToTop))
}
