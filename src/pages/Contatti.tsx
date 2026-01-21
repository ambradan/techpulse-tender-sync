import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import MainFooter from "@/components/MainFooter";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/backend/client";
import { 
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Linkedin,
  Loader2
} from "lucide-react";

const Contatti = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast({
        title: "Campi obbligatori",
        description: "Compila tutti i campi del form.",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email non valida",
        description: "Inserisci un indirizzo email valido.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Messaggio inviato!",
        description: "Ti risponderò il prima possibile.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      console.error("Error sending contact email:", error);
      toast({
        title: "Errore nell'invio",
        description: error.message || "Riprova più tardi o contattami direttamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-hero flex flex-col">
      <ConditionalNavbar />

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            Contattami
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Hai domande o vuoi saperne di più? Sono qui per aiutarti.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Inviami un Messaggio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      placeholder="Il tuo nome"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      disabled={isLoading}
                      maxLength={100}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@esempio.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={isLoading}
                      maxLength={255}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Oggetto</Label>
                  <Input
                    id="subject"
                    placeholder="Di cosa vuoi parlarmi?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    disabled={isLoading}
                    maxLength={200}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Messaggio</Label>
                  <Textarea
                    id="message"
                    placeholder="Scrivi il tuo messaggio..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    disabled={isLoading}
                    maxLength={2000}
                  />
                </div>
                
                <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Invio in corso...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Invia Messaggio
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Informazioni di Contatto
              </h2>
              <p className="text-muted-foreground mb-8">
                Puoi raggiungermi attraverso i seguenti canali. 
                Rispondo solitamente entro 24 ore lavorative.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Phone, label: "Telefono", value: "338.908.5894", href: "tel:+393389085894" },
                { icon: Linkedin, label: "LinkedIn", value: "Ambra Danesin", href: "https://www.linkedin.com/in/ambradanesin/" },
                { icon: MapPin, label: "Sede", value: "Milano, Italia", href: "#" },
                { icon: Clock, label: "Orari", value: "Lun-Ven 9:00-18:00", href: "#" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="font-medium text-foreground">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Direct Contact */}
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  Preferisci scrivermi direttamente?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Per richieste urgenti o particolari, puoi contattarmi via LinkedIn.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href="https://www.linkedin.com/in/ambradanesin/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <Linkedin className="w-4 h-4" />
                    Contattami su LinkedIn
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <MainFooter />
    </main>
  );
};

export default Contatti;
