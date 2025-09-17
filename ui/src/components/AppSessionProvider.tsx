import type { Satellite, Scenario, Site, User } from "@/types";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useNavigate, useParams } from "react-router-dom";

const PROXIED_URL = "/api";
const LOCALHOST_URL = "http://localhost:8080/api";

export type AppState = {
  // Authentication
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: boolean;

  // Scenario
  scenario: Scenario | null;
  isLoading: boolean;
  error: string | null;
  canEdit: boolean;

  // Scenario Actions
  setTitle: (title: string) => Promise<void>;
  setDescription: (description: string) => Promise<void>;
  createScenario: () => Promise<void>;
};

type AppProviderProps = {
  children: React.ReactNode;
};

const AppSessionContext = createContext<AppState | null>(null);

export function AppSessionProvider({ children, ...props }: AppProviderProps) {
  const { id: scenarioID } = useParams();
  const navigate = useNavigate();
  let storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  if (JSON.stringify(storedUser) === "{}") storedUser = null;

  const [user, setUser] = useState<User | null>((storedUser as User) || null);

  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isLoggedIn = user !== null;
  const isOwner = (ownerId?: number | null) =>
    ownerId != null && user?.id === ownerId;
  const [canEdit, setCanEdit] = useState<boolean>(false);

  const fetchScenario = useCallback(async () => {
    if (!scenarioID) {
      setScenario(null);
      setError(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await (
        await fetch(`${LOCALHOST_URL}/scenario/${scenarioID}`)
      ).json();

      if (!data.id) throw new Error("Scenario not found");

      setScenario({ ...data });
      if (isOwner(data.owner_id)) setCanEdit(true);
      else setCanEdit(false);
    } catch (e: any) {
      setError(e?.message);
      setScenario(null);
      navigate("ScenarioNotFound");
    } finally {
      setIsLoading(false);
    }
  }, [user, scenarioID]);

  useEffect(() => {
    fetchScenario();
  }, [fetchScenario]);

  const setTitle = async (title: string) => {
    if (!scenario || !canEdit) return;
    try {
      await fetch(`${LOCALHOST_URL}/scenario/${scenario.id}/title`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title, my_id: user?.id }),
      });
      setScenario({ ...scenario, title: title });
    } catch (e: any) {
      console.log(e);
    }
  };

  const setDescription = async (description: string) => {
    if (!scenario || !canEdit) return;
    try {
      await fetch(`${LOCALHOST_URL}/scenario/${scenario.id}/description`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: description }),
      });
      setScenario({ ...scenario, description: description });
    } catch (e: any) {}
  };

  const createScenario = useCallback(async () => {
    if (!isLoggedIn || !user) {
      return;
    }
    const response = await fetch(`${LOCALHOST_URL}/scenario`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ owner_id: user?.id }),
    });
    const json = await response.json();
    await setTitle(`Scenario ${json.id}`);
    setScenario({
      ...scenario,
      owner: user,
      description: "",
      title: "",
      id: json.id,
      satellites: [],
      sites: [],
    });
    navigate(`/scenario/${json.id}`);
  }, [scenario, isLoggedIn, user]);

  const state: AppState = {
    user,
    isLoggedIn: isLoggedIn,
    login: async (username, password) => {
      let payload = JSON.stringify({
        username: username,
        password: password,
      });

      const res = await fetch(`${PROXIED_URL}/user_table/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      });
      const body = await res.json();

      if (!res.ok) {
        throw new Error("Couldn't log in");
      }

      const id: number = body.id;
      const user = { username: username, id: id };
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    },
    logout: () => {
      setUser(null);
      localStorage.removeItem("user");
    },
    scenario,
    isLoading,
    error,
    canEdit,

    setTitle,
    setDescription,
    createScenario,
  };

  return (
    <AppSessionContext.Provider {...props} value={state}>
      {children}
    </AppSessionContext.Provider>
  );
}

export const useAppSession = () => {
  const context = useContext(AppSessionContext);

  if (context === null)
    throw new Error("useAppSession must be used within a AppSessionProvider");

  return context;
};
