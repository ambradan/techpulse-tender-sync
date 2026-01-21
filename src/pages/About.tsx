import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import MainFooter from "@/components/MainFooter";
import { 
  Target,
  Users,
  Lightbulb,
  Shield,
  Heart,
  ArrowRight,
  Linkedin
} from "lucide-react";

const About = () => {
  return (
    <main className="min-h-screen bg-gradient-hero flex flex-col">
      <ConditionalNavbar />

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
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            La Mission
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
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            I Valori
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Target, title: "Precisione", desc: "Analisi basate su dati reali e modelli validati" },
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

      {/* Founder */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              La Founder
            </h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
              <span className="text-4xl font-bold text-primary-foreground">AD</span>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="font-display text-2xl font-semibold text-foreground mb-1">
                Ambra Danesin
              </h3>
              <p className="text-primary font-medium mb-4">AI Systems Builder</p>
              <p className="text-muted-foreground mb-4">
                Governance e compliance systems per enterprise: procurement intelligence, security analysis, clinical decision support. Background HR → tech: porto rigore metodologico dove serve. Architetture privacy-by-design, audit-ready. Framework epistemici per AI non deterministici.
              </p>
              <a 
                href="https://www.linkedin.com/in/ambradanesin/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center">
          <Heart className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Inizia a Usare TechPulse
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Scopri come l'AI può supportare le tue decisioni strategiche.
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
                Contattami
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
