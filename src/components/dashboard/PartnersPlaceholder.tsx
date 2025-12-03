import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

const PartnersPlaceholder = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
          <Users className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold">Partner Welfare & Benefit</h1>
          <p className="text-muted-foreground">Servizi welfare per la tua azienda</p>
        </div>
      </div>

      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="font-display">Partner Disponibili</CardTitle>
          <CardDescription>La selezione dei partner è opzionale</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg bg-secondary/20">
            <p className="text-muted-foreground">Nessun partner disponibile</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnersPlaceholder;
