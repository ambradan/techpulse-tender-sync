import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Lock, Send, Mail, Sparkles, TrendingUp, Building2, Lightbulb, GraduationCap, Calculator } from "lucide-react";
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

const PASSCODE = "KARRY24-ALPHA";

export default function KarrycarAlpha() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput === PASSCODE) {
      setIsAuthenticated(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  if (!isAuthenticated) {
    return <PasscodePage 
      passcodeInput={passcodeInput}
      setPasscodeInput={setPasscodeInput}
      passcodeError={passcodeError}
      onSubmit={handlePasscodeSubmit}
    />;
  }

  return <MainPage />;
}

function PasscodePage({ 
  passcodeInput, 
  setPasscodeInput, 
  passcodeError, 
  onSubmit 
}: {
  passcodeInput: string;
  setPasscodeInput: (v: string) => void;
  passcodeError: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20 text-white">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-teal-500/20 flex items-center justify-center">
            <Lock className="w-8 h-8 text-teal-400" />
          </div>
          <CardTitle className="text-2xl font-bold">Inserisci il codice di accesso</CardTitle>
          <CardDescription className="text-slate-300">
            Private Alpha 0.1 – Karrycar Team Only
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Codice di accesso"
              value={passcodeInput}
              onChange={(e) => setPasscodeInput(e.target.value)}
              className={`bg-white/10 border-white/30 text-white placeholder:text-slate-400 ${passcodeError ? 'border-red-500' : ''}`}
            />
            {passcodeError && (
              <p className="text-red-400 text-sm">Codice non valido. Riprova.</p>
            )}
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white">
              Accedi
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function MainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      <HeroSection />
      <ModulesSection />
      <InterpretationSection />
      <CTASection />
    </div>
  );
}

function HeroSection() {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-32 h-12 bg-white/20 rounded-lg flex items-center justify-center text-sm font-medium backdrop-blur">
                KARRYCAR
              </div>
              <Badge className="bg-amber-500/90 text-white hover:bg-amber-500">
                Exclusive Access – Until December 25
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Accesso riservato al team Karrycar
              <span className="block text-teal-400 mt-2">Private Alpha 0.1</span>
            </h1>
            
            <p className="text-lg text-slate-300 leading-relaxed">
              Preview esclusiva del sistema predittivo TechPulse (rilascio pubblico 2025).
            </p>
            
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-teal-300 mb-3">
                TechPulse – Private Alpha 0.1 per Karrycar
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Questa pagina è stata creata esclusivamente per il vostro team.
                Siete i primi in assoluto a vedere il funzionamento reale dei moduli 
                predittivi e consulenziali di TechPulse. L'accesso rimarrà gratuito 
                fino a Natale come regalo di anteprima.
              </p>
            </div>
          </div>

          {/* Right Column - Profile */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-3xl font-bold">
                AD
              </div>
              <div>
                <h3 className="text-xl font-bold">Ambra Danesin</h3>
                <p className="text-teal-400 font-medium">HR Tech Director & Founder</p>
              </div>
              
              <div className="grid grid-cols-1 gap-3 w-full mt-4">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-2xl font-bold text-teal-400">270+</p>
                  <p className="text-sm text-slate-300">posizioni tech chiuse</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-2xl font-bold text-teal-400">30-60%</p>
                  <p className="text-sm text-slate-300">riduzione time-to-hire</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-slate-300">Specializzata in</p>
                  <p className="font-medium text-white">SaaS, AI, Cyber, Backend</p>
                </div>
              </div>
              
              <Badge variant="outline" className="border-teal-500/50 text-teal-300 mt-4">
                <Sparkles className="w-3 h-3 mr-1" />
                Powered by FastAPI + Anthropic AI
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function ModulesSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Scegli un modulo</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Esplora i moduli predittivi e consulenziali di TechPulse. 
            Ogni analisi è generata in tempo reale dal nostro motore AI.
          </p>
        </div>
        
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
    <ModuleCard 
      title="Predict" 
      description="Analisi Predittiva Strategica"
      icon={<Sparkles className="w-5 h-5" />}
      color="from-purple-500 to-indigo-600"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="predict-prompt">Descrivi lo scenario da analizzare</Label>
          <Textarea
            id="predict-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Es: Quali trend tecnologici impatteranno il settore automotive nel 2025?"
            className="mt-1.5 min-h-[100px]"
            required
          />
        </div>
        <SubmitButton loading={loading} />
      </form>
      <ResponseBox result={result} error={error} loading={loading} />
    </ModuleCard>
  );
}

function CompanyPredictionsCard() {
  const [form, setForm] = useState({
    name: "",
    sector: "",
    country: "Italia",
    size: "",
    timeframe_months: "12",
    notes: "",
  });
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const payload: CompanyForecastPayload = {
        name: form.name,
        sector: form.sector,
        country: form.country,
        size: form.size,
        timeframe_months: parseInt(form.timeframe_months),
        notes: form.notes || undefined,
      };
      const response = await getCompanyPredictions(payload);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante la richiesta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModuleCard 
      title="Company Predictions" 
      description="Previsioni 12/36/60 mesi"
      icon={<TrendingUp className="w-5 h-5" />}
      color="from-teal-500 to-cyan-600"
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Label>Nome azienda</Label>
          <Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="mt-1" />
        </div>
        <div>
          <Label>Settore</Label>
          <Input value={form.sector} onChange={(e) => setForm({...form, sector: e.target.value})} required className="mt-1" />
        </div>
        <div>
          <Label>Paese</Label>
          <Input value={form.country} onChange={(e) => setForm({...form, country: e.target.value})} required className="mt-1" />
        </div>
        <div>
          <Label>Dimensione</Label>
          <Select value={form.size} onValueChange={(v) => setForm({...form, size: v})}>
            <SelectTrigger className="mt-1"><SelectValue placeholder="Seleziona..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1-10</SelectItem>
              <SelectItem value="10-50">10-50</SelectItem>
              <SelectItem value="50-250">50-250</SelectItem>
              <SelectItem value="250+">250+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Orizzonte temporale</Label>
          <Select value={form.timeframe_months} onValueChange={(v) => setForm({...form, timeframe_months: v})}>
            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12 mesi</SelectItem>
              <SelectItem value="36">36 mesi</SelectItem>
              <SelectItem value="60">60 mesi</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Note (opzionale)</Label>
          <Textarea value={form.notes} onChange={(e) => setForm({...form, notes: e.target.value})} className="mt-1" />
        </div>
        <SubmitButton loading={loading} />
      </form>
      <ResponseBox result={result} error={error} loading={loading} />
    </ModuleCard>
  );
}

