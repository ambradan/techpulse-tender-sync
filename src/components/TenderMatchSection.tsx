import { Button } from "@/components/ui/button";
import { ArrowRight, Search, FileCheck, Award, Zap } from "lucide-react";

const TenderMatchSection = () => {
  const steps = [
    {
      icon: Search,
      step: "01",
      title: "Ricerca Intelligente",
      description: "L'algoritmo analizza il tuo profilo aziendale e identifica i bandi più pertinenti"
    },
    {
      icon: FileCheck,
      step: "02",
      title: "Matching Automatico",
      description: "Ricevi suggerimenti personalizzati basati su settore, dimensione e storico"
    },
    {
      icon: Award,
      step: "03",
      title: "Partecipazione Semplificata",
      description: "Registrazione automatica e accesso diretto alle opportunità di gara"
    }
  ];

  return (
    <section id="tendermatch" className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-6">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm text-accent font-medium">Integrazione TenderMatch</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Non Perdere Mai un'
              <span className="text-gradient-accent">Opportunità di Gara</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              TechPulse si integra perfettamente con TenderMatch per offrirti un ecosistema completo. 
              Scopri bandi pertinenti, ricevi notifiche personalizzate e partecipa con un click.
            </p>

            {/* Steps */}
            <div className="space-y-6 mb-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-card border border-border/50 flex items-center justify-center group-hover:border-accent/50 transition-colors">
                      <step.icon className="w-5 h-5 text-accent" />
                    </div>
                    {index < steps.length - 1 && (
                      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-px h-6 bg-border/50" />
                    )}
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs text-muted-foreground font-mono">{step.step}</span>
                      <h4 className="font-semibold text-foreground">{step.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="accent" size="lg">
              Attiva TenderMatch
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-accent opacity-10 blur-3xl rounded-full" />
            
            <div className="relative bg-gradient-card rounded-2xl border border-border/50 p-6 shadow-elevated">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-foreground">Bandi Consigliati</h3>
                <span className="text-xs text-primary bg-primary/20 px-2 py-1 rounded-full">3 nuovi</span>
              </div>

              {/* Tender Cards */}
              <div className="space-y-4">
                {[
                  { title: "Servizi IT per PA", match: 95, value: "€250.000", deadline: "15 Gen" },
                  { title: "Cybersecurity Audit", match: 88, value: "€120.000", deadline: "22 Gen" },
                  { title: "Cloud Migration", match: 82, value: "€180.000", deadline: "30 Gen" }
                ].map((tender, index) => (
                  <div 
                    key={index} 
                    className="bg-secondary/50 rounded-xl p-4 border border-border/30 hover:border-accent/30 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-foreground mb-1">{tender.title}</h4>
                        <p className="text-xs text-muted-foreground">Scadenza: {tender.deadline}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-accent">{tender.match}%</span>
                        <p className="text-xs text-muted-foreground">match</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground font-medium">{tender.value}</span>
                      <span className="text-xs text-primary group-hover:underline">Visualizza →</span>
                    </div>
                    {/* Match Bar */}
                    <div className="mt-3 h-1 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-accent rounded-full transition-all duration-500"
                        style={{ width: `${tender.match}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TenderMatchSection;
