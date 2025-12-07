import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import { 
  ArrowRight, 
  Building2,
  LineChart,
  TrendingUp,
  Shield,
  Users,
  Target,
  Globe,
  Scale,
  Brain,
  Gauge,
  AlertTriangle,
  Layers,
  Settings,
  UserPlus,
  GraduationCap,
  FileCheck,
  Bot,
  Handshake,
  GitBranch,
  Compass,
  Play,
  Calendar
} from "lucide-react";

const Aziende = () => {
  return (
    <main className="min-h-screen bg-gradient-hero flex flex-col">
      <MainNavbar />

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Per le Aziende</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            Il tuo consulente strategico<br />
            <span className="text-gradient-primary">in tasca</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Previsioni, rischi e azioni su 12–36–60 mesi per guidare persone, budget e tecnologia.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="gap-2">
                Prova la Dashboard Aziendale
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Prenota una Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Sezione 1: Analisi del Contesto Aziendale */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Analisi del Contesto Aziendale
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprendiamo la tua azienda per offrirti previsioni precise e personalizzate
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Building2, title: "Settore", desc: "Analisi specifica del tuo settore industriale e delle sue dinamiche" },
            { icon: Globe, title: "Paese", desc: "Contesto geografico, normative locali e opportunità di mercato" },
            { icon: Users, title: "Workforce", desc: "Dimensione team, competenze, struttura organizzativa" },
            { icon: Handshake, title: "Partner", desc: "Ecosistema di partnership e collaborazioni strategiche" },
            { icon: Scale, title: "Rischio Normativo", desc: "Monitoraggio regolamenti e impatti sulla compliance" },
            { icon: AlertTriangle, title: "Rischio Geopolitico", desc: "Analisi scenari internazionali e supply chain" },
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

      {/* Sezione 2: AI Predittiva */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">AI Predittiva</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              TechPulse Index
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Un indice composito che sintetizza tutti i fattori critici per la tua azienda in un unico score azionabile.
            </p>
            
            <div className="space-y-4">
              {[
                { icon: AlertTriangle, label: "Rischio Settore", value: "Medio-Basso", color: "text-yellow-500" },
                { icon: TrendingUp, label: "Outcome di Mercato", value: "Positivo", color: "text-green-500" },
                { icon: Scale, label: "Impatto Normativo", value: "In evoluzione", color: "text-accent" },
                { icon: Globe, label: "Rischio Geopolitico", value: "Moderato", color: "text-yellow-500" },
                { icon: GraduationCap, label: "Trend Skill", value: "Crescita AI/Data", color: "text-primary" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-foreground">{item.label}</span>
                  </div>
                  <span className={`font-semibold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-card rounded-2xl border border-border/50 p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Gauge className="w-6 h-6 text-primary" />
                <span className="font-display text-lg font-semibold text-foreground">TechPulse Index</span>
              </div>
              <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">Live</span>
            </div>
            
            <div className="flex items-center justify-center mb-8">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="hsl(var(--secondary))"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${74 * 2.51} ${100 * 2.51}`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-display font-bold text-foreground">74</span>
                  <span className="text-sm text-muted-foreground">su 100</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 text-green-500">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+3 punti questo mese</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione 3: Scenari */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Scenari Predittivi
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tre scenari per pianificare con consapevolezza: ottimistico, base e pessimistico
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { 
              title: "Scenario Ottimistico", 
              growth: "+25%", 
              color: "text-green-500",
              bgColor: "bg-green-500/10",
              borderColor: "border-green-500/30",
              desc: "Crescita accelerata, espansione mercato, nuove opportunità"
            },
            { 
              title: "Scenario Base", 
              growth: "+12%", 
              color: "text-primary",
              bgColor: "bg-primary/10",
              borderColor: "border-primary/30",
              desc: "Crescita stabile, consolidamento posizione, efficienza operativa"
            },
            { 
              title: "Scenario Pessimistico", 
              growth: "+3%", 
              color: "text-yellow-500",
              bgColor: "bg-yellow-500/10",
              borderColor: "border-yellow-500/30",
              desc: "Crescita rallentata, focus resilienza, ottimizzazione costi"
            },
          ].map((scenario, index) => (
            <Card key={index} className={`bg-gradient-card border ${scenario.borderColor} hover:shadow-lg transition-all`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{scenario.title}</span>
                  <span className={`text-2xl font-bold ${scenario.color}`}>{scenario.growth}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{scenario.desc}</p>
                <div className={`${scenario.bgColor} rounded-lg p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <LineChart className={`w-4 h-4 ${scenario.color}`} />
                    <span className="text-sm font-medium text-foreground">Previsione 12 mesi</span>
                  </div>
                  <div className="h-16 flex items-end gap-1">
                    {[30, 45, 40, 55, 50, 65, 60, 75, 70, 80, 78, 85].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 ${scenario.bgColor} rounded-t opacity-60`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Simulazioni */}
        <div className="bg-gradient-card rounded-2xl border border-border/50 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-primary" />
            <h3 className="font-display text-xl font-semibold text-foreground">
              Simulazioni: "Cosa succede se…"
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Assumo 10 nuove risorse?",
              "Entro in un nuovo mercato?",
              "Cambiano le normative fiscali?",
              "Un competitor esce dal mercato?",
            ].map((question, i) => (
              <div key={i} className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary/80 transition-colors cursor-pointer">
                <Layers className="w-5 h-5 text-primary mb-2" />
                <p className="text-sm text-foreground">{question}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sezione 4: Azioni Consigliate */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Azioni Consigliate
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Raccomandazioni concrete e prioritizzate per guidare le tue decisioni strategiche
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              icon: UserPlus, 
              title: "Hiring", 
              desc: "Piani di assunzione ottimizzati per competenze emergenti e costi previsti",
              priority: "Alta",
              priorityColor: "text-red-500 bg-red-500/10"
            },
            { 
              icon: GraduationCap, 
              title: "Formazione", 
              desc: "Programmi di upskilling mirati sulle competenze più richieste nel tuo settore",
              priority: "Alta",
              priorityColor: "text-red-500 bg-red-500/10"
            },
            { 
              icon: FileCheck, 
              title: "Compliance", 
              desc: "Adeguamenti normativi previsti e timeline per la conformità",
              priority: "Media",
              priorityColor: "text-yellow-500 bg-yellow-500/10"
            },
            { 
              icon: Bot, 
              title: "Automazione", 
              desc: "Aree con maggior potenziale di automazione e ROI stimato",
              priority: "Media",
              priorityColor: "text-yellow-500 bg-yellow-500/10"
            },
            { 
              icon: Handshake, 
              title: "Partnership", 
              desc: "Opportunità di collaborazione strategica nel tuo ecosistema",
              priority: "Media",
              priorityColor: "text-yellow-500 bg-yellow-500/10"
            },
            { 
              icon: GitBranch, 
              title: "Diversificazione", 
              desc: "Nuovi mercati e linee di business compatibili con il tuo profilo",
              priority: "Bassa",
              priorityColor: "text-green-500 bg-green-500/10"
            },
          ].map((action, index) => (
            <Card key={index} className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <action.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${action.priorityColor}`}>
                    Priorità {action.priority}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {action.title}
                </h3>
                <p className="text-sm text-muted-foreground">{action.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Beneficio Percepito */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-card rounded-2xl border border-primary/30 p-8 md:p-12 text-center">
            <Compass className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              "Una bussola per decidere su persone, budget e strategia."
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              TechPulse trasforma dati complessi in decisioni semplici. Non più intuizioni, 
              ma previsioni concrete per guidare la tua azienda verso il futuro.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Finale */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Pronto a Trasformare la Tua Strategia?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Inizia oggi e scopri cosa TechPulse può fare per la tua azienda.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="gap-2">
                Prova la Dashboard Aziendale
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2">
              <Play className="w-4 h-4" />
              Prenota una Demo
            </Button>
          </div>
        </div>
      </section>

      <MainFooter />
    </main>
  );
};

export default Aziende;
