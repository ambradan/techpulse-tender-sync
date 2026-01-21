import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import ConditionalNavbar from "@/components/ConditionalNavbar";
import MainFooter from "@/components/MainFooter";
import { DashboardCard } from "@/components/dashboard/shared/DashboardCard";
import { FreelancePrediction } from "@/types/predictions";
import { useAuth } from "@/hooks/useAuth";
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
  Sparkles
} from "lucide-react";

const Freelance = () => {
  const { user } = useAuth();
  // State for API data - will be populated by external API calls
  const [freelancePrediction] = useState<FreelancePrediction | null>(null);

  // Transform demand trend data for chart
  const chartData = freelancePrediction?.demand_trend?.reduce((acc, item) => {
    const existing = acc.find(d => d.month === item.month);
    if (existing) {
      existing[item.service_name] = item.demand_index;
    } else {
      acc.push({ month: item.month, [item.service_name]: item.demand_index });
    }
    return acc;
  }, [] as Array<Record<string, string | number>>) ?? [];

  const serviceNames = [...new Set(freelancePrediction?.demand_trend?.map(d => d.service_name) ?? [])];
  const colors = ['hsl(var(--primary))', 'hsl(var(--accent))', '#22c55e', '#eab308'];

  return (
    <main className="min-h-screen bg-gradient-hero flex flex-col">
      <ConditionalNavbar />

      {/* Hero Dashboard Header */}
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
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => document.getElementById('lead-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Users className="w-4 h-4" />
              Scopri i Lead
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

        {/* SEZIONE A: Riepilogo Posizionamento */}
        <DashboardCard 
          icon={Target}
          title="Il Tuo Posizionamento"
          subtitle="Strategia consigliata per il tuo business"
          className="mb-8"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3 text-primary">
                <Target className="w-5 h-5" />
                <span className="text-sm font-medium">Nicchia Consigliata</span>
              </div>
              {freelancePrediction?.positioning?.niche ? (
                <h3 className="font-display text-xl font-bold text-foreground">
                  {freelancePrediction.positioning.niche}
                </h3>
              ) : (
                <p className="text-muted-foreground italic">
                  In attesa dei dati...
                </p>
              )}
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3 text-accent">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium">Proposta di Valore</span>
              </div>
              {freelancePrediction?.positioning?.value_prop ? (
                <p className="text-foreground font-medium">
                  "{freelancePrediction.positioning.value_prop}"
                </p>
              ) : (
                <p className="text-muted-foreground italic">
                  In attesa dei dati...
                </p>
              )}
            </div>

            <div className="bg-secondary/50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3 text-foreground">
                <MessageSquare className="w-5 h-5" />
                <span className="text-sm font-medium">Sintesi</span>
              </div>
              {freelancePrediction?.commentary?.summary ? (
                <p className="text-sm text-foreground">
                  {freelancePrediction.commentary.summary}
                </p>
              ) : (
                <p className="text-muted-foreground italic text-sm">
                  La sintesi del tuo posizionamento apparirà qui...
                </p>
              )}
            </div>
          </div>
        </DashboardCard>

        {/* SEZIONE B: Domanda Futura per Servizi */}
        <DashboardCard 
          icon={TrendingUp}
          title="Domanda Futura per Servizi"
          subtitle="Trend di domanda previsto per i prossimi mesi"
          className="mb-8"
        >
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                {serviceNames.map((service, index) => (
                  <Bar 
                    key={service} 
                    dataKey={service} 
                    fill={colors[index % colors.length]} 
                    radius={[4, 4, 0, 0]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="bg-secondary/30 rounded-xl p-12 text-center">
              <TrendingUp className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">
                Il grafico della domanda apparirà qui quando i dati predittivi saranno disponibili.
              </p>
            </div>
          )}
        </DashboardCard>

        {/* SEZIONE C: Settori con Più Budget */}
        <DashboardCard 
          icon={Globe}
          title="Settori con Più Budget"
          subtitle="Dove investire il tuo tempo per massimizzare i guadagni"
          className="mb-8"
        >
          {freelancePrediction?.sectors && freelancePrediction.sectors.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {freelancePrediction.sectors.map((sector, index) => (
                <Card key={index} className="bg-secondary/30 border-border/50">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-foreground">{sector.sector_name}</h4>
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        sector.budget_level === 'Alto' ? 'bg-green-500/10 text-green-500' :
                        sector.budget_level === 'Medio' ? 'bg-yellow-500/10 text-yellow-500' :
                        'bg-red-500/10 text-red-500'
                      }`}>
                        Budget {sector.budget_level}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{sector.opportunity_note}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-secondary/30 rounded-xl p-8 text-center">
              <Building2 className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">
                I settori con più budget appariranno qui quando i dati predittivi saranno disponibili.
              </p>
            </div>
          )}
        </DashboardCard>

        {/* SEZIONE D: Pricing Suggerito */}
        <DashboardCard 
          icon={DollarSign}
          title="Pricing Suggerito"
          subtitle="Tariffe ottimali per i tuoi servizi"
          className="mb-8"
        >
          {freelancePrediction?.pricing && freelancePrediction.pricing.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Servizio</TableHead>
                    <TableHead>Prezzo Suggerito</TableHead>
                    <TableHead>Modello Pricing</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {freelancePrediction.pricing.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.service_name}</TableCell>
                      <TableCell className="text-primary font-bold">
                        €{item.suggested_price.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <span className="text-xs bg-secondary px-2 py-1 rounded capitalize">
                          {item.pricing_model === 'hourly' ? 'Orario' :
                           item.pricing_model === 'retainer' ? 'Retainer' : 'Progetto'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="bg-secondary/30 rounded-xl p-8 text-center">
              <DollarSign className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">
                Le tariffe suggerite appariranno qui quando i dati predittivi saranno disponibili.
              </p>
            </div>
          )}
        </DashboardCard>

        {/* SEZIONE E: Lead & Outreach */}
        <DashboardCard 
          id="lead-section"
          icon={Send}
          title="Lead & Outreach"
          subtitle="Aziende target e strategia di contatto"
          className="mb-8"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Target Companies */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Building2 className="w-5 h-5 text-primary" />
                  Tipi di Aziende Target
                </CardTitle>
              </CardHeader>
              <CardContent>
                {freelancePrediction?.leads?.target_companies && 
                 freelancePrediction.leads.target_companies.length > 0 ? (
                  <ul className="space-y-2">
                    {freelancePrediction.leads.target_companies.map((company, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-foreground">{company}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground italic">
                    Le aziende target appariranno qui...
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Target Roles */}
            <Card className="bg-accent/5 border-accent/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-accent" />
                  Ruoli con cui Parlare
                </CardTitle>
              </CardHeader>
              <CardContent>
                {freelancePrediction?.leads?.target_roles && 
                 freelancePrediction.leads.target_roles.length > 0 ? (
                  <ul className="space-y-2">
                    {freelancePrediction.leads.target_roles.map((role, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        <span className="text-foreground">{role}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground italic">
                    I ruoli target appariranno qui...
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sample Message */}
          <Card className="bg-secondary/30 border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageSquare className="w-5 h-5 text-primary" />
                Messaggio Consigliato
              </CardTitle>
            </CardHeader>
            <CardContent>
              {freelancePrediction?.leads?.sample_message ? (
                <div className="bg-background/50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap">
                  {freelancePrediction.leads.sample_message}
                </div>
              ) : (
                <div className="bg-background/50 rounded-lg p-6 text-center">
                  <Send className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                  <p className="text-muted-foreground italic">
                    Il messaggio di outreach consigliato apparirà qui quando i dati saranno disponibili.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </DashboardCard>
      </section>

      <MainFooter />
    </main>
  );
};

export default Freelance;
