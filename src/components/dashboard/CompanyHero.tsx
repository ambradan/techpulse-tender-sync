import { Building2, Users, Calendar, Briefcase } from "lucide-react";

interface Company {
  id: string;
  name: string;
  sector: string;
  employees: number | null;
  founded_year: number | null;
  description: string | null;
  context: string | null;
}

interface CompanyHeroProps {
  company: Company | null | undefined;
}

const CompanyHero = ({ company }: CompanyHeroProps) => {
  if (!company) {
    return (
      <div className="bg-gradient-card rounded-2xl border border-border/50 p-8 animate-pulse">
        <div className="h-8 bg-muted rounded w-1/3 mb-4" />
        <div className="h-4 bg-muted rounded w-2/3" />
      </div>
    );
  }

  return (
    <section className="bg-gradient-card rounded-2xl border border-border/50 p-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              {company.name}
            </h1>
            <p className="text-muted-foreground text-lg mb-4">
              {company.description}
            </p>
            {company.context && (
              <p className="text-sm text-muted-foreground/80 bg-secondary/30 rounded-lg p-3 border border-border/30">
                {company.context}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-secondary/30 rounded-xl p-4 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Settore</span>
            </div>
            <p className="font-semibold text-foreground">{company.sector}</p>
          </div>

          <div className="bg-secondary/30 rounded-xl p-4 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Dipendenti</span>
            </div>
            <p className="font-semibold text-foreground">{company.employees || "N/D"}</p>
          </div>

          <div className="bg-secondary/30 rounded-xl p-4 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Fondazione</span>
            </div>
            <p className="font-semibold text-foreground">{company.founded_year || "N/D"}</p>
          </div>

          <div className="bg-secondary/30 rounded-xl p-4 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">Status</span>
            </div>
            <p className="font-semibold text-primary">Attivo</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyHero;
