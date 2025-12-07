import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Activity, 
  ArrowRight, 
  Briefcase,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  Compass,
  LineChart,
  Zap,
  PieChart,
  CheckCircle,
  Globe
} from "lucide-react";

const Freelance = () => {
  return (
    <main className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">TechPulse</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/aziende" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Aziende
            </Link>
            <Link to="/privati" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privati
            </Link>
            <Link to="/freelance" className="text-sm text-primary font-medium">
              Freelance
            </Link>
          </nav>
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

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Briefcase className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Per i Freelance</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            Il Business Advisor<br />
            <span className="text-gradient-primary">Predittivo</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Previsioni sulla tua nicchia, pricing ottimale, strategie di posizionamento e 
            analisi della domanda per far crescere il tuo business da freelance.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="gap-2">
                Inizia Ora
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Esplora le Funzionalità
            </Button>
          </div>
        </div>
      </section>

      {/* Funzionalità */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Strumenti per il Tuo Successo
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tutto ciò che serve per prendere decisioni strategiche sul tuo business
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              icon: LineChart, 
              title: "Analisi della Nicchia", 
              desc: "Previsioni sulla domanda nella tua nicchia di mercato a 12, 36 e 60 mesi." 
            },
            { 
              icon: DollarSign, 
              title: "Pricing Intelligence", 
              desc: "Suggerimenti di pricing basati su mercato, esperienza e posizionamento competitivo." 
            },
            { 
              icon: Target, 
              title: "Posizionamento Strategico", 
              desc: "Identificazione di opportunità di differenziazione e nicchie sottovalutate." 
            },
            { 
              icon: Users, 
              title: "Analisi Clienti Ideali", 
              desc: "Profilazione del cliente target e strategie di acquisizione ottimali." 
            },
            { 
              icon: PieChart, 
              title: "Revenue Forecasting", 
              desc: "Previsioni di fatturato basate su trend storici e proiezioni di mercato." 
            },
            { 
              icon: Globe, 
              title: "Opportunità Geografiche", 
              desc: "Identificazione di mercati emergenti per espandere il tuo business." 
            },
          ].map((item, index) => (
            <Card key={index} className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Decisioni Basate sui Dati
            </h2>
            <p className="text-muted-foreground mb-8">
              Smetti di tirare a indovinare. TechPulse ti dà le informazioni che ti servono 
              per far crescere il tuo business in modo strategico.
            </p>
            <ul className="space-y-4">
              {[
                "Quanto dovresti chiedere per i tuoi servizi?",
                "Qual è la domanda prevista nella tua nicchia?",
                "Dove sono i tuoi competitor e come differenziarti?",
                "Quali skill dovresti sviluppare per aumentare i guadagni?",
                "Quando è il momento giusto per espandere?",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gradient-card rounded-2xl border border-border/50 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Compass className="w-6 h-6 text-primary" />
              <span className="font-display text-lg font-semibold text-foreground">
                Freelance Dashboard
              </span>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="text-sm text-muted-foreground mb-1">Pricing consigliato</div>
                <div className="text-2xl font-bold text-primary">€85/ora</div>
                <div className="text-xs text-muted-foreground">+15% rispetto alla media di mercato</div>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="text-sm text-muted-foreground mb-1">Domanda nella tua nicchia</div>
                <div className="text-2xl font-bold text-foreground">↑ Crescente</div>
                <div className="text-xs text-muted-foreground">+23% previsto in 12 mesi</div>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="text-sm text-muted-foreground mb-1">Revenue prevista Q1 2025</div>
                <div className="text-2xl font-bold text-accent">€28,500</div>
                <div className="text-xs text-muted-foreground">Basato sul trend attuale</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tipologie di Freelance */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Per Ogni Tipo di Freelance
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Che tu sia un developer, un designer, un consulente o un creativo, TechPulse si adatta alla tua nicchia
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Sviluppatori", desc: "Web, mobile, backend, data" },
            { title: "Designer", desc: "UX/UI, grafica, branding" },
            { title: "Consulenti", desc: "Marketing, strategy, HR" },
            { title: "Creativi", desc: "Copywriter, video, foto" },
          ].map((item, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl border border-border/50 bg-card/30 text-center hover:bg-card/60 transition-colors"
            >
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center">
          <Zap className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Fai Crescere il Tuo Business
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Inizia oggi e ottieni la tua prima analisi di mercato personalizzata.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="gap-2">
                Inizia Gratuitamente
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            © 2024 TechPulse. Tutti i diritti riservati.
          </Link>
        </div>
      </footer>
    </main>
  );
};

export default Freelance;
