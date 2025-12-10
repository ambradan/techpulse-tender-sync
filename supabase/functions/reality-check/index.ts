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

REGOLE CRITICHE - DIVIETO ASSOLUTO DI INVENTARE NUMERI:
- MAI inventare statistiche, percentuali, quote di mercato, fatturati, valori finanziari
- MAI scrivere cifre come "quota del 20%", "crescita del 15%", "X dipendenti", "fatturato di Y€"
- MAI citare numeri non esplicitamente presenti nei dati di input
- Se un dato numerico servirebbe ma non è disponibile, scrivi: "[dato non disponibile]"
- Usa SOLO linguaggio qualitativo: "posizione solida", "rischio moderato", "opportunità significativa"
- MAI aggiungere informazioni non presenti nei dati forniti
- Se mancano dati, indica "Dati insufficienti per questa analisi"
- Risposte brevi e focalizzate
- Italiano professionale

FORMATO OUTPUT (JSON):
{
  "strengths": ["punto di forza qualitativo 1", "punto di forza qualitativo 2"],
  "weaknesses": ["punto debole qualitativo 1", "punto debole qualitativo 2"],
  "opportunities": ["opportunità qualitativa 1", "opportunità qualitativa 2"],
  "threats": ["minaccia qualitativa 1", "minaccia qualitativa 2"],
  "summary": "sintesi QUALITATIVA senza numeri inventati"
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
        model: "google/gemini-2.5-pro",
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
