/* ─────────────────────────────────────────────────────────────
   Zeitachse für gescrubbte Szenen (Varianten M–P)
   Jede Szene ist eine reine Funktion render(u): u läuft in Einheiten
   von 0 bis TOTAL (1 Einheit ≈ 1 vh Scrollweg bei --pace 1).
   Dadurch sind Vorwärts- und Rückwärtsscrollen exakt gleich und jede
   Phase hat eine feste, ruhige Länge statt vorbeizuhuschen.
   ───────────────────────────────────────────────────────────── */

// eslint-disable-next-line no-unused-vars
const Z = {
  clamp01: (v) => Math.max(0, Math.min(1, v)),
  seg(u, a, b) { return Z.clamp01((u - a) / (b - a)) },
  lerp: (a, b, t) => a + (b - a) * t,
  smooth(t) { t = Z.clamp01(t); return t * t * (3 - 2 * t) },
  out(t) { t = Z.clamp01(t); return 1 - Math.pow(1 - t, 3) },
  inOut(t) { t = Z.clamp01(t); return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 },
  expoOut(t) { t = Z.clamp01(t); return t === 1 ? 1 : 1 - Math.pow(2, -10 * t) },
  backOut(t, s = 1.5) { t = Z.clamp01(t); const c = s + 1; return 1 + c * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2) },
  /* Ein- und wieder Ausblenden: 0 → 1 zwischen a und b, 1 → 0 zwischen c und d */
  window(u, a, b, c, d) { return Math.min(Z.smooth(Z.seg(u, a, b)), 1 - Z.smooth(Z.seg(u, c, d))) },
  /* Stückweise lineare Zuordnung über Stützpunkte [[u, wert], …] */
  keys(u, pts) {
    if (u <= pts[0][0]) return pts[0][1]
    for (let i = 1; i < pts.length; i++) {
      if (u <= pts[i][0]) {
        const [u0, v0] = pts[i - 1], [u1, v1] = pts[i]
        return v0 + (v1 - v0) * ((u - u0) / (u1 - u0))
      }
    }
    return pts[pts.length - 1][1]
  },
  /* Rechteck eines Elements relativ zu einem Bezugselement (Bildschirmpixel) */
  rel(el, ref) {
    const a = el.getBoundingClientRect(), b = ref.getBoundingClientRect()
    return { x: a.left - b.left, y: a.top - b.top, w: a.width, h: a.height }
  },
  /* Szene an die Scrollposition hängen. scrub = weicher Nachlauf in Sekunden. */
  scene(trigger, total, render, { scrub = 1.2 } = {}) {
    const st = { u: 0 }
    render(0)
    gsap.to(st, {
      u: total,
      ease: 'none',
      scrollTrigger: { trigger, start: 'top top', end: 'bottom bottom', scrub, invalidateOnRefresh: true },
      onUpdate: () => render(st.u),
    })
    return st
  },
}
