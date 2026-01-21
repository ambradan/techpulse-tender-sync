import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import MainFooter from "@/components/MainFooter";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import { ScoreGauge } from "@/components/dashboard/shared/ScoreGauge";
import { TrendChart } from "@/components/dashboard/shared/TrendChart";
import { DriversList } from "@/components/dashboard/shared/DriversList";
import { ActionCard } from "@/components/dashboard/shared/ActionCard";
import { ScenarioTabs } from "@/components/dashboard/shared/ScenarioTabs";
import { CompanyPrediction } from "@/types/predictions";
import { useAuth } from "@/hooks/useAuth";
import { 
  ArrowRight, 
  Building2,
  Gauge,
  LineChart,
  AlertTriangle,
  Lightbulb,
  Layers,
  UserPlus,
  GraduationCap,
  FileCheck,
  Bot,
  Handshake,
  GitBranch,
  Calendar
} from "lucide-react";

const Aziende = () => {
  const { user } = useAuth();
  // State for API data - will be populated by external API calls
  const [companyPrediction] = useState<CompanyPrediction | null>(null);

  return (
    <main className="min-h-screen bg-gradient-hero flex flex-col">
      <ConditionalNavbar />

      {/* Hero Dashboard Header */}
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
              Previsioni, rischi e azioni su 12–36–60 mesi
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2" asChild>
              <a href="mailto:ambradan91@gmail.com?subject=Richiesta Demo Aziende">
                <Calendar className="w-4 h-4" />
                Prenota Demo
              </a>
            </Button>
            {!user && (
              <Link to="/auth">
                <Button className="gap-2">
                  Inizia Ora
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            )}
            {user && (
              <Link to="/dashboard">
                <Button className="gap-2">
                  Vai alla Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* SEZIONE A: Riepilogo - TechPulse Index */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <DashboardCard 
            icon={Gauge} 
            title="TechPulse Index"
            subtitle="Indice composito della tua azienda"
            className="lg:col-span-1"
          >
            <div className="flex justify-center py-4">
              <ScoreGauge 
                score={companyPrediction?.overall_score ?? 0}
                label={companyPrediction?.label}
                size="lg"
              />
            </div>
          </DashboardCard>

          <DashboardCard 
            title="Sintesi Strategica"
            subtitle="Analisi AI del contesto aziendale"
            className="lg:col-span-2"
          >
            <div className="bg-secondary/30 rounded-xl p-6 min-h-[180px] flex items-center">
              {companyPrediction?.commentary?.summary ? (
                <p className="text-foreground leading-relaxed">
                  {companyPrediction.commentary.summary}
                </p>
              ) : (
                <div className="text-center w-full">
                  <Lightbulb className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    La sintesi strategica apparirà qui quando i dati predittivi saranno disponibili.
                  </p>
                </div>
              )}
            </div>
          </DashboardCard>
        </div>

        {/* SEZIONE B: Grafico Trend */}
        <DashboardCard 
          icon={LineChart}
          title="Trend Predittivo 12-36-60 Mesi"
          subtitle="Andamento dell'indice TechPulse nel tempo"
          className="mb-8"
        >
          <TrendChart 
            data={companyPrediction?.trend ?? []}
            height={350}
          />
        </DashboardCard>

        {/* SEZIONE C: Rischi e Driver */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-primary" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              Driver e Rischi
            </h2>
          </div>
          <DriversList 
            positive={companyPrediction?.commentary?.drivers_positive ?? []}
            negative={companyPrediction?.commentary?.drivers_negative ?? []}
          />
        </div>

        {/* SEZIONE D: Azioni Consigliate */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-6 h-6 text-primary" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              Azioni Consigliate
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ActionCard 
              icon={UserPlus}
              title="Hiring"
              description={companyPrediction?.actions?.hiring}
              priority="alta"
            />
            <ActionCard 
              icon={GraduationCap}
              title="Formazione"
              description={companyPrediction?.actions?.training}
              priority="alta"
            />
            <ActionCard 
              icon={FileCheck}
              title="Compliance"
              description={companyPrediction?.actions?.compliance}
              priority="media"
            />
            <ActionCard 
              icon={Bot}
              title="Automazione"
              description={companyPrediction?.actions?.automation}
              priority="media"
            />
            <ActionCard 
              icon={Handshake}
              title="Partnership"
              description={companyPrediction?.actions?.partnerships}
              priority="media"
            />
            <ActionCard 
              icon={GitBranch}
              title="Diversificazione"
              description={companyPrediction?.actions?.diversification}
              priority="bassa"
            />
          </div>
        </div>

        {/* SEZIONE E: Scenari */}
        <DashboardCard 
          icon={Layers}
          title="Scenari Predittivi"
          subtitle="Esplora i possibili futuri della tua azienda"
          className="mb-8"
        >
          <ScenarioTabs 
            scenarios={{
              optimistic: companyPrediction?.scenarios?.optimistic,
              base: companyPrediction?.scenarios?.base,
              pessimistic: companyPrediction?.scenarios?.pessimistic,
            }}
          />
        </DashboardCard>
      </section>

      <MainFooter />
    </main>
  );
};

export default Aziende;
