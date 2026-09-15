/* Übergibt Kontext an das Kontaktformular, z. B. die Auswahl aus dem
   Preisrechner oder das Ergebnis des Website-Checks. sessionStorage, damit
   der Kontext auch einen Seitenwechsel (/website-check → /#contact) übersteht. */

const KEY = 'omnia-request-context'
const listeners = new Set()

export function getRequestContext() {
  try {
    return sessionStorage.getItem(KEY) || ''
  } catch {
    return ''
  }
}

export function setRequestContext(text) {
  try {
    if (text) sessionStorage.setItem(KEY, text)
    else sessionStorage.removeItem(KEY)
  } catch {
    /* Speicher blockiert: Kontext gilt nur für diese Seitenansicht */
  }
  listeners.forEach((listener) => listener(text))
}

export function subscribeRequestContext(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
