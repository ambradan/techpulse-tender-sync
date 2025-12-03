import { TrendingUp, AlertCircle, FileText, Coins } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Trend {
  id: string;
  title: string;
  summary: string;
  impact_score: number | null;
  category: string;
}

interface TrendSectionProps {
  trends: Trend[];
}

const categoryIcons: Record<string, React.ReactNode> = {
  Normativa: <FileText className="w-4 h-4" />,
  Compliance: <AlertCircle className="w-4 h-4" />,
  Mercato: <TrendingUp className="w-4 h-4" />,
  Fiscale: <Coins className="w-4 h-4" />,
};

const categoryColors: Record<string, string> = {
  Normativa: "text-primary bg-primary/20",
  Compliance: "text-destructive bg-destructive/20",
  Mercato: "text-accent bg-accent/20",
  Fiscale: "text-green-400 bg-green-400/20",
};

const TrendSection = ({ trends }: TrendSectionProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  const analyzeWithAI = async () => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-trends", {
        body: { trends: trends.map(t => t.title + ": " + t.summary).join("\n") },
      });
      
      if (error) throw error;
      setAiAnalysis(data.analysis);
      toast.success("Analisi completata");
    } catch (error) {
      toast.error("Errore durante l'analisi AI");
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section className="bg-gradient-card rounded-2xl border border-border/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Trend Attuali</h2>
          <p className="text-sm text-muted-foreground">Notizie sintetizzate con impatto stimato</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={analyzeWithAI}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? "Analizzando..." : "Analisi AI"}
        </Button>
      </div>

      {aiAnalysis && (
        <div className="mb-4 p-4 bg-primary/10 border border-primary/30 rounded-xl">
          <p className="text-sm text-foreground">{aiAnalysis}</p>
        </div>
      )}

      <div className="space-y-4">
        {trends.map((trend) => (
          <div
            key={trend.id}
            className="bg-secondary/30 rounded-xl p-4 border border-border/30 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${categoryColors[trend.category] || "text-muted-foreground bg-muted"}`}>
                    {categoryIcons[trend.category]}
                    {trend.category}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{trend.title}</h3>
                <p className="text-sm text-muted-foreground">{trend.summary}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{trend.impact_score}%</div>
                <div className="text-xs text-muted-foreground">impatto</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendSection;
