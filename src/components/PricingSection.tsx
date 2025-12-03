import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "€0",
      period: "per sempre",
      description: "Ideale per esplorare le potenzialità della piattaforma",
      features: [
        "Dashboard analisi di base",
        "5 alert normativi/mese",
        "Report mensile sintetico",
        "Accesso TenderMatch base",
        "Supporto community"
      ],
      cta: "Inizia Gratis",
      variant: "outline" as const,
      popular: false
    },
    {
      name: "Professional",
      price: "€49",
      period: "/mese",
      description: "Per aziende che vogliono un vantaggio competitivo",
      features: [
        "Tutto di Free, più:",
        "Analisi predittive ML",
        "Alert illimitati",
        "Report settimanali dettagliati",
        "TenderMatch Pro con matching avanzato",
        "Supporto prioritario"
      ],
      cta: "Prova 14 Giorni Gratis",
      variant: "hero" as const,
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Soluzioni personalizzate per grandi organizzazioni",
      features: [
        "Tutto di Professional, più:",
        "API dedicate",
        "Modelli ML personalizzati",
        "Account manager dedicato",
        "SLA garantito",
        "Integrazione sistemi aziendali"
      ],
      cta: "Contattaci",
      variant: "glass" as const,
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Prezzi
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 mb-6 text-foreground">
            Scegli il Piano Giusto per Te
          </h2>
          <p className="text-muted-foreground text-lg">
            Parti gratis e scala quando cresci. Nessun costo nascosto, 
            cancellazione in qualsiasi momento.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-gradient-card rounded-2xl border p-8 ${
                plan.popular 
                  ? 'border-primary/50 shadow-elevated glow-primary' 
                  : 'border-border/50 shadow-card'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-primary rounded-full text-primary-foreground text-sm font-medium">
                  Consigliato
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="font-display text-4xl font-bold text-foreground">
                  {plan.price}
                </span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button variant={plan.variant} className="w-full" size="lg">
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Utilizzato da <span className="text-foreground font-medium">500+ aziende</span> in Italia
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
