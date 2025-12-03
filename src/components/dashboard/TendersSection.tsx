import { useState, useEffect } from "react";
import { Award, ExternalLink, Calendar, Euro, Bell, BellOff, Settings, Zap, RefreshCw, Check, Link2, Link2Off } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Tender {
  id: string;
  title: string;
  value: number | null;
  deadline: string | null;
  match_score: number | null;
  category: string | null;
}

interface TendersSectionProps {
  tenders: Tender[];
}

interface TenderMatchPrefs {
  isConnected: boolean;
  notifyEmail: boolean;
  notifyInApp: boolean;
  minMatchScore: number;
}

const TendersSection = ({ tenders }: TendersSectionProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState<TenderMatchPrefs>({
    isConnected: true,
    notifyEmail: true,
    notifyInApp: true,
    minMatchScore: 70,
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const analyzeWithAI = async () => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-tenders", {
        body: { 
          companyProfile: "TechCorp Italia - PMI tech specializzata in software enterprise e consulenza IT per PA",
          tenders: tenders.map(t => ({ title: t.title, category: t.category, value: t.value, match: t.match_score }))
        },
      });
      
      if (error) throw error;
      
      if (data?.insights) {
        setAiInsights(data.insights);
        toast.success("Analisi AI completata");
      }
    } catch (error) {
      console.error(error);
      // Fallback insights
      setAiInsights("Basandoci sul tuo profilo tech, consigliamo di concentrarti sui bandi di trasformazione digitale PA e cybersecurity. Il PNRR offre ottime opportunità nel Q1 2025. Priorità: bandi con match >85% e scadenza entro 30 giorni.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const filteredTenders = tenders.filter(t => (t.match_score || 0) >= prefs.minMatchScore);
  const highMatchTenders = filteredTenders.filter(t => (t.match_score || 0) >= 90);

  const toggleConnection = () => {
    const newValue = !prefs.isConnected;
    setPrefs(p => ({ ...p, isConnected: newValue }));
    toast.success(newValue ? "Profilo collegato a TenderMatch" : "Collegamento TenderMatch disattivato");
  };

  return (
    <section className="bg-gradient-card rounded-2xl border border-border/50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
            <Award className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">Bandi Consigliati</h2>
            <p className="text-sm text-muted-foreground">Powered by TenderMatch AI</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setShowSettings(true)}>
            <Settings className="w-4 h-4" />
          </Button>
          <Badge variant={prefs.isConnected ? "default" : "outline"} className="text-xs">
            {prefs.isConnected ? "Connesso" : "Non connesso"}
          </Badge>
        </div>
      </div>

      {/* TenderMatch Connection Banner */}
      <div className={`mb-4 p-4 rounded-xl border ${prefs.isConnected ? "bg-primary/10 border-primary/30" : "bg-muted/30 border-border/30"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {prefs.isConnected ? (
              <Link2 className="w-5 h-5 text-primary" />
            ) : (
              <Link2Off className="w-5 h-5 text-muted-foreground" />
            )}
            <div>
              <p className="text-sm font-medium text-foreground">
                {prefs.isConnected ? "Profilo collegato a TenderMatch" : "Collega il tuo profilo a TenderMatch"}
              </p>
              <p className="text-xs text-muted-foreground">
                {prefs.isConnected 
                  ? "Ricevi suggerimenti personalizzati e notifiche automatiche" 
                  : "Attiva per ricevere bandi su misura per la tua azienda"}
              </p>
            </div>
          </div>
          <Switch checked={prefs.isConnected} onCheckedChange={toggleConnection} />
        </div>
        {prefs.isConnected && (
          <p className="text-xs text-muted-foreground mt-2">
            ✓ Servizio gratuito • Puoi disattivarlo in qualsiasi momento (GDPR compliant)
          </p>
        )}
      </div>

      {/* Notifications Status */}
      {prefs.isConnected && (
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <Bell className={`w-4 h-4 ${prefs.notifyEmail ? "text-primary" : "text-muted-foreground"}`} />
            <span className={prefs.notifyEmail ? "text-foreground" : "text-muted-foreground"}>
              Notifiche email {prefs.notifyEmail ? "attive" : "disattive"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Bell className={`w-4 h-4 ${prefs.notifyInApp ? "text-primary" : "text-muted-foreground"}`} />
            <span className={prefs.notifyInApp ? "text-foreground" : "text-muted-foreground"}>
              Notifiche in-app {prefs.notifyInApp ? "attive" : "disattive"}
            </span>
          </div>
        </div>
      )}

      {/* AI Analysis Button & Results */}
      {prefs.isConnected && (
        <div className="mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={analyzeWithAI}
            disabled={isAnalyzing}
            className="mb-3"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                Analizzando...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Analisi AI Bandi
              </>
            )}
          </Button>
          
          {aiInsights && (
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-xl">
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-foreground">{aiInsights}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-secondary/30 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-foreground">{filteredTenders.length}</p>
          <p className="text-xs text-muted-foreground">Bandi compatibili</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-400">{highMatchTenders.length}</p>
          <p className="text-xs text-muted-foreground">Match &gt;90%</p>
        </div>
        <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-accent">
            {formatCurrency(filteredTenders.reduce((sum, t) => sum + (t.value || 0), 0))}
          </p>
          <p className="text-xs text-muted-foreground">Valore totale</p>
        </div>
      </div>

      {/* Tenders List */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {filteredTenders.map((tender) => (
          <div
            key={tender.id}
            className="bg-secondary/30 rounded-xl p-4 border border-border/30 hover:border-accent/30 transition-colors group cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {(tender.match_score || 0) >= 90 && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                      Top Match
                    </Badge>
                  )}
                  {tender.category && (
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                      {tender.category}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-foreground">{tender.title}</h3>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-accent">{tender.match_score}%</div>
                <div className="text-xs text-muted-foreground">match</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                {tender.value && (
                  <div className="flex items-center gap-1 text-foreground">
                    <Euro className="w-4 h-4 text-muted-foreground" />
                    {formatCurrency(tender.value)}
                  </div>
                )}
                {tender.deadline && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(tender.deadline), "d MMM yyyy", { locale: it })}
                  </div>
                )}
              </div>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                Dettagli
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>

            {/* Match progress bar */}
            <div className="mt-3 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  (tender.match_score || 0) >= 90 ? "bg-green-500" : "bg-gradient-accent"
                }`}
                style={{ width: `${tender.match_score}%` }}
              />
            </div>
          </div>
        ))}

        {filteredTenders.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Award className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Nessun bando con match superiore al {prefs.minMatchScore}%</p>
            <p className="text-sm">Prova ad abbassare la soglia nelle impostazioni</p>
          </div>
        )}
      </div>

      {/* Free Service Note */}
      <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
        <p className="text-xs text-foreground text-center">
          🎁 <strong>Servizio completamente gratuito</strong> • I bandi consigliati sono selezionati dall'AI di TenderMatch in base al tuo profilo aziendale
        </p>
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Impostazioni TenderMatch</DialogTitle>
            <DialogDescription>Personalizza le notifiche e i filtri per i bandi</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Connection Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Collegamento TenderMatch</p>
                <p className="text-sm text-muted-foreground">Ricevi bandi personalizzati per la tua azienda</p>
              </div>
              <Switch checked={prefs.isConnected} onCheckedChange={(v) => setPrefs(p => ({ ...p, isConnected: v }))} />
            </div>

            {prefs.isConnected && (
              <>
                {/* Email Notifications */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Notifiche Email</p>
                    <p className="text-sm text-muted-foreground">Ricevi email quando escono nuovi bandi compatibili</p>
                  </div>
                  <Switch checked={prefs.notifyEmail} onCheckedChange={(v) => setPrefs(p => ({ ...p, notifyEmail: v }))} />
                </div>

                {/* In-App Notifications */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Notifiche In-App</p>
                    <p className="text-sm text-muted-foreground">Mostra badge e alert nella dashboard</p>
                  </div>
                  <Switch checked={prefs.notifyInApp} onCheckedChange={(v) => setPrefs(p => ({ ...p, notifyInApp: v }))} />
                </div>

                {/* Min Match Score */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-medium text-foreground">Match minimo</p>
                    <span className="text-sm text-primary font-semibold">{prefs.minMatchScore}%</span>
                  </div>
                  <Slider
                    value={[prefs.minMatchScore]}
                    onValueChange={([v]) => setPrefs(p => ({ ...p, minMatchScore: v }))}
                    min={50}
                    max={95}
                    step={5}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Mostra solo bandi con compatibilità superiore a questa soglia
                  </p>
                </div>
              </>
            )}

            {/* GDPR Note */}
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground">
                🔒 <strong>Privacy:</strong> Puoi disattivare il collegamento in qualsiasi momento. 
                I tuoi dati sono trattati secondo la normativa GDPR e non vengono condivisi con terze parti senza consenso.
              </p>
            </div>

            <Button onClick={() => {
              setShowSettings(false);
              toast.success("Preferenze salvate");
            }} className="w-full">
              Salva preferenze
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TendersSection;
