import LegalLayout from './LegalLayout'
import { COMPANY } from '../data/company'

export default function Datenschutz() {
  return (
    <LegalLayout title="Datenschutzerklärung" lastUpdated="September 2026">
      <section>
        <p>
          Diese Datenschutzerklärung erläutert, welche Personendaten wir bei der Nutzung dieser
          Webseite bearbeiten. Sie gilt für die Webseite von {COMPANY.brand}, einer Marke der{' '}
          {COMPANY.legalName} ("wir", "uns").
        </p>
      </section>

      <section>
        <h2>1. Verantwortliche Stelle</h2>
        <p>
          Verantwortlich für die Datenbearbeitung im Sinne des Schweizer Datenschutzgesetzes (DSG) ist:
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
        <h2>2. Grundsätze</h2>
        <p>
          Wir bearbeiten Personendaten im Einklang mit dem Schweizer Datenschutzgesetz (DSG) und, soweit
          anwendbar, der Datenschutz-Grundverordnung der EU (DSGVO): nach Treu und Glauben,
          verhältnismässig und nur für die unten genannten Zwecke.
        </p>
      </section>

      <section>
        <h2>3. Aufruf der Webseite</h2>
        <p>
          Beim Aufruf der Webseite verarbeitet unser Hosting-Anbieter technisch notwendige Daten in
          Server-Logs, insbesondere IP-Adresse, Datum und Uhrzeit, Browsertyp, Betriebssystem und die
          zuvor besuchte Seite. Diese Daten dienen dem sicheren und stabilen Betrieb der Webseite.
        </p>
      </section>

      <section>
        <h2>4. Kontaktformular und E-Mail</h2>
        <p>
          Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren, bearbeiten wir die Angaben,
          die Sie uns machen:
        </p>
        <ul>
          <li>Name und E-Mail-Adresse</li>
          <li>Optional: Firma, Telefonnummer, Adresse Ihrer heutigen Webseite, Ihre Nachricht</li>
          <li>Optional: Ihre Auswahl aus dem Preisrechner oder das Ergebnis des Website-Checks, falls Sie diese mitschicken</li>
        </ul>
        <p>
          Wir verwenden diese Angaben ausschliesslich, um Ihre Anfrage zu beantworten und gegebenenfalls
          eine Offerte zu erstellen.
        </p>
      </section>

      <section>
        <h2>5. Cookies und Analyse</h2>
        <p>
          Diese Webseite setzt keine Cookies. Für eine anonyme Reichweitenmessung nutzen wir Vercel Web
          Analytics. Dabei werden keine Cookies gesetzt und keine Nutzerprofile über mehrere Webseiten
          hinweg erstellt. Erfasst werden unter anderem aufgerufene Seiten, Herkunftsseite, Land,
          Gerätetyp sowie einzelne Aktionen wie das Absenden des Kontaktformulars.
        </p>
      </section>

      <section>
        <h2>6. Eingesetzte Dienste</h2>
        <ul>
          <li>
            <strong>Vercel</strong> (Vercel Inc., USA): Hosting der Webseite und anonyme Reichweitenmessung
            (Vercel Web Analytics).
          </li>
          <li>
            <strong>FormSubmit</strong> (formsubmit.co): Zustellung der Anfragen aus dem Kontaktformular
            per E-Mail an uns.
          </li>
          <li>
            <strong>Google PageSpeed Insights</strong> (Google LLC, USA): Nur wenn Sie den Website-Check
            nutzen, wird die eingegebene Webadresse zur Messung an Google übermittelt. Ihre IP-Adresse wird
            dabei an Google übertragen.
          </li>
        </ul>
        <p>
          Die Schriften dieser Webseite werden von unserem eigenen Server geladen; es findet keine
          Übermittlung an Google Fonts statt. Die genannten Anbieter können Daten ausserhalb der Schweiz
          und des EWR bearbeiten, insbesondere in den USA.
        </p>
      </section>

      <section>
        <h2>7. Weitergabe an Dritte</h2>
        <p>Über die in Ziffer 6 genannten Dienste hinaus geben wir Ihre Daten nur weiter, wenn:</p>
        <ul>
          <li>Sie ausdrücklich eingewilligt haben,</li>
          <li>dies zur Vertragserfüllung erforderlich ist,</li>
          <li>eine gesetzliche Verpflichtung besteht oder</li>
          <li>die Weitergabe zur Durchsetzung rechtlicher Ansprüche nötig ist.</li>
        </ul>
      </section>

      <section>
        <h2>8. Aufbewahrungsdauer</h2>
        <p>
          Wir bewahren Personendaten nur so lange auf, wie es für die genannten Zwecke nötig ist oder
          gesetzliche Aufbewahrungspflichten es verlangen (für Geschäftskorrespondenz in der Regel
          10 Jahre).
        </p>
      </section>

      <section>
        <h2>9. Ihre Rechte</h2>
        <p>Sie haben jederzeit das Recht auf:</p>
        <ul>
          <li>Auskunft über die zu Ihrer Person bearbeiteten Daten</li>
          <li>Berichtigung unrichtiger Daten</li>
          <li>Löschung Ihrer Daten</li>
          <li>Einschränkung der Bearbeitung</li>
          <li>Herausgabe Ihrer Daten</li>
          <li>Widerruf einer erteilten Einwilligung</li>
          <li>Beschwerde beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB)</li>
        </ul>
        <p>
          Wenden Sie sich dafür an <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
        </p>
      </section>

      <section>
        <h2>10. Datensicherheit</h2>
        <p>
          Wir treffen angemessene technische und organisatorische Massnahmen, um Ihre Daten vor
          unbefugtem Zugriff, Verlust oder Manipulation zu schützen. Die Webseite ist durchgehend per
          TLS verschlüsselt.
        </p>
      </section>

      <section>
        <h2>11. Änderungen</h2>
        <p>
          Wir passen diese Datenschutzerklärung an, wenn sich die Webseite, unsere Dienste oder die
          rechtlichen Vorgaben ändern. Es gilt die jeweils auf dieser Seite veröffentlichte Fassung.
        </p>
      </section>
    </LegalLayout>
  )
}
