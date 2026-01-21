import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/backend/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Download, Loader2, Eye, Copy, CheckCircle } from "lucide-react";

interface ReportGeneratorProps {
  profileType: "azienda" | "privato" | "freelance";
  sectionKeys: string[];
  title?: string;
}

interface SectionAnalysis {
  section_key: string;
  notes: string | null;
  ai_analysis: string | null;
  ai_analyzed_at: string | null;
}

export function ReportGenerator({ profileType, sectionKeys, title = "Report Completo" }: ReportGeneratorProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [reportContent, setReportContent] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const getSectionTitle = (key: string): string => {
    const titles: Record<string, string> = {
      // Privati
      privati_career: "Obiettivi di Carriera",
      privati_skills: "Analisi Skill e Gap",
      privati_roles: "Obiettivi Formativi e Roadmap",
      // Aziende
      aziende_trend: "Trend e Mercato",
      aziende_actions: "Piano Azioni",
      // Freelance
      freelance_positioning: "Posizionamento",
      freelance_pricing: "Pricing",
      freelance_leads: "Lead e Outreach",
    };
    return titles[key] || key;
  };

  const getProfileTitle = (): string => {
    switch (profileType) {
      case "privato": return "Report Carriera Personale";
      case "azienda": return "Report Strategico Aziendale";
      case "freelance": return "Report Business Freelance";
      default: return "Report Completo";
    }
  };

  const generateReport = async () => {
    if (!user) {
      toast({ title: "Accedi per generare il report", variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      // Fetch all section analyses
      const { data: sections, error } = await supabase
        .from("section_inputs")
        .select("section_key, notes, ai_analysis, ai_analyzed_at")
        .eq("user_id", user.id)
        .in("section_key", sectionKeys);

      if (error) throw error;

      if (!sections || sections.length === 0) {
        toast({
          title: "Nessuna analisi trovata",
          description: "Genera almeno un'analisi AI nelle sezioni prima di creare il report.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Build the report
      const report = buildReport(sections as SectionAnalysis[]);
      setReportContent(report);
      setOpen(true);

      toast({ title: "Report generato", description: "Il tuo report completo è pronto." });
    } catch (error) {
      console.error("Error generating report:", error);
      toast({ title: "Errore", description: "Impossibile generare il report.", variant: "destructive" });
    }

    setLoading(false);
  };

  const buildReport = (sections: SectionAnalysis[]): string => {
    const date = new Date().toLocaleDateString("it-IT", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    let report = `# ${getProfileTitle()}\n`;
    report += `**Data:** ${date}\n\n`;
    report += `---\n\n`;

    // Sort sections by the order in sectionKeys
    const sortedSections = sectionKeys
      .map((key) => sections.find((s) => s.section_key === key))
      .filter((s): s is SectionAnalysis => s !== undefined);

    for (const section of sortedSections) {
      const title = getSectionTitle(section.section_key);
      report += `## ${title}\n\n`;

      if (section.notes) {
        report += `### Input Utente\n${section.notes}\n\n`;
      }

      if (section.ai_analysis) {
        report += `### Analisi AI\n${section.ai_analysis}\n\n`;
      }

      if (section.ai_analyzed_at) {
        const analyzedDate = new Date(section.ai_analyzed_at).toLocaleDateString("it-IT");
        report += `*Analizzato il: ${analyzedDate}*\n\n`;
      }

      report += `---\n\n`;
    }

    report += `\n*Report generato automaticamente da TechPulse*`;

    return report;
  };

  const downloadReport = () => {
    if (!reportContent) return;

    const blob = new Blob([reportContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report-${profileType}-${new Date().toISOString().split("T")[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({ title: "Report scaricato", description: "Il file è stato salvato." });
  };

  const copyToClipboard = async () => {
    if (!reportContent) return;

    try {
      await navigator.clipboard.writeText(reportContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: "Copiato", description: "Report copiato negli appunti." });
    } catch {
      toast({ title: "Errore", description: "Impossibile copiare.", variant: "destructive" });
    }
  };

  // Convert markdown to basic HTML for preview
  const renderMarkdown = (md: string): string => {
    return md
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-6 mb-3 text-primary">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-medium mt-4 mb-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-muted-foreground">$1</em>')
      .replace(/^---$/gim, '<hr class="my-4 border-border/50" />')
      .replace(/\n/g, '<br/>');
  };

  return (
    <>
      <Button
        onClick={generateReport}
        disabled={loading}
        className="gap-2"
        variant="outline"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <FileText className="h-4 w-4" />
        )}
        {loading ? "Generazione..." : title}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {getProfileTitle()}
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[60vh] pr-4">
            {reportContent && (
              <div
                className="prose prose-sm prose-invert max-w-none p-4"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(reportContent) }}
              />
            )}
          </ScrollArea>

          <div className="flex gap-2 justify-end pt-4 border-t">
            <Button variant="outline" onClick={copyToClipboard} className="gap-2">
              {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copiato!" : "Copia"}
            </Button>
            <Button onClick={downloadReport} className="gap-2">
              <Download className="h-4 w-4" />
              Scarica MD
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ReportGenerator;
