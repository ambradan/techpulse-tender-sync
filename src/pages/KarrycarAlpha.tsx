import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Lock, Send, Mail, Sparkles, TrendingUp, Building2, Lightbulb, GraduationCap, Calculator, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  callTechPulsePredict,
  getCompanyPredictions,
  analyzeCompany,
  runRealityCheck,
  getSkillsRoadmap,
  getHRCostCheck,
  type CompanyForecastPayload,
  type CompanyAnalysisPayload,
  type RealityCheckPayload,
  type SkillsRoadmapPayload,
  type HRCostCheckPayload,
} from "@/lib/techpulse-api";

export default function KarrycarAlpha() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setIsAuthenticated(true);
        setUserEmail(session.user.email || null);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setIsAuthenticated(true);
        setUserEmail(session.user.email || null);
      } else {
        setIsAuthenticated(false);
        setUserEmail(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthRequiredPage onNavigateToAuth={() => navigate("/auth")} />;
  }

  return <MainPage userEmail={userEmail} />;
}

function AuthRequiredPage({ onNavigateToAuth }: { onNavigateToAuth: () => void }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md tp-card border-border">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
            <ShieldCheck className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Accesso Riservato</CardTitle>
          <CardDescription>Private Alpha 0.1 – Karrycar Team Only</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground text-center">
            Per accedere a questa pagina riservata è necessario autenticarsi con le proprie credenziali TechPulse.
          </p>
          <Button onClick={onNavigateToAuth} className="w-full tp-btn-primary">
            <Lock className="w-4 h-4 mr-2" />
            Accedi con TechPulse
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function MainPage({ userEmail }: { userEmail: string | null }) {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection userEmail={userEmail} />
      <ModulesSection activeModule={activeModule} setActiveModule={setActiveModule} />
      <InterpretationSection />
      <CTASection />
    </div>
  );
}

function HeroSection({ userEmail }: { userEmail: string | null }) {
  return (
    <header className="bg-gradient-hero py-16 md:py-24 px-4">
      <div className="tp-container">
        {userEmail && (
          <div className="mb-8">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-4 py-2">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Autenticato: {userEmail}
            </Badge>
          </div>
        )}
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-4">
              <div className="px-6 py-3 bg-card border border-border rounded-xl text-lg font-semibold">
                KARRYCAR
              </div>
              <Badge className="bg-amber-500/90 text-background px-4 py-2 text-sm font-medium">
                Exclusive Access – Until December 25
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Accesso riservato al team Karrycar
              <span className="block text-gradient-primary mt-3">Private Alpha 0.1</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Preview esclusiva del sistema predittivo TechPulse (rilascio pubblico 2025).
            </p>
            
            <Card className="tp-card border-primary/30 bg-card/80">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-semibold text-primary mb-4">
                  TechPulse – Private Alpha 0.1
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Questa pagina è stata creata esclusivamente per il vostro team.
                  Siete i primi in assoluto a vedere il funzionamento reale dei moduli 
                  predittivi e consulenziali di TechPulse.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="tp-card bg-gradient-card glow-primary">
            <CardContent className="p-8 md:p-10">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-primary flex items-center justify-center text-4xl md:text-5xl font-bold text-primary-foreground">
                  AD
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Ambra Danesin</h3>
                  <p className="text-primary text-lg font-medium">HR Tech Director & Founder</p>
                </div>
                
                <div className="grid grid-cols-1 gap-4 w-full mt-6">
                  <div className="bg-secondary/50 rounded-xl p-5 border border-border/50">
                    <p className="text-3xl font-bold text-primary">270+</p>
                    <p className="text-sm text-muted-foreground mt-1">posizioni tech chiuse</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-5 border border-border/50">
                    <p className="text-3xl font-bold text-primary">30-60%</p>
                    <p className="text-sm text-muted-foreground mt-1">riduzione time-to-hire</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-5 border border-border/50">
                    <p className="text-sm text-muted-foreground">Specializzata in</p>
                    <p className="font-semibold text-foreground mt-1">SaaS, AI, Cyber, Backend</p>
                  </div>
                </div>
                
                <Badge variant="outline" className="border-primary/50 text-primary px-4 py-2 mt-4">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Powered by FastAPI + Anthropic AI
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </header>
  );
}

function ModulesSection({ activeModule, setActiveModule }: { activeModule: string | null; setActiveModule: (m: string | null) => void }) {
  return (
    <section className="tp-section bg-background">
      <div className="tp-container">
        <div className="tp-page-header text-center">
          <h2 className="tp-page-title">Scegli un modulo</h2>
          <p className="tp-page-subtitle max-w-2xl mx-auto">
            Esplora i moduli predittivi e consulenziali di TechPulse. 
            Ogni analisi è generata in tempo reale dal nostro motore AI.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <PredictCard />
          <CompanyPredictionsCard />
          <CompanyAnalyzeCard />
          <RealityCheckCard />
          <SkillsRoadmapCard />
          <HRCostCheckCard />
        </div>
      </div>
    </section>
  );
}

