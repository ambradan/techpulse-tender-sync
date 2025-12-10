import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Bell, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-border/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-border/10 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Nuova integrazione con TenderMatch disponibile
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Analisi Predittive per{" "}
            <span className="text-gradient-primary">Decisioni Strategiche</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            TechPulse combina intelligenza artificiale e dati di mercato per fornire previsioni accurate, 
            monitoraggio delle tendenze e accesso diretto alle opportunità di gara.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/auth">
              <Button variant="hero" size="xl">
                Inizia Gratuitamente
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button 
              variant="glass" 
              size="xl"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Scopri le Funzionalità
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/50">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">Analisi Predittive</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/50">
              <Bell className="w-4 h-4 text-accent" />
              <span className="text-sm text-foreground">Alert Normativi</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/50">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">TenderMatch Integrato</span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-16 max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-3xl" />
            
            {/* Dashboard Card */}
            <div className="relative bg-gradient-card rounded-2xl border border-border/50 shadow-elevated overflow-hidden">
              <div className="p-6 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Metric Cards */}
                  <div className="bg-secondary/30 rounded-xl p-6 border border-border/30">
                    <p className="text-muted-foreground text-sm mb-2">Trend di Mercato</p>
                    <p className="font-display text-3xl font-bold text-foreground">+12.4%</p>
                    <p className="text-primary text-sm mt-1">↑ vs. mese scorso</p>
                  </div>
                  <div className="bg-secondary/30 rounded-xl p-6 border border-border/30">
                    <p className="text-muted-foreground text-sm mb-2">Gare Disponibili</p>
                    <p className="font-display text-3xl font-bold text-foreground">847</p>
                    <p className="text-accent text-sm mt-1">23 nuovi oggi</p>
                  </div>
                  <div className="bg-secondary/30 rounded-xl p-6 border border-border/30">
                    <p className="text-muted-foreground text-sm mb-2">Alert Attivi</p>
                    <p className="font-display text-3xl font-bold text-foreground">15</p>
                    <p className="text-muted-foreground text-sm mt-1">3 urgenti</p>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="bg-secondary/20 rounded-xl p-6 border border-border/30 h-48 flex items-end gap-2">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-primary rounded-t opacity-80"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
