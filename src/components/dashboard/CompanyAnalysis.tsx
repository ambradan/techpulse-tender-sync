import { useState } from "react";
import { useCompanyProfile, getSizeRange } from "@/hooks/useCompanyProfile";
import { supabase } from "@/integrations/backend/client";
import CompanyProfileGate from "@/components/dashboard/CompanyProfileGate";
import CompanyContextBanner from "@/components/dashboard/CompanyContextBanner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  Cpu, 
  FileText,
  Loader2,
  Building2,
  Info
} from "lucide-react";

interface CompanyAnalysis {
  profile_summary: string;
  risk_tags: string[];
  opportunity_tags: string[];
  tech_focus: string[];
}

const CompanyAnalysisSection = () => {
  const { toast } = useToast();
  const { company, isLoading, hasProfile } = useCompanyProfile();
  const [analysis, setAnalysis] = useState<CompanyAnalysis | null>(null);
  const [generating, setGenerating] = useState(false);
  
  // Additional input fields
  const [productsServices, setProductsServices] = useState("");
  const [clientTypes, setClientTypes] = useState("");
  const [perceivedRisks, setPerceivedRisks] = useState("");
  const [perceivedOpportunities, setPerceivedOpportunities] = useState("");
  const [techKeywords, setTechKeywords] = useState("");

  const generateAnalysis = async () => {
    if (!company) {
      toast({
        title: "Profilo richiesto",
        description: "Configura prima il profilo aziendale",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    try {
      const parseList = (text: string) => 
        text.split(",").map(s => s.trim()).filter(s => s.length > 0);

      const getSizeRange = (employees: number | null) => {
        if (!employees) return "Non specificato";
        if (employees < 10) return "Micro (1-9)";
        if (employees < 50) return "Piccola (10-49)";
        if (employees < 250) return "Media (50-249)";
        return "Grande (250+)";
      };

      const { data, error } = await supabase.functions.invoke("analyze-company", {
        body: {
          company_name: company.name,
          sector: company.sector,
          size_range: getSizeRange(company.employees),
          country: company.location || "Italia",
          free_text_description: company.description || "",
          main_products_services: parseList(productsServices),
          main_clients_types: parseList(clientTypes),
          perceived_risks: parseList(perceivedRisks),
          perceived_opportunities: parseList(perceivedOpportunities),
          tech_keywords: parseList(techKeywords),
        },
      });

      if (error) throw error;
      
      setAnalysis(data.analysis);
      toast({
        title: "Analisi completata",
        description: "Profilo aziendale analizzato con successo",
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Errore",
        description: "Impossibile generare l'analisi",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  if (!company) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            Configura il profilo aziendale per generare l'analisi strategica
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            Analisi Strategica Aziendale
          </h2>
          <p className="text-muted-foreground">
            Sintesi basata esclusivamente sui dati dichiarati
          </p>
        </div>
        <Button onClick={generateAnalysis} disabled={generating}>
          {generating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analisi in corso...
            </>
          ) : (
            <>
              <Brain className="mr-2 h-4 w-4" />
              {analysis ? "Rigenera Analisi" : "Genera Analisi"}
            </>
          )}
        </Button>
      </div>

      {/* Disclaimer */}
      <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20">
        <CardContent className="flex items-start gap-3 py-4">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-800 dark:text-blue-200">
            L'analisi viene generata esclusivamente sui dati inseriti. Non vengono inventati numeri, 
            percentuali o informazioni non dichiarate. Il tono è neutro e descrittivo.
          </p>
        </CardContent>
      </Card>

      {/* Input Fields for Additional Data */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dati Aggiuntivi per l'Analisi</CardTitle>
          <CardDescription>
            Compila questi campi per un'analisi più dettagliata (opzionale)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="products">Prodotti/Servizi principali</Label>
              <Textarea
                id="products"
                placeholder="es: Consulenza IT, Sviluppo software, Cloud services (separati da virgola)"
                value={productsServices}
                onChange={(e) => setProductsServices(e.target.value)}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clients">Tipologie clienti</Label>
              <Input
                id="clients"
                placeholder="es: PA, PMI, Grandi imprese (separati da virgola)"
                value={clientTypes}
                onChange={(e) => setClientTypes(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="risks">Rischi percepiti</Label>
              <Textarea
                id="risks"
                placeholder="es: Dipendenza da pochi clienti, Difficoltà reperimento talenti (separati da virgola)"
                value={perceivedRisks}
                onChange={(e) => setPerceivedRisks(e.target.value)}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="opportunities">Opportunità percepite</Label>
              <Textarea
                id="opportunities"
                placeholder="es: Espansione mercato estero, Nuovi bandi PNRR (separati da virgola)"
                value={perceivedOpportunities}
                onChange={(e) => setPerceivedOpportunities(e.target.value)}
                rows={2}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tech">Parole chiave tecnologiche</Label>
            <Input
              id="tech"
              placeholder="es: AI, Cloud, DevOps, SaaS, Cybersecurity (separate da virgola)"
              value={techKeywords}
              onChange={(e) => setTechKeywords(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Profile Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Profilo Sintetico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {analysis.profile_summary}
              </p>
            </CardContent>
          </Card>

          {/* Tags Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Risk Tags */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Rischi Identificati
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analysis.risk_tags.length > 0 ? (
                    analysis.risk_tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200"
                      >
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Nessun rischio identificato</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Opportunity Tags */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                  Opportunità
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analysis.opportunity_tags.length > 0 ? (
                    analysis.opportunity_tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200"
                      >
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Nessuna opportunità identificata</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tech Focus */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Cpu className="h-5 w-5 text-blue-500" />
                  Focus Tecnologico
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analysis.tech_focus.length > 0 ? (
                    analysis.tech_focus.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-200"
                      >
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Nessun focus tecnologico</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Placeholder when no analysis */}
      {!analysis && !generating && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Brain className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center mb-2">
              Nessuna analisi generata
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Compila i campi aggiuntivi e clicca "Genera Analisi" per ottenere una sintesi strategica
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompanyAnalysisSection;
