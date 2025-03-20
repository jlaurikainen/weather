import { App } from "@/App.tsx";
import "@/global.css";
import { Temp } from "@/Temp.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found!");
}

const root = createRoot(rootElement);
const router = createBrowserRouter([
  { path: "/weather", Component: App },
  { path: "/weather/temp", Component: Temp },
]);
const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
