import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calculator, Sparkles, RefreshCw, Euro, Info, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Validation schema
const formSchema = z.object({
  role: z.string().min(2, "Ruolo richiesto").max(100, "Ruolo troppo lungo"),
  ral: z.number().min(15000, "RAL minima 15.000€").max(500000, "RAL massima 500.000€"),
  contractType: z.string().min(1, "Seleziona tipo contratto"),
});

interface CostBreakdown {
  ralAnnuale: number;
  lordoMensile: number;
  contributiINPS: number;
  contributiINAIL: number;
  tfr: number;
  benefitCost: number;
  costoTotaleAnnuo: number;
  costoTotaleMensile: number;
}

interface AIAdvice {
  recommendations: string[];
  contractNotes: string;
  riskFactors: string;
}

const CONTRACT_TYPES = [
  { value: "indeterminato", label: "Tempo Indeterminato" },
  { value: "determinato", label: "Tempo Determinato" },
  { value: "apprendistato", label: "Apprendistato" },
  { value: "collaborazione", label: "Collaborazione" },
  { value: "partita_iva", label: "Partita IVA" },
];

const BENEFITS = [
  { id: "ticket", label: "Ticket Restaurant", monthlyCost: 0 },
  { id: "health", label: "Assicurazione Sanitaria", monthlyCost: 0 },
  { id: "welfare", label: "Welfare Aziendale", monthlyCost: 0 },
  { id: "car", label: "Auto Aziendale", monthlyCost: 0 },
];

