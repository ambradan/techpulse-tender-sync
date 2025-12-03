import { Button } from "@/components/ui/button";
import { ArrowRight, Activity } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-8 glow-primary">
            <Activity className="w-8 h-8 text-primary-foreground" />
          </div>

          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Pronto a Trasformare i Dati in{" "}
            <span className="text-gradient-primary">Decisioni Vincenti?</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Unisciti alle aziende che già utilizzano TechPulse per anticipare il mercato, 
            cogliere opportunità e crescere più velocemente.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl">
              Crea Account Gratuito
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="glass" size="xl">
              Prenota una Demo
            </Button>
          </div>

          {/* Trust Elements */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm">Setup in 2 minuti</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm">Nessuna carta richiesta</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm">Cancella quando vuoi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
