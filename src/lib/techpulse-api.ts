const BASE_URL = "https://social-crabs-buy.loca.lt";

export async function callTechPulsePredict(prompt: string): Promise<string> {
  const url = `${BASE_URL}/predict?prompt=${encodeURIComponent(prompt)}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'bypass-tunnel-reminder': 'true', // Bypassa la pagina interstitial di localtunnel
    },
  });

  if (!response.ok) {
    throw new Error(`Errore API: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.response;
}
