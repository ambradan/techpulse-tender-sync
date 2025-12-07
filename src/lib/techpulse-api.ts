export async function callTechPulsePredict(prompt: string): Promise<string> {
  const url = `http://127.0.0.1:8000/predict?prompt=${encodeURIComponent(prompt)}`;
  
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
