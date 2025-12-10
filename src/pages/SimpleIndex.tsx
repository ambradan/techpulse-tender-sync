import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";
import { useEffect } from "react";

const SimpleIndex = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/dashboard");
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/techpulse-logo.png" alt="TechPulse" className="h-8 w-auto" />
            <span className="text-xl font-semibold text-foreground">TechPulse</span>
          </div>
          <Button onClick={() => navigate("/auth")}>
            Accedi
          </Button>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-6">
        <section className="py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            TechPulse AI Suite
          </h1>
          <p className="text-xl md:text-2xl text-primary font-medium mb-4">
            Previsioni. Strategie. Futuro.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            La piattaforma intelligente per aziende, privati e freelance: analisi predittive, 
            identificazione competenze critiche e gestione rischi normativi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/auth")}
              className="text-base px-8"
            >
              Inizia ora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/auth")}
              className="text-base px-8"
            >
              Accedi al tuo account
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 border-t border-border/40">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Zap className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Analisi Intelligente
              </h3>
              <p className="text-muted-foreground">
                Panoramica completa della struttura aziendale e del contesto tecnologico.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-5">
                <TrendingUp className="h-7 w-7 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Hiring & Competenze
              </h3>
              <p className="text-muted-foreground">
                Identifica ruoli prioritari e skill critiche per la crescita del team.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-5">
                <Shield className="h-7 w-7 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Rischi & Normative
              </h3>
              <p className="text-muted-foreground">
                Valutazione dei rischi operativi e conformità alle normative vigenti.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/techpulse-logo.png" alt="TechPulse" className="h-6 w-auto opacity-60" />
              <span className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} TechPulse AI Suite
              </span>
            </div>
            <div className="flex gap-6">
              <button 
                onClick={() => navigate("/privacy")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </button>
              <button 
                onClick={() => navigate("/terms")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Termini
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SimpleIndex;
