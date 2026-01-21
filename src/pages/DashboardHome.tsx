import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/backend/client";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  LineChart, 
  Users, 
  FileText, 
  Building2, 
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from "lucide-react";

interface SetupStatus {
  hasCompanyProfile: boolean;
  hasPredictions: boolean;
  hasPartners: boolean;
  hasTendermatch: boolean;
}

const DashboardHome = () => {
  const { company, partnerCount, isLoading, hasProfile } = useCompanyProfile();

  // Check setup status
  const { data: setupStatus } = useQuery<SetupStatus>({
    queryKey: ["dashboardSetupStatus", company?.id],
    queryFn: async () => {
      if (!company?.id) {
        return {
          hasCompanyProfile: false,
          hasPredictions: false,
          hasPartners: false,
          hasTendermatch: false,
        };
      }

      // Check predictions
      const { count: predictionsCount } = await supabase
        .from("predictions_basic")
        .select("*", { count: "exact", head: true })
        .eq("company_id", company.id);

      // Check partners
      const { count: partnersCount } = await supabase
        .from("company_partners")
        .select("*", { count: "exact", head: true })
        .eq("company_id", company.id);

      // Check tendermatch preferences
      const { data: tendermatchPref } = await supabase
        .from("tendermatch_preferences")
        .select("id")
        .eq("company_id", company.id)
        .maybeSingle();

      return {
        hasCompanyProfile: true,
        hasPredictions: (predictionsCount || 0) > 0,
        hasPartners: (partnersCount || 0) > 0,
        hasTendermatch: !!tendermatchPref,
      };
    },
    enabled: !!company?.id,
  });

  const completedSteps = setupStatus
    ? [
        setupStatus.hasCompanyProfile,
        setupStatus.hasPredictions,
        setupStatus.hasPartners,
        setupStatus.hasTendermatch,
      ].filter(Boolean).length
    : 0;
  const progressPercentage = (completedSteps / 4) * 100;

  const sections = [
    {
      title: "Trend Attuali",
      description: "Monitoraggio trend di mercato",
      icon: TrendingUp,
      link: "/dashboard/trends",
      status: hasProfile ? "ready" : "needs-profile",
    },
    {
      title: "Previsioni",
      description: "Analisi predittiva base",
      icon: LineChart,
      link: "/dashboard/predictions",
      status: hasProfile ? "ready" : "needs-profile",
    },
    {
      title: "Partner",
      description: "Partner welfare & benefit",
      icon: Users,
      link: "/dashboard/partners",
      status: "ready",
    },
    {
      title: "TenderMatch",
      description: "Gare consigliate",
      icon: FileText,
      link: "/dashboard/tenders",
      status: hasProfile ? "ready" : "needs-profile",
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-32 bg-secondary/50 rounded-lg" />
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 bg-secondary/50 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="tp-section space-y-8">
      {/* Company Header */}
      <div className="tp-card bg-gradient-card">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="tp-page-title mb-2">
              {company?.name || "Configura il profilo azienda"}
            </h1>
            {company && (
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {company.sector && <span>Settore: {company.sector}</span>}
                {company.employees && <span>Dipendenti: {company.employees}</span>}
                {company.location && <span>Sede: {company.location}</span>}
                {partnerCount > 0 && <span>Partner attivi: {partnerCount}</span>}
              </div>
            )}
            {company?.description && (
              <p className="text-sm text-muted-foreground mt-3">{company.description}</p>
            )}
          </div>
          <Button className="tp-btn-secondary" asChild>
            <Link to="/profile">
              <Building2 className="w-4 h-4 mr-2" />
              {hasProfile ? "Modifica" : "Configura"}
            </Link>
          </Button>
        </div>
        {hasProfile && (
          <div className="mt-6 pt-6 border-t border-border/50">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Setup completato</span>
              <span className="font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex flex-wrap gap-4 mt-4 text-xs">
              <SetupItem done={setupStatus?.hasCompanyProfile} label="Profilo azienda" />
              <SetupItem done={setupStatus?.hasPredictions} label="Previsione generata" />
              <SetupItem done={setupStatus?.hasPartners} label="Partner selezionato" />
              <SetupItem done={setupStatus?.hasTendermatch} label="TenderMatch configurato" />
            </div>
          </div>
        )}
      </div>

      {/* Dashboard Sections Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <div 
            key={section.title} 
            className={`tp-card-hover ${section.status === "needs-profile" ? "opacity-75" : ""}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <section.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-lg font-semibold">{section.title}</h2>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            </div>
            {section.status === "needs-profile" ? (
              <div className="h-20 flex flex-col items-center justify-center border border-dashed border-border rounded-xl bg-secondary/20">
                <p className="text-sm text-muted-foreground mb-2">Richiede profilo azienda</p>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/profile">Configura profilo</Link>
                </Button>
              </div>
            ) : (
              <Button className="tp-btn-secondary w-full" asChild>
                <Link to={section.link}>
                  Vai alla sezione
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const SetupItem = ({ done, label }: { done?: boolean; label: string }) => (
  <div className="flex items-center gap-1.5">
    {done ? (
      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
    ) : (
      <AlertCircle className="w-3.5 h-3.5 text-muted-foreground" />
    )}
    <span className={done ? "text-foreground" : "text-muted-foreground"}>{label}</span>
  </div>
);

export default DashboardHome;
