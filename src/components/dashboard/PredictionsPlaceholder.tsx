import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "lucide-react";

const PredictionsPlaceholder = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
          <LineChart className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold">Previsioni</h1>
          <p className="text-muted-foreground">Analisi predittiva basata su AI</p>
        </div>
      </div>

      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="font-display">Previsioni Base</CardTitle>
          <CardDescription>Previsioni generate dall'intelligenza artificiale</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg bg-secondary/20">
            <p className="text-muted-foreground">Preview AI - Previsioni in attesa di dati aziendali</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionsPlaceholder;
