
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserGuard, AdminGuard, SuperAdminGuard } from "@/components/guards/RoleGuard";
import { TrialGuard } from "@/components/guards/TrialGuard";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/admin/Dashboard";
import CalendarPage from "./pages/admin/Calendar";
import Leads from "./pages/admin/Leads";
import Team from "./pages/admin/Team";
import Settings from "./pages/admin/Settings";
import CompanySettings from "./pages/admin/settings/Company";
import ServicesSettings from "./pages/admin/settings/Services";
import AiAgentSettings from "./pages/admin/settings/AiAgent";
import WhatsAppSettings from "./pages/admin/settings/WhatsApp";
import IntegrationsSettings from "./pages/admin/settings/Integrations";
import TeamSettings from "./pages/admin/settings/Team";
import BillingPage from "./pages/admin/Billing";
import SuperAdmin from "./pages/admin/SuperAdmin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/admin/dashboard" element={
            <UserGuard>
              <TrialGuard>
                <Dashboard />
              </TrialGuard>
            </UserGuard>
          } />
          <Route path="/admin/calendar" element={
            <UserGuard>
              <TrialGuard>
                <CalendarPage />
              </TrialGuard>
            </UserGuard>
          } />
          <Route path="/admin/leads" element={
            <UserGuard>
              <TrialGuard>
                <Leads />
              </TrialGuard>
            </UserGuard>
          } />
          <Route path="/admin/team" element={
            <AdminGuard>
              <TrialGuard>
                <Team />
              </TrialGuard>
            </AdminGuard>
          } />
          <Route path="/admin/settings" element={
            <UserGuard>
              <TrialGuard>
                <Settings />
              </TrialGuard>
            </UserGuard>
          } />
          <Route path="/admin/settings/company" element={
            <UserGuard>
              <TrialGuard>
                <CompanySettings />
              </TrialGuard>
            </UserGuard>
          } />
          <Route path="/admin/settings/services" element={
            <UserGuard>
              <TrialGuard>
                <ServicesSettings />
              </TrialGuard>
            </UserGuard>
          } />
          <Route path="/admin/settings/ai-agent" element={
            <UserGuard>
              <TrialGuard>
                <AiAgentSettings />
              </TrialGuard>
            </UserGuard>
          } />
          <Route path="/admin/settings/whatsapp" element={
            <UserGuard>
              <TrialGuard>
                <WhatsAppSettings />
              </TrialGuard>
            </UserGuard>
          } />
          <Route path="/admin/settings/integrations" element={
            <AdminGuard>
              <TrialGuard>
                <IntegrationsSettings />
              </TrialGuard>
            </AdminGuard>
          } />
          <Route path="/admin/settings/team" element={
            <AdminGuard>
              <TrialGuard>
                <TeamSettings />
              </TrialGuard>
            </AdminGuard>
          } />
          <Route path="/admin/billing" element={
            <UserGuard>
              <BillingPage />
            </UserGuard>
          } />
          <Route path="/admin/superadmin" element={
            <SuperAdminGuard>
              <SuperAdmin />
            </SuperAdminGuard>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
