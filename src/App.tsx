import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

// Main pages
import Index from "./pages/Index";
import SimpleIndex from "./pages/SimpleIndex";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Contatti from "./pages/Contatti";

// Profile & Dashboard
import SimpleProfile from "./pages/SimpleProfile";
import CompanyProfile from "./pages/CompanyProfile";
import SimpleDashboard from "./pages/SimpleDashboard";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import AIPredictiveDashboard from "./pages/AIPredictiveDashboard";

// Personas
import Aziende from "./pages/Aziende";
import Privati from "./pages/Privati";
import Freelance from "./pages/Freelance";

// Insights
import InsightsCompany from "./pages/InsightsCompany";
import InsightsHiring from "./pages/InsightsHiring";
import InsightsRisk from "./pages/InsightsRisk";

// Test pages
import TestPredict from "./pages/TestPredict";
import TestCompanyPredictions from "./pages/TestCompanyPredictions";
import TestCompanyAnalyze from "./pages/TestCompanyAnalyze";
import TestRealityCheck from "./pages/TestRealityCheck";
import TestSkillsRoadmap from "./pages/TestSkillsRoadmap";

// Legal & Special
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import KarrycarProposal from "./pages/KarrycarProposal";
import KarrycarAlpha from "./pages/KarrycarAlpha";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Main public pages */}
          <Route path="/" element={<SimpleIndex />} />
          <Route path="/home" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/about" element={<About />} />
          <Route path="/contatti" element={<Contatti />} />
          
          {/* Profile */}
          <Route path="/profile" element={<SimpleProfile />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard-simple" element={<SimpleDashboard />} />
          <Route path="/dashboard-home" element={<DashboardHome />} />
          <Route path="/ai-dashboard" element={<AIPredictiveDashboard />} />
          
          {/* Personas */}
          <Route path="/aziende" element={<Aziende />} />
          <Route path="/privati" element={<Privati />} />
          <Route path="/freelance" element={<Freelance />} />
          
          {/* Insights */}
          <Route path="/insights/company" element={<InsightsCompany />} />
          <Route path="/insights/hiring" element={<InsightsHiring />} />
          <Route path="/insights/risk" element={<InsightsRisk />} />
          
          {/* Test pages */}
          <Route path="/test/predict" element={<TestPredict />} />
          <Route path="/test/company-predictions" element={<TestCompanyPredictions />} />
          <Route path="/test/company-analyze" element={<TestCompanyAnalyze />} />
          <Route path="/test/reality-check" element={<TestRealityCheck />} />
          <Route path="/test/skills-roadmap" element={<TestSkillsRoadmap />} />
          
          {/* Legal */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          
          {/* Special */}
          <Route path="/karrycar-proposal" element={<KarrycarProposal />} />
          <Route path="/karrycar" element={<KarrycarAlpha />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
