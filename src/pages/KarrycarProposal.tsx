import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search, 
  TrendingUp, 
  ClipboardCheck, 
  Target, 
  Calendar, 
  ExternalLink, 
  Mail, 
  Phone, 
  Building2,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BarChart3,
  Briefcase,
  Shield
} from "lucide-react";

export default function KarrycarProposal() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero py-12 md:py-16 px-4 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
              <Building2 className="w-7 h-7 text-primary" />
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30">
              Proposta Riservata
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Proposta HR & Tech Recruiting
            <span className="block text-primary mt-2">KarryCar</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Soluzione completa per ricerca, selezione e analisi del mercato del lavoro tech.
          </p>
        </div>
      </header>

      {/* Section 1 - Intro */}
      <section className="tp-section">
        <div className="max-w-5xl mx-auto px-4">
          <div className="tp-card p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Chi siamo</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed">
                <strong className="text-foreground">Improove Talent</strong> è specializzata in HR Tech e recruiting strategico 
                per aziende del settore automotive, software e tecnologia. Lavoriamo con team tecnici 
                e hiring manager per identificare, valutare e selezionare i migliori profili sul mercato.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mt-4">
                Questa proposta è stata costruita su misura per <strong className="text-foreground">KarryCar</strong>, 
                con l'obiettivo di supportare la crescita del team tecnico attraverso un approccio 
                strutturato, trasparente e orientato ai risultati.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Pain Points */}
      <section className="tp-section bg-secondary/30">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Le sfide che affrontiamo insieme
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: AlertTriangle,
                title: "Reperimento figure tecniche",
                description: "Difficoltà nel trovare profili qualificati in ambito tech, specialmente per ruoli specializzati."
              },
              {
                icon: TrendingUp,
                title: "Tempi di selezione",
                description: "Necessità di accelerare il processo senza sacrificare la qualità della valutazione."
              },
              {
                icon: Search,
                title: "Visibilità sul mercato",
                description: "Mancanza di una panoramica chiara e aggiornata sul mercato dei talenti tech."
              },
              {
                icon: Target,
                title: "Matching competenze",
                description: "Rischio di mismatch tra le competenze richieste e i profili effettivamente disponibili."
              }
            ].map((item, index) => (
              <Card key={index} className="tp-card border-destructive/20">
                <CardContent className="p-6 flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-destructive/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 - Services */}
      <section className="tp-section">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            Servizi proposti
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Tre aree di intervento complementari, attivabili singolarmente o in combinazione.
          </p>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Service 1 */}
            <Card className="tp-card-hover group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Recruiting & Selezione Completa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Screening approfondito dei candidati",
                  "Interviste tecniche strutturate",
                  "Shortlist finale validata",
                  "Coordinamento con Hiring Manager",
                  "Supporto fino all'inserimento"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Service 2 */}
            <Card className="tp-card-hover group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl">Talent Mapping & Market Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Analisi dei ruoli target",
                  "Competitor landscape (qualitativo)",
                  "Mappatura aree geografiche",
                  "Trend di disponibilità talenti",
                  "Report strategico personalizzato"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Service 3 */}
            <Card className="tp-card-hover group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ClipboardCheck className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl">Tech Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Valutazione soft skill e hard skill",
                  "Test pratici su tecnologie specifiche",
                  "Allineamento con CTO / Tech Lead",
                  "Report dettagliato per candidato",
                  "Benchmark rispetto al mercato"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 4 - Pricing Table */}
      <section className="tp-section bg-secondary/30">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            Struttura economica
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            I costi variano in base alla seniority del profilo, alla complessità del ruolo e al volume di ricerche.
          </p>
          
          <div className="tp-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left p-4 font-semibold">Servizio</th>
                    <th className="text-left p-4 font-semibold">Cosa include</th>
                    <th className="text-left p-4 font-semibold">Fascia di prezzo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="p-4 font-medium">Recruiting Junior</td>
                    <td className="p-4 text-muted-foreground">Screening + Shortlist + 1 colloquio</td>
                    <td className="p-4">
                      <Badge variant="outline" className="border-primary/50 text-primary">Fascia Bassa</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-4 font-medium">Recruiting Mid-Level</td>
                    <td className="p-4 text-muted-foreground">Processo completo + Assessment base</td>
                    <td className="p-4">
                      <Badge variant="outline" className="border-amber-500/50 text-amber-500">Fascia Media</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-4 font-medium">Recruiting Senior / Lead</td>
                    <td className="p-4 text-muted-foreground">Processo executive + Assessment avanzato</td>
                    <td className="p-4">
                      <Badge variant="outline" className="border-destructive/50 text-destructive">Fascia Alta</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-4 font-medium">Talent Mapping</td>
                    <td className="p-4 text-muted-foreground">Analisi mercato + Report strategico</td>
                    <td className="p-4">
                      <span className="text-muted-foreground italic">Variabile in base allo scope</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Tech Assessment</td>
                    <td className="p-4 text-muted-foreground">Valutazione tecnica indipendente</td>
                    <td className="p-4">
                      <span className="text-muted-foreground italic">Da definire per singolo candidato</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-secondary/30 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                I dettagli economici saranno definiti in fase di kick-off in base alle esigenze specifiche.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 - Packages */}
      <section className="tp-section">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            Opzioni pacchetto
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Tre formule per adattarsi alle diverse esigenze di hiring.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Start */}
            <Card className="tp-card relative">
              <CardHeader>
                <Badge className="w-fit bg-muted text-muted-foreground mb-2">Start</Badge>
                <CardTitle className="text-2xl">Shortlist Rapida</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Ideale per esigenze puntuali e tempi stretti.
                </p>
                <ul className="space-y-2">
                  {[
                    "Screening iniziale",
                    "Shortlist validata",
                    "Supporto base"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Professional */}
            <Card className="tp-card relative ring-2 ring-primary">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Consigliato</Badge>
              </div>
              <CardHeader>
                <Badge className="w-fit bg-primary/20 text-primary mb-2">Professional</Badge>
                <CardTitle className="text-2xl">Selezione Completa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Il pacchetto più scelto per hiring strutturato.
                </p>
                <ul className="space-y-2">
                  {[
                    "Tutto di Start, più:",
                    "Interviste tecniche",
                    "Talent Mapping",
                    "Coordinamento HM",
                    "Follow-up post-hiring"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Premium */}
            <Card className="tp-card relative">
              <CardHeader>
                <Badge className="w-fit bg-amber-500/20 text-amber-500 mb-2">Premium</Badge>
                <CardTitle className="text-2xl">Full Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Soluzione completa per team in forte crescita.
                </p>
                <ul className="space-y-2">
                  {[
                    "Tutto di Professional, più:",
                    "Tech Assessment avanzato",
                    "Market Analysis",
                    "Dashboard predittiva",
                    "Supporto strategico HR"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-amber-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 6 - TechPulse Integration */}
      <section className="tp-section bg-gradient-hero">
        <div className="max-w-5xl mx-auto px-4">
          <div className="tp-card border-primary/30 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">
                Analisi predittiva del mercato Tech
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Accedi alla dashboard TechPulse per esplorare trend, previsioni e insight 
              sul mercato del lavoro tech — integrata nella nostra proposta.
            </p>

            {/* Mini Dashboard Preview */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-secondary/50 rounded-xl p-5 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="font-medium">Trend Competenze</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Andamento qualitativo delle skill più richieste nel settore automotive-tech
                </p>
                <Badge className="mt-3 bg-emerald-500/20 text-emerald-400">In crescita</Badge>
              </div>
              
              <div className="bg-secondary/50 rounded-xl p-5 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-amber-500" />
                  <span className="font-medium">Rischi & Opportunità</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Analisi qualitativa delle dinamiche di mercato per il vostro settore
                </p>
                <Badge className="mt-3 bg-amber-500/20 text-amber-400">Monitoraggio attivo</Badge>
              </div>
              
              <div className="bg-secondary/50 rounded-xl p-5 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <span className="font-medium">Evoluzione Ruoli</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Proiezione qualitativa su come i ruoli target evolveranno
                </p>
                <Badge className="mt-3 bg-primary/20 text-primary">Orizzonte: medio-lungo</Badge>
              </div>
            </div>

            <Button 
              asChild 
              size="lg" 
              className="tp-btn-primary"
            >
              <a 
                href="/karrycar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Accedi a TechPulse
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Section 7 - CTA */}
      <section className="tp-section">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Parliamone insieme
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Prenota una call con Ambra per approfondire la proposta e definire 
            i prossimi passi in base alle vostre esigenze.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="tp-btn-primary text-lg px-8 py-6"
          >
            <a 
              href="https://calendly.com/ambra-danesin/karrycar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3"
            >
              Prenota una call con Ambra
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/50 border-t border-border py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Contatti</h3>
              <div className="space-y-3 text-muted-foreground">
                <a 
                  href="mailto:ambra@improovetalent.com" 
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  ambra@improovetalent.com
                </a>
                <a 
                  href="tel:+39XXXXXXXXXX" 
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  [telefono su richiesta]
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Link utili</h3>
              <div className="space-y-3">
                <a 
                  href="/karrycar" 
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  TechPulse Dashboard
                </a>
                <a 
                  href="https://improovetalent.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Improove Talent
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Note legali</h3>
              <div className="space-y-3">
                <a 
                  href="#" 
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </a>
                <a 
                  href="#" 
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Termini e Condizioni
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© Improove Talent — Proposta riservata per KarryCar</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
