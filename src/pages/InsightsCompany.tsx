import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Building2, MapPin, Users, Cpu, Briefcase } from "lucide-react";
import { useEffect } from "react";

const InsightsCompany = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const { company, isLoading: companyLoading } = useCompanyProfile();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  if (authLoading || companyLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Caricamento...</div>
      </div>
    );
  }

  const formatValue = (value: string | number | null | undefined): string => {
    if (value === null || value === undefined || value === "" || value === "non_specificato") {
      return "—";
    }
    return String(value);
  };

  const formatTechArray = (tech: unknown): string[] => {
    if (Array.isArray(tech)) {
      return tech.filter((t) => typeof t === "string" && t.length > 0);
    }
    return [];
  };

  const getAutomazioneLabel = (level: string | undefined): string => {
    const labels: Record<string, string> = {
      basso: "Basso - Processi prevalentemente manuali",
      medio: "Medio - Automazione parziale",
      alto: "Alto - Processi altamente automatizzati",
    };
    return labels[level || ""] || "—";
  };

  const getModelLabel = (model: string | undefined): string => {
    const labels: Record<string, string> = {
      onsite: "In sede",
      remote: "Full remote",
      hybrid: "Ibrido",
    };
    return labels[model || ""] || "—";
  };

  const getSizeLabel = (employees: number | null | undefined): string => {
    if (!employees) return "—";
    if (employees < 10) return "Micro (1-9 dipendenti)";
    if (employees < 50) return "Piccola (10-49 dipendenti)";
    if (employees < 250) return "Media (50-249 dipendenti)";
    return "Grande (250+ dipendenti)";
  };

  const technologies = formatTechArray(company?.tecnologia_usata);

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
            <h1 className="text-xl font-semibold text-foreground">Analisi Aziendale</h1>
            <p className="text-sm text-muted-foreground">Panoramica completa del profilo</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {!company ? (
          <Card className="border-border/50">
            <CardContent className="py-12 text-center">
              <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Profilo non configurato
              </h2>
              <p className="text-muted-foreground mb-6">
                Configura il tuo profilo aziendale per visualizzare l'analisi
              </p>
              <Button onClick={() => navigate("/profile")}>
                Configura profilo
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Company Header Card */}
            <Card className="border-border/50 bg-gradient-to-br from-card to-card/50">
              <CardContent className="py-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground mb-1">
                      {company.name || "Nome non specificato"}
                    </h2>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                      {company.sector && (
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {company.sector}
                        </span>
                      )}
                      {company.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {company.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-primary border-primary/30">
                    {company.completeness_score ?? 0}% completo
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Main Info Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Dimensione */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Dimensione
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground">
                    {getSizeLabel(company.employees)}
                  </p>
                </CardContent>
              </Card>

              {/* Modello di lavoro */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    Modello di Lavoro
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground">
                    {getModelLabel(company.modello_lavoro)}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Automazione */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-primary" />
                  Livello di Automazione
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-foreground">
                  {getAutomazioneLabel(company.automazione_livello)}
                </p>
              </CardContent>
            </Card>

            {/* Tecnologie */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Tecnologie Utilizzate</CardTitle>
              </CardHeader>
              <CardContent>
                {technologies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="bg-primary/10 text-primary border-none"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">—</p>
                )}
              </CardContent>
            </Card>

            {/* Team Composition */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Composizione Team</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Team Tech</p>
                    <p className="text-2xl font-semibold text-foreground">
                      {formatValue(company.numero_team_tech)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Team Non-Tech</p>
                    <p className="text-2xl font-semibold text-foreground">
                      {formatValue(company.numero_team_nontech)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {company.description && (
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Descrizione Attività</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">
                    {company.description}
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default InsightsCompany;
