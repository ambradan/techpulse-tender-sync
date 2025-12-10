import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, ShieldAlert, ArrowRight, User } from "lucide-react";
import { useEffect } from "react";

const SimpleDashboard = () => {
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

  const dashboardCards = [
    {
      title: "Analisi Aziendale",
      description: "Panoramica completa del profilo e della struttura aziendale",
      icon: Building2,
      href: "/insights/company",
      color: "text-primary",
    },
    {
      title: "Hiring & Competenze",
      description: "Ruoli prioritari e competenze critiche per la crescita",
      icon: Users,
      href: "/insights/hiring",
      color: "text-emerald-400",
    },
    {
      title: "Rischi & Normative",
      description: "Valutazione rischi operativi e conformità normativa",
      icon: ShieldAlert,
      href: "/insights/risk",
      color: "text-amber-400",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/techpulse-logo.png" alt="TechPulse" className="h-8 w-auto" />
            <span className="text-xl font-semibold text-foreground">TechPulse</span>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/profile")}
              className="text-muted-foreground hover:text-foreground"
            >
              <User className="h-4 w-4 mr-2" />
              Profilo
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {company?.name ? `Benvenuto, ${company.name}` : "Benvenuto su TechPulse"}
          </h1>
          <p className="text-muted-foreground text-lg">
            {company ? "Esplora le tue dashboard personalizzate" : "Configura il tuo profilo aziendale per iniziare"}
          </p>
          
          {!company && (
            <Button 
              onClick={() => navigate("/profile")} 
              className="mt-6"
              size="lg"
            >
              Configura profilo aziendale
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Dashboard Cards */}
        {company && (
          <div className="grid md:grid-cols-3 gap-6">
            {dashboardCards.map((card) => (
              <Card 
                key={card.title}
                className="group cursor-pointer border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-300"
                onClick={() => navigate(card.href)}
              >
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <card.icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Apri dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Completeness Score */}
        {company && (
          <Card className="mt-8 border-border/50 bg-card/30">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Completezza profilo</p>
                  <p className="text-2xl font-bold text-foreground">
                    {company.completeness_score ?? 0}%
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/profile")}
                  className="border-border/50"
                >
                  Aggiorna profilo
                </Button>
              </div>
              <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${company.completeness_score ?? 0}%` }}
                />
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default SimpleDashboard;
