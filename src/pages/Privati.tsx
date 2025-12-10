import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import { PrivatePrediction } from "@/types/predictions";
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
  FileText
} from "lucide-react";

const Privati = () => {
  // State for API data - will be populated by external API calls
  const [privatePrediction] = useState<PrivatePrediction | null>(null);

  return (
    <main className="min-h-screen bg-gradient-hero flex flex-col">
      <MainNavbar />

      {/* Hero Dashboard Header */}
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
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => document.getElementById('roadmap-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <FileText className="w-4 h-4" />
              Esempio Roadmap
            </Button>
            <Link to="/auth">
              <Button className="gap-2 bg-accent hover:bg-accent/90">
                Inizia Ora
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* SEZIONE A: Riepilogo Carriera Futura */}
        <DashboardCard 
          icon={Target}
          title="La Tua Carriera Futura"
          subtitle="Ruolo target e orizzonte temporale"
          className="mb-8"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-6 h-6 text-accent" />
                <span className="text-sm text-muted-foreground">Ruolo Target Principale</span>
              </div>
              {privatePrediction?.main_role ? (
                <h3 className="font-display text-2xl font-bold text-foreground">
                  {privatePrediction.main_role}
                </h3>
              ) : (
                <h3 className="font-display text-xl text-muted-foreground italic">
                  In attesa dei dati predittivi...
                </h3>
              )}
              <div className="flex items-center gap-2 mt-3 text-accent">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {privatePrediction?.horizon ?? "Orizzonte temporale da calcolare"}
                </span>
              </div>
            </div>

            <div className="bg-secondary/30 rounded-xl p-6">
              <h4 className="font-semibold text-foreground mb-3">Sintesi Predittiva</h4>
              {privatePrediction?.commentary?.summary ? (
                <p className="text-foreground leading-relaxed">
                  {privatePrediction.commentary.summary}
                </p>
              ) : (
                <p className="text-muted-foreground italic">
                  La sintesi della tua carriera futura apparirà qui quando i dati saranno disponibili.
                </p>
              )}
            </div>
          </div>
        </DashboardCard>

        {/* SEZIONE B: Ruoli Probabili */}
        <DashboardCard 
          icon={Target}
          title="Ruoli Probabili"
          subtitle="I ruoli più compatibili con il tuo profilo"
          className="mb-8"
        >
          {privatePrediction?.roles && privatePrediction.roles.length > 0 ? (
            <div className="space-y-4">
              {privatePrediction.roles.map((role, index) => (
                <div key={index} className="bg-secondary/30 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-foreground">{role.title}</h4>
                    <span className="text-accent font-bold">{role.probability}% match</span>
                  </div>
                  <Progress value={role.probability} className="h-2 mb-2" />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Orizzonte: {role.time_horizon} mesi</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-secondary/30 rounded-xl p-8 text-center">
              <Target className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">
                I ruoli probabili verranno mostrati qui quando i dati predittivi saranno disponibili.
              </p>
            </div>
          )}
        </DashboardCard>

        {/* SEZIONE C: Gap Analysis */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-accent" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              Gap Analysis
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Punti di Forza */}
            <Card className="bg-green-500/5 border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-500">
                  <CheckCircle className="w-5 h-5" />
                  Punti di Forza
                </CardTitle>
              </CardHeader>
              <CardContent>
                {privatePrediction?.gap?.strengths && privatePrediction.gap.strengths.length > 0 ? (
                  <ul className="space-y-3">
                    {privatePrediction.gap.strengths.map((strength, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-foreground">{strength}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground italic">
                    I punti di forza appariranno qui...
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Competenze da Sviluppare */}
            <Card className="bg-accent/5 border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                  <Target className="w-5 h-5" />
                  Competenze da Sviluppare
                </CardTitle>
              </CardHeader>
              <CardContent>
                {privatePrediction?.gap?.missing_skills && privatePrediction.gap.missing_skills.length > 0 ? (
                  <ul className="space-y-3">
                    {privatePrediction.gap.missing_skills.map((skill, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        <span className="text-foreground">{skill}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground italic">
                    Le competenze da sviluppare appariranno qui...
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* SEZIONE D: Roadmap Formativa */}
        <DashboardCard 
          id="roadmap-section"
          icon={GraduationCap}
          title="Roadmap Formativa"
          subtitle="Il tuo percorso di apprendimento personalizzato"
          className="mb-8"
        >
          {privatePrediction?.learning_plan && privatePrediction.learning_plan.length > 0 ? (
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-accent/30 hidden md:block" />
              <div className="space-y-6">
                {privatePrediction.learning_plan.map((item, index) => (
                  <div key={index} className="relative flex gap-6">
                    <div className="hidden md:flex w-8 h-8 rounded-full bg-accent text-accent-foreground items-center justify-center z-10 flex-shrink-0">
                      {item.month}
                    </div>
                    <Card className="flex-1 bg-secondary/30 border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2 md:hidden">
                          <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                            Mese {item.month}
                          </span>
                        </div>
                        <h4 className="font-semibold text-foreground mb-2">{item.focus}</h4>
                        <div className="flex flex-wrap gap-2">
                          {item.suggested_resources.map((resource, i) => (
                            <span key={i} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                              {resource}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-secondary/30 rounded-xl p-8 text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">
                La roadmap formativa apparirà qui quando i dati predittivi saranno disponibili.
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
            {/* Cambio Settore */}
            <Card className="bg-gradient-card border-border/50 hover:border-accent/30 transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-display font-semibold text-foreground mb-2">
                  Se cambio settore?
                </h4>
                {privatePrediction?.what_if?.change_sector ? (
                  <p className="text-sm text-foreground">
                    {privatePrediction.what_if.change_sector}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    La simulazione apparirà qui quando i dati saranno disponibili.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Miglioro l'Inglese */}
            <Card className="bg-gradient-card border-border/50 hover:border-accent/30 transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Languages className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-display font-semibold text-foreground mb-2">
                  Se miglioro l'inglese?
                </h4>
                {privatePrediction?.what_if?.better_english ? (
                  <p className="text-sm text-foreground">
                    {privatePrediction.what_if.better_english}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    La simulazione apparirà qui quando i dati saranno disponibili.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Imparo una Nuova Skill */}
            <Card className="bg-gradient-card border-border/50 hover:border-accent/30 transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-display font-semibold text-foreground mb-2">
                  Se imparo una nuova skill?
                </h4>
                {privatePrediction?.what_if?.new_skill ? (
                  <p className="text-sm text-foreground">
                    {privatePrediction.what_if.new_skill}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    La simulazione apparirà qui quando i dati saranno disponibili.
                  </p>
                )}
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
