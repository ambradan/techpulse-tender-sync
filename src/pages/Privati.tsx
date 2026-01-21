import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import MainFooter from "@/components/MainFooter";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import { SectionInput, type ParsedPrediction } from "@/components/dashboard/SectionInput";
import { ReportGenerator } from "@/components/dashboard/ReportGenerator";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/backend/client";
import { 
  ArrowRight, 
  User,
  Target,
  Briefcase,
  Clock,
  CheckCircle,
  AlertCircle,
  BookOpen,
  GraduationCap,
  Languages,
  Code,
  Lightbulb,
  FileText,
  AlertTriangle
} from "lucide-react";

interface UserProfile {
  ruolo_attuale: string | null;
  ruolo_target: string | null;
  esperienza_anni: number | null;
  competenze: string[] | null;
  settore_interesse: string | null;
  profile_type: string | null;
}

const Privati = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileContext, setProfileContext] = useState<Record<string, unknown>>({});
  const [aiAnalysis, setAiAnalysis] = useState<Record<string, string>>({});
  const [parsedPredictions, setParsedPredictions] = useState<Record<string, ParsedPrediction>>({});
  const [loading, setLoading] = useState(true);

  // Load user profile
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
      
      if (data) {
        setProfile({
          ruolo_attuale: data.ruolo_attuale,
          ruolo_target: data.ruolo_target,
          esperienza_anni: data.esperienza_anni,
          competenze: Array.isArray(data.competenze) ? data.competenze as string[] : null,
          settore_interesse: data.settore_interesse,
          profile_type: data.profile_type,
        });
        setProfileContext({
          ruolo_attuale: data.ruolo_attuale,
          ruolo_target: data.ruolo_target,
          esperienza_anni: data.esperienza_anni,
          competenze: data.competenze,
          settore_interesse: data.settore_interesse,
        });
      }

      // Load saved AI analyses with structured data
      const { data: analyses } = await supabase
        .from("section_inputs")
        .select("section_key, ai_analysis, structured_data")
        .eq("user_id", user.id)
        .in("section_key", ["privati_career", "privati_skills", "privati_roles"]);

      if (analyses) {
        const analysisMap: Record<string, string> = {};
        const predictionsMap: Record<string, ParsedPrediction> = {};
        analyses.forEach((a) => {
          if (a.ai_analysis) analysisMap[a.section_key] = a.ai_analysis;
          if (a.structured_data && typeof a.structured_data === 'object') {
            predictionsMap[a.section_key] = a.structured_data as ParsedPrediction;
          }
        });
        setAiAnalysis(analysisMap);
        setParsedPredictions(predictionsMap);
      }

      setLoading(false);
    };
    
    loadProfile();
  }, [user]);

  const hasProfileData = profile && (profile.ruolo_attuale || profile.ruolo_target || profile.competenze?.length);
  const isPrivatoProfile = profile?.profile_type === "privato";

  const getExperienceLabel = (years: number | null) => {
    if (!years) return null;
    if (years <= 2) return "Entry level";
    if (years <= 5) return "Junior";
    if (years <= 10) return "Mid-level";
    return "Senior";
  };

  return (
    <main className="min-h-screen bg-gradient-hero flex flex-col">
      <ConditionalNavbar />

      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <User className="w-4 h-4 text-accent" />
              <span className="text-sm text-accent font-medium">Dashboard Privati</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Il tuo career coach predittivo
            </h1>
            <p className="text-muted-foreground mt-2">
              Scopri il tuo futuro professionale e preparati con una roadmap personalizzata
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/profile">
              <Button variant="outline" className="gap-2">
                <FileText className="w-4 h-4" />
                Modifica Profilo
              </Button>
            </Link>
            {user && (
              <ReportGenerator 
                profileType="privato" 
                sectionKeys={["privati_career", "privati_skills", "privati_roles"]}
                title="Genera Report"
              />
            )}
            {!user && (
              <Link to="/auth">
                <Button className="gap-2 bg-accent hover:bg-accent/90">
                  Inizia Ora
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Profile warning if not "privato" type */}
        {user && profile && !isPrivatoProfile && (
          <div className="mb-8 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="text-yellow-500 font-medium">Profilo non configurato come "Privato"</p>
              <p className="text-sm text-muted-foreground mt-1">
                Per vedere i tuoi dati qui, vai in <Link to="/profile" className="text-accent underline">Profilo</Link> e seleziona "Privato" come tipo di profilo.
              </p>
            </div>
          </div>
        )}

        {/* No data warning */}
        {user && isPrivatoProfile && !hasProfileData && !loading && (
          <div className="mb-8 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-blue-500 font-medium">Profilo incompleto</p>
              <p className="text-sm text-muted-foreground mt-1">
                Compila il tuo <Link to="/profile" className="text-accent underline">profilo professionale</Link> per vedere le analisi personalizzate.
              </p>
            </div>
          </div>
        )}

        {/* SEZIONE INPUT: Obiettivi di Carriera */}
        {user && (
          <div className="mb-8">
            <SectionInput
              sectionKey="privati_career"
              title="I tuoi obiettivi di carriera"
              description="Inserisci le tue aspirazioni, obiettivi e note sulla tua carriera"
              placeholder="Es: Voglio diventare senior developer in 2 anni, migliorare le mie competenze in cloud computing..."
              profileType="privato"
              profileContext={profileContext}
              onAnalysisComplete={(analysis, parsed) => {
                setAiAnalysis(prev => ({ ...prev, privati_career: analysis }));
                if (parsed) setParsedPredictions(prev => ({ ...prev, privati_career: parsed }));
              }}
            />
          </div>
        )}

        {/* SEZIONE A: Riepilogo Carriera - DAI DATI PROFILO */}
        <DashboardCard 
          icon={Target}
          title="La Tua Carriera Futura"
          subtitle="Basato sui dati del tuo profilo"
          className="mb-8"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-6 h-6 text-accent" />
                <span className="text-sm text-muted-foreground">Ruolo Target</span>
              </div>
              {profile?.ruolo_target ? (
                <h3 className="font-display text-2xl font-bold text-foreground">
                  {profile.ruolo_target}
                </h3>
              ) : (
                <h3 className="font-display text-xl text-muted-foreground italic">
                  Non definito nel profilo
                </h3>
              )}
              <div className="flex items-center gap-2 mt-3 text-accent">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {profile?.ruolo_attuale ? `Da: ${profile.ruolo_attuale}` : "Ruolo attuale non specificato"}
                </span>
              </div>
            </div>

            <div className="bg-secondary/30 rounded-xl p-6">
              <h4 className="font-semibold text-foreground mb-3">Situazione Attuale</h4>
              {profile?.esperienza_anni ? (
                <div className="space-y-2">
                  <p className="text-foreground">
                    <span className="text-muted-foreground">Esperienza:</span> {getExperienceLabel(profile.esperienza_anni)} ({profile.esperienza_anni} anni)
                  </p>
                  {profile.settore_interesse && (
                    <p className="text-foreground">
                      <span className="text-muted-foreground">Settore:</span> {profile.settore_interesse}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground italic">
                  Compila il profilo per vedere la tua situazione.
                </p>
              )}
            </div>
          </div>

          {/* AI Analysis for career */}
          {aiAnalysis.privati_career && (
            <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Analisi AI - Carriera</span>
              </div>
              <div className="text-sm text-foreground whitespace-pre-wrap" dangerouslySetInnerHTML={{ 
                __html: aiAnalysis.privati_career.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') 
              }} />
            </div>
          )}
        </DashboardCard>

        {/* SEZIONE B: Competenze dal profilo */}
        <DashboardCard 
          icon={Target}
          title="Le Tue Competenze"
          subtitle="Competenze dichiarate nel profilo"
          className="mb-8"
        >
          {profile?.competenze && profile.competenze.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.competenze.map((skill, index) => (
                <span key={index} className="px-3 py-2 rounded-lg bg-accent/10 text-accent border border-accent/20 text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <div className="bg-secondary/30 rounded-xl p-8 text-center">
              <Target className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">
                Aggiungi le tue competenze nel <Link to="/profile" className="text-accent underline">profilo</Link>.
              </p>
            </div>
          )}
        </DashboardCard>

        {/* SEZIONE INPUT: Competenze e Skill */}
        {user && (
          <div className="mb-8">
            <SectionInput
              sectionKey="privati_skills"
              title="Analisi skill e gap"
              description="Descrivi le tue skill attuali e quelle che vuoi sviluppare"
              placeholder="Es: Ho 5 anni in React, devo migliorare in DevOps. Soft skill: comunicazione OK, leadership da sviluppare..."
              profileType="privato"
              profileContext={profileContext}
              onAnalysisComplete={(analysis, parsed) => {
                setAiAnalysis(prev => ({ ...prev, privati_skills: analysis }));
                if (parsed) setParsedPredictions(prev => ({ ...prev, privati_skills: parsed }));
              }}
            />
          </div>
        )}

        {/* SEZIONE C: Gap Analysis da AI */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-accent" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              Gap Analysis
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-green-500/5 border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-500">
                  <CheckCircle className="w-5 h-5" />
                  Punti di Forza
                </CardTitle>
              </CardHeader>
              <CardContent>
                {parsedPredictions.privati_skills?.opportunities && parsedPredictions.privati_skills.opportunities.length > 0 ? (
                  <ul className="space-y-3">
                    {parsedPredictions.privati_skills.opportunities.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : profile?.competenze && profile.competenze.length > 0 ? (
                  <ul className="space-y-3">
                    {profile.competenze.slice(0, 5).map((skill, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-foreground">{skill}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground italic">
                    Aggiungi competenze o genera un'analisi AI.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-accent/5 border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                  <Target className="w-5 h-5" />
                  Aree da Sviluppare
                </CardTitle>
              </CardHeader>
              <CardContent>
                {parsedPredictions.privati_skills?.risks && parsedPredictions.privati_skills.risks.length > 0 ? (
                  <ul className="space-y-3">
                    {parsedPredictions.privati_skills.risks.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground italic">
                    Usa "Analisi skill e gap" per identificare le aree di miglioramento.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* AI Analysis for skills */}
          {aiAnalysis.privati_skills && (
            <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Analisi AI - Competenze</span>
              </div>
              <div className="text-sm text-foreground whitespace-pre-wrap" dangerouslySetInnerHTML={{ 
                __html: aiAnalysis.privati_skills.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') 
              }} />
            </div>
          )}
        </div>

        {/* SEZIONE INPUT: Formazione */}
        {user && (
          <div className="mb-8">
            <SectionInput
              sectionKey="privati_roles"
              title="Obiettivi formativi e roadmap"
              description="Corsi, certificazioni, skill che vuoi acquisire"
              placeholder="Es: Voglio ottenere AWS certification, fare un corso ML, migliorare l'inglese tecnico..."
              profileType="privato"
              profileContext={profileContext}
              onAnalysisComplete={(analysis, parsed) => {
                setAiAnalysis(prev => ({ ...prev, privati_roles: analysis }));
                if (parsed) setParsedPredictions(prev => ({ ...prev, privati_roles: parsed }));
              }}
            />
          </div>
        )}

        {/* SEZIONE D: Roadmap Formativa */}
        <DashboardCard 
          id="roadmap-section"
          icon={GraduationCap}
          title="Roadmap Formativa"
          subtitle="Percorso personalizzato basato sull'analisi AI"
          className="mb-8"
        >
          {parsedPredictions.privati_roles?.recommendations && parsedPredictions.privati_roles.recommendations.length > 0 ? (
            <div className="space-y-4">
              {/* Summary */}
              {parsedPredictions.privati_roles.summary && (
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-foreground">{parsedPredictions.privati_roles.summary}</p>
                </div>
              )}
              
              {/* Recommended actions */}
              <div className="grid md:grid-cols-2 gap-4">
                {parsedPredictions.privati_roles.recommendations.map((rec, index) => (
                  <div key={index} className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-accent font-bold text-sm">{index + 1}</span>
                      </div>
                      <p className="text-foreground text-sm">{rec}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline and priority */}
              {(parsedPredictions.privati_roles.timeline || parsedPredictions.privati_roles.priority) && (
                <div className="flex gap-4 flex-wrap">
                  {parsedPredictions.privati_roles.timeline && (
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">
                      Timeline: {parsedPredictions.privati_roles.timeline}
                    </span>
                  )}
                  {parsedPredictions.privati_roles.priority && (
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      parsedPredictions.privati_roles.priority === 'alta' ? 'bg-red-500/10 text-red-500' :
                      parsedPredictions.privati_roles.priority === 'media' ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-green-500/10 text-green-500'
                    }`}>
                      Priorità: {parsedPredictions.privati_roles.priority}
                    </span>
                  )}
                </div>
              )}
            </div>
          ) : aiAnalysis.privati_roles ? (
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Roadmap suggerita dall'AI</span>
              </div>
              <div className="text-sm text-foreground whitespace-pre-wrap" dangerouslySetInnerHTML={{ 
                __html: aiAnalysis.privati_roles.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') 
              }} />
            </div>
          ) : (
            <div className="bg-secondary/30 rounded-xl p-8 text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">
                Usa la sezione "Obiettivi formativi" sopra per generare la tua roadmap personalizzata.
              </p>
            </div>
          )}
        </DashboardCard>

        {/* SEZIONE E: Simulazioni "What If" */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-6 h-6 text-accent" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              Simulazioni: "Cosa Succede Se..."
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-card border-border/50 hover:border-accent/30 transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-display font-semibold text-foreground mb-2">
                  Se cambio settore?
                </h4>
                <p className="text-sm text-muted-foreground">
                  {profile?.settore_interesse 
                    ? `Attualmente punti a: ${profile.settore_interesse}. Usa l'analisi AI per esplorare alternative.`
                    : "Definisci un settore nel profilo per esplorare alternative."}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 hover:border-accent/30 transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Languages className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-display font-semibold text-foreground mb-2">
                  Se miglioro l'inglese?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Includi "migliorare l'inglese" nei tuoi obiettivi formativi per un'analisi specifica.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 hover:border-accent/30 transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-display font-semibold text-foreground mb-2">
                  Se imparo una nuova skill?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Descrivi la skill che vuoi imparare nella sezione "Analisi skill" per valutare l'impatto.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <MainFooter />
    </main>
  );
};

export default Privati;
