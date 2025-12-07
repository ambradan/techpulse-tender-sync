import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { callTechPulsePredict } from "@/lib/techpulse-api";
import { Loader2 } from "lucide-react";

const TestPredict = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await callTechPulsePredict(prompt);
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore sconosciuto");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Test TechPulse Predict</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Invia una richiesta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Inserisci il tuo prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <Button 
              onClick={handleSubmit} 
              disabled={isLoading || !prompt.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Caricamento…
                </>
              ) : (
                "Chiedi a TechPulse"
              )}
            </Button>
          </CardContent>
        </Card>

        {isLoading && (
          <Card className="border-muted">
            <CardContent className="py-6 text-center text-muted-foreground">
              <Loader2 className="mx-auto h-8 w-8 animate-spin mb-2" />
              Caricamento…
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="border-destructive bg-destructive/10">
            <CardContent className="py-6">
              <p className="text-destructive font-medium">Errore:</p>
              <p className="text-destructive/80">{error}</p>
            </CardContent>
          </Card>
        )}

        {response && (
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg">Risposta AI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground whitespace-pre-wrap">{response}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TestPredict;
