const BASE_URL = "http://127.0.0.1:8001";

export type CompanyForecastPayload = {
  name: string;
  sector: string;
  country: string;
  size: string;              // es: "10-50", "50-250", "250+"
  timeframe_months: number;  // 12, 36 o 60
  notes?: string;
};

export type CompanyAnalysisPayload = {
  name: string;
  sector: string;
  country: string;
  size: string;
  current_strategy?: string;
  notes?: string;
};

export type RealityCheckPayload = {
  idea_description: string;
  target_audience?: string;
  timeframe_months?: number;
};

export type SkillsRoadmapPayload = {
  current_role: string;
  target_role: string;
  experience_years?: number;
  skills: string[];
  constraints?: string;
};

export async function getSkillsRoadmap(
  payload: SkillsRoadmapPayload
): Promise<string> {
  const res = await fetch(`${BASE_URL}/skills/roadmap`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Errore /skills/roadmap ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.roadmap;
}

export async function runRealityCheck(
  payload: RealityCheckPayload
): Promise<string> {
  const res = await fetch(`${BASE_URL}/reality-check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Errore /reality-check ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.reality_check;
}

export async function analyzeCompany(
  payload: CompanyAnalysisPayload
): Promise<string> {
  const res = await fetch(`${BASE_URL}/company/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Errore /company/analyze ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.analysis;
}

export async function getCompanyPredictions(
  payload: CompanyForecastPayload
): Promise<string> {
  const res = await fetch(`${BASE_URL}/company/predictions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Errore /company/predictions ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.forecast;
}

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
