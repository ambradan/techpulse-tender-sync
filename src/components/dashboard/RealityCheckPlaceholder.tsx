import { useState } from "react";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { supabase } from "@/integrations/supabase/client";
import CompanyProfileGate from "@/components/dashboard/CompanyProfileGate";
import CompanyContextBanner from "@/components/dashboard/CompanyContextBanner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crosshair, Sparkles, RefreshCw, TrendingUp, TrendingDown, Target, AlertTriangle, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  summary: string;
}

const SWOT_CONFIG = {
  strengths: {
    title: "Strengths",
    subtitle: "Punti di forza",
    icon: TrendingUp,
    className: "bg-emerald-500/10 border-emerald-500/30",
    iconClass: "text-emerald-400",
    badgeClass: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  weaknesses: {
    title: "Weaknesses",
    subtitle: "Punti deboli",
    icon: TrendingDown,
    className: "bg-rose-500/10 border-rose-500/30",
    iconClass: "text-rose-400",
    badgeClass: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  },
  opportunities: {
    title: "Opportunities",
    subtitle: "Opportunità",
    icon: Target,
    className: "bg-blue-500/10 border-blue-500/30",
    iconClass: "text-blue-400",
    badgeClass: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  threats: {
    title: "Threats",
    subtitle: "Minacce",
    icon: AlertTriangle,
    className: "bg-amber-500/10 border-amber-500/30",
    iconClass: "text-amber-400",
    badgeClass: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
};

const SwotQuadrant = ({
  type,
  items,
  loading,
}: {
  type: keyof typeof SWOT_CONFIG;
  items: string[];
  loading: boolean;
}) => {
  const config = SWOT_CONFIG[type];
  const Icon = config.icon;

  return (
    <Card className={`border ${config.className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${config.iconClass}`} />
          <div>
            <CardTitle className="font-display text-base">{config.title}</CardTitle>
            <CardDescription className="text-xs">{config.subtitle}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <div key={i} className="h-4 bg-secondary/50 rounded animate-pulse" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${config.iconClass.replace("text-", "bg-")}`} />
                <span className="text-sm text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            Preview AI - In attesa di analisi
          </p>
        )}
      </CardContent>
    </Card>
  );
};

const PlaceholderRadarChart = () => (
  <div className="relative h-48 w-full flex items-center justify-center">
    <svg className="w-48 h-48" viewBox="0 0 200 200">
      {/* Radar grid */}
      {[80, 60, 40, 20].map((r, i) => (
        <polygon
          key={i}
          points={`100,${100 - r} ${100 + r * 0.87},${100 - r * 0.5} ${100 + r * 0.87},${100 + r * 0.5} 100,${100 + r} ${100 - r * 0.87},${100 + r * 0.5} ${100 - r * 0.87},${100 - r * 0.5}`}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          opacity={0.5}
        />
      ))}
      {/* Axis lines */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={i}
            x1="100"
            y1="100"
            x2={100 + 80 * Math.sin(rad)}
            y2={100 - 80 * Math.cos(rad)}
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity={0.3}
          />
        );
      })}
      {/* Placeholder area */}
      <polygon
        points="100,60 143,80 143,120 100,140 57,120 57,80"
        fill="hsl(var(--muted))"
        fillOpacity="0.2"
        stroke="hsl(var(--muted-foreground))"
        strokeWidth="2"
        strokeDasharray="4,4"
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center bg-background/30">
      <p className="text-xs text-muted-foreground">Grafico in attesa di dati</p>
    </div>
  </div>
);

const RealityCheckPlaceholder = () => {
  const { toast } = useToast();
  const { company, isLoading, hasProfile } = useCompanyProfile();
  const [swot, setSwot] = useState<SwotAnalysis | null>(null);
  const [generating, setGenerating] = useState(false);

  const generateSwot = async () => {
    if (!company) {
      toast({
        variant: "destructive",
        title: "Profilo azienda richiesto",
        description: "Configura il profilo azienda per generare l'analisi SWOT.",
      });
      return;
    }

    setGenerating(true);

    try {
      const { data, error } = await supabase.functions.invoke("reality-check", {
        body: { company },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setSwot(data.swot);
      toast({
        title: "Analisi completata",
        description: "Reality Check Strategico generato.",
      });
    } catch (error: any) {
      console.error("SWOT generation error:", error);
      toast({
        variant: "destructive",
        title: "Errore generazione",
        description: error.message || "Impossibile generare analisi SWOT.",
      });
    } finally {
      setGenerating(false);
    }
  };

  const hasCompany = !!company;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Crosshair className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">Reality Check Strategico</h1>
            <p className="text-muted-foreground">Analisi SWOT e benchmarking</p>
          </div>
        </div>
        <Button
          onClick={generateSwot}
          disabled={generating || !hasCompany}
          className="gap-2"
        >
          {generating ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {generating ? "Generazione..." : "Genera analisi SWOT"}
        </Button>
      </div>

      {/* Company Context */}
      {!hasCompany && (
        <Card className="border-amber-500/30 bg-amber-500/10">
          <CardContent className="py-4">
            <p className="text-sm text-amber-400 text-center">
              Configura il profilo azienda per abilitare l'analisi SWOT personalizzata.
            </p>
          </CardContent>
        </Card>
      )}

      {hasCompany && (
        <Card className="border-border/50 bg-secondary/30">
          <CardContent className="py-3">
            <p className="text-sm text-muted-foreground">
              Analisi per: <span className="text-foreground font-medium">{company.name}</span>
              {company.sector && <span className="ml-2">• {company.sector}</span>}
            </p>
          </CardContent>
        </Card>
      )}

      {/* SWOT Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        <SwotQuadrant
          type="strengths"
          items={swot?.strengths || []}
          loading={generating}
        />
        <SwotQuadrant
          type="weaknesses"
          items={swot?.weaknesses || []}
          loading={generating}
        />
        <SwotQuadrant
          type="opportunities"
          items={swot?.opportunities || []}
          loading={generating}
        />
        <SwotQuadrant
          type="threats"
          items={swot?.threats || []}
          loading={generating}
        />
      </div>

      {/* Summary */}
      {swot?.summary && (
        <Card className="border-border/50 bg-gradient-card">
          <CardHeader>
            <CardTitle className="font-display text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Sintesi AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{swot.summary}</p>
          </CardContent>
        </Card>
      )}

      {/* Benchmarking Section */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-muted-foreground" />
            <div>
              <CardTitle className="font-display">Benchmarking Settoriale</CardTitle>
              <CardDescription>Confronto con dati di settore</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <PlaceholderRadarChart />
          <div className="p-4 rounded-lg border border-dashed border-border bg-secondary/20 text-center">
            <p className="text-sm text-muted-foreground">
              Integrazione API esterne in futuro
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              I dati di benchmarking saranno disponibili dopo la connessione a fonti dati esterne.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-border/50 bg-secondary/20">
        <CardContent className="py-4">
          <p className="text-xs text-muted-foreground text-center">
            L'analisi SWOT è generata da AI basandosi esclusivamente sui dati aziendali forniti. 
            Non contiene numeri, statistiche o valori inventati.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealityCheckPlaceholder;
