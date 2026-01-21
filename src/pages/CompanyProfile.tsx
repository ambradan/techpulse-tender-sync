import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/backend/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Building2, Save, ArrowLeft, Trash2, Shield } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const { user, isLoading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    sector: "",
    employees: "",
    description: "",
    location: "",
  });

  // Redirect to auth if not logged in
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
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }

    // Query companies directly by user_id
    const { data: company } = await supabase
      .from("companies")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (company) {
      setCompanyId(company.id);
      setFormData({
        name: company.name || "",
        sector: company.sector || "",
        employees: company.employees?.toString() || "",
        description: company.description || "",
        location: company.location || "",
      });
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
      user_id: user.id,
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
        title: "Profilo aziendale salvato correttamente",
        description: "I dati sono stati aggiornati.",
      });
    } catch (error: any) {
      console.error("Save error:", error);
      toast({
        variant: "destructive",
        title: "Errore nel salvataggio del profilo aziendale",
        description: "Riprova più tardi.",
      });
    }

    setLoading(false);
  };

  const handleReset = async () => {
    setDeleting(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      // Unlink company from profile first
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ company_id: null })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Delete company if exists
      if (companyId) {
        const { error: deleteError } = await supabase
          .from("companies")
          .delete()
          .eq("id", companyId);

        if (deleteError) throw deleteError;
      }

      // Reset form
      setCompanyId(null);
      setFormData({
        name: "",
        sector: "",
        employees: "",
        description: "",
        location: "",
      });

      toast({
        title: "Profilo aziendale cancellato",
        description: "I dati sono stati rimossi.",
      });
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({
        variant: "destructive",
        title: "Errore nella cancellazione",
        description: "Riprova più tardi.",
      });
    }

    setDeleting(false);
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
                  min="0"
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

              <div className="flex gap-3">
                <Button type="submit" className="flex-1" disabled={loading || deleting}>
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "Salvataggio..." : "Salva profilo"}
                </Button>

                {companyId && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="text-destructive border-destructive/30 hover:bg-destructive/10"
                        disabled={loading || deleting}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Cancellare il profilo aziendale?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Vuoi davvero cancellare il profilo aziendale? Questa azione non può essere annullata.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annulla</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={handleReset}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {deleting ? "Cancellazione..." : "Cancella profilo"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </form>

            {/* Privacy notice */}
            <div className="mt-6 pt-4 border-t border-border/30">
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>
                  I dati inseriti qui sono solo aziendali, vengono salvati in modo sicuro e puoi cancellare 
                  il profilo in qualsiasi momento. Nessuna informazione personale o sensibile viene richiesta 
                  o utilizzata per il motore AI.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyProfile;
