import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Activity, 
  ArrowRight, 
  Building2,
  LineChart,
  TrendingUp,
  Shield,
  Users,
  Target,
  BarChart3,
  FileText,
  Zap,
  CheckCircle
} from "lucide-react";

const Aziende = () => {
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
            <Link to="/aziende" className="text-sm text-primary font-medium">
              Aziende
            </Link>
            <Link to="/privati" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privati
            </Link>
            <Link to="/freelance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
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
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Per le Aziende</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            Il Consulente Strategico<br />
            <span className="text-gradient-primary">in Tasca</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Previsioni di mercato a 12–36–60 mesi, analisi competitiva e raccomandazioni operative 
            per far crescere la tua azienda con decisioni basate sui dati.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="gap-2">
                Inizia Ora
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Richiedi Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Funzionalità principali */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Cosa Ottieni con TechPulse Business
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Strumenti predittivi e consulenza strategica per ogni aspetto del tuo business
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              icon: LineChart, 
              title: "Previsioni di Mercato", 
              desc: "Analisi predittiva del tuo settore con scenari a 12, 36 e 60 mesi basati su dati reali e trend emergenti." 
            },
            { 
              icon: TrendingUp, 
              title: "Analisi Competitiva", 
              desc: "Benchmarking con competitor del settore e identificazione di opportunità di differenziazione." 
            },
            { 
              icon: Shield, 
              title: "Risk Assessment", 
              desc: "Valutazione rischi normativi, geopolitici e di mercato con early warning system integrato." 
            },
            { 
              icon: Users, 
              title: "HR Predittivo", 
              desc: "Previsioni sul costo del lavoro, turnover e strategie di talent acquisition ottimali." 
            },
            { 
              icon: Target, 
              title: "Gare e Opportunità", 
              desc: "Matching automatico con bandi e gare compatibili con il tuo profilo aziendale." 
            },
            { 
              icon: BarChart3, 
              title: "Dashboard Real-time", 
              desc: "Monitoraggio continuo di KPI, trend e indicatori di performance del tuo settore." 
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

      {/* Use Cases */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Casi d'Uso Concreti
            </h2>
            <p className="text-muted-foreground mb-8">
              TechPulse ti aiuta a prendere decisioni strategiche in ogni area del tuo business.
            </p>
            <ul className="space-y-4">
              {[
                "Pianificare l'espansione in nuovi mercati con dati predittivi",
                "Ottimizzare il budget HR con previsioni sul costo del lavoro",
                "Anticipare cambiamenti normativi che impattano il tuo settore",
                "Identificare gare e bandi prima dei competitor",
                "Valutare rischi e opportunità di nuove iniziative",
                "Monitorare la salute del tuo settore in tempo reale",
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
              <FileText className="w-6 h-6 text-primary" />
              <span className="font-display text-lg font-semibold text-foreground">
                Report Strategico Mensile
              </span>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="text-sm text-muted-foreground mb-1">TechPulse Index</div>
                <div className="text-2xl font-bold text-primary">78/100</div>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="text-sm text-muted-foreground mb-1">Previsione 12 mesi</div>
                <div className="text-2xl font-bold text-foreground">+12% crescita</div>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="text-sm text-muted-foreground mb-1">Alert attivi</div>
                <div className="text-2xl font-bold text-accent">3 opportunità</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center">
          <Zap className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Pronto a Trasformare la Tua Strategia?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Inizia oggi e ottieni la prima analisi predittiva della tua azienda.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="gap-2">
                Registrati Gratuitamente
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

export default Aziende;
