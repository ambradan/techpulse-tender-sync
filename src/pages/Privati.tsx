import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Activity, 
  ArrowRight, 
  User,
  TrendingUp,
  BookOpen,
  Target,
  Compass,
  Award,
  Lightbulb,
  Briefcase,
  GraduationCap,
  CheckCircle
} from "lucide-react";

const Privati = () => {
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
            <Link to="/privati" className="text-sm text-accent font-medium">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
            <User className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium">Per i Privati</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            Il Career Coach<br />
            <span className="text-gradient-accent">Predittivo</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Analisi del tuo percorso professionale, trend del mercato del lavoro e consigli 
            personalizzati per la tua crescita di carriera a 12–36–60 mesi.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                Inizia Ora
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Scopri di Più
            </Button>
          </div>
        </div>
      </section>

      {/* Funzionalità */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Il Tuo Consulente di Carriera Personale
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Strumenti predittivi per navigare il mercato del lavoro con sicurezza
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              icon: TrendingUp, 
              title: "Trend del Tuo Settore", 
              desc: "Analisi predittiva della domanda nel tuo campo professionale e identificazione di skill emergenti." 
            },
            { 
              icon: Target, 
              title: "Career Path Mapping", 
              desc: "Visualizzazione dei possibili percorsi di carriera con probabilità di successo e tempi stimati." 
            },
            { 
              icon: BookOpen, 
              title: "Skill Gap Analysis", 
              desc: "Identificazione delle competenze da sviluppare per raggiungere i tuoi obiettivi professionali." 
            },
            { 
              icon: Compass, 
              title: "Salary Intelligence", 
              desc: "Previsioni salariali basate su ruolo, esperienza, settore e trend di mercato." 
            },
            { 
              icon: Award, 
              title: "Certificazioni Consigliate", 
              desc: "Suggerimenti su corsi e certificazioni ad alto ROI per il tuo profilo specifico." 
            },
            { 
              icon: Lightbulb, 
              title: "Consigli Personalizzati", 
              desc: "Raccomandazioni settimanali basate sui tuoi obiettivi e sull'evoluzione del mercato." 
            },
          ].map((item, index) => (
            <Card key={index} className="bg-gradient-card border-border/50 hover:border-accent/30 transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-accent" />
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

      {/* Chi può usarlo */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-gradient-card rounded-2xl border border-border/50 p-8">
              <h3 className="font-display text-lg font-semibold text-foreground mb-6">
                La Tua Dashboard Personale
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <span className="text-muted-foreground">Crescita prevista (12 mesi)</span>
                  <span className="text-xl font-bold text-accent">+18%</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <span className="text-muted-foreground">Skill da sviluppare</span>
                  <span className="text-xl font-bold text-foreground">3</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <span className="text-muted-foreground">Opportunità compatibili</span>
                  <span className="text-xl font-bold text-primary">12</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <span className="text-muted-foreground">Career Score</span>
                  <span className="text-xl font-bold text-accent">82/100</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Per Chi è TechPulse Privati?
            </h2>
            <p className="text-muted-foreground mb-8">
              Che tu sia all'inizio della carriera o un professionista esperto, TechPulse ti guida verso i tuoi obiettivi.
            </p>
            <ul className="space-y-4">
              {[
                { icon: GraduationCap, text: "Neolaureati che vogliono orientarsi nel mercato del lavoro" },
                { icon: Briefcase, text: "Professionisti che cercano crescita o cambio di settore" },
                { icon: TrendingUp, text: "Manager che vogliono anticipare i trend del loro campo" },
                { icon: Target, text: "Chiunque voglia prendere decisioni di carriera basate sui dati" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-foreground pt-2">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center">
          <Compass className="w-12 h-12 text-accent mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Pronto a Pianificare il Tuo Futuro?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Inizia oggi e ottieni la tua prima analisi di carriera personalizzata.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
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

export default Privati;