function ModuleCard({ 
  title, 
  description, 
  icon, 
  color,
  featured,
  children 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  color: string;
  featured?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Card className={`tp-card-hover ${featured ? 'ring-2 ring-primary/50' : ''}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shrink-0`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{title}</CardTitle>
              {featured && (
                <Badge className="bg-primary text-primary-foreground text-xs">NUOVO</Badge>
              )}
            </div>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <Button type="submit" disabled={loading} className="w-full tp-btn-primary">
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Analisi in corso...
        </>
      ) : (
        <>
          <Send className="w-4 h-4 mr-2" />
          Esegui analisi
        </>
      )}
    </Button>
  );
}

function ResponseBox({ result, error, loading }: { result: string | null; error: string | null; loading: boolean }) {
  if (loading && !result && !error) {
    return (
      <div className="mt-4 flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4 bg-destructive/10 border border-destructive/30 rounded-xl p-4">
        <p className="text-sm text-destructive">{error}</p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="mt-4 bg-secondary/50 border border-border rounded-xl p-4 max-h-64 overflow-y-auto">
        <pre className="text-sm whitespace-pre-wrap font-mono text-foreground">{result}</pre>
      </div>
    );
  }

  return null;
}

function PredictCard() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await callTechPulsePredict(prompt);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante la richiesta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModuleCard title="Predict" description="Analisi Predittiva Strategica" icon={<Sparkles className="w-5 h-5" />} color="from-purple-500 to-indigo-600">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Descrivi lo scenario da analizzare</Label>
          <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Es: Quali trend tecnologici impatteranno il settore automotive nel 2025?" className="mt-2 min-h-[100px] bg-secondary/30" required />
        </div>
        <SubmitButton loading={loading} />
      </form>
      <ResponseBox result={result} error={error} loading={loading} />
    </ModuleCard>
  );
}

function CompanyPredictionsCard() {
  const [form, setForm] = useState({ name: "", sector: "", country: "Italia", size: "", timeframe_months: "12", notes: "" });
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null); setResult(null);
    try {
      const payload: CompanyForecastPayload = { name: form.name, sector: form.sector, country: form.country, size: form.size, timeframe_months: parseInt(form.timeframe_months), notes: form.notes || undefined };
      const response = await getCompanyPredictions(payload);
      setResult(response);
    } catch (err) { setError(err instanceof Error ? err.message : "Errore durante la richiesta"); }
    finally { setLoading(false); }
  };

  return (
    <ModuleCard title="Company Predictions" description="Previsioni 12/36/60 mesi" icon={<TrendingUp className="w-5 h-5" />} color="from-cyan-500 to-teal-600">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div><Label>Nome azienda</Label><Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="mt-1 bg-secondary/30" /></div>
        <div><Label>Settore</Label><Input value={form.sector} onChange={(e) => setForm({...form, sector: e.target.value})} required className="mt-1 bg-secondary/30" /></div>
        <div><Label>Paese</Label><Input value={form.country} onChange={(e) => setForm({...form, country: e.target.value})} required className="mt-1 bg-secondary/30" /></div>
        <div><Label>Dimensione</Label><Select value={form.size} onValueChange={(v) => setForm({...form, size: v})}><SelectTrigger className="mt-1 bg-secondary/30"><SelectValue placeholder="Seleziona..." /></SelectTrigger><SelectContent><SelectItem value="1-10">1-10</SelectItem><SelectItem value="10-50">10-50</SelectItem><SelectItem value="50-250">50-250</SelectItem><SelectItem value="250+">250+</SelectItem></SelectContent></Select></div>
        <div><Label>Orizzonte temporale</Label><Select value={form.timeframe_months} onValueChange={(v) => setForm({...form, timeframe_months: v})}><SelectTrigger className="mt-1 bg-secondary/30"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="12">12 mesi</SelectItem><SelectItem value="36">36 mesi</SelectItem><SelectItem value="60">60 mesi</SelectItem></SelectContent></Select></div>
        <SubmitButton loading={loading} />
      </form>
      <ResponseBox result={result} error={error} loading={loading} />
    </ModuleCard>
  );
}

