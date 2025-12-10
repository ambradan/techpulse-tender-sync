import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import MainNavbar from "./MainNavbar";
import DashboardNavbar from "./dashboard/DashboardNavbar";

const ConditionalNavbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show nothing while checking auth (prevents flash)
  if (isAuthenticated === null) {
    return (
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50 h-16" />
    );
  }

  return isAuthenticated ? <DashboardNavbar /> : <MainNavbar />;
};

export default ConditionalNavbar;
