import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Sparkles, RefreshCw, TrendingUp, Target, AlertTriangle, Compass } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import CompanyContextBanner from "@/components/dashboard/CompanyContextBanner";
import CompanyProfileGate from "@/components/dashboard/CompanyProfileGate";

interface Predictions {
  marketTrend: string;
  opportunities: string;
  challenges: string;
  strategicFocus: string;
  confidence: "bassa" | "media" | "alta";
}

const CONFIDENCE_CONFIG = {
  bassa: { label: "Confidenza Bassa", className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  media: { label: "Confidenza Media", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  alta: { label: "Confidenza Alta", className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
};

// Static placeholder chart data (neutral values)
const placeholderChartData = [
  { month: "Gen", value: 50 },
  { month: "Feb", value: 50 },
  { month: "Mar", value: 50 },
  { month: "Apr", value: 50 },
  { month: "Mag", value: 50 },
  { month: "Giu", value: 50 },
];

const PlaceholderChart = () => (
  <div className="relative h-40 w-full">
    <svg className="w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
      {/* Grid lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1="0"
          y1={i * 40}
          x2="400"
          y2={i * 40}
          stroke="hsl(var(--border))"
          strokeWidth="1"
          strokeDasharray="4,4"
        />
      ))}
      {/* Neutral line at 50% */}
      <path
        d="M 0 80 L 66 80 L 133 80 L 200 80 L 266 80 L 333 80 L 400 80"
        fill="none"
        stroke="hsl(var(--muted-foreground))"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="8,4"
        opacity="0.5"
      />
    </svg>
    {/* X-axis labels */}
    <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-muted-foreground">
      {placeholderChartData.map((d) => (
        <span key={d.month}>{d.month}</span>
      ))}
    </div>
    {/* Overlay */}
    <div className="absolute inset-0 flex items-center justify-center bg-background/50">
      <p className="text-sm text-muted-foreground">Grafico in attesa di dati reali</p>
    </div>
  </div>
);

const PredictionCard = ({
  icon: Icon,
  title,
  content,
  loading,
}: {
  icon: typeof TrendingUp;
  title: string;
  content: string;
  loading: boolean;
}) => (
  <Card className="border-border/50 bg-card/80">
    <CardHeader className="pb-2">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-primary" />
        <CardTitle className="font-display text-sm">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      {loading ? (
        <div className="h-16 flex items-center justify-center">
          <RefreshCw className="w-4 h-4 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
      )}
    </CardContent>
  </Card>
);

const PredictionsPlaceholder = () => {
  const { toast } = useToast();
  const { company, hasProfile, isLoading } = useCompanyProfile();
  const [predictions, setPredictions] = useState<Predictions | null>(null);
  const [generating, setGenerating] = useState(false);

  const generatePredictions = async () => {
    if (!company) {
      toast({
        variant: "destructive",
        title: "Profilo azienda richiesto",
        description: "Configura il profilo azienda per generare previsioni.",
      });
      return;
    }

    setGenerating(true);

    try {
      const { data, error } = await supabase.functions.invoke("generate-predictions", {
        body: { company },
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      setPredictions(data.predictions);
      toast({
        title: "Previsioni generate",
        description: "Analisi qualitativa completata.",
      });
    } catch (error: any) {
      console.error("Prediction error:", error);
      toast({
        variant: "destructive",
        title: "Errore generazione",
        description: error.message || "Impossibile generare previsioni.",
      });
    } finally {
      setGenerating(false);
    }
  };

  const confidenceConfig = predictions?.confidence
    ? CONFIDENCE_CONFIG[predictions.confidence]
    : null;

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-12 bg-secondary/50 rounded-lg w-1/3" />
        <div className="h-48 bg-secondary/50 rounded-lg" />
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-secondary/50 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <LineChart className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">Previsioni (Basic)</h1>
            <p className="text-muted-foreground">Analisi predittiva qualitativa AI</p>
          </div>
        </div>
        <Button
          onClick={generatePredictions}
          disabled={generating || !hasProfile}
          className="gap-2"
        >
          {generating ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {generating ? "Generazione..." : "Rigenera analisi con AI"}
        </Button>
      </div>

      {/* Company Context / Gating */}
      {!hasProfile ? (
        <CompanyProfileGate message="Configura il profilo azienda per abilitare le previsioni AI personalizzate" />
      ) : (
        <>
          {/* Company Context Banner */}
          {company && (
            <Card className="border-border/50 bg-secondary/30">
              <CardContent className="py-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Analisi per: <span className="text-foreground font-medium">{company.name}</span>
                    {company.sector && <span className="ml-2">• {company.sector}</span>}
                    {company.employees && <span className="ml-2">• {company.employees} dipendenti</span>}
                  </p>
                  {confidenceConfig && (
                    <Badge variant="outline" className={confidenceConfig.className}>
                      {confidenceConfig.label}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Placeholder Chart */}
          <Card className="border-border/50 bg-card/80">
            <CardHeader>
              <CardTitle className="font-display">Trend Previsto</CardTitle>
              <CardDescription>Proiezione qualitativa (nessun valore numerico reale)</CardDescription>
            </CardHeader>
            <CardContent>
              <PlaceholderChart />
            </CardContent>
          </Card>

          {/* Predictions Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            <PredictionCard
              icon={TrendingUp}
              title="Trend di Mercato"
              content={predictions?.marketTrend || "Preview AI - In attesa di analisi"}
              loading={generating}
            />
            <PredictionCard
              icon={Target}
              title="Opportunità Identificate"
              content={predictions?.opportunities || "Preview AI - In attesa di analisi"}
              loading={generating}
            />
            <PredictionCard
              icon={AlertTriangle}
              title="Sfide Potenziali"
              content={predictions?.challenges || "Preview AI - In attesa di analisi"}
              loading={generating}
            />
            <PredictionCard
              icon={Compass}
              title="Focus Strategico"
              content={predictions?.strategicFocus || "Preview AI - In attesa di analisi"}
              loading={generating}
            />
          </div>

          {/* Disclaimer */}
          <Card className="border-border/50 bg-secondary/20">
            <CardContent className="py-4">
              <p className="text-xs text-muted-foreground text-center">
                Le previsioni sono generate da AI in modo qualitativo. Non contengono valori numerici, 
                percentuali o dati finanziari. Utilizzare come supporto decisionale, non come fonte primaria.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default PredictionsPlaceholder;
