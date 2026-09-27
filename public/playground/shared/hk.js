/* «Holzwerk Keller» als Markup: Desktop ('d') und Mobil ('m').
   Bausteine tragen data-k, damit Varianten sie einzeln ansprechen können. */

const HK_TEXT = {
  eyebrow: 'Schreinerei in Winterthur',
  h1: 'Möbel nach Mass, gebaut für Jahrzehnte.',
  p: 'Küchen, Einbauschränke und Tische aus Schweizer Holz. Geplant mit Ihnen, gefertigt in unserer Werkstatt.',
  tag: { a: 'Eichentisch, massiv', b: 'Küche in Esche' },
}

function hkCards() {
  return [
    ['1', 'Küchen', 'Fronten in Eiche, Nussbaum, Esche'],
    ['2', 'Einbauschränke', 'Jeder Zentimeter genutzt'],
    ['3', 'Tische', 'Massiv, geölt, reparierbar'],
  ].map(([n, t, d]) => `<div class="hk-card"><div class="hk-card-img hk-card-img--${n}"></div><div><h4>${t}</h4><p>${d}</p></div></div>`).join('')
}

// eslint-disable-next-line no-unused-vars
function hkHTML(mode, { photo = 'a', banner = '' } = {}) {
  const k = (key) => ` data-k="${key}"`
  const photoEl = `<div class="hk-photo hk-photo--${photo}"${k('photo')}><span class="hk-photo-tag">${HK_TEXT.tag[photo]}</span></div>`
  if (mode === 'd') {
    return `
    <div class="hk hk--d hk-root" aria-hidden="true">
      ${banner ? `<div class="hk-banner">${banner}</div>` : ''}
      <div class="hk-body">
        <nav class="hk-nav">
          <div class="hk-logo"${k('logo')}>Holzwerk <span>Keller</span></div>
          <div class="hk-links"${k('nav')}><span>Leistungen</span><span>Projekte</span><span>Über uns</span><span>Kontakt</span></div>
          <div class="hk-cta"${k('cta')}>Offerte anfragen</div>
        </nav>
        <section class="hk-hero">
          <div>
            <p class="hk-eyebrow"${k('eyebrow')}>${HK_TEXT.eyebrow}</p>
            <h1 class="hk-h1"${k('h1')}>${HK_TEXT.h1}</h1>
            <p class="hk-p"${k('p')}>${HK_TEXT.p}</p>
            <div class="hk-btnrow"${k('btn')}><span class="hk-btn">Beratung buchen</span><span class="hk-btn hk-btn--ghost">Projekte ansehen</span></div>
          </div>
          ${photoEl}
        </section>
        <section class="hk-cards"${k('cards')}>${hkCards()}</section>
      </div>
    </div>`
  }
  return `
  <div class="hk hk--m hk-root" aria-hidden="true">
    <div class="hk-body">
      <nav class="hk-nav">
        <div class="hk-logo"${k('logo')}>Holzwerk <span>Keller</span></div>
        <div class="hk-burger"${k('nav')}></div>
      </nav>
      <section class="hk-hero">
        <p class="hk-eyebrow"${k('eyebrow')}>${HK_TEXT.eyebrow}</p>
        <h1 class="hk-h1"${k('h1')}>${HK_TEXT.h1}</h1>
        <p class="hk-p"${k('p')}>${HK_TEXT.p}</p>
        <div class="hk-btnrow"${k('btn')}><span class="hk-btn">Beratung buchen</span></div>
        ${photoEl}
      </section>
      <section class="hk-cards"${k('cards')}>${hkCards()}</section>
      <footer class="hk-foot">Holzwerk Keller · Werkstatt in Winterthur</footer>
    </div>
  </div>`
}

/* Fixe Handy-Leiste unten; liegt ausserhalb des gescrollten Inhalts */
// eslint-disable-next-line no-unused-vars
function hkStickyHTML() {
  return `<div class="hk hk--m"><div class="hk-sticky" data-k="cta">Beratung buchen</div></div>`
}
