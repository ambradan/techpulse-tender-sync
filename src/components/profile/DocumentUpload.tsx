import { useState, useRef } from "react";
import { supabase } from "@/integrations/backend/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  FileText, 
  Upload, 
  Loader2, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle,
  CheckCircle,
  Trash2
} from "lucide-react";

interface ExtractedData {
  // Privato
  ruolo_attuale?: string;
  esperienza_anni?: number | null;
  competenze?: string[];
  settore?: string;
  ruolo_target?: string;
  
  // Freelance
  servizi_offerti?: string[];
  anni_freelance?: number | null;
  nicchia?: string;
  clienti_tipo?: string[];
  tariffa_oraria?: number | null;
  
  // Azienda
  tecnologie?: string[];
  descrizione?: string;
  competenze_richieste?: string[];
  
  // Common
  summary?: string;
}

interface DocumentUploadProps {
  profileType: "azienda" | "privato" | "freelance";
  onDataExtracted: (data: ExtractedData) => void;
}

export function DocumentUpload({ profileType, onDataExtracted }: DocumentUploadProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [documentText, setDocumentText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);

  const getTitle = () => {
    switch (profileType) {
      case "privato": return "Carica il tuo CV";
      case "freelance": return "Carica il tuo portfolio/CV";
      case "azienda": return "Carica documento aziendale";
    }
  };

  const getDescription = () => {
    switch (profileType) {
      case "privato": return "L'AI estrarrà competenze ed esperienze dal tuo CV (il file NON verrà salvato)";
      case "freelance": return "L'AI estrarrà servizi e competenze dal documento (il file NON verrà salvato)";
      case "azienda": return "L'AI estrarrà informazioni dal documento aziendale (il file NON verrà salvato)";
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB for text extraction)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File troppo grande",
        description: "Il file deve essere inferiore a 5MB.",
        variant: "destructive",
      });
      return;
    }

    // Only accept text-based files for now
    const allowedTypes = [
      "text/plain",
      "text/markdown",
      "application/json",
    ];
    
    const isTextFile = allowedTypes.includes(file.type) || 
                       file.name.endsWith(".txt") || 
                       file.name.endsWith(".md");

    if (!isTextFile) {
      toast({
        title: "Formato non supportato",
        description: "Per ora supportiamo solo file di testo (.txt, .md). Per PDF o Word, copia e incolla il contenuto nella casella di testo.",
        variant: "destructive",
      });
      // Clear the input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    try {
      const text = await file.text();
      setDocumentText(text);
      setFileName(file.name);
      setExtractedData(null);
      
      toast({
        title: "File caricato",
        description: `${file.name} è pronto per l'analisi.`,
      });
    } catch (error) {
      console.error("Error reading file:", error);
      toast({
        title: "Errore lettura file",
        description: "Impossibile leggere il file. Prova a copiare il contenuto manualmente.",
        variant: "destructive",
      });
    }

    // Clear the input for potential re-upload
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyze = async () => {
    if (!documentText.trim() || documentText.trim().length < 50) {
      toast({
        title: "Contenuto insufficiente",
        description: "Inserisci almeno 50 caratteri di testo da analizzare.",
        variant: "destructive",
      });
      return;
    }

    setAnalyzing(true);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-document", {
        body: {
          document_text: documentText.trim(),
          profile_type: profileType,
        },
      });

      if (error) throw error;

      if (data?.extracted) {
        setExtractedData(data.extracted);
        toast({
          title: "Analisi completata",
          description: "Dati estratti con successo. Clicca 'Applica' per usarli.",
        });
      }
    } catch (error: any) {
      console.error("Analyze error:", error);
      
      let errorMessage = "Impossibile analizzare il documento.";
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

  const handleApply = () => {
    if (extractedData) {
      onDataExtracted(extractedData);
      toast({
        title: "Dati applicati",
        description: "I campi del profilo sono stati aggiornati con i dati estratti.",
      });
    }
  };

  const handleClear = () => {
    setDocumentText("");
    setFileName(null);
    setExtractedData(null);
  };

  const renderExtractedPreview = () => {
    if (!extractedData) return null;

    return (
      <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium text-green-500">Dati estratti</span>
        </div>
        
        <div className="space-y-2 text-sm">
          {extractedData.summary && (
            <p className="text-muted-foreground italic">{extractedData.summary}</p>
          )}
          
          {/* Privato fields */}
          {extractedData.ruolo_attuale && (
            <p><span className="text-muted-foreground">Ruolo:</span> {extractedData.ruolo_attuale}</p>
          )}
          {extractedData.esperienza_anni && (
            <p><span className="text-muted-foreground">Esperienza:</span> {extractedData.esperienza_anni} anni</p>
          )}
          {extractedData.competenze && extractedData.competenze.length > 0 && (
            <p><span className="text-muted-foreground">Competenze:</span> {extractedData.competenze.join(", ")}</p>
          )}
          
          {/* Freelance fields */}
          {extractedData.servizi_offerti && extractedData.servizi_offerti.length > 0 && (
            <p><span className="text-muted-foreground">Servizi:</span> {extractedData.servizi_offerti.join(", ")}</p>
          )}
          {extractedData.nicchia && (
            <p><span className="text-muted-foreground">Nicchia:</span> {extractedData.nicchia}</p>
          )}
          
          {/* Azienda fields */}
          {extractedData.tecnologie && extractedData.tecnologie.length > 0 && (
            <p><span className="text-muted-foreground">Tecnologie:</span> {extractedData.tecnologie.join(", ")}</p>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <Button size="sm" onClick={handleApply}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Applica al profilo
          </Button>
          <Button size="sm" variant="outline" onClick={handleClear}>
            <Trash2 className="h-4 w-4 mr-2" />
            Cancella
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="border-accent/30 bg-accent/5">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-accent/10 transition-colors rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-base">{getTitle()}</CardTitle>
                  <CardDescription className="text-sm">{getDescription()}</CardDescription>
                </div>
              </div>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-4 pt-0">
            {/* Security notice */}
            <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-500">
                Il documento viene letto solo in memoria per l'analisi AI e NON viene salvato in nessun database o storage.
              </p>
            </div>

            {/* File upload */}
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,text/plain,text/markdown"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1"
              >
                <Upload className="h-4 w-4 mr-2" />
                {fileName ? `Caricato: ${fileName}` : "Carica file (.txt, .md)"}
              </Button>
            </div>

            {/* Text area for manual input or PDF content */}
            <div className="space-y-2">
              <Textarea
                value={documentText}
                onChange={(e) => {
                  setDocumentText(e.target.value);
                  setExtractedData(null);
                }}
                placeholder="Oppure incolla qui il contenuto del tuo CV/documento (per PDF o Word, copia il testo e incollalo qui)..."
                rows={6}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                {documentText.length} caratteri {documentText.length < 50 && documentText.length > 0 && "(minimo 50)"}
              </p>
            </div>

            {/* Analyze button */}
            <Button
              onClick={handleAnalyze}
              disabled={analyzing || documentText.trim().length < 50}
              className="w-full"
            >
              {analyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analisi in corso...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  Analizza con AI
                </>
              )}
            </Button>

            {/* Extracted data preview */}
            {renderExtractedPreview()}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

export default DocumentUpload;
