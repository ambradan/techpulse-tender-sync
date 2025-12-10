import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { supabase } from "@/integrations/supabase/client";
import CompanyContextBanner from "@/components/dashboard/CompanyContextBanner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Users, Plus, Check, ExternalLink, Building2, Tag, Euro } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Placeholder partner structure
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

interface PartnerService {
  id: string;
  partner_id: string;
  service_name: string;
  description: string | null;
  price: number | null;
}

const CATEGORY_CONFIG: Record<string, { label: string; className: string }> = {
  welfare: { label: "Welfare", className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  insurance: { label: "Assicurazioni", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  benefits: { label: "Benefits", className: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  health: { label: "Salute", className: "bg-rose-500/20 text-rose-400 border-rose-500/30" },
  other: { label: "Altro", className: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
};

// Placeholder partners for empty state demo
const placeholderPartners: Partner[] = [
  {
    id: "placeholder-1",
    name: "[Placeholder] Partner Welfare A",
    category: "welfare",
    description: "Descrizione servizi welfare in attesa di configurazione.",
    pricing_type: "contact",
    price_per_employee: null,
    min_employees: null,
    benefits: ["Benefit 1", "Benefit 2", "Benefit 3"],
    rating: null,
    website_url: null,
    is_active: true,
  },
  {
    id: "placeholder-2",
    name: "[Placeholder] Partner Assicurazioni B",
    category: "insurance",
    description: "Descrizione servizi assicurativi in attesa di configurazione.",
    pricing_type: "contact",
    price_per_employee: null,
    min_employees: null,
    benefits: ["Benefit 1", "Benefit 2"],
    rating: null,
    website_url: null,
    is_active: true,
  },
  {
    id: "placeholder-3",
    name: "[Placeholder] Partner Benefits C",
    category: "benefits",
    description: "Descrizione servizi benefits in attesa di configurazione.",
    pricing_type: "contact",
    price_per_employee: null,
    min_employees: null,
    benefits: ["Benefit 1", "Benefit 2", "Benefit 3", "Benefit 4"],
    rating: null,
    website_url: null,
    is_active: true,
  },
];

const PartnerCard = ({
  partner,
  isSelected,
  onSelect,
  onViewDetails,
}: {
  partner: Partner;
  isSelected: boolean;
  onSelect: () => void;
  onViewDetails: () => void;
}) => {
  const categoryConfig = CATEGORY_CONFIG[partner.category] || CATEGORY_CONFIG.other;
  const isPlaceholder = partner.id.startsWith("placeholder");

  return (
    <Card className={`border-border/50 bg-card/80 transition-all ${isSelected ? "ring-2 ring-primary" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Badge variant="outline" className={categoryConfig.className}>
            {categoryConfig.label}
          </Badge>
          {isSelected && (
            <Badge className="bg-primary text-primary-foreground">
              <Check className="w-3 h-3 mr-1" />
              Selezionato
            </Badge>
          )}
        </div>
        <CardTitle className="font-display text-lg mt-2">{partner.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {partner.description || "Descrizione non disponibile"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Benefits preview */}
        {partner.benefits && partner.benefits.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {partner.benefits.slice(0, 3).map((benefit, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {benefit}
              </Badge>
            ))}
            {partner.benefits.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{partner.benefits.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Pricing */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Euro className="w-4 h-4" />
          <span>
            {partner.pricing_type === "per_employee" && partner.price_per_employee
              ? `€${partner.price_per_employee}/dipendente`
              : "Prezzo su richiesta"}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onViewDetails}
          >
            Dettagli
          </Button>
          <Button
            size="sm"
            className="flex-1"
            variant={isSelected ? "secondary" : "default"}
            onClick={onSelect}
            disabled={isPlaceholder}
          >
            {isSelected ? "Rimuovi" : "Aggiungi"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const PartnerDetailDialog = ({
  partner,
  open,
  onClose,
  services,
}: {
  partner: Partner | null;
  open: boolean;
  onClose: () => void;
  services: PartnerService[];
}) => {
  if (!partner) return null;
  const categoryConfig = CATEGORY_CONFIG[partner.category] || CATEGORY_CONFIG.other;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className={categoryConfig.className}>
              {categoryConfig.label}
            </Badge>
          </div>
          <DialogTitle className="font-display text-xl">{partner.name}</DialogTitle>
          <DialogDescription>{partner.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Category & Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Categoria</p>
              <p className="text-sm font-medium">{categoryConfig.label}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Pricing</p>
              <p className="text-sm font-medium">
                {partner.pricing_type === "per_employee" && partner.price_per_employee
                  ? `€${partner.price_per_employee}/dipendente`
                  : "Su richiesta"}
              </p>
            </div>
          </div>

          {/* Benefits */}
          {partner.benefits && partner.benefits.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Benefits inclusi</p>
              <div className="flex flex-wrap gap-2">
                {partner.benefits.map((benefit, i) => (
                  <Badge key={i} variant="secondary">
                    {benefit}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Services */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Servizi offerti</p>
            {services.length > 0 ? (
              <div className="space-y-2">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="p-3 rounded-lg bg-secondary/50 border border-border/50"
                  >
                    <p className="text-sm font-medium">{service.service_name}</p>
                    {service.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {service.description}
                      </p>
                    )}
                    {service.price && (
                      <p className="text-xs text-primary mt-1">€{service.price}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-lg border border-dashed border-border bg-secondary/20 text-center">
                <p className="text-sm text-muted-foreground">
                  Servizi in attesa di configurazione
                </p>
              </div>
            )}
          </div>

          {/* Cost Placeholder */}
          <div className="p-4 rounded-lg border border-dashed border-border bg-secondary/20">
            <p className="text-sm text-muted-foreground text-center">
              Simulazione costi disponibile dopo configurazione dati reali
            </p>
          </div>

          {/* Website Link */}
          {partner.website_url && (
            <Button variant="outline" className="w-full" asChild>
              <a href={partner.website_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Visita sito partner
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PartnersPlaceholder = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { company, hasProfile } = useCompanyProfile();
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Fetch partners from database
  const { data: dbPartners } = useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .eq("is_active", true);
      if (error) throw error;
      return data as Partner[];
    },
  });

  // Fetch selected partners for company
  const { data: selectedPartners } = useQuery({
    queryKey: ["companyPartners", company?.id],
    queryFn: async () => {
      if (!company?.id) return [];
      const { data, error } = await supabase
        .from("company_partners")
        .select("partner_id")
        .eq("company_id", company.id);
      if (error) throw error;
      return data.map((cp) => cp.partner_id);
    },
    enabled: !!company?.id,
  });

  // Fetch services for selected partner detail
  const { data: partnerServices } = useQuery({
    queryKey: ["partnerServices", selectedPartner?.id],
    queryFn: async () => {
      if (!selectedPartner || selectedPartner.id.startsWith("placeholder")) return [];
      const { data, error } = await supabase
        .from("partner_services")
        .select("*")
        .eq("partner_id", selectedPartner.id);
      if (error) throw error;
      return data as PartnerService[];
    },
    enabled: !!selectedPartner && !selectedPartner.id.startsWith("placeholder"),
  });

  // Add/remove partner mutation
  const togglePartner = useMutation({
    mutationFn: async ({ partnerId, action }: { partnerId: string; action: "add" | "remove" }) => {
      if (!company?.id) throw new Error("Configura prima il profilo azienda");

      if (action === "add") {
        const { error } = await supabase.from("company_partners").insert({
          company_id: company.id,
          partner_id: partnerId,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("company_partners")
          .delete()
          .eq("company_id", company.id)
          .eq("partner_id", partnerId);
        if (error) throw error;
      }
    },
    onSuccess: (_, { action }) => {
      queryClient.invalidateQueries({ queryKey: ["companyPartners"] });
      toast({
        title: action === "add" ? "Partner aggiunto" : "Partner rimosso",
        description: action === "add" 
          ? "Il partner è stato aggiunto alla tua azienda."
          : "Il partner è stato rimosso dalla tua azienda.",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Errore",
        description: error.message,
      });
    },
  });

  // Use DB partners if available, otherwise show placeholders
  const partners = dbPartners && dbPartners.length > 0 ? dbPartners : placeholderPartners;
  const isPlaceholderMode = !dbPartners || dbPartners.length === 0;

  const handleSelectPartner = (partner: Partner) => {
    if (partner.id.startsWith("placeholder")) {
      toast({
        title: "Partner placeholder",
        description: "Questo è un partner di esempio. I partner reali saranno disponibili a breve.",
      });
      return;
    }

    const isSelected = selectedPartners?.includes(partner.id);
    togglePartner.mutate({
      partnerId: partner.id,
      action: isSelected ? "remove" : "add",
    });
  };

  const handleViewDetails = (partner: Partner) => {
    setSelectedPartner(partner);
    setDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Users className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">Partner Welfare & Benefit</h1>
            <p className="text-muted-foreground">Servizi welfare per la tua azienda</p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <Card className="border-border/50 bg-secondary/30">
        <CardContent className="py-4">
          <p className="text-sm text-muted-foreground text-center">
            La selezione dei partner è <strong className="text-foreground">opzionale</strong>. 
            Tutte le funzionalità di TechPulse sono disponibili anche senza partner selezionati.
          </p>
        </CardContent>
      </Card>

      {/* Placeholder Mode Banner */}
      {isPlaceholderMode && (
        <Card className="border-amber-500/30 bg-amber-500/10">
          <CardContent className="py-4">
            <p className="text-sm text-amber-400 text-center">
              Nessun partner configurato nel database. I dati mostrati sono placeholder di esempio.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
          <Badge
            key={key}
            variant="outline"
            className={`cursor-pointer hover:opacity-80 ${config.className}`}
          >
            {config.label}
          </Badge>
        ))}
      </div>

      {/* Partners Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map((partner) => (
          <PartnerCard
            key={partner.id}
            partner={partner}
            isSelected={selectedPartners?.includes(partner.id) || false}
            onSelect={() => handleSelectPartner(partner)}
            onViewDetails={() => handleViewDetails(partner)}
          />
        ))}
      </div>

      {/* Selected Partners Summary */}
      {selectedPartners && selectedPartners.length > 0 && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                <span className="text-sm">
                  <strong>{selectedPartners.length}</strong> partner selezionati
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Simulazione costi disponibile con dati reali
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Partner Detail Dialog */}
      <PartnerDetailDialog
        partner={selectedPartner}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        services={partnerServices || []}
      />
    </div>
  );
};

export default PartnersPlaceholder;
