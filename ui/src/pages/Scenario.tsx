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
  const { scenario, getSatelliteCZMLs } = useAppSession();

  const navigate = useNavigate();
  const id = useParams().id;

  // useEffect(() => {
  //   if (!scenario) return;
  //   console.log("Converting satellites");
  //   scenario.satellites.forEach(async (sat, index) => {
  //     const res = await fetch(`${PROXIED_URL}/satczml`, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(sat),
  //     });
  //     const data = await res.json();

  //     await setSatCzmlArray([
  //       ...satCzmlArray,
  //       <CzmlDataSource key={data.id} data={data} show={data} />,
  //     ]);
  //     console.log("Finished converting");
  //   });
  // }, [scenario, scenario?.satellites]);

  if (!scenario) return <></>;

  const satCzmlArray = scenario.satellites.map((sat) => sat.CZML);
  const siteCzmlArray = scenario.sites.map((site) => site.CZML);

  return (
    <div className="flex relative h-full">
      <Viewer className="flex-1 w-full">
        {getSatelliteCZMLs()}
        {siteCzmlArray}
      </Viewer>
    </div>
  );
}
