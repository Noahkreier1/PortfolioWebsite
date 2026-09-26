/* Mini-Webseite als HTML-String (Varianten A und B) und Skalierung auf den Bildschirm.
   withBuild = true legt über jeden Block eine graue Drahtgitter-Fassung (.wf) für Variante A. */

// eslint-disable-next-line no-unused-vars
function miniSiteHTML(withBuild = false) {
  // onReal: Blöcke, deren Optik (Hintergrund, Karte) selbst Inhalt ist, tragen die Klasse
  // auf dem echten Teil, damit sie erst mit ihm erscheinen
  const b = (cls, inner, dark, onReal) =>
    withBuild
      ? onReal
        ? `<div class="build"><div class="wf${dark ? ' wf--dark' : ''}"></div><div class="real ${cls}">${inner}</div></div>`
        : `<div class="build ${cls}"><div class="wf${dark ? ' wf--dark' : ''}"></div><div class="real">${inner}</div></div>`
      : `<div class="${cls}">${inner}</div>`

  return `
  <div class="site" aria-hidden="true">
    <nav class="site-nav">
      ${b('site-logo-wrap', '<div class="site-logo">Holzwerk <span>Keller</span></div>')}
      ${b('site-links-wrap', '<div class="site-links"><span>Leistungen</span><span>Projekte</span><span>Über uns</span><span>Kontakt</span></div>')}
      ${b('site-cta-wrap', '<div class="site-cta">Offerte anfragen</div>', true)}
    </nav>
    <section class="site-hero">
      <div>
        ${b('site-eyebrow-wrap', '<p class="site-eyebrow">Schreinerei in Winterthur</p>')}
        ${b('site-h1-wrap', '<h1 class="site-h1">Möbel nach Mass, gebaut für Jahrzehnte.</h1>', true)}
        ${b('site-p-wrap', '<p class="site-p">Küchen, Einbauschränke und Tische aus Schweizer Holz. Geplant mit Ihnen, gefertigt in unserer Werkstatt.</p>')}
        ${b('site-btns-wrap', '<div class="site-btns"><span class="site-btn">Beratung buchen</span><span class="site-btn site-btn--ghost">Projekte ansehen</span></div>', true)}
      </div>
      ${b('site-photo', '', true, true)}
    </section>
    <section class="site-cards">
      ${b('site-card', '<div class="site-card-img"></div><h4>Küchen</h4><p>Fronten in Eiche, Nussbaum, Esche</p>', false, true)}
      ${b('site-card', '<div class="site-card-img"></div><h4>Einbauschränke</h4><p>Jeder Zentimeter genutzt</p>', false, true)}
      ${b('site-card', '<div class="site-card-img"></div><h4>Tische</h4><p>Massiv, geölt, reparierbar</p>', false, true)}
    </section>
  </div>`
}

// Skaliert die 1280px-Seite auf die aktuelle Bildschirmbreite (bleibt scharf, weil echtes HTML)
// eslint-disable-next-line no-unused-vars
function fitMiniSite(screen) {
  const apply = () => screen.style.setProperty('--s', screen.clientWidth / 1280)
  apply()
  new ResizeObserver(apply).observe(screen)
}
