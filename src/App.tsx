import { Route, Routes } from "react-router";
import TanstackListView from "./list/tanstack";
import { lazy, Suspense } from "react";
import { Toaster } from "./components/ui/sonner";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./layout/app-sidebar/app-sidebar";
import HeaderBar from "./layout/header";
import ErrorBoundary from "./layout/error-boundary";

const StatisticsView = lazy(() => import("./statistics"));
const LoadingView = lazy(() => import("./layout/loading"));
const NotFoundView = lazy(() => import("./layout/404"));

const App = () => {
  return (
    <>
      <div className="flex w-full h-full bg-gray-50">
        <SidebarProvider className="w-full h-full">
          <AppSidebar />
          <main className="flex flex-col w-full h-full">
            <HeaderBar />
            <div className="flex flex-1 overflow-hidden relative w-full">
              <ErrorBoundary fallback={<NotFoundView />}>
                <Suspense
                  fallback={<LoadingView message="Loading gateway data..." />}
                >
                  <Routes>
                    <Route path="/" element={<TanstackListView />} />
                    <Route
                      path="/loading"
                      element={
                        <LoadingView message="Loading gateway data..." />
                      }
                    />
                    <Route path="/404" element={<NotFoundView />} />
                    <Route path="/:uuid" element={<StatisticsView />} />
                    <Route path="/*" element={<TanstackListView />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </div>
          </main>
        </SidebarProvider>
      </div>
      <Toaster />
    </>
  );
};

export default App;
