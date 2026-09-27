/* iPhone-Markup und Skalierung (Varianten M–P) */

const IP_ICONS = `
  <svg viewBox="0 0 18 12" aria-hidden="true"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
  <svg viewBox="0 0 16 12" aria-hidden="true"><path d="M8 11.6 5.3 8.8a3.8 3.8 0 0 1 5.4 0zM3.4 6.9a6.5 6.5 0 0 1 9.2 0l1.3-1.3a8.4 8.4 0 0 0-11.8 0zM1.3 4.8a9.5 9.5 0 0 1 13.4 0L16 3.5A11.3 11.3 0 0 0 0 3.5z"/></svg>
  <svg viewBox="0 0 27 12" aria-hidden="true"><rect x="0.5" y="0.5" width="22" height="11" rx="3" fill="none" stroke="currentColor" opacity=".45"/><rect x="2" y="2" width="19" height="8" rx="1.8"/><path d="M24 4v4c.8-.3 1.5-1 1.5-2S24.8 4.3 24 4z" opacity=".5"/></svg>`

// eslint-disable-next-line no-unused-vars
function iphoneHTML({ id = '', inner = '', fg = '#111', cls = '' } = {}) {
  return `
  <div class="ip ${cls}"${id ? ` id="${id}"` : ''} style="--ip-fg:${fg}" aria-hidden="true">
    <i class="ip-btn ip-btn--l1"></i><i class="ip-btn ip-btn--l2"></i><i class="ip-btn ip-btn--l3"></i><i class="ip-btn ip-btn--r1"></i>
    <div class="ip-frame"><div class="ip-bezel"><div class="ip-screen">
      <div class="ip-view"><div class="ip-canvas">${inner}</div></div>
      <div class="ip-status"><span>9:41</span><span class="ip-icons">${IP_ICONS}</span></div>
      <div class="ip-island"></div>
      <div class="ip-home"></div>
    </div></div></div>
  </div>`
}

/* Setzt --s = Elementbreite / Basisbreite und hält es bei Grössenänderungen aktuell.
   el: Element, das skaliert wird (bekommt --s), box: Element, dessen Breite zählt. */
// eslint-disable-next-line no-unused-vars
function fitScale(el, base, box = el) {
  const apply = () => el.style.setProperty('--s', box.clientWidth / base)
  apply()
  new ResizeObserver(apply).observe(box)
}
