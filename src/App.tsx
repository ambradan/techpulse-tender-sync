import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import CompanyProfile from "./pages/CompanyProfile";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import TrendsPlaceholder from "./components/dashboard/TrendsPlaceholder";
import PredictionsPlaceholder from "./components/dashboard/PredictionsPlaceholder";
import PartnersPlaceholder from "./components/dashboard/PartnersPlaceholder";
import TendersPlaceholder from "./components/dashboard/TendersPlaceholder";
import RealityCheckPlaceholder from "./components/dashboard/RealityCheckPlaceholder";
import HRConsultantPlaceholder from "./components/dashboard/HRConsultantPlaceholder";
import CompanyAnalysisSection from "./components/dashboard/CompanyAnalysis";
import AIPredictiveDashboard from "./pages/AIPredictiveDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<CompanyProfile />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="trends" element={<TrendsPlaceholder />} />
            <Route path="predictions" element={<PredictionsPlaceholder />} />
            <Route path="partners" element={<PartnersPlaceholder />} />
            <Route path="tenders" element={<TendersPlaceholder />} />
            <Route path="reality-check" element={<RealityCheckPlaceholder />} />
            <Route path="hr-consultant" element={<HRConsultantPlaceholder />} />
            <Route path="company-analysis" element={<CompanyAnalysisSection />} />
            <Route path="ai-predictive" element={<AIPredictiveDashboard />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
