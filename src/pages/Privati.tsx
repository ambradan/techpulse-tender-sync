import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import { 
  ArrowRight, 
  User,
  Brain,
  TrendingUp,
  Target,
  Compass,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Briefcase,
  Code,
  Languages,
  BarChart3,
  CheckCircle,
  Layers,
  Map,
  Clock,
  Award,
  Zap,
  FileText,
  Play,
  Sparkles
} from "lucide-react";

const Privati = () => {
  return (
    <main className="min-h-screen bg-gradient-hero flex flex-col">
      <MainNavbar />

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
            <User className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium">Per i Privati</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            Il tuo career coach<br />
            <span className="text-gradient-accent">predittivo</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Scopri quale lavoro farai nel futuro e preparati con una roadmap personalizzata.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                Scopri il Tuo Futuro Professionale
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2">
              <FileText className="w-4 h-4" />
              Guarda un Esempio di Roadmap
            </Button>
          </div>
        </div>
      </section>

      {/* Sezione 1: Analisi del Profilo */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Analisi del Tuo Profilo
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprendiamo chi sei per costruire il tuo percorso ideale
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Sparkles, title: "Competenze", desc: "Hard e soft skill attuali, livello di padronanza" },
            { icon: Briefcase, title: "Esperienze", desc: "Percorso professionale, settori, ruoli ricoperti" },
            { icon: Compass, title: "Inclinazioni", desc: "Interessi, passioni, aree di motivazione" },
            { icon: Brain, title: "Stile Cognitivo", desc: "Come apprendi, risolvi problemi, lavori in team" },
          ].map((item, index) => (
            <Card key={index} className="bg-gradient-card border-border/50 hover:border-accent/30 transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 mx-auto">
                  <item.icon className="w-7 h-7 text-accent" />
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

      {/* Sezione 2: AI Predittiva per il Futuro Professionale */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Brain className="w-4 h-4 text-accent" />
              <span className="text-sm text-accent font-medium">AI Predittiva</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Il Tuo Futuro Professionale
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              L'intelligenza artificiale analizza trend di mercato, domanda di competenze e traiettorie 
              di carriera per mostrarti dove andrai.
            </p>
            
            <div className="space-y-4">
              {[
                { icon: Target, label: "Ruoli Probabili", desc: "I 3 ruoli più compatibili con il tuo profilo" },
                { icon: Zap, label: "Skill Richieste", desc: "Competenze chiave per i tuoi ruoli target" },
                { icon: TrendingUp, label: "Settori in Crescita", desc: "Dove la domanda sta aumentando" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{item.label}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-card rounded-2xl border border-border/50 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-accent" />
              <span className="font-display text-lg font-semibold text-foreground">
                I Tuoi Ruoli Futuri
              </span>
            </div>
            
            <div className="space-y-4">
              {[
                { role: "Product Manager", match: 92, trend: "+28%", sector: "Tech" },
                { role: "UX Strategist", match: 85, trend: "+22%", sector: "Design" },
                { role: "Data Analyst", match: 78, trend: "+35%", sector: "Analytics" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">{item.role}</span>
                    <span className="text-accent font-bold">{item.match}% match</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-500">{item.trend} domanda</span>
                    <span className="text-muted-foreground">Settore: {item.sector}</span>
                  </div>
                  <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent rounded-full"
                      style={{ width: `${item.match}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sezione 3: Gap Analysis */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Gap Analysis
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cosa ti manca per raggiungere i tuoi obiettivi? Identifichiamo i gap da colmare.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-card rounded-2xl border border-border/50 p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Competenze Acquisite
                </h3>
                <ul className="space-y-3">
                  {["Project Management", "Comunicazione", "Problem Solving", "Leadership base"].map((skill, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-foreground">{skill}</span>
                      <span className="ml-auto text-sm text-green-500">✓ Acquisita</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  Gap da Colmare
                </h3>
                <ul className="space-y-3">
                  {[
                    { skill: "Data Analysis", priority: "Alta" },
                    { skill: "Python Base", priority: "Media" },
                    { skill: "Inglese B2+", priority: "Alta" },
                    { skill: "UX Research", priority: "Bassa" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-foreground">{item.skill}</span>
                      <span className={`ml-auto text-xs px-2 py-1 rounded ${
                        item.priority === "Alta" ? "bg-red-500/10 text-red-500" :
                        item.priority === "Media" ? "bg-yellow-500/10 text-yellow-500" :
                        "bg-green-500/10 text-green-500"
                      }`}>
                        {item.priority}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione 4: Roadmap Formativa */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Roadmap Formativa Personalizzata
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Un percorso su misura con corsi, certificazioni e learning sprint per raggiungere i tuoi obiettivi
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
            
            <div className="space-y-8">
              {[
                { 
                  phase: "Fase 1", 
                  title: "Fondamenta", 
                  duration: "Mesi 1-3",
                  items: [
                    { icon: Languages, name: "Inglese Business B2", type: "Corso", hours: "60h" },
                    { icon: BarChart3, name: "Excel Avanzato", type: "Certificazione", hours: "20h" },
                  ]
                },
                { 
                  phase: "Fase 2", 
                  title: "Competenze Core", 
                  duration: "Mesi 4-6",
                  items: [
                    { icon: Code, name: "Python per Data Analysis", type: "Corso", hours: "40h" },
                    { icon: BarChart3, name: "SQL Fundamentals", type: "Learning Sprint", hours: "15h" },
                  ]
                },
                { 
                  phase: "Fase 3", 
                  title: "Specializzazione", 
                  duration: "Mesi 7-12",
                  items: [
                    { icon: Award, name: "Google Data Analytics", type: "Certificazione", hours: "80h" },
                    { icon: Lightbulb, name: "Product Management Basics", type: "Corso", hours: "30h" },
                  ]
                },
              ].map((phase, index) => (
                <div key={index} className="relative flex gap-6">
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center z-10">
                      <span className="font-display font-bold text-accent">{index + 1}</span>
                    </div>
                  </div>
                  
                  <Card className="flex-1 bg-gradient-card border-border/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs text-accent font-medium">{phase.phase}</span>
                          <CardTitle className="text-xl">{phase.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{phase.duration}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {phase.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                            <item.icon className="w-5 h-5 text-accent" />
                            <div className="flex-1">
                              <div className="font-medium text-foreground text-sm">{item.name}</div>
                              <div className="text-xs text-muted-foreground">{item.type} • {item.hours}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sezione 5: Simulazioni */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simulazioni: "Cosa Succede Se..."
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Esplora scenari alternativi e scopri come cambierebbe il tuo futuro professionale
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { 
              icon: Briefcase, 
              question: "Cambio settore?",
              desc: "Scopri quali settori sono più compatibili con le tue competenze e quanto tempo serve per la transizione",
              impact: "Alto impatto"
            },
            { 
              icon: Languages, 
              question: "Miglioro l'inglese?",
              desc: "Vedi come un livello C1 cambierebbe le tue opportunità e lo stipendio medio atteso",
              impact: "Medio impatto"
            },
            { 
              icon: Code, 
              question: "Imparo Python?",
              desc: "Analizza quali nuovi ruoli si aprirebbero e quanto aumenterebbe la tua competitività",
              impact: "Alto impatto"
            },
          ].map((sim, index) => (
            <Card key={index} className="bg-gradient-card border-border/50 hover:border-accent/30 transition-all cursor-pointer group">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <sim.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {sim.question}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{sim.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">{sim.impact}</span>
                  <Layers className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Beneficio Percepito */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-card rounded-2xl border border-accent/30 p-8 md:p-12 text-center">
            <Map className="w-16 h-16 text-accent mx-auto mb-6" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              "Finalmente una direzione chiara."
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Basta navigare a vista. TechPulse ti mostra esattamente dove andare, cosa imparare 
              e quanto tempo ci vorrà. Una mappa del tuo futuro professionale.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Finale */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Pronto a Scoprire il Tuo Futuro?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Inizia oggi e ottieni la tua roadmap personalizzata verso il lavoro dei tuoi sogni.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                Scopri il Tuo Futuro Professionale
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2">
              <Play className="w-4 h-4" />
              Guarda un Esempio di Roadmap
            </Button>
          </div>
        </div>
      </section>

      <MainFooter />
    </main>
  );
};

export default Privati;