// Standard Italian formulas for cost calculation
const calculateCosts = (
  ral: number,
  contractType: string,
  selectedBenefits: string[],
  benefitValues: Record<string, number>
): CostBreakdown => {
  const lordoMensile = ral / 13; // 13 mensilità standard
  
  // Contributi INPS datore (~30% del lordo)
  const inpsRate = contractType === "apprendistato" ? 0.115 : 0.30;
  const contributiINPS = ral * inpsRate;
  
  // INAIL (~0.4% medio)
  const contributiINAIL = ral * 0.004;
  
  // TFR (~6.91% del lordo annuo)
  const tfr = ral * 0.0691;
  
  // Benefit costs from user input
  const benefitCost = selectedBenefits.reduce((sum, id) => {
    return sum + (benefitValues[id] || 0) * 12;
  }, 0);
  
  const costoTotaleAnnuo = ral + contributiINPS + contributiINAIL + tfr + benefitCost;
  const costoTotaleMensile = costoTotaleAnnuo / 12;

  return {
    ralAnnuale: ral,
    lordoMensile,
    contributiINPS,
    contributiINAIL,
    tfr,
    benefitCost,
    costoTotaleAnnuo,
    costoTotaleMensile,
  };
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const CostBarChart = ({ costs }: { costs: CostBreakdown | null }) => {
  if (!costs) {
    return (
      <div className="h-48 flex items-center justify-center border border-dashed border-border rounded-lg bg-secondary/20">
        <p className="text-sm text-muted-foreground">Inserisci i dati per visualizzare il grafico</p>
      </div>
    );
  }

  const items = [
    { label: "RAL", value: costs.ralAnnuale, color: "bg-primary" },
    { label: "INPS", value: costs.contributiINPS, color: "bg-blue-500" },
    { label: "INAIL", value: costs.contributiINAIL, color: "bg-purple-500" },
    { label: "TFR", value: costs.tfr, color: "bg-amber-500" },
    { label: "Benefit", value: costs.benefitCost, color: "bg-emerald-500" },
  ];

  const maxValue = Math.max(...items.map((i) => i.value));

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{item.label}</span>
            <span className="font-medium">{formatCurrency(item.value)}</span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${item.color}`}
              style={{ width: maxValue > 0 ? `${(item.value / maxValue) * 100}%` : "0%" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const HRConsultantPlaceholder = () => {
  const { toast } = useToast();
  const [role, setRole] = useState("");
  const [ral, setRal] = useState("");
  const [contractType, setContractType] = useState("");
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  const [benefitValues, setBenefitValues] = useState<Record<string, number>>({});
  const [costs, setCosts] = useState<CostBreakdown | null>(null);
  const [advice, setAdvice] = useState<AIAdvice | null>(null);
  const [generating, setGenerating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCalculate = () => {
    setErrors({});
    
    const ralNum = parseFloat(ral.replace(/[^\d]/g, ""));
    
    try {
      formSchema.parse({
        role,
        ral: ralNum,
        contractType,
      });

      const calculatedCosts = calculateCosts(ralNum, contractType, selectedBenefits, benefitValues);
      setCosts(calculatedCosts);
      
      toast({
        title: "Calcolo completato",
        description: "I costi sono stati calcolati con i valori inseriti.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleGetAdvice = async () => {
    if (!role || !contractType) {
      toast({
        variant: "destructive",
        title: "Dati mancanti",
        description: "Inserisci almeno ruolo e tipo contratto per ottenere consigli.",
      });
      return;
    }

    setGenerating(true);

    try {
      const { data, error } = await supabase.functions.invoke("hr-consultant", {
        body: { role, contractType, sector: "tech" },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setAdvice(data.advice);
      toast({
        title: "Consigli generati",
        description: "Raccomandazioni qualitative disponibili.",
      });
    } catch (error: any) {
      console.error("HR advice error:", error);
      toast({
        variant: "destructive",
        title: "Errore",
        description: error.message || "Impossibile generare consigli.",
      });
    } finally {
      setGenerating(false);
    }
  };

  const toggleBenefit = (id: string) => {
    setSelectedBenefits((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const updateBenefitValue = (id: string, value: string) => {
    const numValue = parseFloat(value.replace(/[^\d]/g, "")) || 0;
    setBenefitValues((prev) => ({ ...prev, [id]: numValue }));
  };

  return (
    <div className="tp-section space-y-8">
      {/* Header */}
      <div className="tp-page-header">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary">
            <Calculator className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="tp-page-title">Consulente del Lavoro in Tasca</h1>
            <p className="tp-page-subtitle">Simulatore costo assunzione</p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="tp-card bg-secondary/30 py-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
          <p className="text-sm text-muted-foreground">
            I calcoli utilizzano formule standard italiane basate esclusivamente sui valori inseriti. 
            Nessun dato è predefinito o inventato.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="tp-card">
          <h2 className="font-display text-xl font-semibold mb-2">Dati Assunzione</h2>
          <p className="text-sm text-muted-foreground mb-6">Inserisci i parametri per il calcolo</p>
          <div className="space-y-5">
            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role">Ruolo *</Label>
              <Input
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="es: Software Developer"
                maxLength={100}
              />
              {errors.role && <p className="text-xs text-destructive">{errors.role}</p>}
            </div>

            {/* RAL */}
            <div className="space-y-2">
              <Label htmlFor="ral">RAL Proposta (€) *</Label>
              <div className="relative">
                <Euro className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="ral"
                  value={ral}
                  onChange={(e) => setRal(e.target.value)}
                  placeholder="35000"
                  className="pl-9"
                  type="text"
                  inputMode="numeric"
                />
              </div>
              {errors.ral && <p className="text-xs text-destructive">{errors.ral}</p>}
            </div>

            {/* Contract Type */}
            <div className="space-y-2">
              <Label>Tipo Contratto *</Label>
              <Select value={contractType} onValueChange={setContractType}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona tipo contratto" />
                </SelectTrigger>
                <SelectContent>
                  {CONTRACT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.contractType && <p className="text-xs text-destructive">{errors.contractType}</p>}
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              <Label>Benefit Opzionali</Label>
              <div className="space-y-3">
                {BENEFITS.map((benefit) => (
                  <div key={benefit.id} className="flex items-center gap-3">
                    <Checkbox
                      id={benefit.id}
                      checked={selectedBenefits.includes(benefit.id)}
                      onCheckedChange={() => toggleBenefit(benefit.id)}
                    />
                    <Label htmlFor={benefit.id} className="flex-1 cursor-pointer text-sm">
                      {benefit.label}
                    </Label>
                    {selectedBenefits.includes(benefit.id) && (
                      <Input
                        value={benefitValues[benefit.id] || ""}
                        onChange={(e) => updateBenefitValue(benefit.id, e.target.value)}
                        placeholder="€/mese"
                        className="w-24 h-8 text-sm"
                        type="text"
                        inputMode="numeric"
                      />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Inserisci il costo mensile per ciascun benefit selezionato
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6">
              <Button onClick={handleCalculate} className="tp-btn-primary flex-1">
                <Calculator className="w-4 h-4 mr-2" />
                Calcola Costi
              </Button>
              <Button
                className="tp-btn-secondary"
                onClick={handleGetAdvice}
                disabled={generating}
              >
                {generating ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-8">
          {/* Cost Breakdown */}
          <div className="tp-card">
            <h2 className="font-display text-xl font-semibold mb-2">Riepilogo Costi</h2>
            <p className="text-sm text-muted-foreground mb-6">Calcolati dai valori inseriti</p>
            <div className="space-y-6">
              {costs ? (
                <>
                  {/* Summary */}
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Costo Totale Annuo</span>
                      <span className="text-xl font-display font-bold text-primary">
                        {formatCurrency(costs.costoTotaleAnnuo)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-muted-foreground">Costo Mensile</span>
                      <span className="text-sm font-medium">
                        {formatCurrency(costs.costoTotaleMensile)}
                      </span>
                    </div>
                  </div>

                  {/* Breakdown Table */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">RAL Annuale</span>
                      <span>{formatCurrency(costs.ralAnnuale)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Lordo Mensile (13 mens.)</span>
                      <span>{formatCurrency(costs.lordoMensile)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Contributi INPS</span>
                      <span>{formatCurrency(costs.contributiINPS)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">INAIL</span>
                      <span>{formatCurrency(costs.contributiINAIL)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">TFR Annuale</span>
                      <span>{formatCurrency(costs.tfr)}</span>
                    </div>
                    {costs.benefitCost > 0 && (
                      <div className="flex justify-between py-2 border-b border-border/50">
                        <span className="text-muted-foreground">Benefit Annuali</span>
                        <span>{formatCurrency(costs.benefitCost)}</span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="h-48 flex items-center justify-center border border-dashed border-border rounded-xl bg-secondary/20">
                  <p className="text-sm text-muted-foreground">
                    Compila il form per vedere il riepilogo costi
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Cost Chart */}
          <div className="tp-card">
            <h3 className="font-display text-base font-semibold mb-4">Composizione Costi</h3>
            <CostBarChart costs={costs} />
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      {advice && (
        <div className="tp-card bg-gradient-card">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-display text-xl font-semibold">Raccomandazioni AI</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Consigli qualitativi (senza valori numerici)</p>
          <div className="space-y-4">
            {/* Recommendations */}
            <div className="space-y-2">
              {advice.recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 p-3 rounded-xl bg-secondary/30"
                >
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-sm text-muted-foreground">{rec}</p>
                </div>
              ))}
            </div>

            {/* Contract Notes */}
            {advice.contractNotes && (
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <p className="text-sm">
                  <span className="font-medium text-blue-400">Nota contrattuale: </span>
                  <span className="text-muted-foreground">{advice.contractNotes}</span>
                </p>
              </div>
            )}

            {/* Risk Factors */}
            {advice.riskFactors && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5" />
                  <p className="text-sm">
                    <span className="font-medium text-amber-400">Fattori di rischio: </span>
                    <span className="text-muted-foreground">{advice.riskFactors}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="tp-card bg-secondary/20 py-4">
        <p className="text-xs text-muted-foreground text-center">
          I calcoli utilizzano formule standard (contributi INPS ~30%, INAIL ~0.4%, TFR ~6.91%). 
          Per valutazioni precise consultare un professionista. Nessun valore è inventato o predefinito.
        </p>
      </div>
    </div>
  );
};

export default HRConsultantPlaceholder;
