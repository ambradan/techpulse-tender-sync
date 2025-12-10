import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, Sparkles, TrendingUp, Building2, Lightbulb, GraduationCap, Calculator, LogOut, KeyRound } from "lucide-react";
import { useKarrycarSession } from "@/hooks/useKarrycarSession";
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

export default function KarrycarDashboard() {
  const { isKarrycarAuthenticated, isLoading, clearSession } = useKarrycarSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isKarrycarAuthenticated) {
      navigate("/karrycar-proposal");
    }
  }, [isLoading, isKarrycarAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!isKarrycarAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    clearSession();
    navigate("/karrycar-proposal");
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onLogout={handleLogout} />
      <ModulesSection />
      <InterpretationSection />
    </div>
  );
}

function HeroSection({ onLogout }: { onLogout: () => void }) {
  return (
    <header className="bg-gradient-to-br from-primary/10 via-background to-background py-12 md:py-16 px-4 border-b border-border/40">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">TechPulse</h1>
              <p className="text-sm text-muted-foreground">Dashboard Karrycar</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 px-4 py-2">
              <KeyRound className="w-4 h-4 mr-2" />
              Accesso Karrycar
            </Badge>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Esci
            </Button>
          </div>
        </div>

        <div className="max-w-3xl">
          <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            🎄 Accesso esclusivo fino a Natale
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Benvenuto nella Dashboard
            <span className="block text-primary mt-1">Karrycar Private Alpha</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Esplora i moduli predittivi e consulenziali di TechPulse. 
            Ogni analisi è generata in tempo reale dal nostro motore AI.
          </p>
        </div>
      </div>
    </header>
  );
}

function ModulesSection() {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  children 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-border/40 bg-card hover:border-primary/40 transition-colors">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shrink-0`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg">{title}</CardTitle>
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
    <Button type="submit" disabled={loading} className="w-full">
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
      <div className="mt-4 bg-muted/50 border border-border rounded-xl p-4 max-h-64 overflow-y-auto">
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
      setError(err instanceof Error ? err.message : "Al momento non disponibile, riprova più tardi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModuleCard title="Predict" description="Analisi Predittiva Strategica" icon={<Sparkles className="w-5 h-5" />} color="from-purple-500 to-indigo-600">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Descrivi lo scenario da analizzare</Label>
          <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Es: Quali trend tecnologici impatteranno il settore automotive nel 2025?" className="mt-2 min-h-[100px]" required />
        </div>
        <SubmitButton loading={loading} />
      </form>
      <ResponseBox result={result} error={error} loading={loading} />
    </ModuleCard>
  );
}

function CompanyPredictionsCard() {
  const [form, setForm] = useState({ name: "Karrycar", sector: "Automotive / Mobility Tech", country: "Italia", size: "10-50", timeframe_months: "12", notes: "" });
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
    } catch (err) { setError(err instanceof Error ? err.message : "Al momento non disponibile, riprova più tardi"); }
    finally { setLoading(false); }
  };

  return (
    <ModuleCard title="Company Predictions" description="Previsioni 12/36/60 mesi" icon={<TrendingUp className="w-5 h-5" />} color="from-cyan-500 to-teal-600">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div><Label>Nome azienda</Label><Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="mt-1" /></div>
        <div><Label>Settore</Label><Input value={form.sector} onChange={(e) => setForm({...form, sector: e.target.value})} required className="mt-1" /></div>
        <div><Label>Paese</Label><Input value={form.country} onChange={(e) => setForm({...form, country: e.target.value})} required className="mt-1" /></div>
        <div><Label>Dimensione</Label><Select value={form.size} onValueChange={(v) => setForm({...form, size: v})}><SelectTrigger className="mt-1"><SelectValue placeholder="Seleziona..." /></SelectTrigger><SelectContent><SelectItem value="1-10">1-10</SelectItem><SelectItem value="10-50">10-50</SelectItem><SelectItem value="50-250">50-250</SelectItem><SelectItem value="250+">250+</SelectItem></SelectContent></Select></div>
        <div><Label>Orizzonte temporale</Label><Select value={form.timeframe_months} onValueChange={(v) => setForm({...form, timeframe_months: v})}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="12">12 mesi</SelectItem><SelectItem value="36">36 mesi</SelectItem><SelectItem value="60">60 mesi</SelectItem></SelectContent></Select></div>
        <SubmitButton loading={loading} />
      </form>
      <ResponseBox result={result} error={error} loading={loading} />
    </ModuleCard>
  );
}

