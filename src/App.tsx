import { Router, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/Landing";
import PhotoStudio from "@/pages/PhotoStudio";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Route path="/" component={Landing} />
          <Route path="/photo-studio" component={PhotoStudio} />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