function CompanyAnalyzeCard() {
  const [form, setForm] = useState({
    name: "",
    sector: "",
    country: "Italia",
    size: "",
    current_strategy: "",
    notes: "",
  });
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const payload: CompanyAnalysisPayload = {
        name: form.name,
        sector: form.sector,
        country: form.country,
        size: form.size,
        current_strategy: form.current_strategy || undefined,
        notes: form.notes || undefined,
      };
      const response = await analyzeCompany(payload);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante la richiesta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModuleCard 
      title="Company Analyze" 
      description="Analisi Aziendale Completa"
      icon={<Building2 className="w-5 h-5" />}
      color="from-blue-500 to-indigo-600"
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Label>Nome azienda</Label>
          <Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="mt-1" />
        </div>
        <div>
          <Label>Settore</Label>
          <Input value={form.sector} onChange={(e) => setForm({...form, sector: e.target.value})} required className="mt-1" />
        </div>
        <div>
          <Label>Paese</Label>
          <Input value={form.country} onChange={(e) => setForm({...form, country: e.target.value})} required className="mt-1" />
        </div>
        <div>
          <Label>Dimensione</Label>
          <Select value={form.size} onValueChange={(v) => setForm({...form, size: v})}>
            <SelectTrigger className="mt-1"><SelectValue placeholder="Seleziona..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1-10</SelectItem>
              <SelectItem value="10-50">10-50</SelectItem>
              <SelectItem value="50-250">50-250</SelectItem>
              <SelectItem value="250+">250+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Strategia attuale</Label>
          <Textarea value={form.current_strategy} onChange={(e) => setForm({...form, current_strategy: e.target.value})} className="mt-1" />
        </div>
        <div>
          <Label>Note (opzionale)</Label>
          <Textarea value={form.notes} onChange={(e) => setForm({...form, notes: e.target.value})} className="mt-1" />
        </div>
        <SubmitButton loading={loading} />
      </form>
      <ResponseBox result={result} error={error} loading={loading} />
    </ModuleCard>
  );
}

