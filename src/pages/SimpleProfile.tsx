import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/backend/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Building2, Cpu, Users, User, Briefcase } from "lucide-react";

type ProfileType = "azienda" | "privato" | "freelance";

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
  "Marketing",
  "Design",
  "Altro",
];

const DIMENSIONI = [
  { value: "micro", label: "Micro (1-9 dipendenti)", employees: 5 },
  { value: "piccola", label: "Piccola (10-49 dipendenti)", employees: 25 },
  { value: "media", label: "Media (50-249 dipendenti)", employees: 100 },
  { value: "grande", label: "Grande (250+ dipendenti)", employees: 500 },
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

const ESPERIENZA_OPTIONS = [
  { value: 0, label: "Entry level (0-2 anni)" },
  { value: 3, label: "Junior (3-5 anni)" },
  { value: 6, label: "Mid-level (6-10 anni)" },
  { value: 11, label: "Senior (11+ anni)" },
];

interface ProfileData {
  // Common
  profile_type: ProfileType;
  full_name: string;
  
  // Azienda (stored in companies table)
  company_name: string;
  sector: string;
  location: string;
  employees: number | null;
  description: string;
  tecnologia_usata: string[];
  automazione_livello: string;
  modello_lavoro: string;
  numero_team_tech: number | null;
  numero_team_nontech: number | null;
  
  // Privato
  ruolo_attuale: string;
  esperienza_anni: number | null;
  competenze: string[];
  ruolo_target: string;
  settore_interesse: string;
  
  // Freelance
  servizi_offerti: string[];
  tariffa_oraria: number | null;
  nicchia: string;
  anni_freelance: number | null;
  clienti_tipo: string[];
}

const SimpleProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isLoading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [profileId, setProfileId] = useState<string | null>(null);
  
  // Text inputs for comma-separated values
  const [techInput, setTechInput] = useState("");
  const [competenzeInput, setCompetenzeInput] = useState("");
  const [serviziInput, setServiziInput] = useState("");
  const [clientiInput, setClientiInput] = useState("");
  
  const [formData, setFormData] = useState<ProfileData>({
    profile_type: "azienda",
    full_name: "",
    company_name: "",
    sector: "",
    location: "",
    employees: null,
    description: "",
    tecnologia_usata: [],
    automazione_livello: "non_specificato",
    modello_lavoro: "non_specificato",
    numero_team_tech: null,
    numero_team_nontech: null,
    ruolo_attuale: "",
    esperienza_anni: null,
    competenze: [],
    ruolo_target: "",
    settore_interesse: "",
    servizi_offerti: [],
    tariffa_oraria: null,
    nicchia: "",
    anni_freelance: null,
    clienti_tipo: [],
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;

    // Load profile data
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    // Load company data if exists
    const { data: company } = await supabase
      .from("companies")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (profile) {
      setProfileId(profile.id);
      const competenzeArray = Array.isArray(profile.competenze) ? profile.competenze : [];
      const serviziArray = Array.isArray(profile.servizi_offerti) ? profile.servizi_offerti : [];
      const clientiArray = Array.isArray(profile.clienti_tipo) ? profile.clienti_tipo : [];
      
      setFormData(prev => ({
        ...prev,
        profile_type: (profile.profile_type as ProfileType) || "azienda",
        full_name: profile.full_name || "",
        ruolo_attuale: profile.ruolo_attuale || "",
        esperienza_anni: profile.esperienza_anni,
        competenze: competenzeArray as string[],
        ruolo_target: profile.ruolo_target || "",
        settore_interesse: profile.settore_interesse || "",
        servizi_offerti: serviziArray as string[],
        tariffa_oraria: profile.tariffa_oraria,
        nicchia: profile.nicchia || "",
        anni_freelance: profile.anni_freelance,
        clienti_tipo: clientiArray as string[],
      }));
      
      setCompetenzeInput((competenzeArray as string[]).join(", "));
      setServiziInput((serviziArray as string[]).join(", "));
      setClientiInput((clientiArray as string[]).join(", "));
    }

    if (company) {
      setCompanyId(company.id);
      const techArray = Array.isArray(company.tecnologia_usata) ? company.tecnologia_usata : [];
      
      setFormData(prev => ({
        ...prev,
        company_name: company.name || "",
        sector: company.sector || "",
        location: company.location || "",
        employees: company.employees,
        description: company.description || "",
        tecnologia_usata: techArray as string[],
        automazione_livello: company.automazione_livello || "non_specificato",
        modello_lavoro: company.modello_lavoro || "non_specificato",
        numero_team_tech: company.numero_team_tech,
        numero_team_nontech: company.numero_team_nontech,
      }));
      setTechInput((techArray as string[]).join(", "));
    }
  };

  const parseCommaSeparated = (input: string): string[] => {
    return input.split(",").map(s => s.trim()).filter(s => s.length > 0);
  };

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);

    try {
      // Update profile
      const profilePayload = {
        id: user.id,
        full_name: formData.full_name,
        profile_type: formData.profile_type,
        ruolo_attuale: formData.ruolo_attuale,
        esperienza_anni: formData.esperienza_anni,
        competenze: parseCommaSeparated(competenzeInput),
        ruolo_target: formData.ruolo_target,
        settore_interesse: formData.settore_interesse,
        servizi_offerti: parseCommaSeparated(serviziInput),
        tariffa_oraria: formData.tariffa_oraria,
        nicchia: formData.nicchia,
        anni_freelance: formData.anni_freelance,
        clienti_tipo: parseCommaSeparated(clientiInput),
      };

      const { error: profileError } = await supabase
        .from("profiles")
        .upsert(profilePayload, { onConflict: "id" });

      if (profileError) throw profileError;

      // If azienda, also save company data
      if (formData.profile_type === "azienda" && formData.company_name) {
        const companyPayload = {
          user_id: user.id,
          name: formData.company_name,
          sector: formData.sector,
          location: formData.location,
          employees: formData.employees,
          description: formData.description,
          tecnologia_usata: parseCommaSeparated(techInput),
          automazione_livello: formData.automazione_livello,
          modello_lavoro: formData.modello_lavoro,
          numero_team_tech: formData.numero_team_tech,
          numero_team_nontech: formData.numero_team_nontech,
        };

        if (companyId) {
          const { error } = await supabase
            .from("companies")
            .update(companyPayload)
            .eq("id", companyId);
          if (error) throw error;
        } else {
          const { data, error } = await supabase
            .from("companies")
            .insert(companyPayload)
            .select()
            .single();
          if (error) throw error;
          if (data) setCompanyId(data.id);
        }
      }

      toast({
        title: "Salvato",
        description: "Profilo aggiornato con successo.",
      });
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: "Errore",
        description: "Impossibile salvare il profilo. Riprova.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Caricamento...</div>
      </div>
    );
  }

  const getProfileTypeLabel = (type: ProfileType) => {
    switch (type) {
      case "azienda": return "Azienda";
      case "privato": return "Privato";
      case "freelance": return "Freelance";
    }
  };

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
            <h1 className="text-xl font-semibold text-foreground">Il Mio Profilo</h1>
          </div>
          <Button onClick={handleSave} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Salvataggio..." : "Salva profilo"}
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Type Selection */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>Tipo di profilo</CardTitle>
            <CardDescription>
              Seleziona il tipo di utente per personalizzare la tua esperienza
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {(["azienda", "privato", "freelance"] as ProfileType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData({ ...formData, profile_type: type })}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    formData.profile_type === type
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 text-muted-foreground"
                  }`}
                >
                  {type === "azienda" && <Building2 className="h-8 w-8" />}
                  {type === "privato" && <User className="h-8 w-8" />}
                  {type === "freelance" && <Briefcase className="h-8 w-8" />}
                  <span className="font-medium">{getProfileTypeLabel(type)}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Common Fields */}
        <Card className="mb-6 border-border/50">
          <CardHeader>
            <CardTitle>Informazioni Base</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="full_name">Nome completo</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="Mario Rossi"
              />
            </div>
          </CardContent>
        </Card>

        {/* Azienda Fields */}
        {formData.profile_type === "azienda" && (
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

            <TabsContent value="generale">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Dati Aziendali</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company_name">Ragione Sociale *</Label>
                      <Input
                        id="company_name"
                        value={formData.company_name}
                        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
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
                      <Label>Dimensione</Label>
                      <Select
                        value={DIMENSIONI.find(d => d.employees === formData.employees)?.value || ""}
                        onValueChange={(value) => {
                          const dim = DIMENSIONI.find(d => d.value === value);
                          setFormData({ ...formData, employees: dim?.employees || null });
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

            <TabsContent value="tecnologia">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Contesto Tecnologico</CardTitle>
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
                    <p className="text-sm text-muted-foreground">Inserisci le tecnologie separate da virgola</p>
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

            <TabsContent value="team">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Organizzazione & Team</CardTitle>
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
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Privato Fields */}
        {formData.profile_type === "privato" && (
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Profilo Professionale</CardTitle>
              <CardDescription>Informazioni sulla tua carriera attuale e obiettivi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="ruolo_attuale">Ruolo attuale</Label>
                  <Input
                    id="ruolo_attuale"
                    value={formData.ruolo_attuale}
                    onChange={(e) => setFormData({ ...formData, ruolo_attuale: e.target.value })}
                    placeholder="Es: Software Developer, Marketing Manager..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Anni di esperienza</Label>
                  <Select
                    value={formData.esperienza_anni?.toString() || ""}
                    onValueChange={(value) => setFormData({ ...formData, esperienza_anni: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona esperienza" />
                    </SelectTrigger>
                    <SelectContent>
                      {ESPERIENZA_OPTIONS.map((e) => (
                        <SelectItem key={e.value} value={e.value.toString()}>{e.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="competenze">Competenze principali</Label>
                <Textarea
                  id="competenze"
                  value={competenzeInput}
                  onChange={(e) => setCompetenzeInput(e.target.value)}
                  placeholder="Es: JavaScript, Project Management, Data Analysis (separati da virgola)"
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">Inserisci le competenze separate da virgola</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="ruolo_target">Ruolo target (obiettivo)</Label>
                  <Input
                    id="ruolo_target"
                    value={formData.ruolo_target}
                    onChange={(e) => setFormData({ ...formData, ruolo_target: e.target.value })}
                    placeholder="Es: Tech Lead, Product Manager..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Settore di interesse</Label>
                  <Select
                    value={formData.settore_interesse}
                    onValueChange={(value) => setFormData({ ...formData, settore_interesse: value })}
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
            </CardContent>
          </Card>
        )}

        {/* Freelance Fields */}
        {formData.profile_type === "freelance" && (
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Profilo Freelance</CardTitle>
              <CardDescription>Informazioni sui tuoi servizi e posizionamento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="servizi">Servizi offerti</Label>
                <Textarea
                  id="servizi"
                  value={serviziInput}
                  onChange={(e) => setServiziInput(e.target.value)}
                  placeholder="Es: Web Development, Consulenza UX, SEO (separati da virgola)"
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">Inserisci i servizi separati da virgola</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nicchia">Nicchia/Specializzazione</Label>
                  <Input
                    id="nicchia"
                    value={formData.nicchia}
                    onChange={(e) => setFormData({ ...formData, nicchia: e.target.value })}
                    placeholder="Es: E-commerce per fashion brand"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tariffa">Tariffa oraria (€)</Label>
                  <Input
                    id="tariffa"
                    type="number"
                    min="0"
                    value={formData.tariffa_oraria ?? ""}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      tariffa_oraria: e.target.value ? parseFloat(e.target.value) : null 
                    })}
                    placeholder="50"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="anni_freelance">Anni da freelance</Label>
                  <Input
                    id="anni_freelance"
                    type="number"
                    min="0"
                    value={formData.anni_freelance ?? ""}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      anni_freelance: e.target.value ? parseInt(e.target.value) : null 
                    })}
                    placeholder="3"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Settore principale</Label>
                  <Select
                    value={formData.settore_interesse}
                    onValueChange={(value) => setFormData({ ...formData, settore_interesse: value })}
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
              <div className="space-y-2">
                <Label htmlFor="clienti">Tipi di clienti ideali</Label>
                <Textarea
                  id="clienti"
                  value={clientiInput}
                  onChange={(e) => setClientiInput(e.target.value)}
                  placeholder="Es: Startup tech, PMI manifatturiere, Agenzie creative (separati da virgola)"
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">Inserisci i tipi di clienti separati da virgola</p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default SimpleProfile;
