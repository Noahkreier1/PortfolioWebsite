/* Webadresse aus einer Eingabe wie «ihrefirma.ch» prüfen und vervollständigen.
   Liefert { url, host } oder { error } mit einer verständlichen Meldung. */
export function normalizeUrl(input) {
  // Leerzeichen gehören nie in eine Adresse (manche Tastaturen fügen sie trotzdem ein)
  let raw = input.replace(/\s+/g, '')
  if (!raw) return { error: 'Bitte geben Sie eine Adresse ein, z. B. ihrefirma.ch.' }
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`
  try {
    const u = new URL(raw)
    if (!/\.[a-z]{2,}$/i.test(u.hostname)) return { error: 'Die Adresse braucht eine Domain-Endung, z. B. .ch oder .com.' }
    return { url: u.toString(), host: u.hostname.replace(/^www\./, '') }
  } catch {
    return { error: 'Das sieht nicht wie eine gültige Webadresse aus.' }
  }
}
