// @ts-nocheck

import { OrbitViewer } from "@/components/OrbitViewer";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Viewer, CzmlDataSource } from "resium";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/choicePopover";
import { AddEntityForm } from "@/components/AddEntityForm";
import type { Satellite } from "@/types";
import { useAppSession } from "@/components/AppSessionProvider";

console.log(`0 ISS (ZARYA)
1 25544U 98067A   25254.83778358  .00007850  00000-0  14414-3 0  9994
2 25544  51.6331 237.5922 0004235 328.5405  31.5330 15.50244386528606`);

const PROXIED_URL = "/api/scenario";
const LOCALHOST_URL = "http://localhost:8080/api/scenario";

export function Scenario() {
  const { satellites, setSatellites, setSites, sites } = useAppSession();
  const [satCzmlArray, setSatCzmlArray] = useState<any>([]);
  const [siteCzmlArray, setSiteCzmlArray] = useState<any>([]);

  const navigate = useNavigate();
  const id = useParams().id;

  const loadScenario = async () => {
    try {
      const { scenario, scenarioSats, scenarioSites } = await (
        await fetch(`${LOCALHOST_URL}/${id}`)
      ).json();

      setSatellites(scenarioSats);
      setSites(scenarioSites);
    } catch (err: any) {}
  };

  useEffect(() => {
    loadScenario();
  }, []);

  useEffect(() => {
    satellites?.map(async (sat, index) => {
      await fetch(`${PROXIED_URL}/satczml`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sat),
      })
        .then((res) => res.json())
        .then((data) => {
          setSatCzmlArray([
            ...satCzmlArray,
            <CzmlDataSource key={data.id} data={data} />,
          ]);
        });
    });
  }, [satellites]);

  useEffect(() => {
    setSiteCzmlArray(null);
    sites.map((site, index) => {
      fetch(`${PROXIED_URL}/siteczml`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(site),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (siteCzmlArray == null) {
            setSiteCzmlArray([<CzmlDataSource data={data} />]);
          } else {
            setSiteCzmlArray([
              ...siteCzmlArray,
              <CzmlDataSource data={data} />,
            ]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, [sites]);

  // var testData = [
  //   "1 25544U 98067A   25252.19474949  .00008866  00000-0  16199-3 0  9990",
  //   "2 25544  51.6325 250.6930 0004281 318.3144  41.7518 15.50201228528195",
  // ];

  return (
    <div className="flex relative h-full">
      <Viewer className="flex-1 w-full">
        {satCzmlArray.filter((item, index) => {
          return true;
          return satellites.find((sat) => {
            sat.id === item.key;
          })?.VISIBLE;
        })}
        {siteCzmlArray}
      </Viewer>
      {/*<div className="flex-1 h-full bg-black w-full"></div>*/}
    </div>
  );
}
