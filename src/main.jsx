import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router/Router.jsx";
import { ToastContainer } from "react-toastify";
import MainContextProvider from "./Context/MainContextProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MainContextProvider>
        <Router></Router>
      </MainContextProvider>
      <ToastContainer></ToastContainer>
    </QueryClientProvider>
  </StrictMode>
);
