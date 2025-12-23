// Libraries
import { useRoutes, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Routes
import { PUBLIC_ROUTES, PRIVATE_ROUTES } from "@/shared/routes";

// Components
import NotFound from "@/pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import PublicLayout from "@/layouts/PublicLayout";
import PrivateLayout from "@/layouts/PrivateLayout";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";

// Guards
import AuthGuard from "@/shared/guards/AuthGuard";
import PageGaurd from "@/shared/guards/PageGaurd";

// Helpers
import { AuthProvider } from "@/shared/contexts/authContext";

// Styles
import "./App.css";

const queryClient = new QueryClient();

const AppRoutes = () => {
  return useRoutes([{
    path: '',
    element: <AuthGuard element={PrivateLayout} />,
    children: PRIVATE_ROUTES,
  }, {
    path: '',
    element: <PageGaurd element={PublicLayout} />,
    children: PUBLIC_ROUTES,
  }, {
    path: '*',
    element: <NotFound />
  }]);
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
