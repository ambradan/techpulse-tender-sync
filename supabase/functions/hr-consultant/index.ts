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
    const { role, contractType, sector } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Sei un consulente del lavoro esperto. Genera raccomandazioni QUALITATIVE sulla gestione dei costi del personale.

REGOLE CRITICHE - DIVIETO ASSOLUTO DI INVENTARE NUMERI:
- MAI inventare statistiche, percentuali, valori finanziari, RAL, stipendi, costi
- MAI scrivere cifre come "RAL di 35.000€", "costo del 40%", "contributi al 30%"
- MAI suggerire range salariali numerici o valori monetari specifici
- Se l'utente chiede un valore numerico, rispondi: "Il dato numerico non è disponibile. Consulta un professionista per valutazioni specifiche."
- Usa SOLO termini qualitativi: "costo significativo", "onere moderato", "impatto rilevante"
- Focus su rischi potenziali, considerazioni contrattuali, trend normativi
- Usa termini come "possibile", "potenziale", "considerare", "valutare"
- Italiano professionale

FORMATO OUTPUT (JSON):
{
  "recommendations": [
    "raccomandazione qualitativa senza numeri 1",
    "raccomandazione qualitativa senza numeri 2",
    "raccomandazione qualitativa senza numeri 3"
  ],
  "contractNotes": "nota qualitativa sul tipo di contratto (NESSUN NUMERO)",
  "riskFactors": "fattori di rischio qualitativi (NESSUN NUMERO)"
}`;

    const userPrompt = `Genera raccomandazioni QUALITATIVE per:

Ruolo: ${role || "Non specificato"}
Tipo contratto: ${contractType || "Non specificato"}
Settore: ${sector || "Non specificato"}

Fornisci solo consigli qualitativi senza alcun numero o valore.`;

    console.log("Generating HR recommendations for role:", role);

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

    let advice;
    try {
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) ||
                        content.match(/```\s*([\s\S]*?)\s*```/) ||
                        [null, content];
      advice = JSON.parse(jsonMatch[1] || content);
    } catch {
      advice = {
        recommendations: ["Consulta un professionista per una valutazione dettagliata"],
        contractNotes: "Valutazione in corso",
        riskFactors: "Analisi in elaborazione",
      };
    }

    console.log("HR advice generated successfully");

    return new Response(JSON.stringify({ advice }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in hr-consultant:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Errore sconosciuto" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
