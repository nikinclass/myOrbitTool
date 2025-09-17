import type { Satellite, Scenario, Site, User } from "@/types";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CzmlDataSource } from "resium";
import { useNavigate, useParams } from "react-router-dom";
import { SceneMode } from "cesium";

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
  colorSatellite: (s: Satellite) => Promise<void>;
  toggleVisibility: (s: Satellite[]) => Promise<void>;
  addSatellite: (s: Satellite) => Promise<void>;
  removeSatellite: (s: Satellite) => Promise<void>;
  addSite: (s: Site) => Promise<void>;
  removeSite: (s: Site) => Promise<void>;
};

type AppProviderProps = {
  children: React.ReactNode;
};

const AppSessionContext = createContext<AppState | null>(null);

export function AppSessionProvider({ children, ...props }: AppProviderProps) {
  // useEffect(() => {
  //   if (satellites[0]) {
  //     setSiteCzmlArray(satellites.map((sat: Satellite, index) => {
  //       console.log(sat)
  //       let tempCZML: any[] = sat.CZML.slice()
  //       tempCZML[1].path.material.solidColor.color = sat.COLOR
  //       tempCZML[1].point.color = sat.COLOR
  //       console.log(tempCZML[1].point.color)
  //       return (<CzmlDataSource data={sat.CZML} show={sat.VISIBLE} />)
  //     }))
  //   }
  // }, [satellites])

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

      const convertedSatellites = await Promise.all(
        data.satellites.map(async (sat: Satellite) => {
          const converted = await convertSatelliteToCZML(sat);
          if (!converted) return sat;
          return { ...sat, CZML: converted };
        })
      );

      const convertedSites = await Promise.all(
        data.sites.map(async (site: Site) => {
          const converted = await convertSiteToCZML(site);
          if (!converted) return site;
          return { ...site, CZML: converted };
        })
      );

      setScenario({
        ...data,
        satellites: convertedSatellites,
        sites: convertedSites,
      });
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
        body: JSON.stringify({ description: description, my_id: user?.id }),
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

  // const toggleVisibility = useCallback(async (s: Satellite[]) => {
  //   s.map((sat, index) => {sat.VISIBLE = !sat.VISIBLE})
  // }, []);
  const convertSiteToCZML = async (s: Site) => {
    const res = await fetch(`${PROXIED_URL}/satellites/siteczml`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(s),
    });
    if (!res.ok) return;
    const data = await res.json();
    return <CzmlDataSource key={s.id} data={data} />;
  };
  const addSite = useCallback(
    async (s: Site) => {
      if (!scenario) return;
      console.log(s);
      let sites = scenario.sites.slice();

      const converted = await convertSiteToCZML(s);

      if (!converted) return;

      s.CZML = converted;

      sites.push(s);

      setScenario({ ...scenario, sites: sites });
    },
    [scenario]
  );

  const toggleVisibility = useCallback(
    async (s: Satellite[]) => {
      if (!scenario) return;

      const updated = await Promise.all(
        scenario.satellites.map(async (sat: Satellite) => {
          if (s.some((item) => item.id === sat.id)) {
            return {
              ...sat,
              CZML: {
                ...sat.CZML,
                props: { ...sat.CZML.props, show: !sat.CZML.props.show },
              },
            };
          }

          return sat;
        })
      );

      setScenario({
        ...scenario,
        satellites: updated,
      });
    },
    [scenario]
  );

  const colorSatellite = useCallback(async () => {}, []);

  const convertSatelliteToCZML = async (s: Satellite) => {
    const res = await fetch(`${PROXIED_URL}/satellites/satczml`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(s),
    });
    if (!res.ok) return;
    const data = await res.json();
    return (
      <CzmlDataSource key={s.id} data={data} show={data.VISIBLE ?? true} />
    );
  };

  const addSatellite = useCallback(
    async (s: Satellite) => {
      if (!scenario) return;
      let sats = scenario.satellites.slice();

      const converted = await convertSatelliteToCZML(s);

      if (!converted) return;

      s.CZML = converted;

      sats.push(s);

      setScenario({ ...scenario, satellites: sats });
    },
    [scenario]
  );

  useEffect(() => {
    console.log(scenario);
  }, [scenario]);

  const deleteSatellite = useCallback(
    async (s: Satellite) => {
      if (!scenario) return;
      console.log(s.id);
      await fetch(`${LOCALHOST_URL}/scenario/satellites/${s.id}`, {
        method: "DELETE",
      });
    },
    [scenario]
  );

  const removeSatellite = useCallback(
    async (s: Satellite) => {
      if (!scenario) return;

      let sats = scenario.satellites.slice();

      sats.splice(sats.indexOf(s), 1);

      setScenario({ ...scenario, satellites: sats });
      deleteSatellite(s);
    },
    [scenario]
  );

  const removeSite = useCallback(async (s: Site) => {}, []);

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
    toggleVisibility,
    colorSatellite,
    addSatellite,
    removeSatellite,
    addSite,
    removeSite,
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
