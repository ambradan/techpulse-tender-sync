import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code } = await req.json();
    
    if (!code || typeof code !== 'string') {
      console.log('Invalid code format received');
      return new Response(
        JSON.stringify({ valid: false, error: 'Codice non valido' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const validCode = Deno.env.get('KARRYCAR_ACCESS_CODE');
    
    if (!validCode) {
      console.error('KARRYCAR_ACCESS_CODE not configured');
      return new Response(
        JSON.stringify({ valid: false, error: 'Sistema non configurato' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const isValid = code.trim().toUpperCase() === validCode.trim().toUpperCase();
    
    console.log(`Code validation attempt: ${isValid ? 'SUCCESS' : 'FAILED'}`);

    if (isValid) {
      // Generate a simple session token (timestamp + random)
      const sessionToken = `KC_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
      
      return new Response(
        JSON.stringify({ 
          valid: true, 
          sessionToken,
          expiresAt,
          message: 'Accesso autorizzato' 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({ valid: false, error: 'Codice non corretto' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error validating code:', error);
    return new Response(
      JSON.stringify({ valid: false, error: 'Errore durante la validazione' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
