import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Brain, TrendingUp, TrendingDown, Loader2, Gauge, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PredictionResult {
  trend: number[];
  overall_score: number;
  commentary: {
    summary: string;
    drivers_positive: string[];
    drivers_negative: string[];
  };
}

const industries = [
  { value: "software", label: "Software" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail", label: "Retail" },
  { value: "pa-tech", label: "PA Tech" },
];

const countries = [
  { value: "IT", label: "Italia" },
  { value: "EU", label: "Europa" },
  { value: "US", label: "Stati Uniti" },
];

export default function AIPredictiveDashboard() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  
  const [formData, setFormData] = useState({
    companySize: "",
    industry: "",
    revenueHistory: "",
    employeesHistory: "",
    country: "",
    partnerCount: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const revenueArray = formData.revenueHistory
        .split(",")
        .map((v) => parseFloat(v.trim()))
        .filter((v) => !isNaN(v));

      const employeesArray = formData.employeesHistory
        .split(",")
        .map((v) => parseInt(v.trim()))
        .filter((v) => !isNaN(v));

      const { data, error } = await supabase.functions.invoke("predict", {
        body: {
          company: {
            size: parseInt(formData.companySize) || 0,
            industry: formData.industry,
            revenue_history: revenueArray,
            employees_history: employeesArray,
            country: formData.country,
            partners: parseInt(formData.partnerCount) || 0,
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
      toast({
        title: "Previsione generata",
        description: "L'analisi predittiva è stata completata con successo.",
      });
    } catch (error) {
      console.error("Prediction error:", error);
      toast({
        title: "Errore",
        description: error instanceof Error ? error.message : "Errore durante la generazione della previsione",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = result?.trend.map((value, index) => ({
    month: `M${index + 1}`,
    value,
  })) || [];

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-500";
    if (score >= 40) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          AI Predictive Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Genera previsioni aziendali basate sui dati forniti
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Dati Aziendali
            </CardTitle>
            <CardDescription>
              Inserisci i dati per generare una previsione AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size (dipendenti)</Label>
                  <Input
                    id="companySize"
                    type="number"
                    placeholder="Es: 50"
                    value={formData.companySize}
                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => setFormData({ ...formData, industry: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona settore" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((ind) => (
                        <SelectItem key={ind.value} value={ind.value}>
                          {ind.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="revenueHistory">Revenue History (valori separati da virgola)</Label>
                <Textarea
                  id="revenueHistory"
                  placeholder="Es: 100000, 120000, 150000, 180000"
                  value={formData.revenueHistory}
                  onChange={(e) => setFormData({ ...formData, revenueHistory: e.target.value })}
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeesHistory">Employees History (valori separati da virgola)</Label>
                <Textarea
                  id="employeesHistory"
                  placeholder="Es: 10, 15, 20, 25"
                  value={formData.employeesHistory}
                  onChange={(e) => setFormData({ ...formData, employeesHistory: e.target.value })}
                  className="min-h-[80px]"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => setFormData({ ...formData, country: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona paese" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="partnerCount">Partner Count</Label>
                  <Input
                    id="partnerCount"
                    type="number"
                    placeholder="Es: 5"
                    value={formData.partnerCount}
                    onChange={(e) => setFormData({ ...formData, partnerCount: e.target.value })}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generazione in corso...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Genera Previsione
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          {result ? (
            <>
              {/* Overall Score */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Gauge className="h-5 w-5 text-primary" />
                    Overall Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-5xl font-bold ${getScoreColor(result.overall_score)}`}>
                    {result.overall_score}
                    <span className="text-2xl text-muted-foreground">/100</span>
                  </div>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-primary" />
                    Sintesi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{result.commentary.summary}</p>
                </CardContent>
              </Card>

              {/* Trend Chart */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Trend Previsionale (6 mesi)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis domain={[0, 100]} className="text-xs" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))' 
                          }} 
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--primary))" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Drivers */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg text-green-600">
                      <TrendingUp className="h-5 w-5" />
                      Driver Positivi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.commentary.drivers_positive.map((driver, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-green-500 mt-1">•</span>
                          <span className="text-muted-foreground">{driver}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg text-red-600">
                      <TrendingDown className="h-5 w-5" />
                      Driver Negativi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.commentary.drivers_negative.map((driver, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-red-500 mt-1">•</span>
                          <span className="text-muted-foreground">{driver}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <Card className="h-full flex items-center justify-center min-h-[400px]">
              <CardContent className="text-center py-12">
                <Brain className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Compila il form e clicca "Genera Previsione" per visualizzare i risultati
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
