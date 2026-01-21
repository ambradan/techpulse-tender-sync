import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import MainFooter from "@/components/MainFooter";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import { SectionInput, type ParsedPrediction } from "@/components/dashboard/SectionInput";
import { ReportGenerator } from "@/components/dashboard/ReportGenerator";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/backend/client";
import { 
  ArrowRight, 
  Briefcase,
  Target,
  TrendingUp,
  DollarSign,
  Users,
  Building2,
  MessageSquare,
  Send,
  Globe,
  Sparkles,
  FileText,
  AlertTriangle,
  AlertCircle,
  Lightbulb
} from "lucide-react";

interface FreelanceProfile {
  ruolo_attuale: string | null;
  competenze: string[] | null;
  servizi_offerti: string[] | null;
  nicchia: string | null;
  anni_freelance: number | null;
  clienti_tipo: string[] | null;
  tariffa_oraria: number | null;
  settore_interesse: string | null;
  profile_type: string | null;
}

const Freelance = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<FreelanceProfile | null>(null);
  const [profileContext, setProfileContext] = useState<Record<string, unknown>>({});
  const [aiAnalysis, setAiAnalysis] = useState<Record<string, string>>({});
  const [parsedPredictions, setParsedPredictions] = useState<Record<string, ParsedPrediction>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      const { data } = await supabase
        .from("profiles")
        .select("ruolo_attuale, competenze, servizi_offerti, nicchia, anni_freelance, clienti_tipo, tariffa_oraria, settore_interesse, profile_type")
        .eq("id", user.id)
        .maybeSingle();
      
      if (data) {
        setProfile({
          ruolo_attuale: data.ruolo_attuale,
          competenze: Array.isArray(data.competenze) ? data.competenze as string[] : null,
          servizi_offerti: Array.isArray(data.servizi_offerti) ? data.servizi_offerti as string[] : null,
          nicchia: data.nicchia,
          anni_freelance: data.anni_freelance,
          clienti_tipo: Array.isArray(data.clienti_tipo) ? data.clienti_tipo as string[] : null,
          tariffa_oraria: data.tariffa_oraria,
          settore_interesse: data.settore_interesse,
          profile_type: data.profile_type,
        });
        setProfileContext(data as unknown as Record<string, unknown>);
      }

      // Load saved AI analyses with structured data
      const { data: analyses } = await supabase
        .from("section_inputs")
        .select("section_key, ai_analysis, structured_data")
        .eq("user_id", user.id)
        .in("section_key", ["freelance_positioning", "freelance_pricing", "freelance_leads"]);

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

  const hasProfileData = profile && (profile.servizi_offerti?.length || profile.nicchia || profile.competenze?.length);
  const isFreelanceProfile = profile?.profile_type === "freelance";

  return (
    <main className="min-h-screen bg-gradient-hero flex flex-col">
      <ConditionalNavbar />

      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Dashboard Freelance</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Il tuo business advisor predittivo
            </h1>
            <p className="text-muted-foreground mt-2">
              Scopri dove andrà la domanda, quali clienti avranno budget e come posizionarti
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
                profileType="freelance" 
                sectionKeys={["freelance_positioning", "freelance_pricing", "freelance_leads"]}
                title="Genera Report"
              />
            )}
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
        {user && profile && !isFreelanceProfile && (
          <div className="mb-8 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="text-yellow-500 font-medium">Profilo non configurato come "Freelance"</p>
              <p className="text-sm text-muted-foreground mt-1">
                Vai in <Link to="/profile" className="text-primary underline">Profilo</Link> e seleziona "Freelance" per vedere i tuoi dati.
              </p>
            </div>
          </div>
        )}

        {/* No data warning */}
        {user && isFreelanceProfile && !hasProfileData && !loading && (
          <div className="mb-8 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-blue-500 font-medium">Profilo freelance incompleto</p>
              <p className="text-sm text-muted-foreground mt-1">
                Compila i <Link to="/profile" className="text-primary underline">dati freelance</Link> per vedere le analisi.
              </p>
            </div>
          </div>
        )}

        {/* INPUT: note per analisi AI */}
        {user && (
          <div className="mb-8 space-y-4">
            <SectionInput
              sectionKey="freelance_positioning"
              title="Note su posizionamento"
              description="Aggiungi dettagli su nicchia, differenziazione e offerta."
              profileType="freelance"
              profileContext={profileContext}
              onAnalysisComplete={(analysis, parsed) => {
                setAiAnalysis(prev => ({ ...prev, freelance_positioning: analysis }));
                if (parsed) setParsedPredictions(prev => ({ ...prev, freelance_positioning: parsed }));
              }}
            />
            <SectionInput
              sectionKey="freelance_pricing"
              title="Note su pricing"
              description="Scrivi vincoli, obiettivi e modello prezzi."
              profileType="freelance"
              profileContext={profileContext}
              onAnalysisComplete={(analysis, parsed) => {
                setAiAnalysis(prev => ({ ...prev, freelance_pricing: analysis }));
                if (parsed) setParsedPredictions(prev => ({ ...prev, freelance_pricing: parsed }));
              }}
            />
            <SectionInput
              sectionKey="freelance_leads"
              title="Note su lead e outreach"
              description="Aggiungi target, canali e messaggi."
              profileType="freelance"
              profileContext={profileContext}
              onAnalysisComplete={(analysis, parsed) => {
                setAiAnalysis(prev => ({ ...prev, freelance_leads: analysis }));
                if (parsed) setParsedPredictions(prev => ({ ...prev, freelance_leads: parsed }));
              }}
            />
          </div>
        )}

        {/* SEZIONE A: Riepilogo Posizionamento - DAI DATI PROFILO */}
        <DashboardCard 
          icon={Target}
          title="Il Tuo Posizionamento"
          subtitle="Basato sui dati del tuo profilo"
          className="mb-8"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3 text-primary">
                <Target className="w-5 h-5" />
                <span className="text-sm font-medium">Nicchia</span>
              </div>
              {profile?.nicchia ? (
                <h3 className="font-display text-xl font-bold text-foreground">
                  {profile.nicchia}
                </h3>
              ) : (
                <p className="text-muted-foreground italic">
                  Non definita nel profilo
                </p>
              )}
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3 text-accent">
                <DollarSign className="w-5 h-5" />
                <span className="text-sm font-medium">Tariffa Oraria</span>
              </div>
              {profile?.tariffa_oraria ? (
                <p className="font-display text-xl font-bold text-foreground">
                  €{profile.tariffa_oraria}/ora
                </p>
              ) : (
                <p className="text-muted-foreground italic">
                  Non specificata
                </p>
              )}
            </div>

            <div className="bg-secondary/50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3 text-foreground">
                <MessageSquare className="w-5 h-5" />
                <span className="text-sm font-medium">Esperienza</span>
              </div>
              {profile?.anni_freelance ? (
                <p className="text-foreground">
                  <span className="font-bold">{profile.anni_freelance}</span> anni da freelance
                </p>
              ) : (
                <p className="text-muted-foreground italic">
                  Non specificata
                </p>
              )}
            </div>
          </div>

          {/* AI Analysis - Positioning */}
          {aiAnalysis.freelance_positioning && (
            <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Analisi AI - Posizionamento</span>
              </div>
              <div className="text-sm text-foreground whitespace-pre-wrap" dangerouslySetInnerHTML={{ 
                __html: aiAnalysis.freelance_positioning.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') 
              }} />
            </div>
          )}
        </DashboardCard>

        {/* SEZIONE B: Servizi Offerti */}
        <DashboardCard 
          icon={Sparkles}
          title="Servizi Offerti"
          subtitle="I tuoi servizi dal profilo"
          className="mb-8"
        >
          {profile?.servizi_offerti && profile.servizi_offerti.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.servizi_offerti.map((service, index) => (
                <span key={index} className="px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 font-medium">
                  {service}
                </span>
              ))}
            </div>
          ) : (
            <div className="bg-secondary/30 rounded-xl p-8 text-center">
              <Sparkles className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">
                Aggiungi i tuoi servizi nel <Link to="/profile" className="text-primary underline">profilo</Link>.
              </p>
            </div>
          )}

          {/* AI Analysis - Pricing */}
          {aiAnalysis.freelance_pricing && (
            <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Analisi AI - Pricing</span>
              </div>
              <div className="text-sm text-foreground whitespace-pre-wrap" dangerouslySetInnerHTML={{ 
                __html: aiAnalysis.freelance_pricing.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') 
              }} />
            </div>
          )}
        </DashboardCard>

        {/* SEZIONE C: Competenze */}
        <DashboardCard 
          icon={Globe}
          title="Le Tue Competenze"
          subtitle="Skill dal profilo"
          className="mb-8"
        >
          {profile?.competenze && profile.competenze.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.competenze.map((skill, index) => (
                <span key={index} className="px-3 py-2 rounded-lg bg-accent/10 text-accent border border-accent/20 text-sm">
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <div className="bg-secondary/30 rounded-xl p-8 text-center">
              <Globe className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">
                Aggiungi le tue competenze nel <Link to="/profile" className="text-primary underline">profilo</Link>.
              </p>
            </div>
          )}
        </DashboardCard>

        {/* SEZIONE D: Target Clienti */}
        <DashboardCard 
          id="lead-section"
          icon={Send}
          title="Target Clienti & Outreach"
          subtitle="Strategia di contatto basata sul tuo profilo"
          className="mb-8"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Building2 className="w-5 h-5 text-primary" />
                  Tipi di Clienti Target
                </CardTitle>
              </CardHeader>
              <CardContent>
                {profile?.clienti_tipo && profile.clienti_tipo.length > 0 ? (
                  <ul className="space-y-2">
                    {profile.clienti_tipo.map((client, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-foreground">{client}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground italic">
                    Aggiungi i tipi di clienti nel <Link to="/profile" className="text-primary underline">profilo</Link>.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-accent/5 border-accent/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-accent" />
                  Settore di Focus
                </CardTitle>
              </CardHeader>
              <CardContent>
                {profile?.settore_interesse ? (
                  <p className="text-foreground font-medium">{profile.settore_interesse}</p>
                ) : (
                  <p className="text-muted-foreground italic">
                    Definisci il settore nel profilo.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* AI Analysis - Leads */}
          {aiAnalysis.freelance_leads && (
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Analisi AI - Lead & Outreach</span>
              </div>
              <div className="text-sm text-foreground whitespace-pre-wrap" dangerouslySetInnerHTML={{ 
                __html: aiAnalysis.freelance_leads.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') 
              }} />
            </div>
          )}
        </DashboardCard>
      </section>

      <MainFooter />
    </main>
  );
};

export default Freelance;
