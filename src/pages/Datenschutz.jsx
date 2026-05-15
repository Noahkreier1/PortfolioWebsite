import LegalLayout from './LegalLayout'
import { COMPANY } from '../data/company'

export default function Datenschutz() {
  return (
    <LegalLayout title="Datenschutzerklärung" lastUpdated="Mai 2026">
      <section>
        <p>
          Diese Datenschutzerklärung erläutert, welche personenbezogenen Daten
          (nachfolgend "Daten") wir bei der Nutzung unserer Webseite erheben,
          verarbeiten und nutzen. Sie gilt für die Webseite und alle Subdomains
          der {COMPANY.legalName} ("wir", "uns").
        </p>
      </section>

      <section>
        <h2>1. Verantwortliche Stelle</h2>
        <p>
          Verantwortlich für die Datenbearbeitung im Sinne des revidierten
          Schweizer Datenschutzgesetzes (revDSG) ist:
        </p>
        <p>
          <strong>{COMPANY.legalName}</strong>
          <br />
          {COMPANY.street}
          <br />
          {COMPANY.zip} {COMPANY.city}
          <br />
          E-Mail: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
        </p>
      </section>

      <section>
        <h2>2. Grundsätze der Datenbearbeitung</h2>
        <p>
          Wir bearbeiten personenbezogene Daten im Einklang mit dem revidierten
          Schweizer Datenschutzgesetz (revDSG) und der Datenschutz-Grundverordnung
          der EU (DSGVO), soweit deren Geltungsbereich eröffnet ist. Die
          Bearbeitung erfolgt nach Treu und Glauben, verhältnismässig und
          zweckgebunden.
        </p>
      </section>

      <section>
        <h2>3. Welche Daten wir erheben</h2>
        <p>
          Beim Besuch unserer Webseite werden automatisch folgende Daten
          gespeichert, die Ihr Browser an unseren Server übermittelt:
        </p>
        <ul>
          <li>IP-Adresse (anonymisiert nach 7 Tagen)</li>
          <li>Datum und Uhrzeit des Zugriffs</li>
          <li>Browsertyp und -version</li>
          <li>Verwendetes Betriebssystem</li>
          <li>Referrer-URL (zuvor besuchte Seite)</li>
        </ul>
        <p>
          Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren,
          werden zusätzlich folgende Daten erhoben:
        </p>
        <ul>
          <li>Name</li>
          <li>E-Mail-Adresse</li>
          <li>Inhalt Ihrer Nachricht</li>
          <li>Optional: Telefonnummer, Firmenname</li>
        </ul>
      </section>

      <section>
        <h2>4. Zweck der Datenbearbeitung</h2>
        <p>Wir bearbeiten Ihre Daten zu folgenden Zwecken:</p>
        <ul>
          <li>Bereitstellung und Optimierung unserer Webseite</li>
          <li>Beantwortung Ihrer Anfragen</li>
          <li>Erfüllung vertraglicher Pflichten</li>
          <li>Gewährleistung der IT-Sicherheit</li>
          <li>Erfüllung gesetzlicher Aufbewahrungspflichten</li>
        </ul>
      </section>

      <section>
        <h2>5. Cookies</h2>
        <p>
          Unsere Webseite verwendet Cookies. Cookies sind kleine Textdateien, die
          im Browser des Nutzers gespeichert werden. Wir unterscheiden zwischen:
        </p>
        <ul>
          <li>
            <strong>Notwendigen Cookies:</strong> für den Betrieb der Webseite
            unerlässlich (z.B. Theme-Präferenz, Cookie-Einstellungen).
          </li>
          <li>
            <strong>Funktionalen Cookies:</strong> verbessern die Funktionalität
            und Benutzerfreundlichkeit (nur mit Ihrer Einwilligung).
          </li>
        </ul>
        <p>
          Sie können Ihre Cookie-Einstellungen jederzeit über das Cookie-Banner
          am unteren Rand der Webseite anpassen.
        </p>
      </section>

      <section>
        <h2>6. Externe Dienste</h2>
        <p>
          Auf unserer Webseite werden folgende externe Dienste eingebunden:
        </p>
        <ul>
          <li>
            <strong>Google Fonts</strong> (Google LLC, USA): Zur Darstellung von
            Schriftarten. Beim Aufruf der Webseite wird Ihre IP-Adresse an Google
            übermittelt.
          </li>
          <li>
            <strong>WordPress mShots</strong> (Automattic Inc., USA): Zur Anzeige
            von Vorschaubildern verlinkter Webseiten in unserem Portfolio.
          </li>
          <li>
            <strong>Vercel</strong> (Vercel Inc., USA): Hosting unserer Webseite.
          </li>
        </ul>
        <p>
          Diese Anbieter können personenbezogene Daten in Ländern ausserhalb der
          Schweiz und des EWR verarbeiten. Wir haben mit diesen Anbietern
          entsprechende Vereinbarungen abgeschlossen oder verlassen uns auf
          Standardvertragsklauseln.
        </p>
      </section>

      <section>
        <h2>7. Weitergabe von Daten an Dritte</h2>
        <p>
          Eine Weitergabe Ihrer Daten an Dritte findet nur statt, wenn:
        </p>
        <ul>
          <li>Sie Ihre ausdrückliche Einwilligung gegeben haben,</li>
          <li>dies zur Vertragserfüllung erforderlich ist,</li>
          <li>eine gesetzliche Verpflichtung besteht oder</li>
          <li>die Weitergabe zur Geltendmachung rechtlicher Ansprüche dient.</li>
        </ul>
      </section>

      <section>
        <h2>8. Aufbewahrungsdauer</h2>
        <p>
          Wir bewahren personenbezogene Daten nur so lange auf, wie dies für die
          Erfüllung der genannten Zwecke notwendig ist oder gesetzliche
          Aufbewahrungspflichten dies vorschreiben (in der Regel 10 Jahre für
          geschäftliche Korrespondenz).
        </p>
      </section>

      <section>
        <h2>9. Ihre Rechte</h2>
        <p>Sie haben jederzeit das Recht auf:</p>
        <ul>
          <li>Auskunft über die zu Ihrer Person gespeicherten Daten</li>
          <li>Berichtigung unrichtiger Daten</li>
          <li>Löschung Ihrer Daten</li>
          <li>Einschränkung der Datenbearbeitung</li>
          <li>Datenübertragbarkeit</li>
          <li>Widerruf einer erteilten Einwilligung</li>
          <li>Beschwerde bei der zuständigen Aufsichtsbehörde (EDÖB)</li>
        </ul>
        <p>
          Zur Geltendmachung Ihrer Rechte kontaktieren Sie uns bitte unter{' '}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
        </p>
      </section>

      <section>
        <h2>10. Datensicherheit</h2>
        <p>
          Wir treffen angemessene technische und organisatorische Massnahmen, um
          Ihre Daten vor unbefugtem Zugriff, Verlust oder Manipulation zu
          schützen. Unsere Webseite verwendet eine SSL/TLS-Verschlüsselung.
        </p>
      </section>

      <section>
        <h2>11. Änderungen dieser Datenschutzerklärung</h2>
        <p>
          Wir behalten uns vor, diese Datenschutzerklärung jederzeit anzupassen,
          um sie an geänderte rechtliche Rahmenbedingungen oder bei Änderungen
          unserer Leistungen anzupassen. Die aktuelle Version finden Sie stets
          auf dieser Seite.
        </p>
      </section>
    </LegalLayout>
  )
}
