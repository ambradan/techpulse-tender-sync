import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TendersPlaceholder = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
          <FileText className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold">TenderMatch</h1>
          <p className="text-muted-foreground">Bandi consigliati per la tua azienda</p>
        </div>
        <Badge variant="secondary" className="ml-auto">
          <Bell className="w-3 h-3 mr-1" />
          Gratuito
        </Badge>
      </div>

      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="font-display">Bandi Consigliati</CardTitle>
          <CardDescription>Suggerimenti automatici basati sul profilo aziendale</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg bg-secondary/20">
            <p className="text-muted-foreground">Preview AI - Suggerimenti bandi in attesa di profilo aziendale</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TendersPlaceholder;
