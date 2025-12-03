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
    const { companyContext, sector } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Running Reality Check analysis for:", companyContext);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `Sei un consulente strategico esperto per aziende tech italiane. Genera un'analisi Reality Check completa in formato JSON.

Il JSON deve seguire ESATTAMENTE questa struttura:
{
  "swot": {
    "strengths": ["punto1", "punto2", "punto3"],
    "weaknesses": ["punto1", "punto2", "punto3"],
    "opportunities": ["punto1", "punto2", "punto3"],
    "threats": ["punto1", "punto2", "punto3"]
  },
  "resilience": 72,
  "suggestions": [
    {"area": "Investimenti IT", "suggestion": "descrizione", "priority": "high"},
    {"area": "Crescita Team", "suggestion": "descrizione", "priority": "medium"},
    {"area": "Rischi Operativi", "suggestion": "descrizione", "priority": "high"}
  ],
  "benchmarks": [
    {"name": "Innovazione", "score": 78, "benchmark": 65, "status": "green"},
    {"name": "Efficienza Operativa", "score": 62, "benchmark": 70, "status": "yellow"},
    {"name": "Solidità Finanziaria", "score": 55, "benchmark": 72, "status": "red"},
    {"name": "Competenze Digitali", "score": 85, "benchmark": 68, "status": "green"},
    {"name": "Customer Satisfaction", "score": 71, "benchmark": 75, "status": "yellow"}
  ]
}

Note:
- resilience è un numero da 0 a 100
- priority può essere solo: "high", "medium", "low"
- status può essere solo: "green", "yellow", "red" (green se score > benchmark, yellow se vicino, red se molto sotto)
- Genera dati realistici basati sul contesto aziendale e settore forniti
- Considera trend macroeconomici italiani ed europei attuali

Rispondi SOLO con il JSON, senza markdown o altro testo.`,
          },
          {
            role: "user",
            content: `Genera un'analisi Reality Check strategica per questa azienda:

Contesto: ${companyContext}
Settore: ${sector}

Considera i trend di mercato attuali: PNRR, NIS2 cybersecurity, crescita cloud, carenza talenti tech, inflazione.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(JSON.stringify({ error: "Rate limit raggiunto, riprova tra poco." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(JSON.stringify({ error: "Crediti AI esauriti." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    console.log("AI response content:", content);

    // Parse JSON from response
    let analysis;
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      // Return default data if parsing fails
      analysis = null;
    }

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in reality-check:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
