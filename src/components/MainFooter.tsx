import { Link } from "react-router-dom";
import { Activity } from "lucide-react";

const MainFooter = () => {
  return (
    <footer className="border-t border-border/50 bg-background/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">TechPulse</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Il Consulente in Tasca per il Futuro del Lavoro.
              AI predittiva + consigli concreti, personalizzati e immediati.
            </p>
          </div>

          {/* Prodotti */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Prodotti</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/aziende" className="hover:text-foreground transition-colors">
                  Per le Aziende
                </Link>
              </li>
              <li>
                <Link to="/privati" className="hover:text-foreground transition-colors">
                  Per i Privati
                </Link>
              </li>
              <li>
                <Link to="/freelance" className="hover:text-foreground transition-colors">
                  Per i Freelance
                </Link>
              </li>
            </ul>
          </div>

          {/* Azienda */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Azienda</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-foreground transition-colors">
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link to="/contatti" className="hover:text-foreground transition-colors">
                  Contatti
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Lavora con Noi
                </a>
              </li>
            </ul>
          </div>

          {/* Legale */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Legale</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-foreground transition-colors">
                  Termini di Servizio
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 TechPulse. Tutti i diritti riservati.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://www.linkedin.com/in/ambradanesin/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
