
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/admin/Dashboard";
import CalendarPage from "./pages/admin/Calendar";
import Leads from "./pages/admin/Leads";
import Settings from "./pages/admin/Settings";
import CompanySettings from "./pages/admin/settings/Company";
import ServicesSettings from "./pages/admin/settings/Services";
import AiAgentSettings from "./pages/admin/settings/AiAgent";
import WhatsAppSettings from "./pages/admin/settings/WhatsApp";
import IntegrationsSettings from "./pages/admin/settings/Integrations";
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
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/calendar" element={<CalendarPage />} />
          <Route path="/admin/leads" element={<Leads />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/settings/company" element={<CompanySettings />} />
          <Route path="/admin/settings/services" element={<ServicesSettings />} />
          <Route path="/admin/settings/ai-agent" element={<AiAgentSettings />} />
          <Route path="/admin/settings/whatsapp" element={<WhatsAppSettings />} />
          <Route path="/admin/settings/integrations" element={<IntegrationsSettings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
