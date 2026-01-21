import { useState, useEffect } from "react";
import { Heart, Shield, GraduationCap, Dumbbell, Plane, Brain, Gift, Star, Check, ChevronRight, Calculator, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/backend/client";
import { toast } from "sonner";

interface Partner {
  id: string;
  name: string;
  category: string;
  description: string | null;
  pricing_type: string | null;
  price_per_employee: number | null;
  min_employees: number | null;
  benefits: string[] | null;
  rating: number | null;
  website_url: string | null;
  is_active: boolean | null;
}

interface PartnersWelfareSectionProps {
  partners: Partner[];
  employeeCount?: number;
}

const categoryIcons: Record<string, React.ReactNode> = {
  "Welfare Aziendale": <Heart className="w-5 h-5" />,
  "Salute": <Shield className="w-5 h-5" />,
  "Formazione": <GraduationCap className="w-5 h-5" />,
  "Flexible Benefit": <Gift className="w-5 h-5" />,
  "Corporate Wellbeing": <Brain className="w-5 h-5" />,
  "Fitness & Sport": <Dumbbell className="w-5 h-5" />,
  "Viaggi & Tempo Libero": <Plane className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  "Welfare Aziendale": "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "Salute": "bg-green-500/20 text-green-400 border-green-500/30",
  "Formazione": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Flexible Benefit": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Corporate Wellbeing": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "Fitness & Sport": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Viaggi & Tempo Libero": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

const PartnersWelfareSection = ({ partners, employeeCount = 85 }: PartnersWelfareSectionProps) => {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [selectedPartners, setSelectedPartners] = useState<string[]>([]);
  const [showCostSimulation, setShowCostSimulation] = useState(false);

  // Calculate ranking based on value for money
  const rankedPartners = [...partners].sort((a, b) => {
    const scoreA = (a.rating || 0) * 10 - (a.price_per_employee || 0);
    const scoreB = (b.rating || 0) * 10 - (b.price_per_employee || 0);
    return scoreB - scoreA;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 2,
    }).format(value);
  };

  const calculateMonthlyCost = (partner: Partner) => {
    if (partner.pricing_type === "flat") {
      return partner.price_per_employee || 0;
    }
    return (partner.price_per_employee || 0) * employeeCount;
  };

  const calculateAnnualCost = (partner: Partner) => {
    return calculateMonthlyCost(partner) * 12;
  };

  const togglePartnerSelection = (partnerId: string) => {
    setSelectedPartners(prev => 
      prev.includes(partnerId) 
        ? prev.filter(id => id !== partnerId)
        : [...prev, partnerId]
    );
  };

  const getTotalWelfareCost = () => {
    return partners
      .filter(p => selectedPartners.includes(p.id))
      .reduce((sum, p) => sum + calculateAnnualCost(p), 0);
  };

  const getCostPerEmployee = () => {
    const total = getTotalWelfareCost();
    return total / employeeCount / 12;
  };

  const getBestValuePartner = () => {
    if (rankedPartners.length === 0) return null;
    return rankedPartners[0];
  };

  return (
    <section className="bg-gradient-card rounded-2xl border border-border/50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
            <Heart className="w-5 h-5 text-pink-400" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">Partner Welfare & Benefit</h2>
            <p className="text-sm text-muted-foreground">Servizi opzionali per il benessere aziendale</p>
          </div>
        </div>
        <Badge variant="outline" className="text-xs">
          {partners.length} partner disponibili
        </Badge>
      </div>

      {/* Info Banner */}
      <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-xl">
        <p className="text-sm text-foreground">
          💡 <strong>I partner sono opzionali.</strong> TechPulse funziona al 100% anche senza selezionare alcun servizio welfare. 
          Attivando un partner ottieni suggerimenti personalizzati e simulazioni costi integrate.
        </p>
      </div>

      {/* Best Value Recommendation */}
      {getBestValuePartner() && (
        <div className="mb-6 p-4 bg-accent/10 border border-accent/30 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Miglior rapporto qualità/prezzo per te</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">{getBestValuePartner()?.name}</p>
              <p className="text-sm text-muted-foreground">{getBestValuePartner()?.category}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-accent">
                {formatCurrency(calculateAnnualCost(getBestValuePartner()!))}/anno
              </p>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(getBestValuePartner()?.price_per_employee || 0)}/dipendente/mese
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Selected Partners Summary */}
      {selectedPartners.length > 0 && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">{selectedPartners.length} partner selezionati</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowCostSimulation(true)}>
              <Calculator className="w-4 h-4 mr-1" />
              Simula Costi
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Costo welfare totale annuo</span>
            <span className="font-bold text-foreground">{formatCurrency(getTotalWelfareCost())}</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm text-muted-foreground">Costo per dipendente/mese</span>
            <span className="text-sm text-foreground">{formatCurrency(getCostPerEmployee())}</span>
          </div>
        </div>
      )}

      {/* Partners Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {rankedPartners.map((partner, index) => (
          <div
            key={partner.id}
            className={`relative bg-secondary/30 rounded-xl p-4 border transition-all cursor-pointer ${
              selectedPartners.includes(partner.id) 
                ? "border-primary ring-1 ring-primary/50" 
                : "border-border/30 hover:border-primary/30"
            }`}
            onClick={() => setSelectedPartner(partner)}
          >
            {index === 0 && (
              <Badge className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs">
                Best Value
              </Badge>
            )}
            
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${categoryColors[partner.category] || "bg-muted"}`}>
                {categoryIcons[partner.category] || <Gift className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{partner.name}</h3>
                  {partner.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs text-muted-foreground">{partner.rating}</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{partner.category}</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{partner.description}</p>

            {/* Benefits preview */}
            {partner.benefits && partner.benefits.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {partner.benefits.slice(0, 3).map((benefit, i) => (
                  <span key={i} className="text-xs bg-secondary px-2 py-0.5 rounded">
                    {benefit}
                  </span>
                ))}
                {partner.benefits.length > 3 && (
                  <span className="text-xs text-muted-foreground">+{partner.benefits.length - 3}</span>
                )}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-primary">
                  {formatCurrency(partner.price_per_employee || 0)}
                  <span className="text-xs text-muted-foreground font-normal">
                    /{partner.pricing_type === "flat" ? "mese" : "dip./mese"}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  min. {partner.min_employees} dipendenti
                </p>
              </div>
              <Button 
                variant={selectedPartners.includes(partner.id) ? "default" : "outline"} 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePartnerSelection(partner.id);
                  if (!selectedPartners.includes(partner.id)) {
                    toast.success(`${partner.name} aggiunto al piano welfare`);
                  }
                }}
              >
                {selectedPartners.includes(partner.id) ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Attivo
                  </>
                ) : (
                  "Seleziona"
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Partner Detail Dialog */}
      <Dialog open={!!selectedPartner} onOpenChange={() => setSelectedPartner(null)}>
        <DialogContent className="max-w-lg">
          {selectedPartner && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${categoryColors[selectedPartner.category] || "bg-muted"}`}>
                    {categoryIcons[selectedPartner.category] || <Gift className="w-6 h-6" />}
                  </div>
                  <div>
                    <DialogTitle>{selectedPartner.name}</DialogTitle>
                    <DialogDescription>{selectedPartner.category}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <p className="text-sm text-muted-foreground">{selectedPartner.description}</p>

                {/* Benefits */}
                {selectedPartner.benefits && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Benefit inclusi</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedPartner.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-400" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pricing */}
                <div className="bg-secondary/30 rounded-xl p-4">
                  <h4 className="font-semibold text-foreground mb-3">Simulazione Costi per la tua azienda</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dipendenti</span>
                      <span className="font-medium">{employeeCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Costo unitario</span>
                      <span className="font-medium">{formatCurrency(selectedPartner.price_per_employee || 0)}/mese</span>
                    </div>
                    <div className="flex justify-between border-t border-border/50 pt-2">
                      <span className="text-muted-foreground">Costo mensile totale</span>
                      <span className="font-bold text-primary">{formatCurrency(calculateMonthlyCost(selectedPartner))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Costo annuale totale</span>
                      <span className="font-bold text-primary">{formatCurrency(calculateAnnualCost(selectedPartner))}</span>
                    </div>
                  </div>
                </div>

                {/* Integration note */}
                <div className="p-3 bg-primary/10 border border-primary/30 rounded-lg">
                  <p className="text-xs text-foreground">
                    💡 Attivando questo partner, il <strong>Consulente del Lavoro</strong> includerà automaticamente 
                    questi costi nelle simulazioni di assunzione.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button 
                    className="flex-1"
                    variant={selectedPartners.includes(selectedPartner.id) ? "outline" : "default"}
                    onClick={() => {
                      togglePartnerSelection(selectedPartner.id);
                      setSelectedPartner(null);
                      toast.success(
                        selectedPartners.includes(selectedPartner.id) 
                          ? `${selectedPartner.name} rimosso` 
                          : `${selectedPartner.name} aggiunto`
                      );
                    }}
                  >
                    {selectedPartners.includes(selectedPartner.id) ? "Rimuovi dal piano" : "Aggiungi al piano welfare"}
                  </Button>
                  {selectedPartner.website_url && (
                    <Button variant="outline" asChild>
                      <a href={selectedPartner.website_url} target="_blank" rel="noopener noreferrer">
                        Sito web
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Cost Simulation Dialog */}
      <Dialog open={showCostSimulation} onOpenChange={setShowCostSimulation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Simulazione Costi Welfare</DialogTitle>
            <DialogDescription>Riepilogo del piano welfare selezionato</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {partners
              .filter(p => selectedPartners.includes(p.id))
              .map(partner => (
                <div key={partner.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${categoryColors[partner.category] || "bg-muted"}`}>
                      {categoryIcons[partner.category] || <Gift className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{partner.name}</p>
                      <p className="text-xs text-muted-foreground">{partner.category}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-primary">{formatCurrency(calculateAnnualCost(partner))}/anno</p>
                </div>
              ))}

            <div className="border-t border-border/50 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Totale annuo welfare</span>
                <span className="font-bold text-foreground">{formatCurrency(getTotalWelfareCost())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Costo per dipendente/anno</span>
                <span className="font-medium text-foreground">{formatCurrency(getTotalWelfareCost() / employeeCount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Impatto su costo medio assunzione</span>
                <span className="font-medium text-accent">+{formatCurrency(getCostPerEmployee())}/mese</span>
              </div>
            </div>

            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-sm text-foreground">
                ✓ Il costo welfare è già integrato nel <strong>Consulente del Lavoro</strong> per calcoli assunzione più precisi.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer note */}
      <div className="mt-6 p-3 bg-muted/30 rounded-lg border border-border/30 text-center">
        <p className="text-xs text-muted-foreground">
          Sei un fornitore di servizi welfare? <a href="#" className="text-primary hover:underline">Registrati gratuitamente</a> come partner TechPulse.
        </p>
      </div>
    </section>
  );
};

export default PartnersWelfareSection;
