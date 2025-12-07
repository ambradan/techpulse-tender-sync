import { useState } from "react";
import { getSkillsRoadmap, SkillsRoadmapPayload } from "@/lib/techpulse-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const TestSkillsRoadmap = () => {
  const [currentRole, setCurrentRole] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [skillsText, setSkillsText] = useState("");
  const [constraints, setConstraints] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    const skills = skillsText
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const payload: SkillsRoadmapPayload = {
      current_role: currentRole,
      target_role: targetRole,
      experience_years: experienceYears ? Number(experienceYears) : undefined,
      skills,
      constraints: constraints || undefined,
    };

    try {
      const roadmap = await getSkillsRoadmap(payload);
      setResult(roadmap);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore nel backend, riprova più tardi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Test Skills Roadmap</h1>
        <p className="text-muted-foreground">
          Testa l'endpoint POST /skills/roadmap del backend FastAPI.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Dati Profilo</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentRole">Ruolo attuale</Label>
                <Input
                  id="currentRole"
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                  placeholder="Es: Junior Developer"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetRole">Ruolo target</Label>
                <Input
                  id="targetRole"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="Es: Senior Full Stack Developer"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceYears">Anni di esperienza (facoltativo)</Label>
                <Input
                  id="experienceYears"
                  type="number"
                  min="0"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  placeholder="Es: 3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Competenze attuali (separate da virgola)</Label>
                <Textarea
                  id="skills"
                  value={skillsText}
                  onChange={(e) => setSkillsText(e.target.value)}
                  placeholder="Es: JavaScript, React, Node.js, SQL"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="constraints">Vincoli / note (facoltativo)</Label>
                <Textarea
                  id="constraints"
                  value={constraints}
                  onChange={(e) => setConstraints(e.target.value)}
                  placeholder="Es: Budget limitato, preferisco corsi in italiano, max 10 ore/settimana"
                  rows={3}
                />
              </div>

              <Button type="submit" disabled={isLoading || !currentRole.trim() || !targetRole.trim() || !skillsText.trim()} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generazione roadmap...
                  </>
                ) : (
                  "Genera Roadmap"
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
              <CardTitle>Roadmap competenze TechPulse</CardTitle>
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

export default TestSkillsRoadmap;
