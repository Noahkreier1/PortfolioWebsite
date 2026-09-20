import { useEffect } from 'react'

const DEFAULT_TITLE = 'Zurio – Webagentur Winterthur | Fixpreis, in 2 Wochen online'
const DEFAULT_DESCRIPTION =
  'Webseiten für Schweizer KMU aus Winterthur: individuell gestaltet und programmiert, zum verbindlichen Fixpreis und in ein bis zwei Wochen online.'

/* Setzt Titel und Meta-Description pro Seite (SPA ohne Server-Rendering) */
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} · Zurio` : DEFAULT_TITLE
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description || DEFAULT_DESCRIPTION)
  }, [title, description])
}
