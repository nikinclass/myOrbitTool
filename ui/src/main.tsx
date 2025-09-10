import {
  StrictMode,
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
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";
// import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import LoginForm from "./components/login-form";

export type AppContextType = {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

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
    <AppContext.Provider value={{ username, setUsername, isLoggedIn, setIsLoggedIn }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NoPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
