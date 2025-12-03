import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { company } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Sei un consulente strategico. Genera un'analisi SWOT QUALITATIVA basata ESCLUSIVAMENTE sui dati aziendali forniti.

REGOLE CRITICHE:
- MAI inventare numeri, percentuali, statistiche o valori finanziari
- MAI aggiungere informazioni non presenti nei dati forniti
- Se mancano dati, indica "Dati insufficienti per questa analisi"
- Usa linguaggio qualitativo: "possibile", "potenziale", "tendenza"
- Risposte brevi e focalizzate
- Italiano professionale

FORMATO OUTPUT (JSON):
{
  "strengths": ["punto di forza 1", "punto di forza 2"],
  "weaknesses": ["punto debole 1", "punto debole 2"],
  "opportunities": ["opportunità 1", "opportunità 2"],
  "threats": ["minaccia 1", "minaccia 2"],
  "summary": "breve sintesi qualitativa dell'analisi"
}

Se i dati sono insufficienti, restituisci array con singolo elemento "Dati insufficienti per analisi dettagliata".`;

    const userPrompt = `Genera analisi SWOT QUALITATIVA per:

Azienda: ${company.name || "Non specificato"}
Settore: ${company.sector || "Non specificato"}
Dipendenti: ${company.employees || "Non specificato"}
Descrizione: ${company.description || "Non disponibile"}
Sede: ${company.location || "Non specificata"}

Basati SOLO su questi dati. Non inventare informazioni.`;

    console.log("Generating SWOT analysis for:", company.name);

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
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite richieste raggiunto, riprova tra poco." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Crediti AI esauriti." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Errore gateway AI");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Nessuna risposta dall'AI");
    }

    let swotAnalysis;
    try {
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) ||
                        content.match(/```\s*([\s\S]*?)\s*```/) ||
                        [null, content];
      swotAnalysis = JSON.parse(jsonMatch[1] || content);
    } catch {
      swotAnalysis = {
        strengths: ["Analisi in elaborazione"],
        weaknesses: ["Analisi in elaborazione"],
        opportunities: ["Analisi in elaborazione"],
        threats: ["Analisi in elaborazione"],
        summary: content.substring(0, 300),
      };
    }

    console.log("SWOT analysis generated successfully");

    return new Response(JSON.stringify({ swot: swotAnalysis }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in reality-check:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Errore sconosciuto" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
