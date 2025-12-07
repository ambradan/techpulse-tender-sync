import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import { 
  Target,
  Users,
  Lightbulb,
  Shield,
  Award,
  Heart,
  ArrowRight
} from "lucide-react";

const About = () => {
  return (
    <main className="min-h-screen bg-gradient-hero flex flex-col">
      <MainNavbar />

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            Chi Siamo
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            TechPulse nasce dalla visione di rendere la consulenza strategica accessibile a tutti, 
            grazie all'intelligenza artificiale predittiva.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              La Nostra Mission
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Democratizzare l'accesso alla consulenza strategica di alto livello. 
              Crediamo che ogni azienda, professionista e freelance meriti di avere 
              un consulente esperto sempre a disposizione.
            </p>
            <p className="text-muted-foreground text-lg">
              Con TechPulse, portiamo la potenza dell'AI predittiva nelle tasche di chi 
              deve prendere decisioni importanti per il proprio futuro lavorativo.
            </p>
          </div>
          
          <div className="bg-gradient-card rounded-2xl border border-border/50 p-8">
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "10K+", label: "Utenti Attivi" },
                { value: "95%", label: "Accuratezza Previsioni" },
                { value: "500+", label: "Aziende Partner" },
                { value: "24/7", label: "Disponibilità" },
              ].map((stat, i) => (
                <div key={i} className="text-center p-4">
                  <div className="text-3xl font-display font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            I Nostri Valori
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Target, title: "Precisione", desc: "Previsioni basate su dati reali e modelli validati" },
            { icon: Users, title: "Accessibilità", desc: "Consulenza di alto livello per tutti" },
            { icon: Lightbulb, title: "Innovazione", desc: "Tecnologia AI all'avanguardia" },
            { icon: Shield, title: "Affidabilità", desc: "Sicurezza e privacy dei dati garantite" },
          ].map((item, index) => (
            <Card key={index} className="bg-gradient-card border-border/50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Il Team
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Un team di esperti in AI, business strategy e sviluppo software
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { name: "Marco Rossi", role: "CEO & Founder", desc: "Ex consulente McKinsey, 15 anni di esperienza" },
            { name: "Laura Bianchi", role: "CTO", desc: "PhD in Machine Learning, ex Google" },
            { name: "Alessandro Verdi", role: "Head of Product", desc: "Product leader con background in fintech" },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                <Users className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{member.name}</h3>
              <p className="text-primary text-sm mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center">
          <Heart className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Unisciti a Noi
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Vuoi far parte della rivoluzione della consulenza AI-powered?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="gap-2">
                Inizia Ora
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/contatti">
              <Button size="lg" variant="outline">
                Contattaci
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <MainFooter />
    </main>
  );
};

export default About;
