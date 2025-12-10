import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SimpleIndex from "./pages/SimpleIndex";
import Auth from "./pages/Auth";
import SimpleProfile from "./pages/SimpleProfile";
import SimpleDashboard from "./pages/SimpleDashboard";
import InsightsCompany from "./pages/InsightsCompany";
import InsightsHiring from "./pages/InsightsHiring";
import InsightsRisk from "./pages/InsightsRisk";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import KarrycarProposal from "./pages/KarrycarProposal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SimpleIndex />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<SimpleProfile />} />
          <Route path="/dashboard" element={<SimpleDashboard />} />
          <Route path="/insights/company" element={<InsightsCompany />} />
          <Route path="/insights/hiring" element={<InsightsHiring />} />
          <Route path="/insights/risk" element={<InsightsRisk />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/karrycar-proposal" element={<KarrycarProposal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
