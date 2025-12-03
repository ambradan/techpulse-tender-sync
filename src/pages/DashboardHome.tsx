import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DashboardOverview from "@/components/dashboard/DashboardOverview";

const DashboardHome = () => {
  const { data: company } = useQuery({
    queryKey: ["userCompany"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: profile } = await supabase
        .from("profiles")
        .select("company_id")
        .eq("id", user.id)
        .single();

      if (!profile?.company_id) return null;

      const { data: company } = await supabase
        .from("companies")
        .select("*")
        .eq("id", profile.company_id)
        .single();

      return company;
    },
  });

  return <DashboardOverview company={company} />;
};

export default DashboardHome;
