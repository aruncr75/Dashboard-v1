import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const Dashboard = lazy(() => import("./pages/Index"));
const Tasks = lazy(() => import("./pages/Tasks"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Routines = lazy(() => import("./pages/Routines"));
const Journaling = lazy(() => import("./pages/Journaling"));
const Test = lazy(() => import("./pages/Test"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Uncomment Toaster components for production notifications */}
      {/* <Toaster />
      <Sonner /> */}
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/routine" element={<Routines />} />
              <Route path="/journaling" element={<Journaling />} />
              <Route path="/test" element={<Test />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;