function CompanyAnalyzeCard() {
  const [form, setForm] = useState({ name: "", sector: "", country: "Italia", size: "", current_strategy: "", notes: "" });
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null); setResult(null);
    try {
      const payload: CompanyAnalysisPayload = { name: form.name, sector: form.sector, country: form.country, size: form.size, current_strategy: form.current_strategy || undefined, notes: form.notes || undefined };
      const response = await analyzeCompany(payload);
      setResult(response);
    } catch (err) { setError(err instanceof Error ? err.message : "Errore durante la richiesta"); }
    finally { setLoading(false); }
  };

  return (
    <ModuleCard title="Company Analyze" description="Analisi Aziendale Completa" icon={<Building2 className="w-5 h-5" />} color="from-blue-500 to-indigo-600">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div><Label>Nome azienda</Label><Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="mt-1 bg-secondary/30" /></div>
        <div><Label>Settore</Label><Input value={form.sector} onChange={(e) => setForm({...form, sector: e.target.value})} required className="mt-1 bg-secondary/30" /></div>
        <div><Label>Paese</Label><Input value={form.country} onChange={(e) => setForm({...form, country: e.target.value})} required className="mt-1 bg-secondary/30" /></div>
        <div><Label>Dimensione</Label><Select value={form.size} onValueChange={(v) => setForm({...form, size: v})}><SelectTrigger className="mt-1 bg-secondary/30"><SelectValue placeholder="Seleziona..." /></SelectTrigger><SelectContent><SelectItem value="1-10">1-10</SelectItem><SelectItem value="10-50">10-50</SelectItem><SelectItem value="50-250">50-250</SelectItem><SelectItem value="250+">250+</SelectItem></SelectContent></Select></div>
        <div><Label>Strategia attuale</Label><Textarea value={form.current_strategy} onChange={(e) => setForm({...form, current_strategy: e.target.value})} className="mt-1 bg-secondary/30" /></div>
        <SubmitButton loading={loading} />
      </form>
      <ResponseBox result={result} error={error} loading={loading} />
    </ModuleCard>
  );
}

function RealityCheckCard() {
  const [form, setForm] = useState({ idea_description: "", target_audience: "", timeframe_months: "12" });
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null); setResult(null);
    try {
      const payload: RealityCheckPayload = { idea_description: form.idea_description, target_audience: form.target_audience || undefined, timeframe_months: parseInt(form.timeframe_months) || undefined };
      const response = await runRealityCheck(payload);
      setResult(response);
    } catch (err) { setError(err instanceof Error ? err.message : "Errore durante la richiesta"); }
    finally { setLoading(false); }
  };

  return (
    <ModuleCard title="Reality Check" description="Scenari 'What-if'" icon={<Lightbulb className="w-5 h-5" />} color="from-amber-500 to-orange-600">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div><Label>Descrizione dell'idea</Label><Textarea value={form.idea_description} onChange={(e) => setForm({...form, idea_description: e.target.value})} required className="mt-1 min-h-[80px] bg-secondary/30" placeholder="Descrivi l'idea o lo scenario da valutare..." /></div>
        <div><Label>Target audience</Label><Input value={form.target_audience} onChange={(e) => setForm({...form, target_audience: e.target.value})} className="mt-1 bg-secondary/30" /></div>
        <div><Label>Orizzonte temporale (mesi)</Label><Input type="number" value={form.timeframe_months} onChange={(e) => setForm({...form, timeframe_months: e.target.value})} className="mt-1 bg-secondary/30" /></div>
        <SubmitButton loading={loading} />
      </form>
      <ResponseBox result={result} error={error} loading={loading} />
    </ModuleCard>
  );
}

function SkillsRoadmapCard() {
  const [form, setForm] = useState({ current_role: "", target_role: "", experience_years: "", skills: "", constraints: "" });
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null); setResult(null);
    try {
      const skillsArray = form.skills.split(",").map(s => s.trim()).filter(Boolean);
      const payload: SkillsRoadmapPayload = { current_role: form.current_role, target_role: form.target_role, experience_years: form.experience_years ? parseInt(form.experience_years) : undefined, skills: skillsArray, constraints: form.constraints || undefined };
      const response = await getSkillsRoadmap(payload);
      setResult(response);
    } catch (err) { setError(err instanceof Error ? err.message : "Errore durante la richiesta"); }
    finally { setLoading(false); }
  };

  return (
    <ModuleCard title="Skills Roadmap" description="Skill Gap & Priorità" icon={<GraduationCap className="w-5 h-5" />} color="from-green-500 to-emerald-600">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div><Label>Ruolo attuale</Label><Input value={form.current_role} onChange={(e) => setForm({...form, current_role: e.target.value})} required className="mt-1 bg-secondary/30" /></div>
        <div><Label>Ruolo target</Label><Input value={form.target_role} onChange={(e) => setForm({...form, target_role: e.target.value})} required className="mt-1 bg-secondary/30" /></div>
        <div><Label>Anni di esperienza</Label><Input type="number" value={form.experience_years} onChange={(e) => setForm({...form, experience_years: e.target.value})} className="mt-1 bg-secondary/30" /></div>
        <div><Label>Skills attuali (separate da virgola)</Label><Textarea value={form.skills} onChange={(e) => setForm({...form, skills: e.target.value})} required className="mt-1 bg-secondary/30" placeholder="Python, JavaScript, SQL..." /></div>
        <SubmitButton loading={loading} />
      </form>
      <ResponseBox result={result} error={error} loading={loading} />
    </ModuleCard>
  );
}

