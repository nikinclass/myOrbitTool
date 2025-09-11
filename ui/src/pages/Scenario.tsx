import { OrbitViewer } from "@/components/OrbitViewer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const PROXIED_URL = "/api/scenario";
const LOCALHOST_URL = "http://localhost:8080/api/scenario";

export function Scenario() {
  const [stationName, setStationName] = useState<string>("");
  const [stationLatitude, setStationLatitude] = useState<number>();
  const [stationLongitude, setStationLongitude] = useState<number>();
  const [stationAltitude, setStationAltitude] = useState<number>();

  const [tleLine0, settleLine0] = useState<string>("");
  const [tleLine1, settleLine1] = useState<string>("");
  const [tleLine2, settleLine2] = useState<string>("");

  const navigate = useNavigate();
  const id = useParams().id;

  const onSatelliteAdd = async () => {
    const payload = {
      scenario_id: id,
      tle_line0: tleLine0,
      tle_line1: tleLine1,
      tle_line2: tleLine2,
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
  };

  const onStationAdd = async () => {
    const payload = {
      scenario_id: id,
      name: stationName,
      latitude: stationLatitude,
      longitude: stationLongitude,
      altitude: stationAltitude,
    };
    console.log("hey!");
    fetch(`${LOCALHOST_URL}/station`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };

  return (
    <div className="flex relative max-h-full border">
      <div className="flex absolute z-10 flex-col max-w-[300px] h-fit border bg-white p-4">
        <h1>Scenario Page</h1>
        <div className="flex flex-col border-red-500 gap-2">
          <h3>Add a Satellite</h3>
          <input
            className="bg-white"
            type="text"
            placeholder="tle line 0"
            value={tleLine0}
            onChange={(e) => {
              settleLine0(e.target.value);
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
      </div>
      <OrbitViewer className="flex-1 aspect-" />
    </div>
  );
}