function RealityCheckCard() {
  const [form, setForm] = useState({
    idea_description: "",
    target_audience: "",
    timeframe_months: "12",
  });
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const payload: RealityCheckPayload = {
        idea_description: form.idea_description,
        target_audience: form.target_audience || undefined,
        timeframe_months: parseInt(form.timeframe_months) || undefined,
      };
      const response = await runRealityCheck(payload);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante la richiesta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModuleCard 
      title="Reality Check" 
      description="Scenari 'What-if'"
      icon={<Lightbulb className="w-5 h-5" />}
      color="from-amber-500 to-orange-600"
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Label>Descrizione dell'idea</Label>
          <Textarea 
            value={form.idea_description} 
            onChange={(e) => setForm({...form, idea_description: e.target.value})} 
            required 
            className="mt-1 min-h-[80px]"
            placeholder="Descrivi l'idea o lo scenario da valutare..."
          />
        </div>
        <div>
          <Label>Target audience</Label>
          <Input value={form.target_audience} onChange={(e) => setForm({...form, target_audience: e.target.value})} className="mt-1" />
        </div>
        <div>
          <Label>Orizzonte temporale (mesi)</Label>
          <Input 
            type="number" 
            value={form.timeframe_months} 
            onChange={(e) => setForm({...form, timeframe_months: e.target.value})} 
            className="mt-1" 
          />
        </div>
        <SubmitButton loading={loading} />
      </form>
      <ResponseBox result={result} error={error} loading={loading} />
    </ModuleCard>
  );
}

function SkillsRoadmapCard() {
  const [form, setForm] = useState({
    current_role: "",
    target_role: "",
    experience_years: "",
    skills: "",
    constraints: "",
  });
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const skillsArray = form.skills.split(",").map(s => s.trim()).filter(Boolean);
      const payload: SkillsRoadmapPayload = {
        current_role: form.current_role,
        target_role: form.target_role,
        experience_years: form.experience_years ? parseInt(form.experience_years) : undefined,
        skills: skillsArray,
        constraints: form.constraints || undefined,
      };
      const response = await getSkillsRoadmap(payload);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante la richiesta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModuleCard 
      title="Skills Roadmap" 
      description="Skill Gap & Priorità"
      icon={<GraduationCap className="w-5 h-5" />}
      color="from-green-500 to-emerald-600"
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Label>Ruolo attuale</Label>
          <Input value={form.current_role} onChange={(e) => setForm({...form, current_role: e.target.value})} required className="mt-1" />
        </div>
        <div>
          <Label>Ruolo target</Label>
          <Input value={form.target_role} onChange={(e) => setForm({...form, target_role: e.target.value})} required className="mt-1" />
        </div>
        <div>
          <Label>Anni di esperienza</Label>
          <Input type="number" value={form.experience_years} onChange={(e) => setForm({...form, experience_years: e.target.value})} className="mt-1" />
        </div>
        <div>
          <Label>Skills attuali (separate da virgola)</Label>
          <Textarea 
            value={form.skills} 
            onChange={(e) => setForm({...form, skills: e.target.value})} 
            required 
            className="mt-1"
            placeholder="Python, JavaScript, SQL..."
          />
        </div>
        <div>
          <Label>Vincoli (opzionale)</Label>
          <Textarea value={form.constraints} onChange={(e) => setForm({...form, constraints: e.target.value})} className="mt-1" />
        </div>
        <SubmitButton loading={loading} />
      </form>
      <ResponseBox result={result} error={error} loading={loading} />
    </ModuleCard>
  );
}

