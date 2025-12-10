import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CompanyProfile {
  id: string;
  name: string;
  sector: string;
  employees: number | null;
  location: string | null;
  description: string | null;
  context: string | null;
  country?: string | null;
  user_id?: string;
  created_at: string;
  updated_at: string;
  tecnologia_usata?: unknown;
  automazione_livello?: string;
  modello_lavoro?: string;
  numero_team_tech?: number | null;
  numero_team_nontech?: number | null;
  completeness_score?: number | null;
}

export interface CompanyProfileData {
  company: CompanyProfile | null;
  partnerCount: number;
  isLoading: boolean;
  hasProfile: boolean;
  refetch: () => void;
}

export const useCompanyProfile = (): CompanyProfileData => {
  const { data: company, isLoading: companyLoading, refetch } = useQuery({
    queryKey: ["companyProfile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      // Query companies directly by user_id
      const { data: company } = await supabase
        .from("companies")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      return company as CompanyProfile | null;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const { data: partnerCount = 0 } = useQuery({
    queryKey: ["companyPartnerCount", company?.id],
    queryFn: async () => {
      if (!company?.id) return 0;
      
      const { count } = await supabase
        .from("company_partners")
        .select("*", { count: "exact", head: true })
        .eq("company_id", company.id);

      return count || 0;
    },
    enabled: !!company?.id,
  });

  return {
    company: company || null,
    partnerCount,
    isLoading: companyLoading,
    hasProfile: !!company,
    refetch,
  };
};

// Helper function to get size range string from employees count
export const getSizeRange = (employees: number | null): string => {
  if (!employees) return "Non specificato";
  if (employees < 10) return "Micro (1-9)";
  if (employees < 50) return "Piccola (10-49)";
  if (employees < 250) return "Media (50-249)";
  return "Grande (250+)";
};

// Map sector to industry value for forms
export const sectorToIndustryValue = (sector: string): string => {
  const mapping: Record<string, string> = {
    "Software & IT": "software",
    "Cybersecurity": "cybersecurity",
    "E-commerce": "retail",
    "Fintech": "software",
    "Healthcare Tech": "manufacturing",
    "EdTech": "software",
    "AI & Machine Learning": "software",
    "Cloud Services": "software",
    "IoT": "manufacturing",
    "Altro": "software",
  };
  return mapping[sector] || "software";
};
