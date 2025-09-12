import { OrbitViewer } from "@/components/OrbitViewer";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Viewer, CzmlDataSource } from "resium";
import { Plus, Satellite, SatelliteDish } from "lucide-react";
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
import { Cartographic } from "cesium";
import { AddEntityForm } from "@/components/AddEntityForm";
import { PlusToX } from "@/components/ui/PlusToX";

const PROXIED_URL = "/api/scenario";
const LOCALHOST_URL = "http://localhost:8080/api/scenario";

export function Scenario() {
  const [stationName, setStationName] = useState<string>("");
  const [stationLatitude, setStationLatitude] = useState<number>();
  const [stationLongitude, setStationLongitude] = useState<number>();
  const [stationAltitude, setStationAltitude] = useState<number>();

  const [commonName, setCommonName] = useState<string>("");
  const [tleLine1, settleLine1] = useState<string>("");
  const [tleLine2, settleLine2] = useState<string>("");
  const [czmlArray, setCzmlArray] = useState<any>(null);
  const [siteArray, setSiteArray] = useState<any>(null);

  const navigate = useNavigate();
  const id = useParams().id;

  // var testData = [
  //   "1 25544U 98067A   25252.19474949  .00008866  00000-0  16199-3 0  9990",
  //   "2 25544  51.6325 250.6930 0004281 318.3144  41.7518 15.50201228528195",
  // ];

  const onSatelliteAdd = async () => {
    const payload = {
      scenario_id: id,
      OBJECT_NAME: commonName,
      TLE_LINE1: tleLine1,
      TLE_LINE2: tleLine2,
    };

    const response = await fetch(`${LOCALHOST_URL}/satellite`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
    console.log(response);

    fetch(`${LOCALHOST_URL}/czml`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (czmlArray == null) {
          setCzmlArray([<CzmlDataSource data={data} />]);
        } else {
          setCzmlArray([...czmlArray, <CzmlDataSource data={data} />]);
        }
      });
  };

  const onStationAdd = async () => {
    const payload = {
      scenario_id: id,
      OBJECT_NAME: stationName,
      LAT: stationLatitude,
      LONG: stationLongitude,
      ALT: stationAltitude,
    };
    console.log("hey!");
    fetch(`${LOCALHOST_URL}/site`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (siteArray == null) {
          setCzmlArray([<CzmlDataSource data={data} />]);
        } else {
          setCzmlArray([...czmlArray, <CzmlDataSource data={data} />]);
        }
      });
  };

  return (
    <div className="flex relative h-full border">
      <div className="flex absolute z-10 top-35 flex-col max-w-[300px] h-fit border bg-white p-4">
        <h1>Scenario Page</h1>
        <div className="flex flex-col border-red-500 gap-2">
          <h3>Add a Satellite</h3>
          <input
            className="bg-white"
            type="text"
            placeholder="tle line 0"
            value={commonName}
            onChange={(e) => {
              setCommonName(e.target.value);
            }}
          />
          <input
            className="bg-white"
            type="text"
            placeholder="tle line 1"
            value={tleLine1}
            onChange={(e) => {
              settleLine1(e.target.value);
            }}
          />
          <input
            className="bg-white"
            type="text"
            placeholder="tle line 2"
            value={tleLine2}
            onChange={(e) => {
              settleLine2(e.target.value);
            }}
          />
          <button className="border rounded-full" onClick={onSatelliteAdd}>
            Add
          </button>
        </div>
        <div className="flex flex-col border-red-500 gap-2">
          <h3>Add a Ground Station</h3>
          <input
            className="bg-white"
            type="text"
            placeholder="Name"
            value={stationName}
            onChange={(e) => {
              setStationName(e.target.value);
            }}
          />
          <input
            className="bg-white"
            placeholder="Latitude"
            type="number"
            value={stationLatitude}
            onChange={(e) => {
              setStationLatitude(e.target.valueAsNumber);
            }}
          />
          <input
            className="bg-white"
            type="number"
            placeholder="Longitude"
            value={stationLongitude}
            onChange={(e) => {
              setStationLongitude(e.target.valueAsNumber);
            }}
          />
          <input
            className="bg-white"
            type="number"
            placeholder="Altitude"
            value={stationAltitude}
            onChange={(e) => {
              setStationAltitude(e.target.valueAsNumber);
            }}
          />
          <button className="border rounded-full" onClick={onStationAdd}>
            Add
          </button>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Popover>
              <PopoverTrigger className="rounded-full w-8 h-8">
                <Button variant="secondary" className="rounded-full w-8 h-8">
                  <Plus />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="flex flex-col w-fit shadow-none"
                side="right"
              >
                <AddEntityForm></AddEntityForm>
              </PopoverContent>
            </Popover>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Add an entity to the scene!</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Viewer className="flex-1 w-full">
        {czmlArray}
        {siteArray}
      </Viewer>
      {/*<div className="flex-1 h-full bg-black w-full"></div>*/}
    </div>
  );
}
