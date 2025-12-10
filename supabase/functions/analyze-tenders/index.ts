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
    const { companyProfile, tenders } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Analyzing tenders for:", companyProfile);

    const tendersContext = tenders.map((t: any) => 
      `- ${t.title} (${t.category}, ${t.value}€, match: ${t.match}%)`
    ).join("\n");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          {
            role: "system",
            content: `Sei un esperto di gare d'appalto italiane, specializzato nel settore tech.
Analizza il profilo aziendale e le gare disponibili per fornire insights strategici.

REGOLE CRITICHE - DIVIETO ASSOLUTO DI INVENTARE NUMERI:
- MAI inventare statistiche, percentuali, budget, valori finanziari non presenti nei dati
- I valori delle gare sono già forniti: usali, ma NON inventarne altri
- Usa termini qualitativi: "elevata compatibilità", "potenziale interessante", "rischio moderato"
- Se un dato non è disponibile, non inventarlo

Rispondi in italiano, in modo conciso (max 100 parole). Includi:
1. Quali gare prioritizzare e perché
2. Opportunità strategiche basate sul PNRR e trend attuali
3. Un consiglio operativo immediato

Sii diretto e pratico.`,
          },
          {
            role: "user",
            content: `Profilo aziendale: ${companyProfile}

Gare disponibili:
${tendersContext}

Fornisci un'analisi strategica per questa azienda.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(JSON.stringify({ error: "Rate limit raggiunto" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(JSON.stringify({ error: "Crediti AI esauriti" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const insights = data.choices?.[0]?.message?.content || "Analisi non disponibile.";

    console.log("AI insights generated");

    return new Response(JSON.stringify({ insights }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in analyze-tenders:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
