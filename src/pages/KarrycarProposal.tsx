import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Search,
  KeyRound,
  UserPlus,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import { useKarrycarSession } from "@/hooks/useKarrycarSession";
import { useAuth } from "@/hooks/useAuth";

export default function KarrycarProposal() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AccessSection />
      <IntroSection />
      <PainPointsSection />
      <ServicesSection />
      <PackagesSection />
      <TechPulseSection />
      <CTASection />
      <Footer />
    </div>
  );
}

function Header() {
  return (
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
  );
}

function HeroSection() {
  return (
    <section className="py-16 md:py-24 border-b border-border/40 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">
          Proposta Riservata
        </Badge>
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          TechPulse AI Suite
          <span className="block text-primary mt-2">Previsioni. Strategie. Futuro.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          La piattaforma intelligente per aziende, privati e freelance: analisi predittive, 
          identificazione competenze critiche e gestione rischi normativi.
        </p>
      </div>
    </section>
  );
}

function AccessSection() {
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const navigate = useNavigate();
  const { validateCode, isKarrycarAuthenticated } = useKarrycarSession();
  const { user, isLoading: authLoading } = useAuth();

  // If already authenticated with Karrycar code, show dashboard button
  if (isKarrycarAuthenticated) {
    return (
      <section className="py-12 border-b border-border/40 bg-muted/30">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <KeyRound className="w-4 h-4 mr-2" />
            Accesso Karrycar attivo
          </Badge>
          <h2 className="text-2xl font-bold mb-4">Bentornato!</h2>
          <p className="text-muted-foreground mb-6">
            Hai già accesso alla dashboard Karrycar.
          </p>
          <Button size="lg" onClick={() => navigate("/karrycar-dashboard")}>
            <ArrowRight className="w-4 h-4 mr-2" />
            Vai alla Dashboard
          </Button>
        </div>
      </section>
    );
  }

  // If logged in with Supabase, show dashboard link
  if (!authLoading && user) {
    return (
      <section className="py-12 border-b border-border/40 bg-muted/30">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Autenticato
          </Badge>
          <h2 className="text-2xl font-bold mb-4">Bentornato!</h2>
          <p className="text-muted-foreground mb-6">
            Sei già autenticato con il tuo account TechPulse.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/karrycar")}>
              <ArrowRight className="w-4 h-4 mr-2" />
              Dashboard Karrycar Alpha
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/dashboard")}>
              Dashboard Principale
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsValidating(true);
    
    const result = await validateCode(code);
    
    if (result.success) {
      navigate("/karrycar-dashboard");
    } else {
      setError(result.error || "Codice non valido");
    }
    
    setIsValidating(false);
  };

  return (
    <section className="py-12 border-b border-border/40 bg-gradient-to-b from-amber-500/5 to-background">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-amber-500/20 text-amber-400 border-amber-500/30">
            🎄 Accesso esclusivo fino a Natale
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Accedi alla Dashboard Predittiva
          </h2>
          <p className="text-muted-foreground">
            Scegli come accedere alla dashboard TechPulse dedicata a Karrycar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Option A: Access with Code */}
          <Card className={`border-2 transition-colors ${showCodeInput ? 'border-primary' : 'border-border/40 hover:border-primary/40'}`}>
            <CardHeader className="text-center pb-4">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <KeyRound className="w-7 h-7 text-primary" />
              </div>
              <CardTitle className="text-xl">Accesso con Codice</CardTitle>
              <CardDescription>
                Hai ricevuto un codice dedicato? Inseriscilo per accedere subito.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!showCodeInput ? (
                <Button 
                  className="w-full" 
                  onClick={() => setShowCodeInput(true)}
                >
                  <KeyRound className="w-4 h-4 mr-2" />
                  Ho un codice Karrycar
                </Button>
              ) : (
                <form onSubmit={handleCodeSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="access-code">Codice di accesso</Label>
                    <Input 
                      id="access-code"
                      type="text" 
                      value={code} 
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      placeholder="Es. KARRYCAR2024"
                      className="mt-2 text-center font-mono uppercase"
                      required
                      disabled={isValidating}
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-destructive text-center">{error}</p>
                  )}
                  <Button type="submit" className="w-full" disabled={isValidating || !code.trim()}>
                    {isValidating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Verifica in corso...
                      </>
                    ) : (
                      <>
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Accedi
                      </>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="w-full" 
                    onClick={() => {
                      setShowCodeInput(false);
                      setCode("");
                      setError(null);
                    }}
                  >
                    Annulla
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Option B: Register / Login */}
          <Card className="border-border/40 hover:border-primary/40 transition-colors">
            <CardHeader className="text-center pb-4">
              <div className="w-14 h-14 rounded-xl bg-secondary/50 flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-7 h-7 text-muted-foreground" />
              </div>
              <CardTitle className="text-xl">Registrati / Accedi</CardTitle>
              <CardDescription>
                Crea un account TechPulse per accedere a tutte le funzionalità.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => navigate("/auth")}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Registrati / Accedi
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Accesso completo a dashboard, profilo e tutte le funzionalità.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function IntroSection() {
  return (
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
  );
}

function PainPointsSection() {
  return (
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
  );
}

function ServicesSection() {
  return (
    <section className="py-16 border-b border-border/40">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          Servizi proposti
        </h2>
        <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
          Tre aree di intervento complementari, attivabili singolarmente o in combinazione.
        </p>
        
        <div className="grid lg:grid-cols-3 gap-6">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function PackagesSection() {
  return (
    <section className="py-16 border-b border-border/40">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          Opzioni pacchetto
        </h2>
        <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
          Tre formule per adattarsi alle diverse esigenze.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
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
  );
}

function TechPulseSection() {
  const { isKarrycarAuthenticated } = useKarrycarSession();
  const navigate = useNavigate();
  
  return (
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
        
        <Button 
          size="lg" 
          onClick={() => navigate(isKarrycarAuthenticated ? "/karrycar-dashboard" : "#")}
          disabled={!isKarrycarAuthenticated}
        >
          {isKarrycarAuthenticated ? (
            <>Apri dashboard predittiva <ArrowRight className="w-4 h-4 ml-2" /></>
          ) : (
            <>Inserisci codice per accedere <KeyRound className="w-4 h-4 ml-2" /></>
          )}
        </Button>
        {!isKarrycarAuthenticated && (
          <p className="text-sm text-muted-foreground mt-3">
            Scorri in alto per inserire il tuo codice di accesso Karrycar
          </p>
        )}
      </div>
    </section>
  );
}

function CTASection() {
  return (
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
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Contatti</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Ambra Danesin</p>
              <p>HR Tech Director</p>
              <p>Tel: 338.908.5894</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Links utili</h3>
            <div className="space-y-3 text-sm">
              <a 
                href="https://www.linkedin.com/in/ambradanesin/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                LinkedIn <ExternalLink className="w-3 h-3" />
              </a>
              <Link to="/privacy" className="block text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">TechPulse</h3>
            <p className="text-sm text-muted-foreground">
              Analisi predittiva e consulenza HR per il futuro del lavoro.
            </p>
          </div>
        </div>
        <div className="pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>© 2024 TechPulse. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
}
