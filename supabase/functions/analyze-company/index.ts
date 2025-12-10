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
    const {
      company_name,
      sector,
      size_range,
      country,
      free_text_description,
      main_products_services,
      main_clients_types,
      perceived_risks,
      perceived_opportunities,
      tech_keywords,
    } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Sei un analizzatore aziendale per la piattaforma TechPulse.

OBIETTIVO:
Ricevi solo informazioni DICHIARATE dall'azienda e produci una SINTESI strategica in forma strutturata.

NON hai accesso a: PDF di bandi, documenti legali, CV, contratti, bilanci completi.
Non devi MAI copiare integralmente testi lunghi: devi sempre SINTETIZZARE.

COMPITO:
1. Crea un "profile_summary":
   - max 2000 caratteri
   - tono neutro, descrittivo, non promozionale
   - basato SOLO su quanto dichiarato nei campi input
   - niente frasi tipo "azienda leader", "numero 1 sul mercato", ecc. a meno che non siano dichiarate e le citi come auto-descrizione ("l'azienda si definisce…").

2. Crea "risk_tags":
   - lista di tag brevi (1–4 parole) che rappresentano rischi sintetici.
   - es: "dipendenza PA", "capacità produttiva limitata", "concorrenza big tech".
   - Devono derivare da perceived_risks o essere inferenze prudenziali basate su settore/size.
   - Se non hai abbastanza info, usa pochi tag generici tipo "informazioni insufficienti".

3. Crea "opportunity_tags":
   - lista di opportunità sintetiche (1–4 parole).
   - es: "scalabilità SaaS", "espansione estero", "partnership system integrator".
   - Devono derivare da perceived_opportunities + combinazione di sector + prodotti.

4. Crea "tech_focus":
   - lista di macro-aree tecniche rilevanti.
   - es: "cloud", "cybersecurity", "AI", "DevOps", "IoT".
   - Deriva da tech_keywords e main_products_services.

REGOLE CRITICHE - DIVIETO ASSOLUTO DI INVENTARE NUMERI:
- MAI inventare numeri: fatturato, dipendenti esatti, percentuali di crescita, quote di mercato, valori finanziari
- MAI scrivere cifre specifiche come "fatturato di 5M€", "crescita del 30%", "50 dipendenti"
- Se un numero non è dichiarato esplicitamente nei dati di input, NON citarlo
- Usa SOLO termini qualitativi: "azienda di medie dimensioni", "crescita sostenuta", "presenza consolidata"
- Se un dato numerico è richiesto ma non disponibile, scrivi: "[dato numerico non disponibile]"
- NON aggiungere informazioni non suggerite dagli input
- Se una cosa non è chiara, scrivi esplicitamente "informazione non disponibile"
- Niente marketing: descrivi, non vendere

OUTPUT:
Rispondi SEMPRE e SOLO in JSON valido:
{
  "profile_summary": "...",
  "risk_tags": ["...", "..."],
  "opportunity_tags": ["...", "..."],
  "tech_focus": ["...", "..."]
}`;

    const inputData = {
      company_name: company_name || "Non specificato",
      sector: sector || "Non specificato",
      size_range: size_range || "Non specificato",
      country: country || "Non specificato",
      free_text_description: free_text_description || "Nessuna descrizione fornita",
      main_products_services: main_products_services || [],
      main_clients_types: main_clients_types || [],
      perceived_risks: perceived_risks || [],
      perceived_opportunities: perceived_opportunities || [],
      tech_keywords: tech_keywords || [],
    };

    const userPrompt = `Analizza i seguenti dati aziendali dichiarati:

Nome azienda: ${inputData.company_name}
Settore: ${inputData.sector}
Dimensione: ${inputData.size_range}
Paese: ${inputData.country}

Descrizione (dichiarata dall'azienda):
${inputData.free_text_description}

Prodotti/Servizi principali:
${inputData.main_products_services.length > 0 ? inputData.main_products_services.join(", ") : "Non specificati"}

Tipologie clienti:
${inputData.main_clients_types.length > 0 ? inputData.main_clients_types.join(", ") : "Non specificate"}

Rischi percepiti (dichiarati):
${inputData.perceived_risks.length > 0 ? inputData.perceived_risks.join("; ") : "Non dichiarati"}

Opportunità percepite (dichiarate):
${inputData.perceived_opportunities.length > 0 ? inputData.perceived_opportunities.join("; ") : "Non dichiarate"}

Parole chiave tecnologiche:
${inputData.tech_keywords.length > 0 ? inputData.tech_keywords.join(", ") : "Non specificate"}

Genera l'analisi strutturata basandoti ESCLUSIVAMENTE su questi dati.`;

    console.log("Analyzing company:", company_name);

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

    let analysis;
    try {
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) ||
                        content.match(/```\s*([\s\S]*?)\s*```/) ||
                        [null, content];
      analysis = JSON.parse(jsonMatch[1] || content);
    } catch {
      analysis = {
        profile_summary: "Analisi non disponibile. Dati insufficienti per generare un profilo.",
        risk_tags: ["informazioni insufficienti"],
        opportunity_tags: ["informazioni insufficienti"],
        tech_focus: [],
      };
    }

    console.log("Company analysis generated successfully");

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in analyze-company:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Errore sconosciuto" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
