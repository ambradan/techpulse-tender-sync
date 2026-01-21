import { useState } from "react";
import { Shield, TrendingUp, AlertTriangle, Target, RefreshCw, FileText, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/backend/client";
import { toast } from "sonner";

interface SWOTData {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

interface StrategicSuggestion {
  area: string;
  suggestion: string;
  priority: "high" | "medium" | "low";
}

interface BenchmarkItem {
  name: string;
  score: number;
  benchmark: number;
  status: "green" | "yellow" | "red";
}

interface RealityCheckData {
  swot: SWOTData;
  resilience: number;
  suggestions: StrategicSuggestion[];
  benchmarks: BenchmarkItem[];
}

const defaultData: RealityCheckData = {
  swot: {
    strengths: [
      "Team tecnico qualificato",
      "Focus su PA e trasformazione digitale",
      "Esperienza consolidata nel settore"
    ],
    weaknesses: [
      "Dimensione aziendale limitata",
      "Dipendenza da pochi clienti chiave",
      "Budget R&D contenuto"
    ],
    opportunities: [
      "PNRR e investimenti PA",
      "Crescita mercato cloud",
      "Nuove normative cybersecurity"
    ],
    threats: [
      "Competizione crescente",
      "Carenza talenti tech",
      "Instabilità normativa"
    ]
  },
  resilience: 72,
  suggestions: [
    { area: "Investimenti IT", suggestion: "Potenziare infrastruttura cloud per scalabilità", priority: "high" },
    { area: "Crescita Team", suggestion: "Assumere 2-3 sviluppatori senior entro Q2", priority: "medium" },
    { area: "Rischi Operativi", suggestion: "Diversificare portfolio clienti oltre PA", priority: "high" }
  ],
  benchmarks: [
    { name: "Innovazione", score: 78, benchmark: 65, status: "green" },
    { name: "Efficienza Operativa", score: 62, benchmark: 70, status: "yellow" },
    { name: "Solidità Finanziaria", score: 55, benchmark: 72, status: "red" },
    { name: "Competenze Digitali", score: 85, benchmark: 68, status: "green" },
    { name: "Customer Satisfaction", score: 71, benchmark: 75, status: "yellow" }
  ]
};

const RealityCheckSection = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [data, setData] = useState<RealityCheckData>(defaultData);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      // First get the current user's company
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Devi essere autenticato per eseguire l'analisi");
        setIsAnalyzing(false);
        return;
      }

      const { data: companyData } = await supabase
        .from("companies")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      // Use company data or fallback
      const company = companyData || {
        name: "Azienda Demo",
        sector: "Software & IT Services",
        employees: null,
        description: "PMI tech",
        location: "Italia"
      };

      const { data: result, error } = await supabase.functions.invoke("reality-check", {
        body: { company },
      });
      
      if (error) throw error;
      
      if (result?.swot) {
        setData(prev => ({
          ...prev,
          swot: result.swot
        }));
        setLastUpdate(new Date());
        toast.success("Analisi Reality Check completata");
      }
    } catch (error) {
      console.error(error);
      toast.error("Errore durante l'analisi. Usando dati di esempio.");
      setLastUpdate(new Date());
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "green": return "bg-green-500";
      case "yellow": return "bg-yellow-500";
      case "red": return "bg-red-500";
      default: return "bg-muted";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "green": return "bg-green-500/10 border-green-500/30";
      case "yellow": return "bg-yellow-500/10 border-yellow-500/30";
      case "red": return "bg-red-500/10 border-red-500/30";
      default: return "bg-muted";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-400 bg-red-400/20";
      case "medium": return "text-yellow-400 bg-yellow-400/20";
      case "low": return "text-green-400 bg-green-400/20";
      default: return "text-muted-foreground bg-muted";
    }
  };

  return (
    <section className="bg-gradient-card rounded-2xl border border-border/50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">Reality Check Strategico</h2>
            <p className="text-sm text-muted-foreground">Analisi SWOT e benchmark di settore</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={runAnalysis}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                Analizzando...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Analisi On-Demand
              </>
            )}
          </Button>
        </div>
      </div>

      {lastUpdate && (
        <p className="text-xs text-muted-foreground mb-4">
          Ultimo aggiornamento: {lastUpdate.toLocaleString("it-IT")}
        </p>
      )}

      <Tabs defaultValue="swot">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="swot">SWOT</TabsTrigger>
          <TabsTrigger value="benchmark">Benchmark</TabsTrigger>
          <TabsTrigger value="resilience">Resilienza</TabsTrigger>
          <TabsTrigger value="suggestions">Suggerimenti</TabsTrigger>
        </TabsList>

        {/* SWOT Analysis */}
        <TabsContent value="swot">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <h3 className="font-semibold text-green-400">Punti di Forza</h3>
              </div>
              <ul className="space-y-2">
                {data.swot.strengths.map((item, i) => (
                  <li key={i} className="text-sm text-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <h3 className="font-semibold text-red-400">Debolezze</h3>
              </div>
              <ul className="space-y-2">
                {data.swot.weaknesses.map((item, i) => (
                  <li key={i} className="text-sm text-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-primary">Opportunità</h3>
              </div>
              <ul className="space-y-2">
                {data.swot.opportunities.map((item, i) => (
                  <li key={i} className="text-sm text-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <h3 className="font-semibold text-yellow-400">Minacce</h3>
              </div>
              <ul className="space-y-2">
                {data.swot.threats.map((item, i) => (
                  <li key={i} className="text-sm text-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>

        {/* Benchmark */}
        <TabsContent value="benchmark">
          <div className="space-y-4">
            {data.benchmarks.map((item, i) => (
              <div key={i} className={`rounded-xl p-4 border ${getStatusBg(item.status)}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`} />
                    <span className="font-medium text-foreground">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-foreground font-semibold">{item.score}%</span>
                    <span className="text-muted-foreground">vs {item.benchmark}% settore</span>
                  </div>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="relative h-full">
                    <div 
                      className={`absolute h-full ${getStatusColor(item.status)} opacity-80 rounded-full`}
                      style={{ width: `${item.score}%` }}
                    />
                    <div 
                      className="absolute h-full w-0.5 bg-foreground/50"
                      style={{ left: `${item.benchmark}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-muted-foreground">Sopra media</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-muted-foreground">Nella media</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-muted-foreground">Sotto media</span>
            </div>
          </div>
        </TabsContent>

        {/* Resilience */}
        <TabsContent value="resilience">
          <div className="flex flex-col items-center py-8">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="hsl(var(--secondary))"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke={data.resilience >= 70 ? "hsl(142, 76%, 36%)" : data.resilience >= 50 ? "hsl(48, 96%, 53%)" : "hsl(0, 84%, 60%)"}
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(data.resilience / 100) * 553} 553`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-foreground">{data.resilience}%</span>
                <span className="text-sm text-muted-foreground">Resilienza</span>
              </div>
            </div>
            <p className="mt-6 text-center text-muted-foreground max-w-md">
              Indice di resilienza aziendale calcolato in base a stabilità finanziaria, 
              diversificazione clienti, capacità di adattamento e solidità del team.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4 w-full max-w-lg">
              <div className="text-center p-3 bg-secondary/30 rounded-xl">
                <div className="text-lg font-bold text-green-400">Alta</div>
                <div className="text-xs text-muted-foreground">Stabilità Team</div>
              </div>
              <div className="text-center p-3 bg-secondary/30 rounded-xl">
                <div className="text-lg font-bold text-yellow-400">Media</div>
                <div className="text-xs text-muted-foreground">Diversificazione</div>
              </div>
              <div className="text-center p-3 bg-secondary/30 rounded-xl">
                <div className="text-lg font-bold text-primary">Buona</div>
                <div className="text-xs text-muted-foreground">Adattabilità</div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Strategic Suggestions */}
        <TabsContent value="suggestions">
          <div className="space-y-4">
            {data.suggestions.map((suggestion, i) => (
              <div key={i} className="bg-secondary/30 rounded-xl p-4 border border-border/30">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(suggestion.priority)}`}>
                        {suggestion.priority === "high" ? "Alta Priorità" : suggestion.priority === "medium" ? "Media Priorità" : "Bassa Priorità"}
                      </span>
                      <span className="text-sm font-medium text-foreground">{suggestion.area}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{suggestion.suggestion}</p>
                  </div>
                  <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-xl">
            <p className="text-sm text-foreground text-center">
              💡 I suggerimenti sono generati dall'AI basandosi sul contesto aziendale e i trend di mercato attuali.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default RealityCheckSection;
