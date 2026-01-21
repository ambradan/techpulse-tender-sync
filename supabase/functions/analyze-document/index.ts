const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { document_text, profile_type } = await req.json();

    if (!document_text || document_text.trim().length < 50) {
      return new Response(
        JSON.stringify({ error: "Contenuto documento insufficiente o mancante" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build the extraction prompt based on profile type
    const extractionPrompt = buildExtractionPrompt(profile_type, document_text);

    // Call Lovable AI Gateway
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableApiKey) {
      throw new Error("LOVABLE_API_KEY non configurata");
    }

    const aiResponse = await fetch("https://ai-gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: getSystemPrompt(profile_type),
          },
          {
            role: "user",
            content: extractionPrompt,
          },
        ],
        temperature: 0,
        max_tokens: 2000,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI Gateway error:", errorText);
      throw new Error(`AI Gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Nessuna risposta dall'AI");
    }

    // Parse the JSON response
    let extractedData;
    try {
      // Extract JSON from potential markdown code blocks
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || content.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content;
      extractedData = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("JSON parse error:", parseError, "Content:", content);
      // Return a basic structure if parsing fails
      extractedData = {
        competenze: [],
        ruolo_attuale: "",
        esperienza_anni: null,
        servizi_offerti: [],
        summary: content,
      };
    }

    return new Response(
      JSON.stringify({ extracted: extractedData }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("Error:", error);
    const message = error instanceof Error ? error.message : "Errore durante l'analisi";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function getSystemPrompt(profileType: string): string {
  const baseRules = `Sei un assistente specializzato nell'analisi di CV e documenti professionali.
REGOLE CRITICHE:
- Estrai SOLO informazioni esplicitamente presenti nel documento
- NON inventare dati, competenze, o esperienze non menzionate
- Se un dato non è presente, lascia il campo vuoto o null
- NON fare assunzioni o inferenze
- Rispondi SOLO in formato JSON valido`;

  if (profileType === "privato") {
    return `${baseRules}
Estrai le seguenti informazioni per un profilo PRIVATO/DIPENDENTE:
- Ruolo attuale
- Anni di esperienza
- Competenze tecniche e soft skill
- Settore di appartenenza
- Obiettivi di carriera (se menzionati)`;
  }

  if (profileType === "freelance") {
    return `${baseRules}
Estrai le seguenti informazioni per un profilo FREELANCE:
- Servizi offerti
- Competenze principali
- Anni di attività freelance
- Nicchia/specializzazione
- Tipi di clienti (se menzionati)`;
  }

  // Default: azienda
  return `${baseRules}
Estrai le seguenti informazioni per un profilo AZIENDALE:
- Competenze e tecnologie menzionate
- Descrizione attività
- Settore
- Eventuali ruoli o figure professionali`;
}

function buildExtractionPrompt(profileType: string, documentText: string): string {
  if (profileType === "privato") {
    return `Analizza questo CV/documento e estrai le informazioni in formato JSON:

DOCUMENTO:
${documentText.substring(0, 8000)}

RISPONDI SOLO con questo JSON (senza testo aggiuntivo):
{
  "ruolo_attuale": "string o null se non trovato",
  "esperienza_anni": number o null,
  "competenze": ["lista", "di", "competenze", "trovate"],
  "settore": "string o null",
  "ruolo_target": "string o null se menzionato",
  "summary": "breve riassunto del profilo in 2-3 frasi"
}`;
  }

  if (profileType === "freelance") {
    return `Analizza questo CV/documento e estrai le informazioni in formato JSON:

DOCUMENTO:
${documentText.substring(0, 8000)}

RISPONDI SOLO con questo JSON (senza testo aggiuntivo):
{
  "servizi_offerti": ["lista", "servizi", "offerti"],
  "competenze": ["lista", "competenze"],
  "anni_freelance": number o null,
  "nicchia": "string o null",
  "clienti_tipo": ["tipi", "di", "clienti"],
  "tariffa_oraria": number o null se menzionata,
  "summary": "breve riassunto del profilo in 2-3 frasi"
}`;
  }

  // Default: azienda
  return `Analizza questo documento aziendale e estrai le informazioni in formato JSON:

DOCUMENTO:
${documentText.substring(0, 8000)}

RISPONDI SOLO con questo JSON (senza testo aggiuntivo):
{
  "tecnologie": ["lista", "tecnologie", "menzionate"],
  "settore": "string o null",
  "descrizione": "breve descrizione attività se presente",
  "competenze_richieste": ["competenze", "o", "skills", "menzionate"],
  "summary": "breve riassunto del documento in 2-3 frasi"
}`;
}
