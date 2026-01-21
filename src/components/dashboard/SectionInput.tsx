import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/backend/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Brain, ChevronDown, ChevronUp, Save, Loader2 } from "lucide-react";
import type { Json } from "@/integrations/supabase/types";

interface SectionInputProps {
  sectionKey: string;
  title: string;
  description?: string;
  placeholder?: string;
  structuredFields?: React.ReactNode;
  structuredData?: Record<string, unknown>;
  profileType?: "azienda" | "privato" | "freelance";
  profileContext?: Record<string, unknown>;
  onAnalysisComplete?: (analysis: string) => void;
}

export function SectionInput({
  sectionKey,
  title,
  description,
  placeholder = "Inserisci le tue note, obiettivi o considerazioni per questa sezione...",
  structuredFields,
  structuredData = {},
  profileType = "azienda",
  profileContext = {},
  onAnalysisComplete,
}: SectionInputProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notes, setNotes] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Load existing data
  useEffect(() => {
    if (user) {
      loadSectionData();
    }
  }, [user, sectionKey]);

  const loadSectionData = async () => {
    if (!user) return;

    const { data } = await supabase
      .from("section_inputs")
      .select("*")
      .eq("user_id", user.id)
      .eq("section_key", sectionKey)
      .maybeSingle();

    if (data) {
      setNotes(data.notes || "");
      setAiAnalysis(data.ai_analysis);
      if (data.updated_at) {
        setLastSaved(new Date(data.updated_at));
      }
    }
  };

  const handleSave = useCallback(async () => {
    if (!user || !notes.trim()) return;

    setLoading(true);

    try {
      // Check if record exists
      const { data: existing } = await supabase
        .from("section_inputs")
        .select("id")
        .eq("user_id", user.id)
        .eq("section_key", sectionKey)
        .maybeSingle();

      if (existing) {
        // Update existing record
        const { error } = await supabase
          .from("section_inputs")
          .update({
            notes: notes.trim(),
            structured_data: structuredData as Json,
          })
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        // Insert new record - cast to any to bypass type mismatch
        const { error } = await (supabase
          .from("section_inputs") as any)
          .insert({
            user_id: user.id,
            section_key: sectionKey,
            notes: notes.trim(),
            structured_data: structuredData as Json,
          });
        if (error) throw error;
      }

      setLastSaved(new Date());
      toast({
        title: "Salvato",
        description: "Le tue note sono state salvate.",
      });
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: "Errore",
        description: "Impossibile salvare. Riprova.",
        variant: "destructive",
      });
    }

    setLoading(false);
  }, [user, notes, sectionKey, structuredData, toast]);

  const handleAnalyze = async () => {
    if (!user || !notes.trim()) {
      toast({
        title: "Note richieste",
        description: "Inserisci delle note prima di analizzare.",
        variant: "destructive",
      });
      return;
    }

    setAnalyzing(true);

    try {
      // First save the notes
      await handleSave();

      // Then call the AI analysis
      const { data, error } = await supabase.functions.invoke("analyze-section", {
        body: {
          section_key: sectionKey,
          notes: notes.trim(),
          structured_data: structuredData,
          profile_type: profileType,
          profile_context: profileContext,
        },
      });

      if (error) throw error;

      const analysis = data?.analysis;
      if (analysis) {
        setAiAnalysis(analysis);
        
        // Save the analysis to the database
        await supabase
          .from("section_inputs")
          .update({
            ai_analysis: analysis,
            ai_analyzed_at: new Date().toISOString(),
          })
          .eq("user_id", user.id)
          .eq("section_key", sectionKey);

        onAnalysisComplete?.(analysis);

        toast({
          title: "Analisi completata",
          description: "L'analisi AI è stata generata.",
        });
      }
    } catch (error: any) {
      console.error("Analyze error:", error);
      
      let errorMessage = "Impossibile completare l'analisi.";
      if (error.message?.includes("429")) {
        errorMessage = "Limite di richieste raggiunto. Riprova tra qualche minuto.";
      } else if (error.message?.includes("402")) {
        errorMessage = "Crediti AI esauriti.";
      }
      
      toast({
        title: "Errore analisi",
        description: errorMessage,
        variant: "destructive",
      });
    }

    setAnalyzing(false);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="border-border/50 bg-secondary/20">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-secondary/30 transition-colors rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">{title}</CardTitle>
                  {description && (
                    <CardDescription className="text-sm">{description}</CardDescription>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {aiAnalysis && (
                  <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded">
                    Analizzato
                  </span>
                )}
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-4 pt-0">
            {/* Structured fields if provided */}
            {structuredFields && (
              <div className="space-y-4 pb-4 border-b border-border/50">
                {structuredFields}
              </div>
            )}

            {/* Notes textarea */}
            <div className="space-y-2">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={placeholder}
                rows={4}
                className="resize-none"
              />
              {lastSaved && (
                <p className="text-xs text-muted-foreground">
                  Ultimo salvataggio: {lastSaved.toLocaleTimeString("it-IT")}
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                disabled={loading || !notes.trim()}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Salva
              </Button>
              <Button
                size="sm"
                onClick={handleAnalyze}
                disabled={analyzing || !notes.trim()}
                className="gap-2"
              >
                {analyzing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Brain className="h-4 w-4" />
                )}
                {analyzing ? "Analisi in corso..." : "Analizza con AI"}
              </Button>
            </div>

            {/* AI Analysis result */}
            {aiAnalysis && (
              <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Analisi AI</span>
                </div>
                <div className="prose prose-sm prose-invert max-w-none">
                  <div 
                    className="text-sm text-foreground whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ 
                      __html: aiAnalysis
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br/>') 
                    }}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

export default SectionInput;
