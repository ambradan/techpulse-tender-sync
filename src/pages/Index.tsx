import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <main className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">TechPulse</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost">Accedi</Button>
            </Link>
            <Link to="/auth">
              <Button>Registrati</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
          Dashboard intelligente per<br />
          <span className="text-gradient-primary">aziende tech</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Analisi predittive, monitoraggio trend, gestione partner welfare e suggerimenti bandi.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/auth">
            <Button size="lg" className="gap-2">
              Inizia ora
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Trend Attuali", desc: "Monitoraggio trend di mercato" },
            { title: "Previsioni", desc: "Analisi predittiva AI" },
            { title: "Partner Welfare", desc: "Servizi benefit aziendali" },
            { title: "TenderMatch", desc: "Bandi consigliati" },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur"
            >
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          TechPulse
        </div>
      </footer>
    </main>
  );
};

export default Index;
