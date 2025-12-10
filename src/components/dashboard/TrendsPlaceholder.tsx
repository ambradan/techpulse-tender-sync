import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import CompanyContextBanner from "@/components/dashboard/CompanyContextBanner";
import CompanyProfileGate from "@/components/dashboard/CompanyProfileGate";

// Placeholder data structure - ready for API integration
interface MarketNews {
  id: string;
  title: string;
  summary: string;
  source: string;
  category: "economia" | "tech" | "normativa" | "mercato";
  publishedAt: string;
  impactScore: number | null;
}

const CATEGORY_CONFIG: Record<string, { label: string; className: string }> = {
  economia: { label: "Economia", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  tech: { label: "Tecnologia", className: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  normativa: { label: "Normativa", className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  mercato: { label: "Mercato", className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
};

// Function to fetch trends - ready for future API integration
const fetchTrendsForCompany = (company: { sector: string; location?: string | null }) => {
  const sector = company.sector || "Tech";
  const location = company.location || "Italia";
  
  return [
    {
      id: "1",
      title: `[Placeholder] Trend economia per il settore ${sector}`,
      summary: `Sintesi della notizia in attesa di integrazione API esterna. Contenuto relativo al settore ${sector} in ${location}.`,
      source: "Fonte API",
      category: "economia" as const,
      publishedAt: new Date().toISOString(),
      impactScore: null,
    },
    {
      id: "2",
      title: `[Placeholder] Novità tecnologiche per ${sector}`,
      summary: `Aggiornamenti tecnologici rilevanti per aziende del settore ${sector}. Contenuto in attesa di dati reali.`,
      source: "Fonte API",
      category: "tech" as const,
      publishedAt: new Date().toISOString(),
      impactScore: null,
    },
    {
      id: "3",
      title: `[Placeholder] Normativa ${sector} - Aggiornamenti`,
      summary: `Cambiamenti normativi che impattano il settore ${sector}. In attesa di integrazione API esterna.`,
      source: "Fonte API",
      category: "normativa" as const,
      publishedAt: new Date().toISOString(),
      impactScore: null,
    },
    {
      id: "4",
      title: `[Placeholder] Andamento mercato ${sector}`,
      summary: `Analisi di mercato per il settore ${sector} in ${location}. Contenuto placeholder.`,
      source: "Fonte API",
      category: "mercato" as const,
      publishedAt: new Date().toISOString(),
      impactScore: null,
    },
  ];
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const ImpactBar = ({ score }: { score: number | null }) => {
  if (score === null) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Impatto stimato:</span>
        <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
          <div className="h-full w-1/2 bg-muted-foreground/30 rounded-full" />
        </div>
        <span className="text-xs text-muted-foreground">N/D</span>
      </div>
    );
  }

  const getBarColor = (score: number) => {
    if (score >= 70) return "bg-destructive";
    if (score >= 40) return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">Impatto stimato:</span>
      <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all ${getBarColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground">{score}%</span>
    </div>
  );
};

const NewsCard = ({ news }: { news: MarketNews }) => {
  const categoryConfig = CATEGORY_CONFIG[news.category];

  return (
    <div className="tp-card-hover">
      <div className="flex items-start justify-between gap-2 mb-3">
        <Badge variant="outline" className={categoryConfig.className}>
          {categoryConfig.label}
        </Badge>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          {formatDate(news.publishedAt)}
        </div>
      </div>
      <h3 className="font-display text-base font-medium leading-tight mb-3">
        {news.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {news.summary}
      </p>
      
      <ImpactBar score={news.impactScore} />
      
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/50">
        <span className="text-xs text-muted-foreground">
          Fonte: {news.source}
        </span>
        <Button variant="ghost" size="sm" className="h-7 text-xs" disabled>
          <ExternalLink className="w-3 h-3 mr-1" />
          Dettagli
        </Button>
      </div>
    </div>
  );
};

const TrendsPlaceholder = () => {
  const { company, hasProfile, isLoading } = useCompanyProfile();
  
  // Generate trends based on company data
  const placeholderNews = hasProfile && company 
    ? fetchTrendsForCompany(company)
    : fetchTrendsForCompany({ sector: "Tech" });

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-12 bg-secondary/50 rounded-lg w-1/3" />
        <div className="grid gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-secondary/50 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="tp-section space-y-8">
      {/* Header */}
      <div className="tp-page-header">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="tp-page-title">Trend Attuali</h1>
              <p className="tp-page-subtitle">Monitoraggio trend di mercato</p>
            </div>
          </div>
          <Button className="tp-btn-primary" disabled>
            <Sparkles className="w-4 h-4 mr-2" />
            Analizza con AI
          </Button>
        </div>
      </div>

      {/* Company Context */}
      {hasProfile && company && (
        <CompanyContextBanner company={company} compact />
      )}

      {/* Gating for non-configured companies */}
      {!hasProfile && (
        <CompanyProfileGate message="Configura il profilo aziendale per ricevere trend personalizzati per il tuo settore" />
      )}

      {/* Info Banner */}
      <div className="tp-card bg-secondary/30 py-4">
        <p className="text-sm text-muted-foreground text-center">
          In attesa di integrazione API esterne. I contenuti mostrati sono placeholder basati sul settore {company?.sector || "generico"}.
        </p>
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
          <Badge
            key={key}
            variant="outline"
            className={`cursor-pointer hover:opacity-80 ${config.className}`}
          >
            {config.label}
          </Badge>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid gap-6">
        {placeholderNews.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>

      {/* AI Summary Placeholder */}
      <div className="tp-card bg-gradient-card">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="font-display text-xl font-semibold">Sintesi AI</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Analisi automatica dei trend più rilevanti per il tuo settore {company?.sector && `(${company.sector})`}
        </p>
        <div className="p-6 rounded-xl border border-dashed border-border bg-secondary/20">
          <p className="text-sm text-muted-foreground text-center">
            Preview AI - Sintesi in attesa di dati reali
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrendsPlaceholder;
