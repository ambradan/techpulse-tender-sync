import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

// Placeholder data structure - ready for API integration
interface MarketNews {
  id: string;
  title: string;
  summary: string;
  source: string;
  category: "economia" | "tech" | "normativa" | "mercato";
  publishedAt: string;
  impactScore: number | null; // 0-100, null = non valutato
}

const CATEGORY_CONFIG: Record<string, { label: string; className: string }> = {
  economia: { label: "Economia", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  tech: { label: "Tecnologia", className: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  normativa: { label: "Normativa", className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  mercato: { label: "Mercato", className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
};

// Placeholder news - replace with real API data
const placeholderNews: MarketNews[] = [
  {
    id: "1",
    title: "[Placeholder] Titolo notizia economia",
    summary: "Sintesi della notizia in attesa di integrazione API esterna. Questo contenuto verrà sostituito con dati reali.",
    source: "Fonte API",
    category: "economia",
    publishedAt: new Date().toISOString(),
    impactScore: null,
  },
  {
    id: "2",
    title: "[Placeholder] Titolo notizia tecnologia",
    summary: "Sintesi della notizia in attesa di integrazione API esterna. Questo contenuto verrà sostituito con dati reali.",
    source: "Fonte API",
    category: "tech",
    publishedAt: new Date().toISOString(),
    impactScore: null,
  },
  {
    id: "3",
    title: "[Placeholder] Titolo notizia normativa",
    summary: "Sintesi della notizia in attesa di integrazione API esterna. Questo contenuto verrà sostituito con dati reali.",
    source: "Fonte API",
    category: "normativa",
    publishedAt: new Date().toISOString(),
    impactScore: null,
  },
  {
    id: "4",
    title: "[Placeholder] Titolo notizia mercato",
    summary: "Sintesi della notizia in attesa di integrazione API esterna. Questo contenuto verrà sostituito con dati reali.",
    source: "Fonte API",
    category: "mercato",
    publishedAt: new Date().toISOString(),
    impactScore: null,
  },
];

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
    <Card className="border-border/50 bg-card/80 hover:bg-card/90 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="outline" className={categoryConfig.className}>
            {categoryConfig.label}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {formatDate(news.publishedAt)}
          </div>
        </div>
        <CardTitle className="font-display text-base leading-tight mt-2">
          {news.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {news.summary}
        </p>
        
        <ImpactBar score={news.impactScore} />
        
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <span className="text-xs text-muted-foreground">
            Fonte: {news.source}
          </span>
          <Button variant="ghost" size="sm" className="h-7 text-xs" disabled>
            <ExternalLink className="w-3 h-3 mr-1" />
            Dettagli
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const TrendsPlaceholder = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">Trend Attuali</h1>
            <p className="text-muted-foreground">Monitoraggio trend di mercato</p>
          </div>
        </div>
        <Button variant="outline" size="sm" disabled>
          <Sparkles className="w-4 h-4 mr-2" />
          Analizza con AI
        </Button>
      </div>

      {/* Info Banner */}
      <Card className="border-border/50 bg-secondary/30">
        <CardContent className="py-4">
          <p className="text-sm text-muted-foreground text-center">
            In attesa di integrazione API esterne. I contenuti mostrati sono placeholder statici.
          </p>
        </CardContent>
      </Card>

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
      <div className="grid gap-4">
        {placeholderNews.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>

      {/* AI Summary Placeholder */}
      <Card className="border-border/50 bg-gradient-card">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Sintesi AI
          </CardTitle>
          <CardDescription>
            Analisi automatica dei trend più rilevanti per il tuo settore
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg border border-dashed border-border bg-secondary/20">
            <p className="text-sm text-muted-foreground text-center">
              Preview AI - Sintesi in attesa di dati reali
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendsPlaceholder;
