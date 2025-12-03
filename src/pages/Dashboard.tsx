import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import CompanyHero from "@/components/dashboard/CompanyHero";
import TrendSection from "@/components/dashboard/TrendSection";
import PredictionsSection from "@/components/dashboard/PredictionsSection";
import PartnersWelfareSection from "@/components/dashboard/PartnersWelfareSection";
import TendersSection from "@/components/dashboard/TendersSection";
import RealityCheckSection from "@/components/dashboard/RealityCheckSection";
import HRConsultantSection from "@/components/dashboard/HRConsultantSection";

// Local types until DB types are synced
interface Company {
  id: string;
  name: string;
  sector: string;
  employees: number | null;
  founded_year: number | null;
  description: string | null;
  context: string | null;
}

interface Trend {
  id: string;
  title: string;
  summary: string;
  impact_score: number | null;
  category: string;
}

interface Partner {
  id: string;
  name: string;
  category: string;
  description: string | null;
  is_active: boolean | null;
  pricing_type: string | null;
  price_per_employee: number | null;
  min_employees: number | null;
  benefits: string[] | null;
  rating: number | null;
  website_url: string | null;
}

interface Tender {
  id: string;
  title: string;
  value: number | null;
  deadline: string | null;
  match_score: number | null;
  category: string | null;
}

const Dashboard = () => {
  const { data: company } = useQuery({
    queryKey: ["company"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("companies" as any)
        .select("*")
        .limit(1)
        .single();
      if (error) throw error;
      return data as unknown as Company;
    },
  });

  const { data: trends } = useQuery({
    queryKey: ["trends"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("market_trends" as any)
        .select("*")
        .order("impact_score", { ascending: false });
      if (error) throw error;
      return data as unknown as Trend[];
    },
  });

  const { data: partners } = useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("partners" as any)
        .select("*")
        .eq("is_active", true);
      if (error) throw error;
      return data as unknown as Partner[];
    },
  });

  const { data: tenders } = useQuery({
    queryKey: ["tenders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recommended_tenders" as any)
        .select("*")
        .order("match_score", { ascending: false });
      if (error) throw error;
      return data as unknown as Tender[];
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <CompanyHero company={company} />
        <div className="grid lg:grid-cols-2 gap-8">
          <RealityCheckSection />
          <HRConsultantSection />
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <TrendSection trends={trends || []} />
          <PredictionsSection />
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <PartnersWelfareSection partners={partners || []} employeeCount={company?.employees || 85} />
          <TendersSection tenders={tenders || []} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
