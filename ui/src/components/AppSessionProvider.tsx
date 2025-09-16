import type { Satellite, Site, User } from "@/types";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useNavigate, useParams } from "react-router-dom";

const PROXIED_URL = "/api";
const LOCALHOST_URL = "http://localhost:8080/api";

export type AppState = {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  isLoggedIn: boolean;
  satellites: Satellite[];
  setSatellites: Dispatch<SetStateAction<Satellite[]>>;
  sites: Site[];
  setSites: Dispatch<SetStateAction<Site[]>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  scenarioID: number;
  setScenarioID: Dispatch<SetStateAction<number>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
};

const initialState: AppState = {
  user: undefined,
  setUser: () => null,
  isLoggedIn: false,
  satellites: [],
  setSatellites: () => null,
  sites: [],
  setSites: () => null,
  title: "Scenario",
  setTitle: () => null,
  scenarioID: 0,
  setScenarioID: () => null,
  description: "",
  setDescription: () => null,
};

type AppProviderProps = {
  children: React.ReactNode;
};

const AppSessionContext = createContext<AppState>(initialState);

export function AppSessionProvider({ children, ...props }: AppProviderProps) {
  const [user, setUser] = useState<User | undefined>();
  const isLoggedIn = !!user;
  const [satellites, setSatellites] = useState<Satellite[]>([]);
  const [title, setTitle] = useState<string>("Scenario");
  const [description, setDescription] = useState<string>("");

  const [scenarioID, setScenarioID] = useState<number>(-1);
  const [sites, setSites] = useState<Site[]>([
    // {
    //   id: "1",
    //   OBJECT_NAME: "test site",
    //   LAT: 0,
    //   LONG: 0,
    //   ALT: 0,
    //   COLOR: [255, 0, 255, 255],
    // },
  ]);

  const loadScenario = async () => {
    try {
      const { scenario, scenarioSats, scenarioSites } = await (
        await fetch(`${LOCALHOST_URL}/scenario/${scenarioID}`)
      ).json();

      console.log(scenario, scenarioID);
      if (!scenario) throw new Error("Not found");
      setTitle(scenario.title);
      setDescription(scenario.description);
      setSatellites(scenarioSats);
      setSites(scenarioSites);
    } catch (err: any) {
      setScenarioID(-1);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUser(user);
    }
    console.log(scenarioID);
    loadScenario();
  }, [scenarioID]);

  useEffect(() => {
    const updateTitle = async () => {
      // Update record when title changes
      try {
        await fetch(`${LOCALHOST_URL}/scenario/${scenarioID}/title`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: title, owner_id: user?.id }),
        });
      } catch (e: any) {
        console.error(e);
      }
    };
    updateTitle();
  }, [title]);

  useEffect(() => {
    const updateDescription = async () => {
      // Update record when title changes
      try {
        await fetch(`${LOCALHOST_URL}/scenario/${scenarioID}/description`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: description,
            owner_id: user?.id,
          }),
        });
      } catch (e: any) {
        console.error(e);
      }
    };
    updateDescription();
  }, [description]);

  return (
    <AppSessionContext.Provider
      {...props}
      value={{
        user: user,
        setUser: setUser,
        isLoggedIn: isLoggedIn,
        satellites: satellites,
        setSatellites: setSatellites,
        sites: sites,
        setSites: setSites,
        title: title,
        setTitle: setTitle,
        scenarioID: scenarioID,
        setScenarioID: setScenarioID,
        setDescription: setDescription,
        description: description,
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
