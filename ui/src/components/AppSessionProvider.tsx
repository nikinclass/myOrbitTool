import type { Satellite, Site } from "@/types";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useParams } from "react-router-dom";
import { CzmlDataSource } from "resium";

export type AppState = {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  satellites: Satellite[];
  setSatellites: Dispatch<SetStateAction<Satellite[]>>;
  sites: Site[];
  setSites: Dispatch<SetStateAction<Site[]>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  satCzmlArray: React.ReactNode[]
  setSatCzmlArray: Dispatch<SetStateAction<React.ReactNode[]>>
  siteCzmlArray: React.ReactNode[]
  setSiteCzmlArray: Dispatch<SetStateAction<React.ReactNode[]>>
};

const initialState: AppState = {
  username: "",
  setUsername: () => null,
  isLoggedIn: false,
  setIsLoggedIn: () => null,
  satellites: [],
  setSatellites: () => null,
  sites: [],
  setSites: () => null,
  title: "Scenario",
  setTitle: () => null,
  satCzmlArray: [],
  setSatCzmlArray: () => null,
  siteCzmlArray: [],
  setSiteCzmlArray: () => null,
};

type AppProviderProps = {
  children: React.ReactNode;
};

const AppSessionContext = createContext<AppState>(initialState);

export function AppSessionProvider({ children, ...props }: AppProviderProps) {
  const [username, setUsername] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [satellites, setSatellites] = useState<Satellite[]>([]);
  const [title, setTitle] = useState<string>("Scenario");
  const scenario_id = useParams().id;
  const [sites, setSites] = useState<Site[]>([
    {
      id: "1",
      OBJECT_NAME: "test site",
      LAT: 0,
      LONG: 0,
      ALT: 0,
      COLOR: [255, 0, 255, 255],
      CZML: [{}, {}]
    },
  ]);
  const [satCzmlArray, setSatCzmlArray] = useState<any>([]);
  const [siteCzmlArray, setSiteCzmlArray] = useState<any>([]);

  useEffect(() => {
    setSiteCzmlArray(satellites.map((sat, index) => {
      return (<CzmlDataSource data={sat.CZML} show={sat.VISIBLE} />)
    }))
  }, [satellites])

  useEffect(() => {

  }, [sites])

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUsername(user.username);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    // Update record when title changes
  }, [title]);

  return (
    <AppSessionContext.Provider
      {...props}
      value={{
        username: username,
        setUsername: setUsername,
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        satellites: satellites,
        setSatellites: setSatellites,
        sites: sites,
        setSites: setSites,
        title: title,
        setTitle: setTitle,
        satCzmlArray: satCzmlArray,
        setSatCzmlArray: setSatCzmlArray,
        siteCzmlArray: siteCzmlArray,
        setSiteCzmlArray: setSiteCzmlArray
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
