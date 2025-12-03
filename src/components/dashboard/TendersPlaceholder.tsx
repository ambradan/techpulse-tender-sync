import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FileText, Bell, Calendar, Euro, Target, Settings2, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Placeholder tender structure - ready for TenderMatch API
interface TenderSuggestion {
  id: string;
  title: string;
  category: string | null;
  deadline: string | null;
  value: number | null;
  compatibilityScore: number | null; // 0-100, null = non calcolato
  source: string;
  status: "pending" | "available" | "expired";
}

// Placeholder tenders - will be replaced by TenderMatch API
const placeholderTenders: TenderSuggestion[] = [
  {
    id: "placeholder-1",
    title: "Gara pending...",
    category: null,
    deadline: null,
    value: null,
    compatibilityScore: null,
    source: "TenderMatch API",
    status: "pending",
  },
  {
    id: "placeholder-2",
    title: "Gara pending...",
    category: null,
    deadline: null,
    value: null,
    compatibilityScore: null,
    source: "TenderMatch API",
    status: "pending",
  },
  {
    id: "placeholder-3",
    title: "Gara pending...",
    category: null,
    deadline: null,
    value: null,
    compatibilityScore: null,
    source: "TenderMatch API",
    status: "pending",
  },
];

const CompatibilityBar = ({ score }: { score: number | null }) => {
  if (score === null) {
    return (
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Compatibilità</span>
          <span className="text-muted-foreground">--</span>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <div className="h-full w-0 bg-muted-foreground/30 rounded-full" />
        </div>
      </div>
    );
  }

  const getBarColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-blue-500";
    if (score >= 40) return "bg-amber-500";
    return "bg-muted-foreground";
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">Compatibilità</span>
        <span className="text-foreground font-medium">{score}%</span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${getBarColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

const TenderCard = ({ tender }: { tender: TenderSuggestion }) => {
  const isPending = tender.status === "pending";

  return (
    <Card className={`border-border/50 bg-card/80 ${isPending ? "opacity-60" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          {tender.category ? (
            <Badge variant="outline" className="bg-secondary/50">
              {tender.category}
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-secondary/30 text-muted-foreground">
              Categoria pending
            </Badge>
          )}
          <Badge
            variant="secondary"
            className={isPending ? "bg-muted text-muted-foreground" : "bg-primary/20 text-primary"}
          >
            {isPending ? "In attesa" : "Disponibile"}
          </Badge>
        </div>
        <CardTitle className="font-display text-base mt-2">
          {tender.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Deadline */}
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">
            {tender.deadline
              ? new Date(tender.deadline).toLocaleDateString("it-IT")
              : "Scadenza pending..."}
          </span>
        </div>

        {/* Value */}
        <div className="flex items-center gap-2 text-sm">
          <Euro className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">
            {tender.value ? `€${tender.value.toLocaleString("it-IT")}` : "Importo pending..."}
          </span>
        </div>

        {/* Compatibility Score */}
        <CompatibilityBar score={tender.compatibilityScore} />

        {/* Source */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <span className="text-xs text-muted-foreground">
            Fonte: {tender.source}
          </span>
          <Button variant="ghost" size="sm" className="h-7 text-xs" disabled={isPending}>
            Dettagli
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const TendersPlaceholder = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  // Fetch user's TenderMatch preferences
  const { data: preferences } = useQuery({
    queryKey: ["tendermatchPreferences"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: profile } = await supabase
        .from("profiles")
        .select("company_id")
        .eq("id", user.id)
        .single();

      if (!profile?.company_id) return null;

      const { data } = await supabase
        .from("tendermatch_preferences")
        .select("*")
        .eq("company_id", profile.company_id)
        .maybeSingle();

      return data;
    },
  });

  // Fetch user's company
  const { data: userCompany } = useQuery({
    queryKey: ["userCompanyTenders"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: profile } = await supabase
        .from("profiles")
        .select("company_id")
        .eq("id", user.id)
        .single();

      return profile?.company_id || null;
    },
  });

  // Update preferences mutation
  const updatePreferences = useMutation({
    mutationFn: async (updates: { is_connected?: boolean; notify_email?: boolean; notify_in_app?: boolean }) => {
      if (!userCompany) throw new Error("Configura prima il profilo azienda");

      if (preferences) {
        const { error } = await supabase
          .from("tendermatch_preferences")
          .update(updates)
          .eq("company_id", userCompany);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("tendermatch_preferences")
          .insert({ company_id: userCompany, ...updates });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tendermatchPreferences"] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Errore",
        description: error.message,
      });
    },
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({
      title: "Sincronizzazione",
      description: "In attesa di connessione API TenderMatch.",
    });
    setRefreshing(false);
  };

  const isConnected = preferences?.is_connected ?? true;
  const notifyEmail = preferences?.notify_email ?? true;
  const notifyInApp = preferences?.notify_in_app ?? true;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">Gare / Bandi Consigliati</h1>
            <p className="text-muted-foreground">Integrazione TenderMatch</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Bell className="w-3 h-3" />
            Gratuito
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Connection Status & Settings */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-muted-foreground" />
            <CardTitle className="font-display text-base">Impostazioni TenderMatch</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Connection Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="tendermatch-connect" className="text-sm font-medium">
                Collega profilo a TenderMatch
              </Label>
              <p className="text-xs text-muted-foreground">
                Ricevi suggerimenti automatici sulle gare compatibili
              </p>
            </div>
            <Switch
              id="tendermatch-connect"
              checked={isConnected}
              onCheckedChange={(checked) => updatePreferences.mutate({ is_connected: checked })}
              disabled={!userCompany}
            />
          </div>

          {/* Notification Settings */}
          {isConnected && (
            <div className="pt-3 border-t border-border/50 space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="notify-email" className="text-sm">
                  Notifiche email
                </Label>
                <Switch
                  id="notify-email"
                  checked={notifyEmail}
                  onCheckedChange={(checked) => updatePreferences.mutate({ notify_email: checked })}
                  disabled={!userCompany}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notify-app" className="text-sm">
                  Notifiche in-app
                </Label>
                <Switch
                  id="notify-app"
                  checked={notifyInApp}
                  onCheckedChange={(checked) => updatePreferences.mutate({ notify_in_app: checked })}
                  disabled={!userCompany}
                />
              </div>
            </div>
          )}

          {/* GDPR Note */}
          <p className="text-xs text-muted-foreground pt-2">
            Puoi disconnettere il tuo profilo in qualsiasi momento. I tuoi dati saranno trattati secondo la normativa GDPR.
          </p>
        </CardContent>
      </Card>

      {/* Info Banner */}
      <Card className="border-border/50 bg-secondary/30">
        <CardContent className="py-4">
          <p className="text-sm text-muted-foreground text-center">
            In attesa di connessione API TenderMatch. Le gare mostrate sono placeholder strutturali.
          </p>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-border/50 bg-card/80">
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-display font-bold text-muted-foreground">--</p>
            <p className="text-xs text-muted-foreground">Gare disponibili</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/80">
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-display font-bold text-muted-foreground">--</p>
            <p className="text-xs text-muted-foreground">Alta compatibilità</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/80">
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-display font-bold text-muted-foreground">--</p>
            <p className="text-xs text-muted-foreground">In scadenza</p>
          </CardContent>
        </Card>
      </div>

      {/* Tenders Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {placeholderTenders.map((tender) => (
          <TenderCard key={tender.id} tender={tender} />
        ))}
      </div>

      {/* Disclaimer */}
      <Card className="border-border/50 bg-secondary/20">
        <CardContent className="py-4">
          <p className="text-xs text-muted-foreground text-center">
            TenderMatch è un servizio gratuito integrato in TechPulse. 
            I suggerimenti saranno disponibili dopo la connessione API.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TendersPlaceholder;
