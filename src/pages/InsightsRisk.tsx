import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, Scale, AlertTriangle, FileText, ChevronRight, Home } from "lucide-react";

interface RiskData {
  normative_rilevanti: string[];
  rischio_operativo: string;
  rischio_ai_act: string;
  livello_rischio: string;
}

const InsightsRisk = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const { company, isLoading: companyLoading } = useCompanyProfile();
  const [risk, setRisk] = useState<RiskData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (company?.id) {
      loadRiskData();
    }
  }, [company?.id]);

  const loadRiskData = async () => {
    if (!company?.id) return;

    const { data } = await supabase
      .from("risk")
      .select("*")
      .eq("company_id", company.id)
      .maybeSingle();

    if (data) {
      setRisk({
        normative_rilevanti: Array.isArray(data.normative_rilevanti) ? data.normative_rilevanti as string[] : [],
        rischio_operativo: data.rischio_operativo || "non_valutato",
        rischio_ai_act: data.rischio_ai_act || "non_valutato",
        livello_rischio: data.livello_rischio || "non_valutato",
      });
    }
    setLoading(false);
  };

  if (authLoading || companyLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Caricamento...</div>
      </div>
    );
  }

  const getRiskBadgeColor = (level: string): string => {
    switch (level) {
      case "basso":
        return "bg-emerald-500/20 text-emerald-300";
      case "medio":
        return "bg-amber-500/20 text-amber-300";
      case "alto":
        return "bg-red-500/20 text-red-300";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getRiskLabel = (level: string): string => {
    switch (level) {
      case "basso":
        return "Basso";
      case "medio":
        return "Medio";
      case "alto":
        return "Alto";
      case "non_valutato":
        return "Non valutato";
      default:
        return "—";
    }
  };

  const hasData = risk && (
    risk.normative_rilevanti.length > 0 || 
    risk.rischio_operativo !== "non_valutato" ||
    risk.rischio_ai_act !== "non_valutato"
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Breadcrumb */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link to="/dashboard" className="flex items-center gap-1 hover:text-foreground transition-colors">
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Rischi & Normative</span>
          </nav>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Rischi & Normative</h1>
            <p className="text-sm text-muted-foreground">Valutazione rischi e conformità</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {!company ? (
          <Card className="border-border/50">
            <CardContent className="py-12 text-center">
              <ShieldAlert className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Profilo non configurato
              </h2>
              <p className="text-muted-foreground mb-6">
                Configura il tuo profilo aziendale per visualizzare l'analisi rischi
              </p>
              <Button onClick={() => navigate("/profile")}>
                Configura profilo
              </Button>
            </CardContent>
          </Card>
        ) : !hasData ? (
          <>
            {/* Context Card */}
            <Card className="border-border/50 bg-gradient-to-br from-amber-500/10 to-card">
              <CardContent className="py-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <ShieldAlert className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">{company.name}</h2>
                    <p className="text-muted-foreground">{company.sector || "Settore non specificato"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="py-12 text-center">
                <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Dati insufficienti
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Non sono ancora disponibili valutazioni di rischio. 
                  Queste verranno generate quando il profilo aziendale sarà più completo.
                </p>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Context Card */}
            <Card className="border-border/50 bg-gradient-to-br from-amber-500/10 to-card">
              <CardContent className="py-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                      <ShieldAlert className="h-6 w-6 text-amber-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">{company.name}</h2>
                      <p className="text-muted-foreground">{company.sector || "Settore non specificato"}</p>
                    </div>
                  </div>
                  <Badge className={`${getRiskBadgeColor(risk!.livello_rischio)} border-none px-4 py-1`}>
                    Rischio {getRiskLabel(risk!.livello_rischio)}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Risk Levels Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Rischio Operativo */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                    Rischio Operativo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge className={`${getRiskBadgeColor(risk!.rischio_operativo)} border-none`}>
                    {getRiskLabel(risk!.rischio_operativo)}
                  </Badge>
                </CardContent>
              </Card>

              {/* Rischio AI Act */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Scale className="h-4 w-4 text-primary" />
                    Rischio AI Act
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge className={`${getRiskBadgeColor(risk!.rischio_ai_act)} border-none`}>
                    {getRiskLabel(risk!.rischio_ai_act)}
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* Normative Rilevanti */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Normative Rilevanti
                </CardTitle>
                <CardDescription>
                  Regolamenti applicabili al settore
                </CardDescription>
              </CardHeader>
              <CardContent>
                {risk!.normative_rilevanti.length > 0 ? (
                  <div className="space-y-3">
                    {risk!.normative_rilevanti.map((norm, index) => (
                      <div 
                        key={index}
                        className="p-4 rounded-lg bg-muted/30 border border-border/30"
                      >
                        <p className="text-foreground">{norm}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">—</p>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
};

export default InsightsRisk;
