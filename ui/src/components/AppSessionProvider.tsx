import type { Satellite } from "@/types";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

export type AppState = {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  satellites: Satellite[];
  setSatellites: Dispatch<SetStateAction<boolean>>;
};

const initialState: AppState = {
  username: "",
  setUsername: () => null,
  isLoggedIn: false,
  setIsLoggedIn: () => null,
  satellites: [],
  setSatellites: () => null,
};

type AppProviderProps = {
  children: React.ReactNode;
};

const AppSessionContext = createContext<AppState>(initialState);

export function AppSessionProvider({ children, ...props }: AppProviderProps) {
  const [username, setUsername] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [satellites, setSatellites] = useState<Satellite[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUsername(user.username);
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <AppSessionContext.Provider
      {...props}
      value={{
        username: username,
        setUsername: setUsername,
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
      }}
    >
      {children}
    </AppSessionContext.Provider>
  );
}

export const useAppSession = () => {
  const context = useContext(AppSessionContext);

  if (context === undefined)
    throw new Error("useAppSession must be used within a AppSessionProvider");

  return context;
};
