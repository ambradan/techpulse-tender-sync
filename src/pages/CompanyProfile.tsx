import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Building2, Save, ArrowLeft } from "lucide-react";

const SECTORS = [
  "Software & IT",
  "E-commerce",
  "Fintech",
  "Healthcare Tech",
  "EdTech",
  "AI & Machine Learning",
  "Cybersecurity",
  "Cloud Services",
  "IoT",
  "Altro",
];

const CompanyProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    sector: "",
    employees: "",
    description: "",
    location: "",
  });

  useEffect(() => {
    loadCompanyData();
  }, []);

  const loadCompanyData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }

    // Get profile to check company_id
    const { data: profile } = await supabase
      .from("profiles")
      .select("company_id")
      .eq("id", user.id)
      .single();

    if (profile?.company_id) {
      setCompanyId(profile.company_id);
      const { data: company } = await supabase
        .from("companies")
        .select("*")
        .eq("id", profile.company_id)
        .single();

      if (company) {
        setFormData({
          name: company.name || "",
          sector: company.sector || "",
          employees: company.employees?.toString() || "",
          description: company.description || "",
          location: (company as any).location || "",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }

    const companyData = {
      name: formData.name,
      sector: formData.sector,
      employees: formData.employees ? parseInt(formData.employees) : null,
      description: formData.description,
      location: formData.location,
    };

    try {
      if (companyId) {
        // Update existing company
        const { error } = await supabase
          .from("companies")
          .update(companyData)
          .eq("id", companyId);

        if (error) throw error;
      } else {
        // Create new company
        const { data: newCompany, error: companyError } = await supabase
          .from("companies")
          .insert(companyData)
          .select()
          .single();

        if (companyError) throw companyError;

        // Link company to profile
        const { error: profileError } = await supabase
          .from("profiles")
          .update({ company_id: newCompany.id })
          .eq("id", user.id);

        if (profileError) throw profileError;
        setCompanyId(newCompany.id);
      }

      toast({
        title: "Profilo salvato",
        description: "I dati aziendali sono stati aggiornati.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Errore",
        description: error.message,
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Torna alla dashboard
        </Button>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="font-display">Profilo Azienda</CardTitle>
                <CardDescription>Configura i dati della tua azienda</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome azienda *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="La tua azienda S.r.l."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sector">Settore *</Label>
                <Select
                  value={formData.sector}
                  onValueChange={(value) => setFormData({ ...formData, sector: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona settore" />
                  </SelectTrigger>
                  <SelectContent>
                    {SECTORS.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employees">Numero dipendenti</Label>
                <Input
                  id="employees"
                  type="number"
                  value={formData.employees}
                  onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                  placeholder="50"
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Sede</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Milano, Italia"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrizione breve</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descrivi brevemente la tua azienda..."
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Salvataggio..." : "Salva profilo"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyProfile;
