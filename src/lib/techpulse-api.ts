export async function callTechPulsePredict(prompt: string): Promise<string> {
  const url = `https://smooth-crabs-raise.loca.lt/predict?prompt=${encodeURIComponent(prompt)}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Errore API: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.response;
}
