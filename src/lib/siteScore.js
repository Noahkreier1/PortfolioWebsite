/* ─────────────────────────────────────────────────────────────
   Zurio-Score: strenge Bewertung einer Webseite aus den Rohdaten
   von Google PageSpeed Insights (Lighthouse 13, Handy-Messung).

   Grundsätze
   · Gesamtnote = Durchschnitt der fünf Bereiche. Keine versteckten
     Deckel: Wer die fünf Balken zusammenzählt und durch fünf teilt,
     erhält genau die Gesamtnote.
   · Streng sind die Bereiche selbst: Einzelwerte mit engen Schwellen
     statt der grosszügigen Lighthouse-Kategorien.
   · Stabil: Mehrere Messläufe werden pro Einzelwert gemittelt (Median),
     und wo Google echte Besucherdaten hat (Chrome, 28 Tage), zählen sie
     stärker als die schwankende Labormessung.

   Reine Funktionen ohne Browser-Abhängigkeit (auch in Node testbar).
   ───────────────────────────────────────────────────────────── */

const KB = 1024
const MB = 1024 * 1024

/* Messwert → Punkte 0–100 über Stützpunkte [[wert, punkte], …], linear dazwischen */
function curve(v, pts) {
  if (v == null || Number.isNaN(v)) return null
  if (v <= pts[0][0]) return pts[0][1]
  for (let i = 1; i < pts.length; i++) {
    if (v <= pts[i][0]) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]
      return y0 + (y1 - y0) * ((v - x0) / (x1 - x0))
    }
  }
  return pts[pts.length - 1][1]
}
const pct = (v, pts) => { const c = curve(v, pts); return c == null ? null : c / 100 }

// Strenger als Lighthouse: volle Punkte erst, wenn es auf einem Mittelklasse-Handy wirklich flüssig ist
const LAB = {
  lcp: [[1800, 100], [2500, 90], [3000, 75], [4000, 50], [6000, 20], [8000, 0]],
  fcp: [[1200, 100], [1800, 90], [2500, 70], [3500, 40], [6000, 0]],
  si: [[2000, 100], [3400, 90], [4500, 65], [6000, 40], [9000, 0]],
  ttfb: [[200, 100], [600, 70], [1000, 40], [1800, 0]],
  tbt: [[100, 100], [200, 90], [400, 70], [600, 50], [1200, 15], [2000, 0]],
  cls: [[0.02, 100], [0.1, 90], [0.15, 70], [0.25, 40], [0.5, 0]],
  bytes: [[800 * KB, 100], [1.5 * MB, 90], [3 * MB, 60], [5 * MB, 30], [10 * MB, 0]],
  a11y: [[0.7, 0], [0.8, 30], [0.9, 65], [0.95, 85], [1, 100]],
}
// Echte Besucher (75. Perzentil), Schwellen nach Googles Core Web Vitals, oben etwas strenger
const FIELD = {
  lcp: [[1800, 100], [2500, 90], [4000, 50], [6000, 10]],
  fcp: [[1200, 100], [1800, 90], [3000, 50], [5000, 10]],
  ttfb: [[400, 100], [800, 90], [1800, 50], [3000, 10]],
  inp: [[100, 100], [200, 90], [350, 60], [500, 40], [800, 10]],
  cls: [[0.02, 100], [0.1, 90], [0.25, 40], [0.5, 0]],
}
const FIELD_WEIGHT = 0.6

