import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { company } = await req.json();
    
    console.log("Received company data:", JSON.stringify(company));

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `Sei un analista predittivo aziendale per TechPulse.

Ricevi dati aziendali e produci previsioni strutturate.

REGOLE CRITICHE:
- Genera SOLO dati derivabili logicamente dagli input forniti
- NON inventare numeri specifici di fatturato o crescita percentuale esatta
- Usa scale qualitative (1-100) per gli score
- I trend devono essere coerenti con la storia fornita
- Le analisi devono essere prudenziali e realistiche

OUTPUT RICHIESTO (JSON valido):
{
  "trend": [array di 6 numeri da 0-100 rappresentanti l'andamento previsto nei prossimi 6 mesi],
  "overall_score": numero da 0-100 che rappresenta la salute complessiva prevista,
  "commentary": {
    "summary": "breve sintesi qualitativa delle prospettive aziendali (max 200 caratteri)",
    "drivers_positive": ["lista di 2-4 fattori positivi identificati"],
    "drivers_negative": ["lista di 2-4 fattori di rischio identificati"]
  }
}

IMPORTANTE:
- Rispondi SOLO con JSON valido, nessun testo aggiuntivo
- I trend devono avere esattamente 6 valori numerici
- Score e trend devono essere coerenti tra loro`;

    const userPrompt = `Analizza questa azienda e genera previsioni:

Dimensione aziendale: ${company.size || 'non specificata'} dipendenti
Settore: ${company.industry || 'non specificato'}
Paese: ${company.country || 'non specificato'}
Numero partner: ${company.partners || 0}
Storico ricavi: ${company.revenue_history?.length > 0 ? company.revenue_history.join(', ') : 'non disponibile'}
Storico dipendenti: ${company.employees_history?.length > 0 ? company.employees_history.join(', ') : 'non disponibile'}

Genera la previsione in formato JSON.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit superato. Riprova tra qualche secondo.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Crediti insufficienti. Contatta il supporto.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received");
    
    const content = data.choices?.[0]?.message?.content || '';
    
    let prediction;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        prediction = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError, 'Content:', content);
      // Fallback response
      prediction = {
        trend: [50, 52, 54, 53, 55, 57],
        overall_score: 55,
        commentary: {
          summary: "Analisi non disponibile. Dati insufficienti per una previsione accurata.",
          drivers_positive: ["Dati insufficienti"],
          drivers_negative: ["Dati insufficienti"]
        }
      };
    }

    return new Response(JSON.stringify(prediction), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in predict function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Errore durante la generazione della previsione' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
