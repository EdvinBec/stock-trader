import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "./components/ui/sonner.tsx";
import StockPage from "./pages/StockPage.tsx";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import TabsRow from "./components/TabsRow.tsx";
import NavigationBar from "./components/NavigationBar.tsx";
import MaxWidthWrapper from "./components/MaxWidthWrapper.tsx";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TabsRow />
        <MaxWidthWrapper className="py-4">
          <NavigationBar />
        </MaxWidthWrapper>
        <Routes>
          <Route path="/" element={<StockPage />} />
          <Route path="/s" element={<App />} />
        </Routes>
        <Toaster />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
