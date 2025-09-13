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
import { AppContext } from "../main";
import type { Satellite } from "@/types";

console.log(`0 ISS (ZARYA)
1 25544U 98067A   25254.83778358  .00007850  00000-0  14414-3 0  9994
2 25544  51.6331 237.5922 0004235 328.5405  31.5330 15.50244386528606`);

const PROXIED_URL = "/api/scenario";
const LOCALHOST_URL = "http://localhost:8080/api/scenario";

export function Scenario() {
  const [czmlArray, setCzmlArray] = useState<any>(null);
  const [siteArray, setSiteArray] = useState<any>(null);
  const [satellites, setSatellites] = useState<Satellite[] | null>();

  const navigate = useNavigate();
  const id = useParams().id;

  // var testData = [
  //   "1 25544U 98067A   25252.19474949  .00008866  00000-0  16199-3 0  9990",
  //   "2 25544  51.6325 250.6930 0004281 318.3144  41.7518 15.50201228528195",
  // ];

  return (
    <div className="flex relative h-full">
      <Viewer className="flex-1 w-full">
        {czmlArray}
        {siteArray}
      </Viewer>
      {/*<div className="flex-1 h-full bg-black w-full"></div>*/}
    </div>
  );
}
