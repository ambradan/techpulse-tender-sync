import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock
} from "lucide-react";

const Contatti = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Messaggio inviato",
      description: "Ti risponderemo il prima possibile.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-gradient-hero flex flex-col">
      <MainNavbar />

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            Contattaci
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Hai domande o vuoi saperne di più? Siamo qui per aiutarti.
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
                Inviaci un Messaggio
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
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Oggetto</Label>
                  <Input
                    id="subject"
                    placeholder="Di cosa vuoi parlarci?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
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
                  />
                </div>
                
                <Button type="submit" className="w-full gap-2">
                  <Send className="w-4 h-4" />
                  Invia Messaggio
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
                Puoi raggiungerci attraverso i seguenti canali. 
                Il nostro team risponde entro 24 ore lavorative.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Phone, label: "Telefono", value: "338.908.5894", href: "tel:+393389085894" },
                { icon: MapPin, label: "Sede", value: "Milano, Italia", href: "#" },
                { icon: Clock, label: "Orari", value: "Lun-Ven 9:00-18:00", href: "#" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
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

            {/* FAQ Link */}
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  Hai domande frequenti?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Consulta la nostra sezione FAQ per trovare risposte immediate alle domande più comuni.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="mailto:ambradan91@gmail.com?subject=FAQ TechPulse">
                    Contattaci per FAQ
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
