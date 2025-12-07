import { useState } from "react";
import { analyzeCompany, CompanyAnalysisPayload } from "@/lib/techpulse-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const TestCompanyAnalyze = () => {
  const [name, setName] = useState("");
  const [sector, setSector] = useState("");
  const [country, setCountry] = useState("");
  const [size, setSize] = useState("");
  const [currentStrategy, setCurrentStrategy] = useState("");
  const [notes, setNotes] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    const payload: CompanyAnalysisPayload = {
      name,
      sector,
      country,
      size,
      current_strategy: currentStrategy || undefined,
      notes: notes || undefined,
    };

    try {
      const analysis = await analyzeCompany(payload);
      setResult(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore nel backend, riprova più tardi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Test Company Analyze</h1>
        <p className="text-muted-foreground">
          Testa l'endpoint POST /company/analyze del backend FastAPI.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Dati Azienda</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome azienda</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Es: TechCorp S.r.l."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sector">Settore</Label>
                <Input
                  id="sector"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  placeholder="Es: Tecnologia, Manifattura, Servizi..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Paese</Label>
                <Input
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Es: Italia"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Dimensione</Label>
                <Select value={size} onValueChange={setSize} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona dimensione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10-50">10-50 dipendenti</SelectItem>
                    <SelectItem value="50-250">50-250 dipendenti</SelectItem>
                    <SelectItem value="250+">250+ dipendenti</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentStrategy">Strategia attuale</Label>
                <Textarea
                  id="currentStrategy"
                  value={currentStrategy}
                  onChange={(e) => setCurrentStrategy(e.target.value)}
                  placeholder="Descrivi la strategia attuale dell'azienda..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Note (facoltative)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Informazioni aggiuntive..."
                  rows={3}
                />
              </div>

              <Button type="submit" disabled={isLoading || !size} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analisi in corso...
                  </>
                ) : (
                  "Genera Analisi"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <p className="text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Analisi TechPulse</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap text-foreground">{result}</div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TestCompanyAnalyze;
