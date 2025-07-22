
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { Dashboard } from "@/pages/Dashboard";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    console.log("App component mounted");
    console.log("Environment:", {
      isVercel: typeof window !== 'undefined' && window.location.hostname.includes('vercel'),
      hostname: typeof window !== 'undefined' ? window.location.hostname : 'unknown',
      pathname: typeof window !== 'undefined' ? window.location.pathname : 'unknown'
    });
    setIsReady(true);
  }, []);

  // Detectar se está no Vercel (usa BrowserRouter) ou GitHub Pages (usa HashRouter)
  const isVercel = typeof window !== 'undefined' && 
    (window.location.hostname.includes('vercel.app') || 
     window.location.hostname.includes('vercel.com') ||
     process.env.VERCEL === '1');

  const RouterComponent = isVercel ? BrowserRouter : Router;

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando Dashboard ASPERUS...</p>
        </div>
      </div>
    );
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <RouterComponent>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </div>
        <Toaster position="top-right" />
      </RouterComponent>
    </QueryClientProvider>
  );
};

export default App;
