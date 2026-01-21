import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import MainFooter from "@/components/MainFooter";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import { SectionInput } from "@/components/dashboard/SectionInput";
import { ScoreGauge } from "@/components/dashboard/shared/ScoreGauge";
import { DriversList } from "@/components/dashboard/shared/DriversList";
import { ActionCard } from "@/components/dashboard/shared/ActionCard";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/backend/client";
import { 
  ArrowRight, 
  Building2,
  Gauge,
  AlertTriangle,
  Lightbulb,
  UserPlus,
  GraduationCap,
  FileCheck,
  Bot,
  Handshake,
  GitBranch,
  Calendar,
  FileText,
  AlertCircle,
  Cpu,
  Users,
  MapPin
} from "lucide-react";

interface CompanyProfile {
  name: string | null;
  sector: string | null;
  employees: number | null;
  location: string | null;
  description: string | null;
  tecnologia_usata: string[] | null;
  automazione_livello: string | null;
  modello_lavoro: string | null;
  completeness_score: number | null;
}

const Aziende = () => {
  const { user } = useAuth();
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [profileContext, setProfileContext] = useState<Record<string, unknown>>({});
  const [aiAnalysis, setAiAnalysis] = useState<Record<string, string>>({});
  const [profileType, setProfileType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      // Check profile type
      const { data: profile } = await supabase
        .from("profiles")
        .select("profile_type")
        .eq("id", user.id)
        .maybeSingle();
      
      if (profile) setProfileType(profile.profile_type);

      // Load company data
      const { data } = await supabase
        .from("companies")
        .select("name, sector, employees, location, description, tecnologia_usata, automazione_livello, modello_lavoro, completeness_score")
        .eq("user_id", user.id)
        .maybeSingle();

      if (data) {
        setCompany({
          name: data.name,
          sector: data.sector,
          employees: data.employees,
          location: data.location,
          description: data.description,
          tecnologia_usata: Array.isArray(data.tecnologia_usata) ? data.tecnologia_usata as string[] : null,
          automazione_livello: data.automazione_livello,
          modello_lavoro: data.modello_lavoro,
          completeness_score: data.completeness_score,
        });
        setProfileContext(data as unknown as Record<string, unknown>);
      }

      // Load saved AI analyses
      const { data: analyses } = await supabase
        .from("section_inputs")
        .select("section_key, ai_analysis")
        .eq("user_id", user.id)
        .in("section_key", ["aziende_trend", "aziende_actions"]);

      if (analyses) {
        const analysisMap: Record<string, string> = {};
        analyses.forEach((a) => {
          if (a.ai_analysis) analysisMap[a.section_key] = a.ai_analysis;
        });
        setAiAnalysis(analysisMap);
      }

      setLoading(false);
    };
    
    loadData();
  }, [user]);

  const hasCompanyData = company && company.name;
  const isAziendaProfile = profileType === "azienda";

  const getAutomazioneLabel = (level: string | null) => {
    if (!level || level === "non_specificato") return null;
    if (level === "basso") return "Basso - Processi manuali";
    if (level === "medio") return "Medio - Parzialmente automatizzato";
    if (level === "alto") return "Alto - Altamente automatizzato";
    return level;
  };

  return (
    <main className="min-h-screen bg-gradient-hero flex flex-col">
      <ConditionalNavbar />

      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Dashboard Aziende</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Il tuo consulente strategico in tasca
            </h1>
            <p className="text-muted-foreground mt-2">
              Previsioni, rischi e azioni basate sui tuoi dati aziendali
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/profile">
              <Button variant="outline" className="gap-2">
                <FileText className="w-4 h-4" />
                Modifica Profilo
              </Button>
            </Link>
            {!user && (
              <Link to="/auth">
                <Button className="gap-2">
                  Inizia Ora
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Profile warning */}
        {user && profileType && !isAziendaProfile && (
          <div className="mb-8 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="text-yellow-500 font-medium">Profilo non configurato come "Azienda"</p>
              <p className="text-sm text-muted-foreground mt-1">
                Vai in <Link to="/profile" className="text-primary underline">Profilo</Link> e seleziona "Azienda" per compilare i dati aziendali.
              </p>
            </div>
          </div>
        )}

        {/* No data warning */}
        {user && isAziendaProfile && !hasCompanyData && !loading && (
          <div className="mb-8 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-blue-500 font-medium">Profilo aziendale incompleto</p>
              <p className="text-sm text-muted-foreground mt-1">
                Compila i <Link to="/profile" className="text-primary underline">dati aziendali</Link> per vedere le analisi.
              </p>
            </div>
          </div>
        )}

        {/* INPUT: note per analisi AI */}
        {user && (
          <div className="mb-8 space-y-4">
            <SectionInput
              sectionKey="aziende_trend"
              title="Note su trend e mercato"
              description="Aggiungi insight su mercato, competitor, clienti: l'AI li analizza."
              profileType="azienda"
              profileContext={profileContext}
              onAnalysisComplete={(analysis) => setAiAnalysis(prev => ({ ...prev, aziende_trend: analysis }))}
            />
            <SectionInput
              sectionKey="aziende_actions"
              title="Piano azioni (priorità)"
              description="Scrivi le azioni che stai valutando: l'AI ti aiuta a priorizzarle."
              profileType="azienda"
              profileContext={profileContext}
              onAnalysisComplete={(analysis) => setAiAnalysis(prev => ({ ...prev, aziende_actions: analysis }))}
            />
          </div>
        )}

        {/* SEZIONE A: Riepilogo Azienda - DAI DATI PROFILO */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <DashboardCard 
            icon={Gauge} 
            title="Completezza Profilo"
            subtitle="Percentuale dati compilati"
            className="lg:col-span-1"
          >
            <div className="flex justify-center py-4">
              <ScoreGauge 
                score={company?.completeness_score ?? 0}
                label={company?.completeness_score && company.completeness_score >= 70 ? "Completo" : "Da completare"}
                size="lg"
              />
            </div>
          </DashboardCard>

          <DashboardCard 
            title="Profilo Aziendale"
            subtitle="Dati dalla tua scheda profilo"
            className="lg:col-span-2"
          >
            {hasCompanyData ? (
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-secondary/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm">Azienda</span>
                  </div>
                  <p className="font-semibold text-foreground">{company.name}</p>
                  {company.sector && <p className="text-sm text-muted-foreground">{company.sector}</p>}
                </div>
                <div className="bg-secondary/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Dimensione</span>
                  </div>
                  <p className="font-semibold text-foreground">{company.employees ? `${company.employees} dipendenti` : "Non specificato"}</p>
                  {company.location && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {company.location}
                    </p>
                  )}
                </div>
                <div className="bg-secondary/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Cpu className="w-4 h-4" />
                    <span className="text-sm">Automazione</span>
                  </div>
                  <p className="font-semibold text-foreground">{getAutomazioneLabel(company.automazione_livello) || "Non specificato"}</p>
                </div>
                <div className="bg-secondary/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Lightbulb className="w-4 h-4" />
                    <span className="text-sm">Tecnologie</span>
                  </div>
                  {company.tecnologia_usata && company.tecnologia_usata.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {company.tecnologia_usata.slice(0, 4).map((tech, i) => (
                        <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">{tech}</span>
                      ))}
                      {company.tecnologia_usata.length > 4 && (
                        <span className="text-xs text-muted-foreground">+{company.tecnologia_usata.length - 4}</span>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Nessuna specificata</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Building2 className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground">
                  Compila il <Link to="/profile" className="text-primary underline">profilo aziendale</Link> per vedere i tuoi dati qui.
                </p>
              </div>
            )}
          </DashboardCard>
        </div>

        {/* AI Analysis - Trend */}
        {aiAnalysis.aziende_trend && (
          <div className="mb-8 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Analisi AI - Trend e Mercato</span>
            </div>
            <div className="text-sm text-foreground whitespace-pre-wrap" dangerouslySetInnerHTML={{ 
              __html: aiAnalysis.aziende_trend.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') 
            }} />
          </div>
        )}

        {/* SEZIONE C: Driver placeholder - basato su AI */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-primary" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              Driver e Rischi
            </h2>
          </div>
          {aiAnalysis.aziende_trend ? (
            <p className="text-muted-foreground">
              I driver sono identificati nell'analisi AI sopra. Usa le sezioni di input per aggiungere dettagli.
            </p>
          ) : (
            <DriversList positive={[]} negative={[]} />
          )}
        </div>

        {/* AI Analysis - Actions */}
        {aiAnalysis.aziende_actions && (
          <div className="mb-8 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Analisi AI - Piano Azioni</span>
            </div>
            <div className="text-sm text-foreground whitespace-pre-wrap" dangerouslySetInnerHTML={{ 
              __html: aiAnalysis.aziende_actions.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') 
            }} />
          </div>
        )}

        {/* SEZIONE D: Azioni Consigliate */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-6 h-6 text-primary" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              Aree di Azione
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ActionCard icon={UserPlus} title="Hiring" description="Usa l'analisi AI per valutare esigenze di personale." priority="alta" />
            <ActionCard icon={GraduationCap} title="Formazione" description="Identifica gap formativi del team." priority="alta" />
            <ActionCard icon={FileCheck} title="Compliance" description="Verifica normative e regolamenti di settore." priority="media" />
            <ActionCard icon={Bot} title="Automazione" description="Esplora opportunità di automazione processi." priority="media" />
            <ActionCard icon={Handshake} title="Partnership" description="Valuta collaborazioni strategiche." priority="media" />
            <ActionCard icon={GitBranch} title="Diversificazione" description="Analizza nuovi mercati o servizi." priority="bassa" />
          </div>
        </div>
      </section>

      <MainFooter />
    </main>
  );
};

export default Aziende;
