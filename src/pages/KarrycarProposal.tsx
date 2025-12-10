import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  ExternalLink, 
  Mail, 
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BarChart3,
  Briefcase,
  AlertTriangle,
  Target,
  Search
} from "lucide-react";
import { Link } from "react-router-dom";

export default function KarrycarProposal() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-semibold">TechPulse</span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href="mailto:ambradan91@gmail.com">
                Contattami
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 border-b border-border/40 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">
            Proposta Riservata
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Proposta HR & Tech
            <span className="block text-primary mt-2">KarryCar</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Soluzione completa per ricerca, selezione, analisi e supporto HR.
          </p>
        </div>
      </section>

      {/* Section 1 - Intro Ambra */}
      <section className="py-16 border-b border-border/40">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
              <span className="text-3xl font-bold text-primary">AD</span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Ambra Danesin</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                HR Tech Director con esperienza consolidata nella selezione, analisi e ottimizzazione 
                dei processi HR moderni. Mi specializzo in ruoli tecnici e posizioni complesse, 
                dove la qualità della selezione fa la differenza. Il mio approccio integra ricerca attiva, 
                analisi di mercato e supporto HR continuativo — garantendo un percorso chiaro e trasparente 
                dall'inizio alla fine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Pain Points */}
      <section className="py-16 border-b border-border/40 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Le sfide che affrontiamo insieme
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: AlertTriangle,
                title: "Reperimento figure tecniche",
                description: "Difficoltà nel trovare profili qualificati e affidabili in ambito tech e automotive."
              },
              {
                icon: TrendingUp,
                title: "Processo strutturato",
                description: "Necessità di velocizzare selezione e validazione senza sacrificare la qualità."
              },
              {
                icon: Search,
                title: "Mappa del mercato",
                description: "Mancanza di una panoramica chiara sul mercato talenti in ottica automotive/tech."
              },
              {
                icon: Target,
                title: "Matching competenze",
                description: "Rischio mismatch tra skill richieste e professionalità effettivamente disponibili."
              }
            ].map((item, index) => (
              <Card key={index} className="border-border/40 bg-card">
                <CardContent className="p-6 flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
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

      {/* Section 3 - Servizi */}
      <section className="py-16 border-b border-border/40">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            Servizi proposti
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Tre aree di intervento complementari, attivabili singolarmente o in combinazione.
          </p>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Service 1 - Recruiting One-Shot */}
            <Card className="border-border/40 bg-card hover:border-primary/40 transition-colors">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Recruiting & Selezione One-Shot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Analisi profilo e definizione requisiti",
                  "Ricerca attiva e head hunting",
                  "Screening candidati",
                  "Interviste tecniche e comportamentali",
                  "Shortlist finale validata",
                  "Coordinamento con KarryCar",
                  "Supporto contrattuale e decisionale"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Service 2 - Fractional HR */}
            <Card className="border-border/40 bg-card hover:border-primary/40 transition-colors">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <Briefcase className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Fractional HR Mensile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Presenza HR flessibile e continuativa",
                  "Gestione attiva dei processi HR",
                  "Advisory strategica continua",
                  "Supporto assunzioni e onboarding",
                  "Ottimizzazione processi interni",
                  "Comunicazione interna",
                  "Gestione situazioni delicate",
                  "Amministrazione e organizzazione"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Service 3 - TechPulse Insight */}
            <Card className="border-border/40 bg-card hover:border-primary/40 transition-colors">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <BarChart3 className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl">TechPulse Insight</CardTitle>
                <Badge variant="outline" className="w-fit mt-2">Opzionale</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Analisi predittiva 12–36–60 mesi",
                  "Trend di competenze settore",
                  "Rischi e opportunità mercato",
                  "Evoluzione ruolo target",
                  "Dashboard predittiva dedicata"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                  <Link to="/karrycar">
                    Esplora TechPulse <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Section 5 - Pacchetti */}
      <section className="py-16 border-b border-border/40">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            Opzioni pacchetto
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Tre formule per adattarsi alle diverse esigenze.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* One-Shot */}
            <Card className="border-border/40 bg-card">
              <CardHeader className="text-center pb-2">
                <Badge variant="outline" className="w-fit mx-auto mb-2">One-Shot</Badge>
                <CardTitle className="text-xl">Recruiting</CardTitle>
                <div className="text-3xl font-bold text-primary mt-4">3.000 €</div>
                <p className="text-xs text-muted-foreground">per ruolo</p>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {[
                    "Selezione completa",
                    "Shortlist validata",
                    "Supporto decisionale",
                    "Coordinamento HM"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Fractional HR */}
            <Card className="border-primary bg-card relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Consigliato</Badge>
              </div>
              <CardHeader className="text-center pb-2">
                <Badge variant="outline" className="w-fit mx-auto mb-2 border-primary text-primary">Fractional</Badge>
                <CardTitle className="text-xl">HR Mensile</CardTitle>
                <div className="text-3xl font-bold text-primary mt-4">3.000–5.000 €</div>
                <p className="text-xs text-muted-foreground">al mese</p>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {[
                    "Presenza HR continua",
                    "Selezione attiva",
                    "Advisory strategica",
                    "Ottimizzazione processi",
                    "Gestione completa",
                    "TechPulse Insight incluso"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className={item.includes("TechPulse") ? "text-emerald-400 font-medium" : "text-muted-foreground"}>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Maintenance */}
            <Card className="border-border/40 bg-card">
              <CardHeader className="text-center pb-2">
                <Badge variant="outline" className="w-fit mx-auto mb-2">Maintenance</Badge>
                <CardTitle className="text-xl">Slow Months</CardTitle>
                <div className="text-3xl font-bold text-primary mt-4">1.000–2.000 €</div>
                <p className="text-xs text-muted-foreground">al mese</p>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {[
                    "Operatività HR",
                    "Amministrazione",
                    "Onboarding",
                    "Gestione ordinaria"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 6 - TechPulse Block */}
      <section className="py-16 border-b border-border/40 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">TechPulse Insight</span>
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              🎄 Omaggio fino a Natale
            </Badge>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Analisi predittiva del mercato Tech
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            <strong className="text-foreground">Incluso gratuitamente fino a Natale!</strong> Dashboard dedicata con trend di competenze, 
            rischi e opportunità di mercato, evoluzione ruoli target su orizzonte 12–36–60 mesi. 
            Insights qualitativi basati sul profilo aziendale dichiarato.
          </p>
          
          {/* Mini Dashboard Preview */}
          <div className="bg-card border border-border/40 rounded-xl p-6 mb-8 max-w-lg mx-auto">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Trend competenze</p>
                <p className="text-sm font-medium text-emerald-500">In crescita</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Rischio mercato</p>
                <p className="text-sm font-medium text-amber-500">Moderato</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Opportunità</p>
                <p className="text-sm font-medium text-emerald-500">Elevate</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Evoluzione ruolo</p>
                <p className="text-sm font-medium text-primary">Positiva</p>
              </div>
            </div>
          </div>
          
          <Button size="lg" asChild>
            <Link to="/karrycar">
              Apri dashboard predittiva <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Section 7 - CTA */}
      <section className="py-20 border-b border-border/40">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Iniziamo a lavorare insieme
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Scrivimi per capire le tue esigenze e costruire un percorso su misura.
          </p>
          <Button size="lg" className="text-lg px-8 py-6" asChild>
            <a href="mailto:ambradan91@gmail.com">
              <Mail className="w-5 h-5 mr-2" />
              Contattami
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Contatti</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <a href="tel:+393389085894" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  338.908.5894
                </a>
                <a href="https://www.linkedin.com/in/ambradanesin/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Link utili</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link to="/karrycar" className="block hover:text-foreground transition-colors">
                  TechPulse Dashboard
                </Link>
                <a href="#" className="block hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Ambra Danesin</h3>
              <p className="text-sm text-muted-foreground">
                HR Tech Director<br />
                Specializzata in selezione e processi HR moderni
              </p>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 TechPulse — Proposta dedicata a KarryCar</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
