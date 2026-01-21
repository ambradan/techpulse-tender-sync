import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AnalyzeRequest {
  section_key: string;
  notes: string;
  structured_data: Record<string, unknown>;
  profile_type: "azienda" | "privato" | "freelance";
  profile_context: Record<string, unknown>;
}

const SECTION_PROMPTS: Record<string, string> = {
  // Aziende sections
  aziende_trend: "Analizza le note dell'utente sui trend di mercato e fornisci insight strategici per la sua azienda.",
  aziende_predictions: "Basandoti sulle note dell'utente, analizza le previsioni per il suo business.",
  aziende_risk: "Analizza i rischi menzionati dall'utente e fornisci una valutazione.",
  aziende_actions: "Analizza le azioni pianificate e suggerisci priorità e miglioramenti.",
  aziende_hiring: "Analizza le esigenze di hiring dell'utente e fornisci raccomandazioni.",
  
  // Privati sections
  privati_career: "Analizza gli obiettivi di carriera dell'utente e fornisci una roadmap.",
  privati_skills: "Analizza le competenze attuali e target e suggerisci un percorso formativo.",
  privati_roles: "Analizza i ruoli target e valuta la compatibilità con il profilo attuale.",
  
  // Freelance sections
  freelance_positioning: "Analizza il posizionamento del freelance e suggerisci miglioramenti.",
  freelance_pricing: "Analizza le tariffe e fornisci raccomandazioni di pricing.",
  freelance_leads: "Analizza il target clienti e suggerisci strategie di lead generation.",
  freelance_services: "Analizza i servizi offerti e suggerisci ottimizzazioni.",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const body: AnalyzeRequest = await req.json();
    const { section_key, notes, structured_data, profile_type, profile_context } = body;

    if (!section_key || !notes) {
      return new Response(
        JSON.stringify({ error: "section_key and notes are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const sectionPrompt = SECTION_PROMPTS[section_key] || "Analizza le note dell'utente e fornisci insight utili.";

    const systemPrompt = `Sei un assistente AI per TechPulse, una piattaforma di analisi predittiva.

REGOLE CRITICHE:
1. NON inventare MAI dati numerici, statistiche, percentuali o valori finanziari
2. Se un dato numerico è necessario ma non disponibile, scrivi "[dato numerico non disponibile]"
3. Basa l'analisi SOLO sulle informazioni fornite dall'utente
4. Fornisci analisi qualitative, non quantitative inventate
5. Sii conciso e azionabile
6. Rispondi SEMPRE in italiano

CONTESTO PROFILO (${profile_type}):
${JSON.stringify(profile_context, null, 2)}

DATI STRUTTURATI SEZIONE:
${JSON.stringify(structured_data, null, 2)}

ISTRUZIONI SPECIFICHE:
${sectionPrompt}

Fornisci l'analisi in formato strutturato con:
- **Sintesi**: 2-3 frasi chiave
- **Punti di forza**: elementi positivi identificati
- **Aree di attenzione**: aspetti da monitorare o migliorare
- **Azioni suggerite**: 2-3 azioni concrete e immediate`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: notes }
        ],
        temperature: 0, // Zero temperature for deterministic, no-hallucination output
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite di richieste raggiunto. Riprova tra qualche minuto." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Crediti AI esauriti. Contatta il supporto." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const analysis = aiResponse.choices?.[0]?.message?.content || "Analisi non disponibile.";

    return new Response(
      JSON.stringify({ 
        analysis,
        analyzed_at: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("analyze-section error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Errore interno" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
