import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Building2, Cpu, Users } from "lucide-react";

const SETTORI = [
  "Software & IT",
  "Cybersecurity",
  "E-commerce",
  "Fintech",
  "Healthcare Tech",
  "EdTech",
  "AI & Machine Learning",
  "Cloud Services",
  "IoT",
  "Manifattura",
  "Consulenza",
  "Altro",
];

const DIMENSIONI = [
  { value: "micro", label: "Micro (1-9 dipendenti)" },
  { value: "piccola", label: "Piccola (10-49 dipendenti)" },
  { value: "media", label: "Media (50-249 dipendenti)" },
  { value: "grande", label: "Grande (250+ dipendenti)" },
];

const AUTOMAZIONE = [
  { value: "basso", label: "Basso - Processi prevalentemente manuali" },
  { value: "medio", label: "Medio - Automazione parziale" },
  { value: "alto", label: "Alto - Processi altamente automatizzati" },
];

const MODELLI_LAVORO = [
  { value: "onsite", label: "In sede" },
  { value: "remote", label: "Full remote" },
  { value: "hybrid", label: "Ibrido" },
];

interface CompanyData {
  name: string;
  sector: string;
  location: string;
  employees: number | null;
  description: string;
  tecnologia_usata: string[];
  automazione_livello: string;
  modello_lavoro: string;
  numero_team_tech: number | null;
  numero_team_nontech: number | null;
}

const SimpleProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isLoading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [techInput, setTechInput] = useState("");
  
  const [formData, setFormData] = useState<CompanyData>({
    name: "",
    sector: "",
    location: "",
    employees: null,
    description: "",
    tecnologia_usata: [],
    automazione_livello: "non_specificato",
    modello_lavoro: "non_specificato",
    numero_team_tech: null,
    numero_team_nontech: null,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      loadCompanyData();
    }
  }, [user]);

  const loadCompanyData = async () => {
    if (!user) return;

    const { data: company } = await supabase
      .from("companies")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (company) {
      setCompanyId(company.id);
      const techArray = Array.isArray(company.tecnologia_usata) 
        ? company.tecnologia_usata 
        : [];
      
      setFormData({
        name: company.name || "",
        sector: company.sector || "",
        location: company.location || "",
        employees: company.employees,
        description: company.description || "",
        tecnologia_usata: techArray as string[],
        automazione_livello: company.automazione_livello || "non_specificato",
        modello_lavoro: company.modello_lavoro || "non_specificato",
        numero_team_tech: company.numero_team_tech,
        numero_team_nontech: company.numero_team_nontech,
      });
      setTechInput(techArray.join(", "));
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);

    const techArray = techInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = {
      user_id: user.id,
      name: formData.name,
      sector: formData.sector,
      location: formData.location,
      employees: formData.employees,
      description: formData.description,
      tecnologia_usata: techArray,
      automazione_livello: formData.automazione_livello,
      modello_lavoro: formData.modello_lavoro,
      numero_team_tech: formData.numero_team_tech,
      numero_team_nontech: formData.numero_team_nontech,
    };

    let error;
    if (companyId) {
      const result = await supabase
        .from("companies")
        .update(payload)
        .eq("id", companyId);
      error = result.error;
    } else {
      const result = await supabase
        .from("companies")
        .insert(payload)
        .select()
        .single();
      error = result.error;
      if (result.data) {
        setCompanyId(result.data.id);
      }
    }

    setLoading(false);

    if (error) {
      toast({
        title: "Errore",
        description: "Impossibile salvare il profilo. Riprova.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Salvato",
        description: "Profilo aziendale aggiornato con successo.",
      });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Caricamento...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Profilo Aziendale</h1>
          </div>
          <Button onClick={handleSave} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Salvataggio..." : "Salva profilo"}
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <Tabs defaultValue="generale" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="generale" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Dati Generali
            </TabsTrigger>
            <TabsTrigger value="tecnologia" className="flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              Tecnologia
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Organizzazione
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Dati Generali */}
          <TabsContent value="generale">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Dati Aziendali Generali</CardTitle>
                <CardDescription>
                  Informazioni di base sulla tua azienda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ragione Sociale *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nome azienda"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sector">Settore *</Label>
                    <Select
                      value={formData.sector}
                      onValueChange={(value) => setFormData({ ...formData, sector: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona settore" />
                      </SelectTrigger>
                      <SelectContent>
                        {SETTORI.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Sede</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Città, Paese"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dimensione">Dimensione</Label>
                    <Select
                      value={formData.employees?.toString() || ""}
                      onValueChange={(value) => {
                        const empMap: Record<string, number> = {
                          micro: 5,
                          piccola: 25,
                          media: 100,
                          grande: 500,
                        };
                        setFormData({ ...formData, employees: empMap[value] || null });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona dimensione" />
                      </SelectTrigger>
                      <SelectContent>
                        {DIMENSIONI.map((d) => (
                          <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrizione attività</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descrivi brevemente l'attività principale dell'azienda..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Tecnologia */}
          <TabsContent value="tecnologia">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Contesto Tecnologico</CardTitle>
                <CardDescription>
                  Stack tecnologico e livello di automazione
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="tech">Tecnologie utilizzate</Label>
                  <Textarea
                    id="tech"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="Es: React, Node.js, AWS, Python (separati da virgola)"
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground">
                    Inserisci le tecnologie separate da virgola
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Livello di automazione</Label>
                  <Select
                    value={formData.automazione_livello}
                    onValueChange={(value) => setFormData({ ...formData, automazione_livello: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona livello" />
                    </SelectTrigger>
                    <SelectContent>
                      {AUTOMAZIONE.map((a) => (
                        <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Modello di lavoro</Label>
                  <Select
                    value={formData.modello_lavoro}
                    onValueChange={(value) => setFormData({ ...formData, modello_lavoro: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona modello" />
                    </SelectTrigger>
                    <SelectContent>
                      {MODELLI_LAVORO.map((m) => (
                        <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Team */}
          <TabsContent value="team">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Organizzazione & Team</CardTitle>
                <CardDescription>
                  Composizione del team aziendale
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="tech_team">Team Tech (numero persone)</Label>
                    <Input
                      id="tech_team"
                      type="number"
                      min="0"
                      value={formData.numero_team_tech ?? ""}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        numero_team_tech: e.target.value ? parseInt(e.target.value) : null 
                      })}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nontech_team">Team Non-Tech (numero persone)</Label>
                    <Input
                      id="nontech_team"
                      type="number"
                      min="0"
                      value={formData.numero_team_nontech ?? ""}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        numero_team_nontech: e.target.value ? parseInt(e.target.value) : null 
                      })}
                      placeholder="0"
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Questi dati aiutano a personalizzare le analisi HR e le raccomandazioni.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SimpleProfile;
