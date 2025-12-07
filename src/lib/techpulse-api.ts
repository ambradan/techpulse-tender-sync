const BASE_URL = "http://127.0.0.1:8001";

export async function callTechPulsePredict(prompt: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Errore backend ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.response;
}

// Health check per verificare che il backend sia attivo
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/`);
    return res.ok;
  } catch {
    return false;
  }
}
