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

const URL = "/api";

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
  updateSatellite: (s: Satellite) => Promise<void>;
  removeSatellite: (s: Satellite) => Promise<void>;
  getSatelliteCZMLs: () => any[];
  addSite: (s: Site) => Promise<void>;
  removeSite: (s: Site) => Promise<void>;
  updateSite: (s: Site) => Promise<void>;
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
      const data = await (await fetch(`${URL}/scenario/${scenarioID}`)).json();

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
      await fetch(`${URL}/scenario/${scenario.id}/title`, {
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
      await fetch(`${URL}/scenario/${scenario.id}/description`, {
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
    const response = await fetch(`${URL}/scenario`, {
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
    const res = await fetch(`${URL}/satellites/siteczml`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(s),
    });
    if (!res.ok) return;
    const data = await res.json();
    return <CzmlDataSource key={Date.now()} data={data} />;
  };
  const addSite = useCallback(
    async (s: Site) => {
      if (!scenario) return;
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
    async (entities: Satellite[] | Site[]) => {
      if (!scenario) return;

      const updatedSats = await Promise.all(
        scenario.satellites.map(async (entity: Satellite) => {
          if (entities.some((item) => item.id === entity.id)) {
            return {
              ...entity,
              CZML: {
                ...entity.CZML,
                props: { ...entity.CZML.props, show: !entity.CZML.props.show },
              },
            };
          }

          return entity;
        })
      );

      const updatedSites = await Promise.all(
        scenario.sites.map(async (entity: Site) => {
          if (entities.some((item) => item.id === entity.id)) {
            return {
              ...entity,
              CZML: {
                ...entity.CZML,
                props: { ...entity.CZML.props, show: !entity.CZML.props.show },
              },
            };
          }

          return entity;
        })
      );

      setScenario({
        ...scenario,
        satellites: updatedSats,
        sites: updatedSites,
      });
    },
    [scenario]
  );

  const colorSatellite = useCallback(async () => {}, []);

  const convertSatelliteToCZML = async (s: Satellite) => {
    const res = await fetch(`${URL}/satellites/satczml`, {
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
      <CzmlDataSource
        key={Date.now()}
        data={data}
        show={data.VISIBLE ?? true}
      />
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

  const updateSite = useCallback(
    async (s: Site | null) => {
      if (!s || !scenario) return;
      // update backend
      try {
        const updates = {
          name: s.name,
          latitude: s.latitude,
          longitude: s.longitude,
          altitude: s.altitude
        };

        const response = await fetch(
          `${LOCALHOST_URL}/scenario/sites/${s.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ ...updates })
          }
        );
        console.log(response)
        const updatedRecord: Site = (await response.json())[0];
        console.log(updatedRecord);
        
        // Get new CZML
        const converted = await convertSiteToCZML(updatedRecord);
        if (!converted) {
          return;
        }

        updatedRecord.CZML = converted;

        const new_sites = await Promise.all(
          scenario.sites.map(async (site) => {
            if (site.id === updatedRecord.id) return updatedRecord;
            return site;
          })
        );

        setScenario({ ...scenario, sites: new_sites });
      } catch (e: any) {
        console.error(e);
      }
    },
    [scenario]
  );

  const updateSatellite = useCallback(
    async (s: Satellite | null) => {
      if (!s || !scenario) return;
      // update backend
      try {
        const updates = {
          ECCENTRICITY: s.ECCENTRICITY,
          INCLINATION: s.INCLINATION,
          ARG_OF_PERICENTER: s.ARG_OF_PERICENTER,
          MEAN_ANOMALY: s.MEAN_ANOMALY,
          MEAN_MOTION: s.MEAN_MOTION,
          RA_OF_ASC_NODE: s.RA_OF_ASC_NODE,
        };

        const response = await fetch(`${URL}/scenario/satellite/${s.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ ...updates }),
        });

        const updatedRecord: Satellite = (await response.json())[0];
        //updatedRecord.OBJECT_NAME = s.OBJECT_NAME + " ";

        // Get new CZML
        const converted = await convertSatelliteToCZML(updatedRecord);
        if (!converted) {
          return;
        }

        updatedRecord.CZML = converted;

        // update the scenario with the new satellite
        const new_satellites = await Promise.all(
          scenario.satellites.map(async (sat) => {
            if (sat.id === updatedRecord.id) return updatedRecord;
            return sat;
          })
        );

        setScenario({ ...scenario, satellites: new_satellites });
      } catch (e: any) {
        console.error(e);
      }
    },
    [scenario]
  );

  const getSatelliteCZMLs = useCallback(() => {
    if (!scenario) return [];
    return scenario.satellites.map((sat) => sat.CZML);
  }, [scenario]);

  useEffect(() => {
    console.log("Scenario Updated", scenario);
  }, [scenario]);

  const deleteSatellite = useCallback(
    async (s: Satellite) => {
      if (!scenario) return;
      await fetch(`${URL}/scenario/satellites/${s.id}`, {
        method: "DELETE",
      });
    },
    [scenario]
  );

  const deleteSite = useCallback(
    async (s: Site) => {
      if (!scenario) return;
      await fetch(`${LOCALHOST_URL}/scenario/sites/${s.id}`, {
        method: "DELETE"
      })
    },
    [scenario]
  )

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

  const removeSite = useCallback(
    async (s: Site) => {
      if (!scenario) return;

      let sites = scenario.sites.slice();

      sites.splice(sites.indexOf(s), 1);

      setScenario({ ...scenario, sites: sites})
      deleteSite(s);

  }, [scenario]);

  const state: AppState = {
    user,
    isLoggedIn: isLoggedIn,
    login: async (username, password) => {
      try {
        let payload = JSON.stringify({
          username: username,
          password: password,
        });

        const res = await fetch(`${URL}/user_table/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: payload,
        });

        if (!res.ok) {
          throw new Error("Invalid credentials");
        }

        const body = await res.json();

        const id: number = body.id;
        const user = { username: username, id: id };
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      } catch (e: any) {
        throw new Error("Invalid credentials");
      }
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
    updateSatellite,
    addSite,
    removeSite,
    getSatelliteCZMLs,
    updateSite,
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