function CompanyAnalyzeCard() {
  const [form, setForm] = useState({ name: "Karrycar", sector: "Automotive / Mobility Tech", country: "Italia", size: "10-50", current_strategy: "", notes: "" });
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
    } catch (err) { setError(err instanceof Error ? err.message : "Al momento non disponibile, riprova più tardi"); }
    finally { setLoading(false); }
  };

  return (
    <ModuleCard title="Company Analyze" description="Analisi Aziendale Completa" icon={<Building2 className="w-5 h-5" />} color="from-blue-500 to-indigo-600">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div><Label>Nome azienda</Label><Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="mt-1" /></div>
        <div><Label>Settore</Label><Input value={form.sector} onChange={(e) => setForm({...form, sector: e.target.value})} required className="mt-1" /></div>
        <div><Label>Paese</Label><Input value={form.country} onChange={(e) => setForm({...form, country: e.target.value})} required className="mt-1" /></div>
        <div><Label>Dimensione</Label><Select value={form.size} onValueChange={(v) => setForm({...form, size: v})}><SelectTrigger className="mt-1"><SelectValue placeholder="Seleziona..." /></SelectTrigger><SelectContent><SelectItem value="1-10">1-10</SelectItem><SelectItem value="10-50">10-50</SelectItem><SelectItem value="50-250">50-250</SelectItem><SelectItem value="250+">250+</SelectItem></SelectContent></Select></div>
        <div><Label>Strategia attuale</Label><Textarea value={form.current_strategy} onChange={(e) => setForm({...form, current_strategy: e.target.value})} className="mt-1" /></div>
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
      const payload: RealityCheckPayload = { idea_description: form.idea_description, target_audience: form.target_audience, timeframe_months: parseInt(form.timeframe_months) };
      const response = await runRealityCheck(payload);
      setResult(response);
    } catch (err) { setError(err instanceof Error ? err.message : "Al momento non disponibile, riprova più tardi"); }
    finally { setLoading(false); }
  };

  return (
    <ModuleCard title="Reality Check" description="Valutazione idee e progetti" icon={<Lightbulb className="w-5 h-5" />} color="from-amber-500 to-orange-600">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div><Label>Descrizione idea/progetto</Label><Textarea value={form.idea_description} onChange={(e) => setForm({...form, idea_description: e.target.value})} required className="mt-1 min-h-[80px]" /></div>
        <div><Label>Target audience</Label><Input value={form.target_audience} onChange={(e) => setForm({...form, target_audience: e.target.value})} required className="mt-1" /></div>
        <div><Label>Orizzonte temporale</Label><Select value={form.timeframe_months} onValueChange={(v) => setForm({...form, timeframe_months: v})}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="12">12 mesi</SelectItem><SelectItem value="36">36 mesi</SelectItem><SelectItem value="60">60 mesi</SelectItem></SelectContent></Select></div>
        <SubmitButton loading={loading} />
      </form>
      <ResponseBox result={result} error={error} loading={loading} />
    </ModuleCard>
  );
}

function SkillsRoadmapCard() {
  const [form, setForm] = useState({ current_role: "", target_role: "", experience_years: "3", skills: "", constraints: "" });
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null); setResult(null);
    try {
      const skillsArray = form.skills.split(",").map(s => s.trim()).filter(s => s);
      const payload: SkillsRoadmapPayload = { current_role: form.current_role, target_role: form.target_role, experience_years: parseInt(form.experience_years), skills: skillsArray, constraints: form.constraints || undefined };
      const response = await getSkillsRoadmap(payload);
      setResult(response);
    } catch (err) { setError(err instanceof Error ? err.message : "Al momento non disponibile, riprova più tardi"); }
    finally { setLoading(false); }
  };

  return (
    <ModuleCard title="Skills Roadmap" description="Percorso di sviluppo competenze" icon={<GraduationCap className="w-5 h-5" />} color="from-emerald-500 to-green-600">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div><Label>Ruolo attuale</Label><Input value={form.current_role} onChange={(e) => setForm({...form, current_role: e.target.value})} required className="mt-1" /></div>
        <div><Label>Ruolo target</Label><Input value={form.target_role} onChange={(e) => setForm({...form, target_role: e.target.value})} required className="mt-1" /></div>
        <div><Label>Anni esperienza</Label><Input type="number" value={form.experience_years} onChange={(e) => setForm({...form, experience_years: e.target.value})} required className="mt-1" /></div>
        <div><Label>Skills attuali (comma separated)</Label><Textarea value={form.skills} onChange={(e) => setForm({...form, skills: e.target.value})} className="mt-1" placeholder="Es: React, TypeScript, Node.js" /></div>
        <SubmitButton loading={loading} />
      </form>
      <ResponseBox result={result} error={error} loading={loading} />
    </ModuleCard>
  );
}

