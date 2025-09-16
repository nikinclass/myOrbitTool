import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NoPage } from "./pages/NoPage";
import { Layout } from "./pages/Layout";
import { ScenarioLoader } from "./pages/ScenarioLoader";
import { Scenario } from "./pages/Scenario";
import { ThemeProvider } from "./components/theme-provider";
import { AppSessionProvider } from "./components/AppSessionProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppSessionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<ScenarioLoader />} />
              <Route index path="scenario" element={<ScenarioLoader />} />
              <Route path="scenario/:id" element={<Scenario />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppSessionProvider>
    </ThemeProvider>
  );
}
const rootElem = document.getElementById("root");

if (rootElem) {
  const root = createRoot(rootElem);
  root.render(<App />);
} else {
  console.error("Failed to find root element.");
}