/* Zahlen im Schweizer Format */
const nf1 = new Intl.NumberFormat('de-CH', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const nf0 = new Intl.NumberFormat('de-CH', { maximumFractionDigits: 0 })
const sec = (ms) => `${nf1.format(ms / 1000)} s`
const size = (b) => (b >= MB ? `${nf1.format(b / MB)} MB` : `${nf0.format(b / KB)} KB`)

export const BANDS = [
  { min: 90, label: 'Top', tone: 'good' },
  { min: 80, label: 'Gut', tone: 'good' },
  { min: 70, label: 'Ausbaufähig', tone: 'warn' },
  { min: 0, label: 'Schwach', tone: 'bad' },
]
export const bandFor = (score) => BANDS.find((b) => score >= b.min)

const median = (xs) => {
  const v = xs.filter((x) => x != null && !Number.isNaN(x)).sort((a, b) => a - b)
  if (!v.length) return null
  const m = Math.floor(v.length / 2)
  return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2
}
const avg = (...xs) => { const v = xs.filter((x) => x != null); return v.length ? v.reduce((s, x) => s + x, 0) / v.length : null }
// Labor und echte Besucher mischen; fehlt eines, zählt das andere allein
const blend = (lab, field) => (field == null ? lab : lab == null ? field : FIELD_WEIGHT * field + (1 - FIELD_WEIGHT) * lab)

/* input: eine PageSpeed-Antwort oder mehrere (Messläufe derselben Adresse) */
export function scoreSite(input) {
  const runs = (Array.isArray(input) ? input : [input]).filter((r) => r?.lighthouseResult && !r.lighthouseResult.runtimeError)
  if (!runs.length) throw new Error('Keine gültige Messung')
  const lhs = runs.map((r) => r.lighthouseResult)

  const auditIn = (lh, id) => {
    const a = lh.audits[id]
    return a && a.scoreDisplayMode !== 'notApplicable' && a.scoreDisplayMode !== 'error' ? a : null
  }
  const bin = (id) => median(lhs.map((lh) => auditIn(lh, id)?.score ?? null))
  const num = (id) => median(lhs.map((lh) => auditIn(lh, id)?.numericValue ?? null))

  const lcp = num('largest-contentful-paint'), fcp = num('first-contentful-paint'), si = num('speed-index')
  const tbt = num('total-blocking-time'), cls = num('cumulative-layout-shift'), ttfb = num('server-response-time')
  const bytes = num('total-byte-weight')
  const a11yScore = median(lhs.map((lh) => lh.categories.accessibility?.score ?? null))
  const consoleErrors = median(lhs.map((lh) => (auditIn(lh, 'errors-in-console') ? auditIn(lh, 'errors-in-console').details?.items?.length ?? 0 : null))) ?? 0
  const contrastCount = median(lhs.map((lh) => auditIn(lh, 'color-contrast')?.details?.items?.length ?? null))
  const imgSavings = median(lhs.map((lh) => (auditIn(lh, 'image-delivery-insight')?.details?.items || []).reduce((s, it) => s + (it.wastedBytes || 0), 0)))

  /* Echte Besucherdaten (Chrome UX Report): Seite selbst, sonst ganze Website */
  const hasMetrics = (e) => e?.metrics && Object.keys(e.metrics).length
  const pageExp = runs.map((r) => r.loadingExperience).find(hasMetrics)
  const exp = pageExp || runs.map((r) => r.originLoadingExperience).find(hasMetrics)
  const fm = exp?.metrics || {}
  const fp = (k) => fm[k]?.percentile ?? null
  const fLcp = fp('LARGEST_CONTENTFUL_PAINT_MS'), fFcp = fp('FIRST_CONTENTFUL_PAINT_MS'), fInp = fp('INTERACTION_TO_NEXT_PAINT')
  const fCls = fp('CUMULATIVE_LAYOUT_SHIFT_SCORE') != null ? fp('CUMULATIVE_LAYOUT_SHIFT_SCORE') / 100 : null
  const fTtfb = fp('EXPERIMENTAL_TIME_TO_FIRST_BYTE')
  const hasField = fLcp != null || fInp != null
  // Daten nur für diese Seite oder (Rückfall) für die ganze Website
  const fieldScope = hasField ? (exp === pageExp && !pageExp.origin_fallback ? 'seite' : 'website') : null

  const both = (lab, field, fmt) => [lab != null ? `${fmt(lab)} im Test` : null, field != null ? `${fmt(field)} bei echten Besuchern` : null].filter(Boolean).join(' · ') || null

  // Googles Tempo-Richtwerte (Core Web Vitals): echte Besucher, sonst Labor
  const cwv = hasField
    ? (() => {
        const cats = ['LARGEST_CONTENTFUL_PAINT_MS', 'INTERACTION_TO_NEXT_PAINT', 'CUMULATIVE_LAYOUT_SHIFT_SCORE'].map((k) => fm[k]?.category).filter(Boolean)
        return cats.includes('SLOW') ? 0 : cats.every((c) => c === 'FAST') ? 1 : 0.5
      })()
    : lcp == null ? null
    : lcp <= 2500 && cls <= 0.1 && tbt <= 200 ? 1 : lcp > 4000 || cls > 0.25 || tbt > 600 ? 0 : 0.5

  /* Fünf Bereiche mit ihren Prüfpunkten: Gewicht innerhalb des Bereichs, Ergebnis 0–1, Anzeige, Tipp */
  const AREAS = [
    {
      key: 'loading', label: 'Ladezeit',
      checks: [
        { key: 'lcp', label: 'Hauptinhalt sichtbar', weight: 50, s: blend(pct(lcp, LAB.lcp), pct(fLcp, FIELD.lcp)), value: both(lcp, fLcp, sec), fix: 'Das grösste Bild oder den Titel schneller ausliefern: Bild verkleinern, vorladen und nicht erst per JavaScript nachladen.' },
        { key: 'fcp', label: 'Erster Inhalt sichtbar', weight: 20, s: blend(pct(fcp, LAB.fcp), pct(fFcp, FIELD.fcp)), value: both(fcp, fFcp, sec), fix: 'Blockierende Skripte und Stylesheets reduzieren und Schriften vorladen.' },
        { key: 'si', label: 'Seite wirkt fertig', weight: 15, s: pct(si, LAB.si), value: si != null ? `${sec(si)} im Test` : null, fix: 'Sichtbaren Inhalt zuerst laden, alles andere später.' },
        { key: 'ttfb', label: 'Schnelle Server-Antwort', weight: 15, s: blend(pct(ttfb, LAB.ttfb), pct(fTtfb, FIELD.ttfb)), value: both(ttfb, fTtfb, (ms) => `${nf0.format(ms)} ms`), fix: 'Schnelleres Hosting oder einen Seiten-Cache verwenden.' },
      ],
    },
    {
      key: 'usability', label: 'Bedienung auf dem Handy',
      checks: [
        { key: 'inp', label: 'Reagiert sofort auf Eingaben', weight: 30, s: blend(pct(tbt, LAB.tbt), pct(fInp, FIELD.inp)), value: [tbt != null ? `${nf0.format(tbt)} ms blockiert im Test` : null, fInp != null ? `${nf0.format(fInp)} ms Reaktion bei echten Besuchern` : null].filter(Boolean).join(' · ') || null, fix: 'Weniger und kleineres JavaScript laden, Drittanbieter-Skripte (Tracking, Widgets) prüfen.' },
        { key: 'cls', label: 'Layout bleibt beim Laden stabil', weight: 25, s: blend(pct(cls, LAB.cls), pct(fCls, FIELD.cls)), value: cls != null ? (cls < 0.005 && (fCls == null || fCls < 0.005) ? 'kein Springen' : `Verschiebung ${cls.toFixed(2)}`) : null, fix: 'Bildern, Bannern und Einblendungen feste Masse geben, damit nichts nachrutscht.' },
        { key: 'viewport', label: 'Für Handys eingerichtet', weight: 20, s: bin('viewport-insight'), fix: 'Ein passendes Viewport-Meta-Tag setzen, damit die Seite auf dem Handy nicht verkleinert wird.' },
        { key: 'target', label: 'Gross genug zum Antippen', weight: 15, s: bin('target-size'), fix: 'Buttons und Links mindestens 24 × 24 Pixel gross und mit Abstand anlegen.' },
        { key: 'zoom', label: 'Zoomen erlaubt', weight: 10, s: bin('meta-viewport'), fix: 'Das Zoomen auf dem Handy nicht sperren.' },
      ],
    },
    {
      key: 'tech', label: 'Technik und Sauberkeit',
      checks: [
        { key: 'https', label: 'Verschlüsselt (HTTPS)', weight: 15, s: bin('is-on-https'), fix: 'Ein SSL-Zertifikat einrichten und alle Aufrufe auf HTTPS umleiten.' },
        { key: 'console', label: 'Keine Fehler im Browser', weight: 15, s: bin('errors-in-console'), value: consoleErrors ? `${Math.round(consoleErrors)} Fehler` : null, fix: 'Die Fehlermeldungen im Browser beheben: meist fehlende Dateien oder defekte Skripte.' },
        { key: 'bytes', label: 'Datenmenge der Seite', weight: 20, s: pct(bytes, LAB.bytes), value: bytes != null ? size(bytes) : null, fix: 'Bilder und Videos verkleinern, nicht benötigte Skripte und Schriften entfernen.' },
        { key: 'images', label: 'Bilder optimiert', weight: 15, s: bin('image-delivery-insight'), value: imgSavings > 50 * KB ? `${size(imgSavings)} zu viel` : null, fix: 'Bilder in modernen Formaten (WebP, AVIF) und in passender Grösse ausliefern.' },
        { key: 'sharp', label: 'Bilder scharf und unverzerrt', weight: 5, s: avg(bin('image-size-responsive'), bin('image-aspect-ratio')), fix: 'Bilder in ausreichender Auflösung und im richtigen Seitenverhältnis ausliefern.' },
        { key: 'render', label: 'Lädt ohne Blockaden', weight: 10, s: bin('render-blocking-insight'), fix: 'Stylesheets und Skripte, die den Seitenaufbau blockieren, verzögert oder asynchron laden.' },
        { key: 'js', label: 'Kein überflüssiges JavaScript', weight: 10, s: avg(bin('unused-javascript'), bin('legacy-javascript-insight'), bin('duplicated-javascript-insight')), fix: 'Ungenutzten und doppelten Code entfernen, moderne JavaScript-Ausgabe verwenden.' },
        { key: 'cache', label: 'Nutzt den Browser-Cache', weight: 5, s: bin('cache-insight'), fix: 'Statische Dateien mit langer Cache-Dauer ausliefern.' },
        { key: 'modern', label: 'Keine veraltete Technik', weight: 5, s: avg(bin('deprecations'), bin('inspector-issues')), fix: 'Veraltete Browser-Funktionen und gemeldete Probleme beheben.' },
      ],
    },
    {
      key: 'a11y', label: 'Barrierefreiheit',
      checks: [
        { key: 'total', label: 'Barrierefreiheit laut Google', weight: 50, s: pct(a11yScore, LAB.a11y), value: a11yScore != null ? `${Math.round(a11yScore * 100)} / 100` : null, fix: 'Die gemeldeten Barrieren beheben, damit alle Besucher die Seite nutzen können.' },
        { key: 'contrast', label: 'Text gut lesbar (Kontrast)', weight: 20, s: bin('color-contrast'), value: contrastCount ? `${Math.round(contrastCount)} ${Math.round(contrastCount) === 1 ? 'Stelle' : 'Stellen'} mit zu wenig Kontrast` : null, fix: 'Text mit genügend Kontrast zum Hintergrund setzen.' },
        { key: 'names', label: 'Bedienelemente beschriftet', weight: 15, s: avg(bin('button-name'), bin('link-name'), bin('label'), bin('select-name')), fix: 'Buttons, Links und Formularfelder für Screenreader beschriften.' },
        { key: 'lang', label: 'Sprache festgelegt', weight: 5, s: avg(bin('html-has-lang'), bin('html-lang-valid')), fix: 'Die Sprache der Seite im HTML angeben.' },
        { key: 'structure', label: 'Klare Seitenstruktur', weight: 10, s: avg(bin('heading-order'), bin('landmark-one-main')), fix: 'Überschriften der Reihe nach verwenden und den Hauptinhalt auszeichnen.' },
      ],
    },
    {
      key: 'seo', label: 'Auffindbarkeit bei Google',
      checks: [
        { key: 'crawl', label: 'Für Google freigegeben', weight: 25, s: (() => { const v = [bin('is-crawlable'), bin('http-status-code')].filter((x) => x != null); return v.length ? Math.min(...v) : null })(), fix: 'Die Seite nicht per «noindex» oder robots.txt von Google ausschliessen.' },
        { key: 'cwv', label: 'Erfüllt Googles Tempo-Richtwerte', weight: 20, s: cwv, value: cwv == null ? null : `${cwv === 1 ? 'erfüllt' : cwv === 0 ? 'nicht erfüllt' : 'teilweise'}${hasField ? ' (echte Besucher)' : ' (Test)'}`, fix: 'Google bevorzugt Seiten, die schnell laden, sofort reagieren und stabil bleiben (Core Web Vitals).' },
        { key: 'title', label: 'Seitentitel', weight: 15, s: bin('document-title'), fix: 'Jeder Seite einen eindeutigen, beschreibenden Titel geben.' },
        { key: 'desc', label: 'Beschreibung für Google', weight: 15, s: bin('meta-description'), fix: 'Eine Meta-Beschreibung von 1–2 Sätzen ergänzen: Sie erscheint in den Suchergebnissen.' },
        { key: 'links', label: 'Verständliche Links', weight: 15, s: avg(bin('link-text'), bin('crawlable-anchors')), fix: 'Links mit sprechendem Text statt «hier klicken» versehen.' },
        { key: 'alt', label: 'Bilder beschrieben', weight: 10, s: bin('image-alt'), fix: 'Allen Bildern einen Alternativtext geben.' },
      ],
    },
  ]

  // Bereichsnoten: gewichteter Schnitt der vorhandenen Prüfpunkte (fehlende Daten zählen nicht)
  const areas = AREAS.map((area) => {
    const checks = area.checks.filter((c) => c.s != null)
    const w = checks.reduce((s, c) => s + c.weight, 0)
    const score = w ? Math.round((checks.reduce((s, c) => s + c.s * c.weight, 0) / w) * 100) : null
    // Punktverlust je Prüfpunkt in diesem Bereich (für Begründung und Hebel)
    const withLoss = checks.map((c) => ({ ...c, loss: ((1 - c.s) * c.weight) / w * 100 }))
    const worst = withLoss.filter((c) => c.s < 0.9).sort((a, b) => b.loss - a.loss)[0] || null
    return { key: area.key, label: area.label, score, checks: withLoss, reason: score != null && score < 90 && worst ? `${worst.label}${worst.value ? `: ${worst.value}` : ''}` : null }
  }).filter((a) => a.score != null)

  // Gesamtnote: einfacher Durchschnitt der angezeigten Bereichsnoten
  const score = Math.round(areas.reduce((s, a) => s + a.score, 0) / areas.length)

  // Grösste Hebel: Prüfpunkte, die die meisten Gesamtpunkte kosten
  const issues = areas
    .flatMap((a) => a.checks.map((c) => ({ ...c, area: a.label, overall: c.loss / areas.length })))
    .filter((c) => c.s < 0.9 && c.overall >= 1)
    .sort((a, b) => b.overall - a.overall)
    .slice(0, 4)
    .map(({ label, value, fix, area, overall }) => ({ label, value, fix, area, points: Math.round(overall) }))

  // Screenshot aus dem Lauf, dessen Ladezeit dem Mittelwert am nächsten liegt
  const rep = lhs.slice().sort((a, b) => Math.abs((a.audits['largest-contentful-paint']?.numericValue ?? 0) - lcp) - Math.abs((b.audits['largest-contentful-paint']?.numericValue ?? 0) - lcp))[0]

  return {
    score,
    band: bandFor(score),
    areas: areas.map(({ key, label, score: s, reason, checks }) => ({ key, label, score: s, reason, checks: checks.map(({ key: k, label: l, s: v, value, fix }) => ({ key: k, label: l, s: v, value, fix })) })),
    issues,
    runs: runs.length,
    field: hasField ? { scope: fieldScope } : null,
    screenshot: rep.audits['final-screenshot']?.details?.data || null,
    lighthouseVersion: lhs[0].lighthouseVersion,
  }
}