function HRCostCheckCard() {
  const [form, setForm] = useState({ ccnl: "Commercio", ral: "35000", inquadramento: "Impiegato", provincia: "Milano", azienda_dimensione: "10-50", note: "" });
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null); setResult(null);
    try {
      const payload: HRCostCheckPayload = { ccnl: form.ccnl, ral: parseInt(form.ral), inquadramento: form.inquadramento, provincia: form.provincia, azienda_dimensione: form.azienda_dimensione, note: form.note || undefined };
      const response = await getHRCostCheck(payload);
      setResult(response.result);
    } catch (err) { setError(err instanceof Error ? err.message : "Al momento non disponibile, riprova più tardi"); }
    finally { setLoading(false); }
  };

  return (
    <ModuleCard title="HR Cost Check" description="Calcolo costo aziendale" icon={<Calculator className="w-5 h-5" />} color="from-rose-500 to-pink-600">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div><Label>CCNL</Label><Input value={form.ccnl} onChange={(e) => setForm({...form, ccnl: e.target.value})} required className="mt-1" /></div>
        <div><Label>RAL (€)</Label><Input type="number" value={form.ral} onChange={(e) => setForm({...form, ral: e.target.value})} required className="mt-1" /></div>
        <div><Label>Inquadramento</Label><Input value={form.inquadramento} onChange={(e) => setForm({...form, inquadramento: e.target.value})} required className="mt-1" /></div>
        <div><Label>Provincia</Label><Input value={form.provincia} onChange={(e) => setForm({...form, provincia: e.target.value})} required className="mt-1" /></div>
        <div><Label>Dimensione azienda</Label><Select value={form.azienda_dimensione} onValueChange={(v) => setForm({...form, azienda_dimensione: v})}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="<15">&lt;15</SelectItem><SelectItem value="15-50">15-50</SelectItem><SelectItem value="50-250">50-250</SelectItem><SelectItem value=">250">&gt;250</SelectItem></SelectContent></Select></div>
        <SubmitButton loading={loading} />
      </form>
      <ResponseBox result={result} error={error} loading={loading} />
    </ModuleCard>
  );
}

function InterpretationSection() {
  return (
    <section className="py-12 md:py-16 px-4 bg-muted/30 border-t border-border/40">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Come interpretare i risultati</h2>
        <p className="text-muted-foreground mb-8">
          Tutti i contenuti generati sono di natura qualitativa e consulenziale. 
          Le analisi si basano esclusivamente sui dati dichiarati e non contengono numeri precisi 
          inventati (budget, ROI, costi). Per decisioni strategiche, è sempre consigliato 
          approfondire con dati interni e consulenza professionale.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-border/40">
            <CardContent className="p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-emerald-500 text-lg">✓</span>
              </div>
              <h3 className="font-semibold mb-2">Insights qualitativi</h3>
              <p className="text-sm text-muted-foreground">Analisi descrittive basate su tendenze e contesto</p>
            </CardContent>
          </Card>
          <Card className="border-border/40">
            <CardContent className="p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-amber-500 text-lg">⚡</span>
              </div>
              <h3 className="font-semibold mb-2">Suggerimenti strategici</h3>
              <p className="text-sm text-muted-foreground">Raccomandazioni e ipotesi da valutare</p>
            </CardContent>
          </Card>
          <Card className="border-border/40">
            <CardContent className="p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-500 text-lg">📊</span>
              </div>
              <h3 className="font-semibold mb-2">Dati dichiarati</h3>
              <p className="text-sm text-muted-foreground">Output basato solo su informazioni fornite</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
