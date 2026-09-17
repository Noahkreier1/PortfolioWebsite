/* Kundenzitate — nur echte Zitate mit Freigabe der Person eintragen.
   Solange die Liste leer ist, wird der Zitat-Block nirgends angezeigt.

   Format:
   {
     quote: 'Ein bis zwei Sätze, am besten mit einem konkreten Ergebnis.',
     name: 'Vorname Nachname',
     role: 'Funktion',
     company: 'Firma',          // muss für die Case Study exakt "InspireDay" lauten
     photo: '/testimonials/vorname-nachname.jpg', // optional
   }
*/
export const TESTIMONIALS = [
  {
    quote:
      'Seit den ersten Schritten von InspireDay an unserer Seite: Noah und Leon liefern erstklassigen Support und Website-Tech auf höchstem Niveau – und mit ihnen wachsen nicht nur unsere Seite, sondern auch Community und Ticketverkäufe.',
    name: 'Ivo von Bergen',
    role: 'Gründer',
    company: 'InspireDay',
    // Datei liegt unter public/testimonials/. Fehlt sie, blendet die Seite das Bild aus.
    photo: '/testimonials/ivo-von-bergen.jpg',
  },
]
