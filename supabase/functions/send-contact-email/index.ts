import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactEmailRequest = await req.json();

    // Validate input
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Tutti i campi sono obbligatori" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Email non valida" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Get current timestamp
    const timestamp = new Date().toLocaleString('it-IT', { 
      timeZone: 'Europe/Rome',
      dateStyle: 'full',
      timeStyle: 'short'
    });

    // Send email using professional template
    const fromEmail = Deno.env.get("RESEND_FROM_EMAIL") || "a.danesin@techpulselab.io";
    
    const emailResponse = await resend.emails.send({
      from: `TechPulse AI Suite <${fromEmail}>`,
      to: ["a.danesin@critical-work.com"],
      reply_to: email,
      subject: `Nuovo messaggio dal sito TechPulse: ${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); padding: 32px; text-align: center;">
            <h1 style="color: #06B6D4; margin: 0; font-size: 24px; font-weight: 600;">TechPulse AI Suite</h1>
            <p style="color: #CBD5E1; margin: 8px 0 0 0; font-size: 14px;">Nuovo messaggio dal sito</p>
          </div>
          
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #64748B; font-size: 14px; width: 100px;">Nome</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #1E293B; font-size: 14px; font-weight: 500;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #64748B; font-size: 14px;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #1E293B; font-size: 14px;"><a href="mailto:${email}" style="color: #06B6D4; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #64748B; font-size: 14px;">Oggetto</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #1E293B; font-size: 14px; font-weight: 500;">${subject}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #64748B; font-size: 14px;">Data/Ora</td>
                <td style="padding: 12px 0; color: #1E293B; font-size: 14px;">${timestamp}</td>
              </tr>
            </table>
            
            <div style="background: #F8FAFC; border-left: 4px solid #06B6D4; padding: 20px; border-radius: 0 8px 8px 0;">
              <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <div style="background: #F1F5F9; padding: 24px; text-align: center; border-top: 1px solid #E2E8F0;">
            <p style="margin: 0 0 8px 0; color: #64748B; font-size: 12px;">
              Messaggio inviato tramite il form di contatto di
            </p>
            <a href="https://techpulselab.io" style="color: #06B6D4; font-size: 14px; font-weight: 500; text-decoration: none;">techpulselab.io</a>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Email inviata con successo" }), 
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Errore nell'invio dell'email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
