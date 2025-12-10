import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Target, Lightbulb } from "lucide-react";

interface HiringData {
  ruoli_prioritari: string[];
  competenze_critiche: string[];
}

const InsightsHiring = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const { company, isLoading: companyLoading } = useCompanyProfile();
  const [hiring, setHiring] = useState<HiringData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (company?.id) {
      loadHiringData();
    }
  }, [company?.id]);

  const loadHiringData = async () => {
    if (!company?.id) return;

    const { data } = await supabase
      .from("hiring")
      .select("*")
      .eq("company_id", company.id)
      .maybeSingle();

    if (data) {
      setHiring({
        ruoli_prioritari: Array.isArray(data.ruoli_prioritari) ? data.ruoli_prioritari as string[] : [],
        competenze_critiche: Array.isArray(data.competenze_critiche) ? data.competenze_critiche as string[] : [],
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

  const hasData = hiring && (hiring.ruoli_prioritari.length > 0 || hiring.competenze_critiche.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Hiring & Competenze</h1>
            <p className="text-sm text-muted-foreground">Ruoli e skill per la crescita aziendale</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {!company ? (
          <Card className="border-border/50">
            <CardContent className="py-12 text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Profilo non configurato
              </h2>
              <p className="text-muted-foreground mb-6">
                Configura il tuo profilo aziendale per visualizzare le analisi HR
              </p>
              <Button onClick={() => navigate("/profile")}>
                Configura profilo
              </Button>
            </CardContent>
          </Card>
        ) : !hasData ? (
          <>
            {/* Context Card */}
            <Card className="border-border/50 bg-gradient-to-br from-emerald-500/10 to-card">
              <CardContent className="py-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Users className="h-6 w-6 text-emerald-400" />
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
                <Lightbulb className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Dati insufficienti
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Non sono ancora disponibili dati su ruoli prioritari o competenze critiche. 
                  Questi verranno popolati man mano che il profilo si arricchisce.
                </p>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Context Card */}
            <Card className="border-border/50 bg-gradient-to-br from-emerald-500/10 to-card">
              <CardContent className="py-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Users className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">{company.name}</h2>
                    <p className="text-muted-foreground">{company.sector || "Settore non specificato"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ruoli Prioritari */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-emerald-400" />
                  Ruoli Prioritari
                </CardTitle>
                <CardDescription>
                  Figure professionali da considerare per la crescita
                </CardDescription>
              </CardHeader>
              <CardContent>
                {hiring!.ruoli_prioritari.length > 0 ? (
                  <div className="space-y-3">
                    {hiring!.ruoli_prioritari.map((ruolo, index) => (
                      <div 
                        key={index}
                        className="p-4 rounded-lg bg-muted/30 border border-border/30"
                      >
                        <p className="text-foreground font-medium">{ruolo}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">—</p>
                )}
              </CardContent>
            </Card>

            {/* Competenze Critiche */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-400" />
                  Competenze Critiche
                </CardTitle>
                <CardDescription>
                  Skill essenziali per il team
                </CardDescription>
              </CardHeader>
              <CardContent>
                {hiring!.competenze_critiche.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {hiring!.competenze_critiche.map((comp, index) => (
                      <Badge 
                        key={index}
                        variant="secondary"
                        className="bg-amber-500/10 text-amber-300 border-none px-3 py-1"
                      >
                        {comp}
                      </Badge>
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

export default InsightsHiring;
