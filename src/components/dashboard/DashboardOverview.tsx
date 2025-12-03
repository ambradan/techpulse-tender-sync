import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, LineChart, Users, FileText } from "lucide-react";

interface Company {
  id: string;
  name: string;
  sector: string;
  employees: number | null;
  description: string | null;
  location?: string | null;
}

interface DashboardOverviewProps {
  company: Company | null | undefined;
}

const DashboardOverview = ({ company }: DashboardOverviewProps) => {
  const sections = [
    {
      title: "Trend Attuali",
      description: "Monitoraggio trend di mercato",
      icon: TrendingUp,
      placeholder: "Preview AI - Analisi trend in attesa",
    },
    {
      title: "Previsioni",
      description: "Analisi predittiva base",
      icon: LineChart,
      placeholder: "Preview AI - Previsioni in attesa",
    },
    {
      title: "Partner",
      description: "Partner welfare & benefit",
      icon: Users,
      placeholder: "Nessun partner selezionato",
    },
    {
      title: "TenderMatch",
      description: "Bandi consigliati",
      icon: FileText,
      placeholder: "Preview AI - Suggerimenti bandi in attesa",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Company Header */}
      <Card className="border-border/50 bg-gradient-card">
        <CardHeader>
          <CardTitle className="font-display text-2xl">
            {company?.name || "Configura il profilo azienda"}
          </CardTitle>
          {company && (
            <CardDescription className="flex flex-wrap gap-4 mt-2">
              {company.sector && <span>Settore: {company.sector}</span>}
              {company.employees && <span>Dipendenti: {company.employees}</span>}
              {company.location && <span>Sede: {company.location}</span>}
            </CardDescription>
          )}
          {company?.description && (
            <p className="text-sm text-muted-foreground mt-3">{company.description}</p>
          )}
        </CardHeader>
      </Card>

      {/* Dashboard Sections Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <Card key={section.title} className="border-border/50 bg-card/80">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="font-display text-lg">{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-32 flex items-center justify-center border border-dashed border-border rounded-lg bg-secondary/20">
                <p className="text-sm text-muted-foreground">{section.placeholder}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
