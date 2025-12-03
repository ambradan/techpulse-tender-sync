import { Heart, GraduationCap, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Partner {
  id: string;
  name: string;
  category: string;
  description: string | null;
}

interface PartnersSectionProps {
  partners: Partner[];
}

const categoryIcons: Record<string, React.ReactNode> = {
  "Welfare Aziendale": <Heart className="w-5 h-5" />,
  "Salute": <Shield className="w-5 h-5" />,
  "Formazione": <GraduationCap className="w-5 h-5" />,
};

const PartnersSection = ({ partners }: PartnersSectionProps) => {
  return (
    <section className="bg-gradient-card rounded-2xl border border-border/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Partner Opzionali</h2>
          <p className="text-sm text-muted-foreground">Servizi di welfare e supporto aziendale</p>
        </div>
        <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-full">
          Non obbligatorio
        </span>
      </div>

      <div className="space-y-4">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="bg-secondary/30 rounded-xl p-4 border border-border/30 hover:border-primary/30 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                {categoryIcons[partner.category] || <Shield className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{partner.name}</h3>
                <p className="text-sm text-muted-foreground">{partner.description}</p>
                <span className="text-xs text-primary">{partner.category}</span>
              </div>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {partners.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>Nessun partner disponibile al momento</p>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-muted/30 rounded-xl border border-border/30">
        <p className="text-sm text-muted-foreground text-center">
          I partner sono opzionali. La dashboard funziona completamente anche senza attivare alcun servizio.
        </p>
      </div>
    </section>
  );
};

export default PartnersSection;