function HRCostCheckCard() {
  const [form, setForm] = useState({
    ccnl: "",
    ral: "",
    inquadramento: "",
    provincia: "",
    azienda_dimensione: "",
    note: "",
  });
  const [result, setResult] = useState<{ result: string; disclaimer: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const payload: HRCostCheckPayload = {
        ccnl: form.ccnl,
        ral: parseInt(form.ral),
        inquadramento: form.inquadramento,
        provincia: form.provincia,
        azienda_dimensione: form.azienda_dimensione,
        note: form.note || undefined,
      };
      const response = await getHRCostCheck(payload);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante la richiesta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModuleCard 
      title="HR Cost Check" 
      description="Consulente del Lavoro Virtuale"
      icon={<Calculator className="w-5 h-5" />}
      color="from-rose-500 to-pink-600"
      featured
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Label>CCNL</Label>
          <Input value={form.ccnl} onChange={(e) => setForm({...form, ccnl: e.target.value})} required className="mt-1" placeholder="Es: Commercio, Metalmeccanico..." />
        </div>
        <div>
          <Label>RAL (€)</Label>
          <Input type="number" value={form.ral} onChange={(e) => setForm({...form, ral: e.target.value})} required className="mt-1" placeholder="50000" />
        </div>
        <div>
          <Label>Inquadramento</Label>
          <Input value={form.inquadramento} onChange={(e) => setForm({...form, inquadramento: e.target.value})} required className="mt-1" placeholder="Es: Quadro, Impiegato 3° livello..." />
        </div>
        <div>
          <Label>Provincia</Label>
          <Input value={form.provincia} onChange={(e) => setForm({...form, provincia: e.target.value})} required className="mt-1" placeholder="Es: Milano, Roma..." />
        </div>
        <div>
          <Label>Dimensione azienda</Label>
          <Select value={form.azienda_dimensione} onValueChange={(v) => setForm({...form, azienda_dimensione: v})}>
            <SelectTrigger className="mt-1"><SelectValue placeholder="Seleziona..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="<15">&lt;15 dipendenti</SelectItem>
              <SelectItem value="15-50">15-50 dipendenti</SelectItem>
              <SelectItem value="50-250">50-250 dipendenti</SelectItem>
              <SelectItem value=">250">&gt;250 dipendenti</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Note (opzionale)</Label>
          <Textarea value={form.note} onChange={(e) => setForm({...form, note: e.target.value})} className="mt-1" />
        </div>
        <SubmitButton loading={loading} />
      </form>
      {result && (
        <div className="mt-4 space-y-3">
          <div className="bg-slate-50 border rounded-lg p-4 max-h-64 overflow-y-auto">
            <pre className="text-sm whitespace-pre-wrap font-mono text-slate-700">{result.result}</pre>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs text-amber-800">{result.disclaimer}</p>
          </div>
        </div>
      )}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      {loading && !result && !error && (
        <div className="mt-4 flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
        </div>
      )}
    </ModuleCard>
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
    <Card className={`bg-white shadow-lg hover:shadow-xl transition-shadow ${featured ? 'ring-2 ring-rose-500/50' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white`}>
            {icon}
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="text-sm">{description}</CardDescription>
          </div>
          {featured && (
            <Badge className="ml-auto bg-rose-500 text-white">NUOVO</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <Button type="submit" disabled={loading} className="w-full bg-slate-800 hover:bg-slate-700">
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
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="mt-4 bg-slate-50 border rounded-lg p-4 max-h-64 overflow-y-auto">
        <pre className="text-sm whitespace-pre-wrap font-mono text-slate-700">{result}</pre>
      </div>
    );
  }

  return null;
}

function InterpretationSection() {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Come interpretare i risultati</h3>
        <p className="text-slate-600 leading-relaxed">
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
    <section className="py-16 px-4 bg-gradient-to-r from-slate-900 via-slate-800 to-teal-900 text-white">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h3 className="text-3xl font-bold">Grazie per essere i primi tester di TechPulse</h3>
        <p className="text-slate-300 text-lg leading-relaxed">
          Questa è una versione Alpha privata, creata apposta per voi.
          Ogni feedback è prezioso per migliorare il prodotto prima del lancio ufficiale.
        </p>
        <Button 
          asChild
          size="lg"
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          <a href="mailto:ambra.danesin@critical-work.com">
            <Mail className="w-5 h-5 mr-2" />
            Contatta Ambra
          </a>
        </Button>
        <p className="text-slate-400 text-sm pt-8">
          TechPulse — The Consultant in Your Pocket.
        </p>
      </div>
    </section>
  );
}
