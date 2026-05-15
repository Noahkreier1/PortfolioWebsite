import LegalLayout from './LegalLayout'
import { COMPANY } from '../data/company'

export default function AGB() {
  return (
    <LegalLayout title="Allgemeine Geschäftsbedingungen" lastUpdated="Mai 2026">
      <section>
        <h2>1. Geltungsbereich</h2>
        <p>
          Diese Allgemeinen Geschäftsbedingungen (AGB) regeln das Vertragsverhältnis
          zwischen der {COMPANY.legalName} ({COMPANY.brand}, "Auftragnehmerin")
          und ihren Auftraggeberinnen und Auftraggebern ("Kundinnen", "Kunden")
          für die Erbringung von Leistungen im Bereich Webdesign, Webentwicklung,
          Conversion-Optimierung, Branding sowie damit verbundener Dienstleistungen.
        </p>
        <p>
          Abweichende Bedingungen der Kundin oder des Kunden werden nur dann
          Vertragsbestandteil, wenn die Auftragnehmerin diesen ausdrücklich
          schriftlich zustimmt.
        </p>
      </section>

      <section>
        <h2>2. Vertragsabschluss</h2>
        <p>
          Offerten der Auftragnehmerin sind unverbindlich und können jederzeit
          angepasst werden. Ein Vertrag kommt durch schriftliche Bestätigung der
          Offerte durch die Kundin oder den Kunden zustande (per E-Mail
          ausreichend) oder durch Beginn der Leistungserbringung nach beidseitiger
          Abstimmung.
        </p>
      </section>

      <section>
        <h2>3. Leistungsumfang</h2>
        <p>
          Der konkrete Leistungsumfang ergibt sich aus der jeweiligen Offerte
          beziehungsweise dem Briefing-Protokoll. Nicht ausdrücklich vereinbarte
          Leistungen werden zusätzlich nach Aufwand zum jeweils gültigen
          Stundensatz verrechnet.
        </p>
        <p>
          Die Auftragnehmerin ist berechtigt, geeignete Dritte (z.B. Freelancer,
          Hosting-Anbieter) zur Leistungserbringung beizuziehen.
        </p>
      </section>

      <section>
        <h2>4. Mitwirkungspflichten der Kundschaft</h2>
        <p>
          Die Kundin oder der Kunde stellt der Auftragnehmerin rechtzeitig alle
          für die Leistungserbringung erforderlichen Informationen, Inhalte
          (Texte, Bilder, Logos) und Zugänge zur Verfügung. Verzögert sich die
          Bereitstellung, verschiebt sich die vereinbarte Lieferfrist entsprechend.
        </p>
        <p>
          Die Kundschaft garantiert, dass die zur Verfügung gestellten Inhalte
          frei von Rechten Dritter sind und keine geltenden Gesetze verletzen.
        </p>
      </section>

      <section>
        <h2>5. Preise und Zahlungsbedingungen</h2>
        <p>
          Es gelten die in der Offerte aufgeführten Preise in Schweizer Franken
          (CHF), zuzüglich der gesetzlichen Mehrwertsteuer, sofern anwendbar.
        </p>
        <p>
          Die Vergütung wird in der Regel in zwei Tranchen fällig: 50% bei
          Auftragsbestätigung, 50% nach Lieferung. Bei Projekten über
          CHF 5'000 kann eine abweichende Zahlungsstaffelung vereinbart werden.
          Rechnungen sind innert 14 Tagen ohne Abzug zur Zahlung fällig.
        </p>
        <p>
          Bei Zahlungsverzug ist die Auftragnehmerin berechtigt, Verzugszinsen
          von 5% pro Jahr sowie Mahngebühren in Höhe von CHF 30 pro Mahnung zu
          berechnen.
        </p>
      </section>

      <section>
        <h2>6. Lieferfristen</h2>
        <p>
          Vereinbarte Lieferfristen sind Richtwerte und gelten ab Erhalt aller
          notwendigen Informationen und Inhalte. Verzögerungen aus höherer
          Gewalt, durch Drittanbieter oder durch verspätete Mitwirkung der
          Kundschaft berechtigen die Auftragnehmerin zur entsprechenden
          Verlängerung der Frist.
        </p>
      </section>

      <section>
        <h2>7. Abnahme</h2>
        <p>
          Nach Fertigstellung wird die Leistung der Kundin oder dem Kunden zur
          Abnahme vorgelegt. Erfolgt innert 7 Tagen keine schriftliche Beanstandung,
          gilt die Leistung als abgenommen.
        </p>
        <p>
          Im Rahmen der Abnahme können bis zu zwei Korrekturschlaufen mit
          geringfügigen Anpassungen kostenlos durchgeführt werden. Darüber
          hinausgehende Anpassungen werden nach Aufwand verrechnet.
        </p>
      </section>

      <section>
        <h2>8. Urheber- und Nutzungsrechte</h2>
        <p>
          Mit vollständiger Bezahlung erhält die Kundin oder der Kunde das
          zeitlich und örtlich unbeschränkte Nutzungsrecht an den im Rahmen
          des Auftrags erstellten Werken (Design, Code, Texte) für den
          vereinbarten Zweck.
        </p>
        <p>
          Die Auftragnehmerin behält sich das Recht vor, die erbrachten
          Leistungen für eigene Referenz- und Marketingzwecke zu verwenden
          (Portfolio, Case Studies, Social Media), sofern keine berechtigten
          Interessen der Kundschaft entgegenstehen.
        </p>
        <p>
          Vorbestehende Werkzeuge, Bibliotheken und Frameworks bleiben Eigentum
          der jeweiligen Rechteinhaber.
        </p>
      </section>

      <section>
        <h2>9. Gewährleistung</h2>
        <p>
          Die Auftragnehmerin gewährleistet, dass die erbrachten Leistungen den
          vereinbarten Spezifikationen entsprechen. Während 30 Tagen nach
          Abnahme werden Mängel kostenlos behoben, sofern sie nicht durch
          Eingriffe der Kundschaft oder Dritter entstanden sind.
        </p>
        <p>
          Eine Gewährleistung für die Vereinbarkeit mit zukünftigen
          Browserversionen, Drittanbieter-Plugins oder Betriebssystem-Updates
          ist ausgeschlossen.
        </p>
      </section>

      <section>
        <h2>10. Haftung</h2>
        <p>
          Die Auftragnehmerin haftet nur für Schäden, die durch grobe
          Fahrlässigkeit oder Vorsatz verursacht wurden. Eine Haftung für
          leichte Fahrlässigkeit, Folgeschäden, entgangenen Gewinn oder
          mittelbare Schäden ist ausgeschlossen, soweit gesetzlich zulässig.
        </p>
        <p>
          Die Gesamthaftung der Auftragnehmerin ist in jedem Fall auf den
          vereinbarten Auftragswert beschränkt.
        </p>
      </section>

      <section>
        <h2>11. Vertraulichkeit</h2>
        <p>
          Beide Parteien verpflichten sich, alle ihnen im Rahmen der
          Zusammenarbeit zur Kenntnis gelangten vertraulichen Informationen
          der anderen Partei geheim zu halten und nicht an Dritte
          weiterzugeben. Diese Verpflichtung gilt auch über das Ende des
          Vertragsverhältnisses hinaus.
        </p>
      </section>

      <section>
        <h2>12. Kündigung</h2>
        <p>
          Verträge können von beiden Parteien jederzeit schriftlich gekündigt
          werden. Bei Kündigung durch die Kundschaft sind die bis zum
          Kündigungszeitpunkt erbrachten Leistungen vollständig zu vergüten,
          zuzüglich allenfalls bereits eingegangener Verpflichtungen gegenüber
          Drittanbietern.
        </p>
      </section>

      <section>
        <h2>13. Datenschutz</h2>
        <p>
          Die Bearbeitung personenbezogener Daten erfolgt nach Massgabe der
          separaten Datenschutzerklärung der Auftragnehmerin.
        </p>
      </section>

      <section>
        <h2>14. Salvatorische Klausel</h2>
        <p>
          Sollten einzelne Bestimmungen dieser AGB ungültig sein oder werden,
          bleibt die Wirksamkeit der übrigen Bestimmungen davon unberührt. Die
          ungültige Bestimmung wird durch eine wirksame Regelung ersetzt, die
          dem wirtschaftlichen Zweck der ursprünglichen Bestimmung am nächsten
          kommt.
        </p>
      </section>

      <section>
        <h2>15. Anwendbares Recht und Gerichtsstand</h2>
        <p>
          Es gilt ausschliesslich {COMPANY.governingLaw} unter Ausschluss des
          UN-Kaufrechts (CISG). Ausschliesslicher Gerichtsstand für alle
          Streitigkeiten aus oder im Zusammenhang mit dem Vertragsverhältnis
          ist {COMPANY.jurisdiction}.
        </p>
      </section>
    </LegalLayout>
  )
}
