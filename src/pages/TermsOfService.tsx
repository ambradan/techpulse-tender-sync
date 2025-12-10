import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";

const TermsOfService = () => {
  return (
    <main className="min-h-screen bg-gradient-hero flex flex-col">
      <MainNavbar />

      <section className="container mx-auto px-4 py-20 max-w-4xl">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
          Termini di Servizio
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <p className="text-lg">
            Ultimo aggiornamento: Dicembre 2024
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Accettazione dei Termini</h2>
            <p>
              Utilizzando TechPulse, accetti di essere vincolato da questi Termini di Servizio. 
              Se non accetti questi termini, non utilizzare la piattaforma.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. Descrizione del Servizio</h2>
            <p>
              TechPulse è una piattaforma di consulenza AI-powered che fornisce analisi predittive, 
              insights strategici e strumenti di supporto decisionale per aziende, professionisti e freelance.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. Account Utente</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Sei responsabile della sicurezza del tuo account e delle credenziali di accesso</li>
              <li>Devi fornire informazioni accurate e aggiornate</li>
              <li>Non puoi condividere l'account con terzi senza autorizzazione</li>
              <li>Devi avere almeno 18 anni per utilizzare il servizio</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Uso Consentito</h2>
            <p>Ti impegni a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Utilizzare il servizio solo per scopi leciti</li>
              <li>Non tentare di accedere a dati o account non tuoi</li>
              <li>Non interferire con il funzionamento della piattaforma</li>
              <li>Non utilizzare il servizio per attività illegali o fraudolente</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Proprietà Intellettuale</h2>
            <p>
              Tutti i contenuti, marchi, loghi e materiali presenti su TechPulse sono di proprietà 
              del Titolare o dei rispettivi proprietari. Non è consentita la riproduzione senza autorizzazione.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. Contenuti Generati dall'AI</h2>
            <p>
              Le analisi e previsioni generate dall'AI sono basate sui dati forniti dall'utente e su modelli 
              statistici. TechPulse non garantisce l'accuratezza assoluta delle previsioni.
            </p>
            <p>
              <strong>Le informazioni fornite non costituiscono consulenza professionale</strong> (legale, 
              finanziaria, fiscale) e non devono essere utilizzate come unica base per decisioni aziendali critiche.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">7. Limitazione di Responsabilità</h2>
            <p>
              TechPulse è fornito "così com'è". Non garantiamo che il servizio sia sempre disponibile, 
              privo di errori o adatto a scopi specifici. In nessun caso saremo responsabili per danni 
              indiretti, incidentali o consequenziali derivanti dall'uso del servizio.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">8. Tariffe e Pagamenti</h2>
            <p>
              TechPulse offre funzionalità gratuite e a pagamento. Le tariffe per i servizi premium 
              sono indicate nelle rispettive sezioni della piattaforma. I pagamenti sono gestiti 
              tramite provider sicuri.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">9. Risoluzione del Contratto</h2>
            <p>
              Puoi chiudere il tuo account in qualsiasi momento. Ci riserviamo il diritto di sospendere 
              o terminare l'accesso in caso di violazione di questi termini.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">10. Modifiche ai Termini</h2>
            <p>
              Possiamo modificare questi Termini di Servizio in qualsiasi momento. Le modifiche 
              saranno comunicate tramite la piattaforma o via email. L'uso continuato del servizio 
              dopo le modifiche costituisce accettazione dei nuovi termini.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">11. Legge Applicabile</h2>
            <p>
              Questi Termini sono regolati dalla legge italiana. Per qualsiasi controversia sarà 
              competente il Foro di Milano.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">12. Contatti</h2>
            <p>
              Per qualsiasi domanda relativa a questi Termini, contattare: <a href="mailto:a.danesin@critical-work.com" className="text-primary hover:underline">a.danesin@critical-work.com</a>
            </p>
          </section>
        </div>
      </section>

      <MainFooter />
    </main>
  );
};

export default TermsOfService;
