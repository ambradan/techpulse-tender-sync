import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import { 
  ArrowRight, 
  Building2, 
  User, 
  Briefcase,
  Brain,
  LineChart,
  AlertTriangle,
  Lightbulb,
  Gauge,
  Target,
  Zap,
  Shield,
  Clock,
  Play,
  CheckCircle
} from "lucide-react";

const Index = () => {
  return (
    <main className="min-h-screen bg-gradient-hero flex flex-col">
      <MainNavbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">AI Predittiva + Consulenza Concreta</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Il Consulente in Tasca<br />
            <span className="text-gradient-primary">per il Futuro del Lavoro</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Previsioni su 12–36–60 mesi per aziende, professionisti e freelance.
            AI predittiva + AI narrativa + dati di contesto per decisioni concrete.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/aziende">
              <Button size="lg" className="gap-2 min-w-[180px]">
                <Building2 className="w-4 h-4" />
                Per le Aziende
              </Button>
            </Link>
            <Link to="/privati">
              <Button size="lg" variant="secondary" className="gap-2 min-w-[180px]">
                <User className="w-4 h-4" />
                Per i Privati
              </Button>
            </Link>
            <Link to="/freelance">
              <Button size="lg" variant="outline" className="gap-2 min-w-[180px]">
                <Briefcase className="w-4 h-4" />
                Per i Freelance
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cosa fa TechPulse */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Cosa fa TechPulse
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tre prodotti in uno, personalizzati per ogni tipo di utente
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 group">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:glow-primary transition-shadow">
                <Building2 className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Per le Aziende
              </h3>
              <p className="text-muted-foreground mb-4">
                Il consulente strategico in tasca. Previsioni di mercato, analisi competitiva e raccomandazioni operative per crescere.
              </p>
              <Link to="/aziende" className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all">
                Scopri di più <ArrowRight className="w-4 h-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 hover:border-accent/50 transition-all duration-300 group">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-accent flex items-center justify-center mb-6 group-hover:glow-accent transition-shadow">
                <User className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Per i Privati
              </h3>
              <p className="text-muted-foreground mb-4">
                Il career coach predittivo. Analisi del tuo percorso, trend del mercato del lavoro e consigli per la tua crescita.
              </p>
              <Link to="/privati" className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all">
                Scopri di più <ArrowRight className="w-4 h-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 group">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:glow-primary transition-shadow">
                <Briefcase className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Per i Freelance
              </h3>
              <p className="text-muted-foreground mb-4">
                Il business advisor predittivo. Previsioni sulla tua nicchia, pricing ottimale e strategie di posizionamento.
              </p>
              <Link to="/freelance" className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all">
                Scopri di più <ArrowRight className="w-4 h-4" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Come funziona */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Come Funziona
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Quattro semplici passi per ottenere previsioni concrete e personalizzate
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { 
              step: "1", 
              icon: User, 
              title: "Inserisci i tuoi dati", 
              desc: "Profilo, settore, storico, obiettivi" 
            },
            { 
              step: "2", 
              icon: Brain, 
              title: "TechPulse analizza", 
              desc: "AI predittiva + contesto di mercato" 
            },
            { 
              step: "3", 
              icon: LineChart, 
              title: "Genera scenari", 
              desc: "Previsioni a 12-36-60 mesi con rischi" 
            },
            { 
              step: "4", 
              icon: Lightbulb, 
              title: "Suggerisce azioni", 
              desc: "Consigli concreti e personalizzati" 
            },
          ].map((item, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="relative inline-flex">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {item.step}
                  </div>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
              {index < 3 && (
                <div className="hidden md:block absolute top-8 left-[calc(100%_-_12px)] w-6">
                  <ArrowRight className="w-6 h-6 text-muted-foreground/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* TechPulse Index */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Gauge className="w-4 h-4 text-accent" />
              <span className="text-sm text-accent font-medium">Indicatore Proprietario</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              TechPulse Index
            </h2>
            <p className="text-muted-foreground mb-6 text-lg">
              Un indice sintetico da 0 a 100 che combina:
            </p>
            <ul className="space-y-4">
              {[
                { icon: AlertTriangle, text: "Rischio del tuo settore" },
                { icon: LineChart, text: "Trend futuri del mercato" },
                { icon: Shield, text: "Impatto normative e regolamenti" },
                { icon: Target, text: "Contesto geopolitico ed economico" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Placeholder Chart */}
          <div className="relative">
            <div className="bg-gradient-card rounded-2xl border border-border/50 p-8">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-muted-foreground">TechPulse Index</span>
                <span className="text-sm text-primary">Live</span>
              </div>
              <div className="flex items-end justify-center gap-2 h-48">
                {[45, 62, 58, 71, 68, 75, 72, 78, 85, 82, 88, 91].map((value, i) => (
                  <div
                    key={i}
                    className="w-6 bg-gradient-primary rounded-t opacity-70 hover:opacity-100 transition-opacity"
                    style={{ height: `${value}%` }}
                  />
                ))}
              </div>
              <div className="text-center mt-6">
                <div className="text-5xl font-display font-bold text-gradient-primary">74</div>
                <div className="text-sm text-muted-foreground mt-1">Indice attuale</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perché è diverso */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Perché TechPulse è Diverso
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Non un semplice chatbot, ma un vero consulente predittivo
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { 
              icon: Brain, 
              title: "AI Predittiva, non solo generativa", 
              desc: "Analizziamo trend e dati per prevedere il futuro, non solo descrivere il presente" 
            },
            { 
              icon: Target, 
              title: "Scenari concreti", 
              desc: "Previsioni a 12, 36 e 60 mesi con azioni specifiche da intraprendere" 
            },
            { 
              icon: Zap, 
              title: "Tre prodotti in uno", 
              desc: "Consulente strategico, career coach e business advisor in un'unica piattaforma" 
            },
            { 
              icon: Shield, 
              title: "Personalizzato per te", 
              desc: "Analisi specifiche per settore, ruolo, nicchia e obiettivi personali" 
            },
            { 
              icon: Clock, 
              title: "Sempre disponibile", 
              desc: "Consulenza di livello enterprise, accessibile 24/7 dal tuo dispositivo" 
            },
            { 
              icon: LineChart, 
              title: "Dati + Contesto", 
              desc: "Combiniamo i tuoi dati con trend di mercato, normative e geopolitica" 
            },
          ].map((item, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl border border-border/50 bg-card/30 hover:bg-card/60 transition-colors"
            >
              <item.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Finale */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Pronto a Vedere il Tuo Futuro?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Inizia oggi con TechPulse e ottieni previsioni personalizzate per il tuo percorso.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="gap-2 min-w-[180px]">
                <ArrowRight className="w-4 h-4" />
                Inizia Ora
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2 min-w-[180px]">
              <Play className="w-4 h-4" />
              Guarda una Demo
            </Button>
          </div>
        </div>
      </section>

      <MainFooter />
    </main>
  );
};

export default Index;
