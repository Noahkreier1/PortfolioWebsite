/* Laufende Zeile über einer Sektion: Haarlinie, rote Nummer, Name.
   Wie ein Register im Schweizer Plakat; trägt Struktur statt Dekoration. */
export default function SectionIndex({ n, label }) {
  return (
    <div className="section-index" aria-hidden="true">
      <span>{n}</span>
      <span>{label}</span>
    </div>
  )
}
