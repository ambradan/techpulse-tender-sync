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

    const systemPrompt = `Sei un analista strategico per aziende tech. Genera previsioni QUALITATIVE basate sul profilo aziendale fornito.

REGOLE CRITICHE - DIVIETO ASSOLUTO DI INVENTARE NUMERI:
- MAI inventare statistiche, percentuali, tassi di crescita, fatturati, valori finanziari
- MAI scrivere cifre specifiche come "crescita del 15%", "fatturato di 2M€", "mercato da X miliardi"
- MAI citare numeri di dipendenti, clienti, prodotti, vendite non dichiarati esplicitamente
- Se un numero non è fornito nei dati di input, NON menzionarlo
- Se serve riferirsi a una quantità non disponibile, scrivi: "[dato numerico non disponibile]"
- Usa ESCLUSIVAMENTE termini qualitativi: "crescita moderata", "tendenza positiva", "rischio elevato", "potenziale interessante"
- Focus su trend di mercato, opportunità settoriali, sfide potenziali
- Linguaggio professionale in italiano

FORMATO OUTPUT (JSON):
{
  "marketTrend": "previsione qualitativa sul trend (NESSUN NUMERO)",
  "opportunities": "opportunità qualitative (NESSUN NUMERO)",
  "challenges": "sfide qualitative (NESSUN NUMERO)",
  "strategicFocus": "suggerimento qualitativo (NESSUN NUMERO)",
  "confidence": "bassa|media|alta"
}`;

    const userPrompt = `Analizza il seguente profilo aziendale e genera previsioni QUALITATIVE:

Azienda: ${company.name || "Non specificato"}
Settore: ${company.sector || "Non specificato"}
Dipendenti: ${company.employees || "Non specificato"}
Descrizione: ${company.description || "Non disponibile"}
Sede: ${company.location || "Non specificata"}

Genera previsioni qualitative senza alcun numero o percentuale.`;

    console.log("Generating predictions for company:", company.name);

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

    // Try to parse JSON from response
    let predictions;
    try {
      // Extract JSON from potential markdown code blocks
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || 
                        content.match(/```\s*([\s\S]*?)\s*```/) ||
                        [null, content];
      predictions = JSON.parse(jsonMatch[1] || content);
    } catch {
      // If parsing fails, create structured response from text
      predictions = {
        marketTrend: content.substring(0, 200),
        opportunities: "Analisi in corso",
        challenges: "Analisi in corso",
        strategicFocus: "Analisi in corso",
        confidence: "media",
      };
    }

    console.log("Predictions generated successfully");

    return new Response(JSON.stringify({ predictions }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-predictions:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Errore sconosciuto" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
