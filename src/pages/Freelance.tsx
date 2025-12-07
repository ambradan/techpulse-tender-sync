import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import { 
  ArrowRight, 
  Briefcase,
  Brain,
  TrendingUp,
  Target,
  DollarSign,
  Users,
  LineChart,
  Layers,
  Zap,
  Globe,
  MessageSquare,
  Mail,
  Sparkles,
  PieChart,
  BarChart3,
  Award,
  Radar,
  Send,
  Play,
  Eye,
  Wallet,
  TrendingDown
} from "lucide-react";

const Freelance = () => {
  return (
    <main className="min-h-screen bg-gradient-hero flex flex-col">
      <MainNavbar />

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Briefcase className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Per i Freelance</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            Il tuo business advisor<br />
            <span className="text-gradient-primary">predittivo</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Scopri dove andrà la domanda, quali clienti avranno budget e come posizionarti.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="gap-2">
                Ottieni il Tuo Posizionamento Predittivo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2">
              <Users className="w-4 h-4" />
              Scopri i Lead della Tua Nicchia
            </Button>
          </div>
        </div>
      </section>

      {/* Sezione 1: Analisi del Profilo */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Analisi del Tuo Profilo Freelance
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprendiamo il tuo business per ottimizzare il posizionamento
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Sparkles, title: "Competenze", desc: "Skill tecniche e trasversali, livello di expertise" },
            { icon: Users, title: "Clienti", desc: "Tipologia clienti, settori serviti, dimensioni aziende" },
            { icon: Eye, title: "Portfolio", desc: "Progetti realizzati, casi studio, risultati ottenuti" },
            { icon: DollarSign, title: "Pricing", desc: "Tariffe attuali, modello di pricing, margini" },
          ].map((item, index) => (
            <Card key={index} className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <item.icon className="w-7 h-7 text-primary" />
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

      {/* Sezione 2: Previsione Domanda */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">AI Predittiva</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Previsione della Domanda
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Anticipa il mercato: scopri quali servizi saranno richiesti, in quali settori 
              ci sarà budget e dove la concorrenza sta saturando.
            </p>
            
            <div className="space-y-4">
              {[
                { icon: Zap, label: "Servizi in Crescita", desc: "I servizi più richiesti nei prossimi 12 mesi" },
                { icon: Globe, label: "Settori con Budget", desc: "Industrie che investiranno di più" },
                { icon: Wallet, label: "Budget Previsti", desc: "Stime di spesa per tipologia di progetto" },
                { icon: TrendingDown, label: "Saturazione Mercato", desc: "Aree con troppa concorrenza da evitare" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
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
              <TrendingUp className="w-6 h-6 text-primary" />
              <span className="font-display text-lg font-semibold text-foreground">
                Trend Domanda 12 Mesi
              </span>
            </div>
            
            <div className="space-y-4">
              {[
                { service: "AI/ML Integration", trend: "+45%", demand: "Alta", color: "text-green-500" },
                { service: "UX/UI Design", trend: "+22%", demand: "Alta", color: "text-green-500" },
                { service: "Web Development", trend: "+8%", demand: "Media", color: "text-yellow-500" },
                { service: "Copywriting", trend: "-5%", demand: "Bassa", color: "text-red-500" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">{item.service}</span>
                    <span className={`font-bold ${item.color}`}>{item.trend}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Domanda: {item.demand}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      item.demand === "Alta" ? "bg-green-500" :
                      item.demand === "Media" ? "bg-yellow-500" : "bg-red-500"
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sezione 3: Posizionamento Consigliato */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Posizionamento Consigliato
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            La tua strategia di differenziazione per emergere nel mercato
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>La Tua Nicchia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-secondary/50 mb-4">
                <span className="text-lg font-bold text-primary">SaaS B2B Tech</span>
                <p className="text-sm text-muted-foreground mt-1">
                  Aziende software 10-50 dipendenti
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Nicchia con alta domanda, budget consistenti e bassa saturazione per il tuo profilo.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>I Tuoi Differenziali</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "Esperienza specifica nel settore",
                  "Approccio data-driven",
                  "Delivery veloce e affidabile",
                  "Comunicazione proattiva",
                ].map((diff, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-foreground">{diff}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Proposta di Valore</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-secondary/50 mb-4">
                <p className="text-sm text-foreground italic">
                  "Aiuto le SaaS B2B a convertire il 30% in più con UX basata sui dati"
                </p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Pricing consigliato</span>
                <span className="font-bold text-primary">€95/ora</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sezione 4: Strategia Commerciale */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Strategia Commerciale AI-Powered
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Lead ideali, canali efficaci e messaggi personalizzati generati dall'AI
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              icon: Users, 
              title: "Lead Ideali", 
              desc: "Profilo del cliente perfetto basato sui tuoi successi passati",
              example: "CTO di SaaS in scaling"
            },
            { 
              icon: Globe, 
              title: "Canali", 
              desc: "Dove trovare i tuoi clienti ideali con il miglior ROI",
              example: "LinkedIn, Indie Hackers"
            },
            { 
              icon: MessageSquare, 
              title: "Messaggi", 
              desc: "Template di comunicazione ottimizzati per il tuo target",
              example: "3 template testati"
            },
            { 
              icon: Mail, 
              title: "Cold Intro AI", 
              desc: "Email di primo contatto generate dall'AI per ogni lead",
              example: "Personalizzazione auto"
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
                <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                <div className="inline-flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                  <Zap className="w-3 h-3" />
                  {item.example}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cold Intro AI Demo */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-gradient-card rounded-2xl border border-border/50 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Send className="w-6 h-6 text-primary" />
              <span className="font-display text-lg font-semibold text-foreground">
                Esempio Cold Intro AI
              </span>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 font-mono text-sm">
              <p className="text-muted-foreground mb-2">Oggetto: Quick thought on [Company] conversion</p>
              <p className="text-foreground">
                Ciao [Name],<br /><br />
                Ho notato che [Company] sta scalando rapidamente (congrats per il round!). 
                Lavorando con SaaS simili come [Similar Company], ho visto che 
                un redesign UX data-driven può portare +30% conversioni in 3 mesi.<br /><br />
                Ti va un caffè virtuale per esplorare se ha senso per voi?<br /><br />
                [Your Name]
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              * Generato automaticamente in base al profilo del lead
            </p>
          </div>
        </div>
      </section>

      {/* Sezione 5: Dashboard Freelance */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Dashboard Freelance
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tutti i KPI del tuo mercato in un'unica vista
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { 
              title: "Trend Domanda/Offerta", 
              icon: LineChart,
              value: "Domanda > Offerta",
              subtext: "+18% gap favorevole",
              color: "text-green-500"
            },
            { 
              title: "Skill Premium", 
              icon: Award,
              value: "AI Integration",
              subtext: "+45% pricing premium",
              color: "text-primary"
            },
            { 
              title: "Pricing Medio Mercato", 
              icon: PieChart,
              value: "€75/ora",
              subtext: "Tu: €85 (top 25%)",
              color: "text-accent"
            },
          ].map((item, index) => (
            <Card key={index} className="bg-gradient-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">{item.title}</span>
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{item.subtext}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart placeholder */}
        <div className="bg-gradient-card rounded-2xl border border-border/50 p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-primary" />
              <span className="font-display text-lg font-semibold text-foreground">
                Domanda vs Offerta - Tua Nicchia
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-primary" />
                <span className="text-muted-foreground">Domanda</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-accent" />
                <span className="text-muted-foreground">Offerta</span>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-between gap-4 h-48">
            {[
              { month: "Gen", demand: 60, supply: 50 },
              { month: "Feb", demand: 65, supply: 52 },
              { month: "Mar", demand: 70, supply: 55 },
              { month: "Apr", demand: 75, supply: 58 },
              { month: "Mag", demand: 72, supply: 60 },
              { month: "Giu", demand: 80, supply: 62 },
              { month: "Lug", demand: 78, supply: 65 },
              { month: "Ago", demand: 70, supply: 60 },
              { month: "Set", demand: 85, supply: 68 },
              { month: "Ott", demand: 90, supply: 70 },
              { month: "Nov", demand: 88, supply: 72 },
              { month: "Dic", demand: 82, supply: 68 },
            ].map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-1 items-end h-40">
                  <div 
                    className="flex-1 bg-primary/60 rounded-t"
                    style={{ height: `${data.demand}%` }}
                  />
                  <div 
                    className="flex-1 bg-accent/60 rounded-t"
                    style={{ height: `${data.supply}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficio Finale */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-card rounded-2xl border border-primary/30 p-8 md:p-12 text-center">
            <Radar className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              "Un radar predittivo sul mercato freelance."
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Mentre altri freelance navigano a vista, tu vedi dove sta andando il mercato. 
              Anticipa la domanda, posizionati prima, vinci.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Finale */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Pronto a Dominare il Tuo Mercato?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Inizia oggi e ottieni il tuo posizionamento predittivo personalizzato.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="gap-2">
                Ottieni il Tuo Posizionamento Predittivo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2">
              <Users className="w-4 h-4" />
              Scopri i Lead della Tua Nicchia
            </Button>
          </div>
        </div>
      </section>

      <MainFooter />
    </main>
  );
};

export default Freelance;
