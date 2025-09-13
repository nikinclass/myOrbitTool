import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NoPage } from "./pages/NoPage";
import { Layout } from "./pages/Layout";
import { ScenarioLoader } from "./pages/ScenarioLoader";
import { Scenario } from "./pages/Scenario";
import { ThemeProvider } from "./components/theme-provider";

export type AppState = {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

const initialState: AppState = {
  username: "",
  setUsername: () => null,
  isLoggedIn: false,
  setIsLoggedIn: () => null,
};

export const AppContext = createContext<AppState>(initialState);

function App() {
  const [username, setUsername] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUsername(user.username);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppContext.Provider
        value={{ username, setUsername, isLoggedIn, setIsLoggedIn }}
      >
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
      </AppContext.Provider>
    </ThemeProvider>
  );
}
const root = document.getElementById("root") as Element;

createRoot(root).render(<App />);
