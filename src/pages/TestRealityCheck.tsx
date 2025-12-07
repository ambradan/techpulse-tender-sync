import { useState } from "react";
import { runRealityCheck, RealityCheckPayload } from "@/lib/techpulse-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const TestRealityCheck = () => {
  const [ideaDescription, setIdeaDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [timeframeMonths, setTimeframeMonths] = useState<string>("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    const payload: RealityCheckPayload = {
      idea_description: ideaDescription,
      target_audience: targetAudience || undefined,
      timeframe_months: timeframeMonths ? Number(timeframeMonths) : undefined,
    };

    try {
      const realityCheck = await runRealityCheck(payload);
      setResult(realityCheck);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore nel backend, riprova più tardi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Test Reality Check</h1>
        <p className="text-muted-foreground">
          Testa l'endpoint POST /reality-check del backend FastAPI.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Descrivi la tua idea</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ideaDescription">Descrivi la tua idea / progetto</Label>
                <Textarea
                  id="ideaDescription"
                  value={ideaDescription}
                  onChange={(e) => setIdeaDescription(e.target.value)}
                  placeholder="Descrivi in dettaglio la tua idea di business o progetto..."
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target di riferimento (facoltativo)</Label>
                <Input
                  id="targetAudience"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="Es: PMI italiane, startup tech, professionisti..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeframe">Orizzonte temporale (facoltativo)</Label>
                <Select value={timeframeMonths} onValueChange={setTimeframeMonths}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona orizzonte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 mesi</SelectItem>
                    <SelectItem value="24">24 mesi</SelectItem>
                    <SelectItem value="36">36 mesi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" disabled={isLoading || !ideaDescription.trim()} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifica in corso...
                  </>
                ) : (
                  "Esegui Reality Check"
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
              <CardTitle>Reality Check TechPulse</CardTitle>
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

export default TestRealityCheck;
