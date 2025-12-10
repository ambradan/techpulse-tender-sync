import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-gradient-hero flex flex-col">
      <MainNavbar />

      <section className="container mx-auto px-4 py-20 max-w-4xl">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <p className="text-lg">
            Ultimo aggiornamento: Dicembre 2024
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Titolare del Trattamento</h2>
            <p>
              Il Titolare del trattamento dei dati è TechPulse, con sede operativa in Milano, Italia.
              Per qualsiasi richiesta relativa alla privacy, contattare: <a href="mailto:a.danesin@critical-work.com" className="text-primary hover:underline">a.danesin@critical-work.com</a>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. Dati Raccolti</h2>
            <p>TechPulse raccoglie le seguenti categorie di dati personali:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Dati di registrazione:</strong> nome, email, password (criptata)</li>
              <li><strong>Dati aziendali:</strong> nome azienda, settore, numero dipendenti, località (se forniti volontariamente)</li>
              <li><strong>Dati di utilizzo:</strong> log di accesso, interazioni con la piattaforma</li>
              <li><strong>Dati di contatto:</strong> messaggi inviati tramite form di contatto</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. Finalità del Trattamento</h2>
            <p>I dati sono trattati per le seguenti finalità:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Erogazione dei servizi richiesti (analisi predittive, consulenza AI)</li>
              <li>Gestione dell'account utente</li>
              <li>Comunicazioni di servizio</li>
              <li>Miglioramento della piattaforma</li>
              <li>Adempimenti legali</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Base Giuridica</h2>
            <p>
              Il trattamento dei dati si basa su: consenso dell'interessato, esecuzione di un contratto, 
              legittimo interesse del Titolare, adempimento di obblighi legali.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Conservazione dei Dati</h2>
            <p>
              I dati sono conservati per il tempo strettamente necessario alle finalità per cui sono stati raccolti, 
              e comunque non oltre quanto previsto dalla normativa applicabile.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. Condivisione dei Dati</h2>
            <p>
              I dati non vengono venduti a terzi. Possono essere condivisi con:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fornitori di servizi tecnici (hosting, email)</li>
              <li>Autorità competenti se richiesto dalla legge</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">7. Diritti dell'Interessato</h2>
            <p>L'utente ha diritto di:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Accedere ai propri dati</li>
              <li>Richiedere rettifica o cancellazione</li>
              <li>Limitare il trattamento</li>
              <li>Opporsi al trattamento</li>
              <li>Richiedere la portabilità dei dati</li>
              <li>Revocare il consenso</li>
            </ul>
            <p>
              Per esercitare questi diritti, scrivere a: <a href="mailto:a.danesin@critical-work.com" className="text-primary hover:underline">a.danesin@critical-work.com</a>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">8. Cookie</h2>
            <p>
              TechPulse utilizza cookie tecnici essenziali per il funzionamento della piattaforma. 
              Non vengono utilizzati cookie di profilazione senza il consenso esplicito dell'utente.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">9. Sicurezza</h2>
            <p>
              Adottiamo misure di sicurezza tecniche e organizzative adeguate per proteggere i dati 
              da accessi non autorizzati, perdita o distruzione.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">10. Modifiche alla Privacy Policy</h2>
            <p>
              Ci riserviamo il diritto di modificare questa Privacy Policy. Le modifiche saranno 
              pubblicate su questa pagina con indicazione della data di ultimo aggiornamento.
            </p>
          </section>
        </div>
      </section>

      <MainFooter />
    </main>
  );
};

export default PrivacyPolicy;
