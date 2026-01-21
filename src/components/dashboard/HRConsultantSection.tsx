import { useState } from "react";
import { Users, Calculator, TrendingUp, Briefcase, Euro, RefreshCw, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/backend/client";
import { toast } from "sonner";

interface CostBreakdown {
  stipendioLordo: number;
  contributiINPS: number;
  contributiINAIL: number;
  tfr: number;
  tredicesima: number;
  quattordicesima: number;
  benefit: number;
  costoTotaleAnnuo: number;
  costoMensile: number;
}

interface Prediction {
  month: string;
  cost: number;
  delta: number;
}

const roles = [
  { value: "junior-dev", label: "Junior Developer", ralMin: 25000, ralMax: 32000 },
  { value: "mid-dev", label: "Mid Developer", ralMin: 35000, ralMax: 45000 },
  { value: "senior-dev", label: "Senior Developer", ralMin: 50000, ralMax: 70000 },
  { value: "tech-lead", label: "Tech Lead", ralMin: 60000, ralMax: 80000 },
  { value: "pm", label: "Project Manager", ralMin: 40000, ralMax: 55000 },
  { value: "designer", label: "UI/UX Designer", ralMin: 30000, ralMax: 45000 },
  { value: "devops", label: "DevOps Engineer", ralMin: 45000, ralMax: 65000 },
  { value: "data-engineer", label: "Data Engineer", ralMin: 45000, ralMax: 60000 },
];

const contractTypes = [
  { value: "indeterminato", label: "Tempo Indeterminato", multiplier: 1.0 },
  { value: "determinato", label: "Tempo Determinato", multiplier: 1.05 },
  { value: "piva", label: "Partita IVA", multiplier: 0.75 },
  { value: "collaborazione", label: "Collaborazione", multiplier: 0.85 },
];

const HRConsultantSection = () => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [customRole, setCustomRole] = useState<string>("");
  const [isCustomRole, setIsCustomRole] = useState(false);
  const [ral, setRal] = useState<number>(40000);
  const [contractType, setContractType] = useState<string>("indeterminato");
  const [isCalculating, setIsCalculating] = useState(false);
  const [suggestedRal, setSuggestedRal] = useState<number | null>(null);
  const [costs, setCosts] = useState<CostBreakdown | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  const getCurrentRoleLabel = () => {
    if (isCustomRole && customRole) return customRole;
    return roles.find(r => r.value === selectedRole)?.label || "";
  };

  const calculateCosts = (ralValue: number, contract: string): CostBreakdown => {
    const contractInfo = contractTypes.find(c => c.value === contract);
    const multiplier = contractInfo?.multiplier || 1;

    if (contract === "piva") {
      // P.IVA: no contributi azienda, costo = compenso lordo
      return {
        stipendioLordo: ralValue,
        contributiINPS: 0,
        contributiINAIL: 0,
        tfr: 0,
        tredicesima: 0,
        quattordicesima: 0,
        benefit: 0,
        costoTotaleAnnuo: ralValue,
        costoMensile: Math.round(ralValue / 12),
      };
    }

    if (contract === "collaborazione") {
      const contributi = Math.round(ralValue * 0.33);
      return {
        stipendioLordo: ralValue,
        contributiINPS: contributi,
        contributiINAIL: 0,
        tfr: 0,
        tredicesima: 0,
        quattordicesima: 0,
        benefit: 0,
        costoTotaleAnnuo: ralValue + contributi,
        costoMensile: Math.round((ralValue + contributi) / 12),
      };
    }

    // Tempo indeterminato/determinato
    const stipendioLordo = ralValue;
    const contributiINPS = Math.round(ralValue * 0.30); // ~30% contributi
    const contributiINAIL = Math.round(ralValue * 0.01); // ~1%
    const tfr = Math.round(ralValue / 13.5); // ~7.4%
    const tredicesima = Math.round(ralValue / 12);
    const quattordicesima = Math.round(ralValue / 12);
    const benefit = Math.round(ralValue * 0.03); // ~3% benefit standard

    const costoTotale = stipendioLordo + contributiINPS + contributiINAIL + tfr + benefit;
    
    return {
      stipendioLordo,
      contributiINPS,
      contributiINAIL,
      tfr,
      tredicesima,
      quattordicesima,
      benefit,
      costoTotaleAnnuo: Math.round(costoTotale * (contract === "determinato" ? 1.05 : 1)),
      costoMensile: Math.round(costoTotale / 12),
    };
  };

  const generatePredictions = (baseCost: number): Prediction[] => {
    const months = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
    let currentCost = baseCost;
    
    return months.map((month, i) => {
      // Simula aumenti graduali per inflazione e adeguamenti
      const inflationFactor = 1 + (0.003 * i); // ~0.3% mensile
      const seasonalFactor = (i === 5 || i === 11) ? 1.02 : 1; // Bonus giugno/dicembre
      currentCost = Math.round(baseCost * inflationFactor * seasonalFactor);
      
      return {
        month,
        cost: currentCost,
        delta: Math.round(((currentCost - baseCost) / baseCost) * 100 * 10) / 10,
      };
    });
  };

  const getSuggestedRAL = async () => {
    const roleLabel = getCurrentRoleLabel();
    if (!roleLabel) {
      toast.error("Inserisci o seleziona prima un ruolo");
      return;
    }

    setIsCalculating(true);
    try {
      const roleInfo = roles.find(r => r.value === selectedRole);
      const { data, error } = await supabase.functions.invoke("hr-consultant", {
        body: { 
          role: roleLabel,
          sector: "Software & IT Services",
          location: "Italia"
        },
      });

      if (error) throw error;

      if (data?.suggestedRal) {
        setSuggestedRal(data.suggestedRal);
        setRal(data.suggestedRal);
        toast.success("RAL suggerita calcolata");
      } else if (roleInfo) {
        // Fallback to range midpoint
        const midRal = Math.round((roleInfo.ralMin + roleInfo.ralMax) / 2);
        setSuggestedRal(midRal);
        setRal(midRal);
      }
    } catch (error) {
      console.error(error);
      // Use fallback
      const roleInfo = roles.find(r => r.value === selectedRole);
      if (roleInfo) {
        const midRal = Math.round((roleInfo.ralMin + roleInfo.ralMax) / 2);
        setSuggestedRal(midRal);
        setRal(midRal);
        toast.info("RAL stimata da range di mercato");
      }
    } finally {
      setIsCalculating(false);
    }
  };

  const handleCalculate = () => {
    const calculatedCosts = calculateCosts(ral, contractType);
    setCosts(calculatedCosts);
    setPredictions(generatePredictions(calculatedCosts.costoMensile));
  };

  const handleReset = () => {
    setSelectedRole("");
    setCustomRole("");
    setIsCustomRole(false);
    setRal(40000);
    setContractType("indeterminato");
    setSuggestedRal(null);
    setCosts(null);
    setPredictions([]);
    toast.info("Dati resettati");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getROIMessage = () => {
    if (!costs) return "";
    const monthlyCost = costs.costoMensile;
    
    if (monthlyCost < 4000) {
      return "Profilo junior: ideale per task operativi, supporto progetti, crescita interna. ROI in 6-12 mesi.";
    } else if (monthlyCost < 6000) {
      return "Profilo mid: autonomia su progetti medi, mentoring junior, valore aggiunto immediato. ROI in 3-6 mesi.";
    } else if (monthlyCost < 8000) {
      return "Profilo senior: leadership tecnica, architettura, impatto strategico. ROI in 1-3 mesi su progetti critici.";
    } else {
      return "Profilo executive: trasformazione aziendale, nuove linee di business, M&A tech. ROI misurabile su KPI strategici.";
    }
  };

  return (
    <section className="bg-gradient-card rounded-2xl border border-border/50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
            <Users className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">Consulente del Lavoro in Tasca</h2>
            <p className="text-sm text-muted-foreground">Calcola i costi reali di assunzione</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Ruolo da assumere</label>
            <div className="space-y-2">
              {!isCustomRole ? (
                <Select value={selectedRole} onValueChange={(val) => { setSelectedRole(val); setIsCustomRole(false); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona ruolo..." />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input 
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  placeholder="Es: Full Stack Developer, Marketing Manager..."
                />
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs"
                onClick={() => {
                  setIsCustomRole(!isCustomRole);
                  if (!isCustomRole) {
                    setSelectedRole("");
                  } else {
                    setCustomRole("");
                  }
                }}
              >
                {isCustomRole ? "← Scegli dalla lista" : "Scrivi un ruolo personalizzato →"}
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Tipo di contratto</label>
            <Select value={contractType} onValueChange={setContractType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {contractTypes.map(contract => (
                  <SelectItem key={contract.value} value={contract.value}>
                    {contract.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-muted-foreground">RAL (Retribuzione Annua Lorda)</label>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={getSuggestedRAL}
                disabled={isCalculating || (!selectedRole && !customRole)}
              >
                {isCalculating ? (
                  <RefreshCw className="w-4 h-4 animate-spin mr-1" />
                ) : (
                  <TrendingUp className="w-4 h-4 mr-1" />
                )}
                Suggerisci RAL
              </Button>
            </div>
            <div className="relative">
              <Euro className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                type="number"
                value={ral}
                onChange={(e) => setRal(Number(e.target.value))}
                className="pl-10"
                placeholder="40000"
              />
            </div>
            {suggestedRal && (
              <p className="text-xs text-primary mt-1">
                RAL suggerita dal mercato: {formatCurrency(suggestedRal)}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <Button onClick={handleCalculate} className="flex-1" variant="hero">
              <Calculator className="w-4 h-4 mr-2" />
              Calcola Costo Totale
            </Button>
            {costs && (
              <Button onClick={handleReset} variant="outline" size="icon" title="Reset dati">
                <RefreshCw className="w-4 h-4" />
              </Button>
            )}
          </div>
          {selectedRole && !isCustomRole && (
            <div className="p-3 bg-secondary/30 rounded-lg border border-border/30">
              <p className="text-xs text-muted-foreground">Range di mercato per {roles.find(r => r.value === selectedRole)?.label}:</p>
              <p className="text-sm font-medium text-foreground">
                {formatCurrency(roles.find(r => r.value === selectedRole)?.ralMin || 0)} - {formatCurrency(roles.find(r => r.value === selectedRole)?.ralMax || 0)}
              </p>
            </div>
          )}
          
          {isCustomRole && customRole && (
            <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
              <p className="text-xs text-muted-foreground">Ruolo personalizzato:</p>
              <p className="text-sm font-medium text-foreground">{customRole}</p>
              <p className="text-xs text-muted-foreground mt-1">Usa "Suggerisci RAL" per una stima di mercato</p>
            </div>
          )}
        </div>

        {/* Results Panel */}
        <div>
          {costs ? (
            <Tabs defaultValue="breakdown">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="breakdown">Dettaglio</TabsTrigger>
                <TabsTrigger value="predictions">Previsioni</TabsTrigger>
                <TabsTrigger value="roi">ROI</TabsTrigger>
              </TabsList>

              <TabsContent value="breakdown" className="space-y-3">
                <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                  <p className="text-sm text-muted-foreground">Costo Totale Annuo Azienda</p>
                  <p className="text-3xl font-bold text-primary">{formatCurrency(costs.costoTotaleAnnuo)}</p>
                  <p className="text-sm text-muted-foreground mt-1">{formatCurrency(costs.costoMensile)}/mese</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Stipendio Lordo</span>
                    <span className="text-foreground">{formatCurrency(costs.stipendioLordo)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Contributi INPS (~30%)</span>
                    <span className="text-foreground">{formatCurrency(costs.contributiINPS)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Contributi INAIL (~1%)</span>
                    <span className="text-foreground">{formatCurrency(costs.contributiINAIL)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">TFR (~7.4%)</span>
                    <span className="text-foreground">{formatCurrency(costs.tfr)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Benefit Standard (~3%)</span>
                    <span className="text-foreground">{formatCurrency(costs.benefit)}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border/50">
                  <p className="text-xs text-muted-foreground">
                    * I calcoli sono indicativi e basati su aliquote medie del settore tech italiano.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="predictions">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground mb-3">Proiezione costi a 12 mesi (inflazione + adeguamenti)</p>
                  <div className="grid grid-cols-4 gap-2">
                    {predictions.map((pred, i) => (
                      <div key={i} className="bg-secondary/30 rounded-lg p-2 text-center">
                        <p className="text-xs text-muted-foreground">{pred.month}</p>
                        <p className="text-sm font-medium text-foreground">{formatCurrency(pred.cost)}</p>
                        {pred.delta > 0 && (
                          <p className="text-xs text-yellow-400">+{pred.delta}%</p>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                    <p className="text-sm text-foreground">
                      ⚠️ Previsione aumento annuo: +{Math.round(((predictions[11]?.cost || 0) - (predictions[0]?.cost || 0)) / (predictions[0]?.cost || 1) * 100)}% 
                      <span className="text-muted-foreground"> (inflazione + CCNL tech)</span>
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="roi">
                <div className="space-y-4">
                  <div className="bg-secondary/30 rounded-xl p-4">
                    <h4 className="font-semibold text-foreground mb-2">Se paghi X, ottieni Y</h4>
                    <p className="text-sm text-muted-foreground">{getROIMessage()}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 text-center">
                      <Briefcase className="w-5 h-5 text-green-400 mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">Progetti gestibili</p>
                      <p className="text-lg font-bold text-green-400">
                        {costs.costoMensile < 4000 ? "1-2" : costs.costoMensile < 6000 ? "2-4" : "4+"}
                      </p>
                    </div>
                    <div className="bg-primary/10 border border-primary/30 rounded-xl p-3 text-center">
                      <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">Break-even stimato</p>
                      <p className="text-lg font-bold text-primary">
                        {costs.costoMensile < 4000 ? "6-12" : costs.costoMensile < 6000 ? "3-6" : "1-3"} mesi
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-primary/10 border border-primary/30 rounded-xl">
                    <p className="text-sm text-foreground text-center">
                      💡 Un {getCurrentRoleLabel() || "professionista"} a questa RAL 
                      genera mediamente <span className="font-bold text-primary">2-3x</span> il proprio costo in valore progettuale.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="h-full flex items-center justify-center text-center p-8">
              <div>
                <Calculator className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground">
                  Seleziona un ruolo e calcola i costi per vedere il dettaglio completo
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HRConsultantSection;
