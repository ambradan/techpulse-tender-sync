import { Award, ExternalLink, Calendar, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { it } from "date-fns/locale";

interface Tender {
  id: string;
  title: string;
  value: number | null;
  deadline: string | null;
  match_score: number | null;
  category: string | null;
}

interface TendersSectionProps {
  tenders: Tender[];
}

const TendersSection = ({ tenders }: TendersSectionProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="bg-gradient-card rounded-2xl border border-border/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
            <Award className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">Bandi Consigliati</h2>
            <p className="text-sm text-muted-foreground">Powered by TenderMatch</p>
          </div>
        </div>
        <span className="text-xs text-accent bg-accent/20 px-2 py-1 rounded-full">
          {tenders.length} disponibili
        </span>
      </div>

      <div className="space-y-4">
        {tenders.map((tender) => (
          <div
            key={tender.id}
            className="bg-secondary/30 rounded-xl p-4 border border-border/30 hover:border-accent/30 transition-colors group cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{tender.title}</h3>
                {tender.category && (
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                    {tender.category}
                  </span>
                )}
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-accent">{tender.match_score}%</div>
                <div className="text-xs text-muted-foreground">match</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                {tender.value && (
                  <div className="flex items-center gap-1 text-foreground">
                    <Euro className="w-4 h-4 text-muted-foreground" />
                    {formatCurrency(tender.value)}
                  </div>
                )}
                {tender.deadline && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(tender.deadline), "d MMM yyyy", { locale: it })}
                  </div>
                )}
              </div>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                Dettagli
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>

            {/* Match progress bar */}
            <div className="mt-3 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-accent rounded-full transition-all duration-500"
                style={{ width: `${tender.match_score}%` }}
              />
            </div>
          </div>
        ))}

        {tenders.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Award className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Nessun bando consigliato disponibile</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TendersSection;
