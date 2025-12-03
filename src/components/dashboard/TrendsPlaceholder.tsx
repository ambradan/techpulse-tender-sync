import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const TrendsPlaceholder = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold">Trend Attuali</h1>
          <p className="text-muted-foreground">Monitoraggio trend di mercato</p>
        </div>
      </div>

      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="font-display">Analisi Trend</CardTitle>
          <CardDescription>Trend di mercato rilevanti per il tuo settore</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg bg-secondary/20">
            <p className="text-muted-foreground">Preview AI - Analisi trend in attesa di configurazione</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendsPlaceholder;