function HRCostCheckCard() {
  const [form, setForm] = useState({ ccnl: "", ral: "", inquadramento: "", provincia: "", azienda_dimensione: "", note: "" });
  const [result, setResult] = useState<{ result: string; disclaimer: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null); setResult(null);
    try {
      const payload: HRCostCheckPayload = { ccnl: form.ccnl, ral: parseInt(form.ral), inquadramento: form.inquadramento, provincia: form.provincia, azienda_dimensione: form.azienda_dimensione, note: form.note || undefined };
      const response = await getHRCostCheck(payload);
      setResult(response);
    } catch (err) { setError(err instanceof Error ? err.message : "Errore durante la richiesta"); }
    finally { setLoading(false); }
  };

  return (
    <ModuleCard title="HR Cost Check" description="Consulente del Lavoro Virtuale" icon={<Calculator className="w-5 h-5" />} color="from-rose-500 to-pink-600" featured>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div><Label>CCNL</Label><Input value={form.ccnl} onChange={(e) => setForm({...form, ccnl: e.target.value})} required className="mt-1 bg-secondary/30" placeholder="Es: Commercio, Metalmeccanico..." /></div>
        <div><Label>RAL (€)</Label><Input type="number" value={form.ral} onChange={(e) => setForm({...form, ral: e.target.value})} required className="mt-1 bg-secondary/30" placeholder="50000" /></div>
        <div><Label>Inquadramento</Label><Input value={form.inquadramento} onChange={(e) => setForm({...form, inquadramento: e.target.value})} required className="mt-1 bg-secondary/30" placeholder="Es: Quadro, Impiegato 3° livello..." /></div>
        <div><Label>Provincia</Label><Input value={form.provincia} onChange={(e) => setForm({...form, provincia: e.target.value})} required className="mt-1 bg-secondary/30" placeholder="Es: Milano, Roma..." /></div>
        <div><Label>Dimensione azienda</Label><Select value={form.azienda_dimensione} onValueChange={(v) => setForm({...form, azienda_dimensione: v})}><SelectTrigger className="mt-1 bg-secondary/30"><SelectValue placeholder="Seleziona..." /></SelectTrigger><SelectContent><SelectItem value="<15">&lt;15 dipendenti</SelectItem><SelectItem value="15-50">15-50 dipendenti</SelectItem><SelectItem value="50-250">50-250 dipendenti</SelectItem><SelectItem value=">250">&gt;250 dipendenti</SelectItem></SelectContent></Select></div>
        <SubmitButton loading={loading} />
      </form>
      {result && (
        <div className="mt-4 space-y-3">
          <div className="bg-secondary/50 border border-border rounded-xl p-4 max-h-64 overflow-y-auto">
            <pre className="text-sm whitespace-pre-wrap font-mono text-foreground">{result.result}</pre>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
            <p className="text-xs text-amber-400">{result.disclaimer}</p>
          </div>
        </div>
      )}
      {error && <div className="mt-4 bg-destructive/10 border border-destructive/30 rounded-xl p-4"><p className="text-sm text-destructive">{error}</p></div>}
      {loading && !result && !error && <div className="mt-4 flex items-center justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>}
    </ModuleCard>
  );
}

function InterpretationSection() {
  return (
    <section className="py-16 px-4 bg-card border-t border-border">
      <div className="tp-container text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-6">Come interpretare i risultati</h3>
        <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto text-lg">
          Ogni modulo TechPulse interroga un motore AI configurato per fornire analisi predittive, 
          consulenza strategica, roadmap e simulazioni di scenario. Le analisi sono progettate per 
          supportare decisioni rapide e informate, ma non sostituiscono consulenti fiscali, del lavoro o legali.
        </p>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-hero">
      <div className="tp-container text-center space-y-8">
        <h3 className="text-3xl md:text-4xl font-bold">Grazie per essere i primi tester di TechPulse</h3>
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          Questa è una versione Alpha privata, creata apposta per voi.
          Ogni feedback è prezioso per migliorare il prodotto prima del lancio ufficiale.
        </p>
        <Button asChild size="lg" className="tp-btn-primary text-lg px-8 py-6">
          <a href="mailto:ambra.danesin@critical-work.com">
            <Mail className="w-5 h-5 mr-2" />
            Contatta Ambra
          </a>
        </Button>
        <p className="text-muted-foreground text-sm pt-8">
          TechPulse — The Consultant in Your Pocket.
        </p>
      </div>
    </section>
  );
}
