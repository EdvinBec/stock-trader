import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "./components/ui/sonner.tsx";
import StockPage from "./pages/StockPage.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/:ticker" element={<StockPage />} />
      <Route path="/" element={<App />} />
    </Routes>
    <Toaster />
  </BrowserRouter>
);
