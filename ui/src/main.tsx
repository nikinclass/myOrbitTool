import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NoPage } from "./pages/NoPage";
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";
import { ScenarioLoader } from "./pages/ScenarioLoader";
import { Scenario } from "./pages/Scenario";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoPage />} />
          <Route path="scenario" element={<ScenarioLoader />} />
          <Route path="scenario/:id" element={<Scenario />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
