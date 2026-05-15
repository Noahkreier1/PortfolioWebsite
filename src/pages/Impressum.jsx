import LegalLayout from './LegalLayout'
import { COMPANY } from '../data/company'

export default function Impressum() {
  return (
    <LegalLayout title="Impressum" lastUpdated="Mai 2026">
      <section>
        <h2>Angaben gemäss Art. 322 OR</h2>
        <p>
          <strong>{COMPANY.legalName}</strong>
          <br />
          {COMPANY.street}
          <br />
          {COMPANY.zip} {COMPANY.city}
          <br />
          {COMPANY.country}
        </p>
      </section>

      <section>
        <h2>Kontakt</h2>
        <p>
          E-Mail: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
        </p>
      </section>

      <section>
        <h2>Handelsregister</h2>
        <p>
          Eintrag im {COMPANY.registerOffice}
          <br />
          Rechtsform: Gesellschaft mit beschränkter Haftung (GmbH)
          <br />
          UID/Unternehmens-Identifikationsnummer: <strong>{COMPANY.registrationNumber}</strong>
        </p>
      </section>

      <section>
        <h2>Vertretungsberechtigte Personen</h2>
        <p>
          Noah Kreier, Geschäftsführer
          <br />
          Leon Helg, Geschäftsführer
        </p>
      </section>

      <section>
        <h2>Haftungsausschluss</h2>
        <p>
          Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen
          Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit
          der Informationen. Haftungsansprüche gegen den Autor wegen Schäden
          materieller oder immaterieller Art, welche aus dem Zugriff oder der
          Nutzung beziehungsweise Nichtnutzung der veröffentlichten Informationen,
          durch Missbrauch der Verbindung oder durch technische Störungen
          entstanden sind, werden ausgeschlossen.
        </p>
        <p>
          Alle Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich
          vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung
          zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise
          oder endgültig einzustellen.
        </p>
      </section>

      <section>
        <h2>Haftung für Links</h2>
        <p>
          Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres
          Verantwortungsbereichs. Es wird jegliche Verantwortung für solche
          Webseiten abgelehnt. Der Zugriff und die Nutzung solcher Webseiten
          erfolgen auf eigene Gefahr des Nutzers oder der Nutzerin.
        </p>
      </section>

      <section>
        <h2>Urheberrechte</h2>
        <p>
          Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder
          anderen Dateien auf dieser Website gehören ausschliesslich der{' '}
          {COMPANY.legalName} oder den speziell genannten Rechtsinhabern. Für die
          Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der
          Urheberrechtsträger im Voraus einzuholen.
        </p>
      </section>
    </LegalLayout>
  )
}
