import { 
  TrendingUp, 
  Bell, 
  Shield, 
  BarChart3, 
  Brain, 
  Globe,
  Sparkles,
  Lock
} from "lucide-react";

const FeaturesSection = () => {
  const freeFeatures = [
    {
      icon: TrendingUp,
      title: "Analisi di Base",
      description: "Monitoraggio delle tendenze di mercato e indicatori chiave"
    },
    {
      icon: Bell,
      title: "Alert Normativi",
      description: "Notifiche su cambiamenti fiscali e regolamentari"
    },
    {
      icon: Shield,
      title: "Report Mensili",
      description: "Sintesi periodica delle opportunità e dei rischi"
    },
    {
      icon: BarChart3,
      title: "Dashboard Base",
      description: "Visualizzazioni intuitive dei dati principali"
    }
  ];

  const premiumFeatures = [
    {
      icon: Brain,
      title: "Machine Learning Avanzato",
      description: "Modelli predittivi personalizzati per il tuo settore"
    },
    {
      icon: Globe,
      title: "Dati Globali",
      description: "Accesso a dataset internazionali e trend worldwide"
    },
    {
      icon: Sparkles,
      title: "Scenari Futuri",
      description: "Simulazioni e previsioni a medio-lungo termine"
    },
    {
      icon: Lock,
      title: "API Dedicate",
      description: "Integrazione con i tuoi sistemi aziendali"
    }
  ];

  return (
    <section id="features" className="py-24 bg-background relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Funzionalità
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 mb-6 text-foreground">
            Strumenti per Ogni Esigenza
          </h2>
          <p className="text-muted-foreground text-lg">
            Scegli il piano che meglio si adatta alle tue necessità, 
            dalla versione gratuita agli strumenti predittivi avanzati.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Free Tier */}
          <div className="bg-gradient-card rounded-2xl border border-border/50 p-8 shadow-card">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-foreground text-sm font-medium mb-6">
              Dashboard Gratuita
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">
              Inizia Senza Costi
            </h3>
            <p className="text-muted-foreground mb-8">
              Accedi alle analisi essenziali per monitorare il mercato e ricevere alert importanti.
            </p>
            
            <div className="space-y-4">
              {freeFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Tier */}
          <div className="relative bg-gradient-card rounded-2xl border border-primary/30 p-8 shadow-card glow-primary">
            {/* Popular Badge */}
            <div className="absolute -top-3 right-8 px-4 py-1 bg-gradient-primary rounded-full text-primary-foreground text-sm font-medium">
              Più Popolare
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
              Strumenti Avanzati
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">
              Analisi Predittive Pro
            </h3>
            <p className="text-muted-foreground mb-8">
              Sfrutta il machine learning per previsioni accurate e decisioni data-driven.
            </p>
            
            <div className="space-y-4">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/30 transition-colors">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
