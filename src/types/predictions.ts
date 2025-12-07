// Types for Company Predictions (Aziende)
export interface CompanyPrediction {
  overall_score: number;
  label: string;
  trend: Array<{ month: string; index: number }>;
  commentary: {
    summary: string;
    drivers_positive: string[];
    drivers_negative: string[];
  };
  actions: {
    hiring?: string;
    training?: string;
    compliance?: string;
    automation?: string;
    partnerships?: string;
    diversification?: string;
  };
  scenarios: {
    optimistic: string;
    base: string;
    pessimistic: string;
  };
}

// Types for Private/Career Predictions (Privati)
export interface PrivatePrediction {
  main_role: string;
  horizon: string;
  commentary: {
    summary: string;
  };
  roles: Array<{
    title: string;
    probability: number;
    time_horizon: number;
  }>;
  gap: {
    strengths: string[];
    missing_skills: string[];
  };
  learning_plan: Array<{
    month: number;
    focus: string;
    suggested_resources: string[];
  }>;
  what_if: {
    change_sector: string;
    better_english: string;
    new_skill: string;
  };
}

// Types for Freelance Predictions
export interface FreelancePrediction {
  positioning: {
    niche: string;
    value_prop: string;
  };
  commentary: {
    summary: string;
  };
  demand_trend: Array<{
    service_name: string;
    month: string;
    demand_index: number;
  }>;
  sectors: Array<{
    sector_name: string;
    budget_level: string;
    opportunity_note: string;
  }>;
  pricing: Array<{
    service_name: string;
    suggested_price: number;
    pricing_model: 'hourly' | 'retainer' | 'project';
  }>;
  leads: {
    target_companies: string[];
    target_roles: string[];
    sample_message: string;
  };
}
