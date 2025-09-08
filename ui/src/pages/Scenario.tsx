import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const PROXIED_URL = "/api/scenario";
const LOCALHOST_URL = "http://localhost:8080/api/scenario";

export function Scenario() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col border p-4 bg-green-500">
      <h1>Scenario Page</h1>
      <div className="flex flex-col border-red-500 gap-2">
        <h3>Add a Satellite</h3>
        <input className="bg-white" type="text" placeholder="tle line 0" />
        <input className="bg-white" type="text" placeholder="tle line 1" />
        <input className="bg-white" type="text" placeholder="tle line 2" />
        <button className="border rounded-full">Add</button>
      </div>
      <div className="flex flex-col border-red-500 gap-2">
        <h3>Add a Ground Station</h3>
        <input className="bg-white" type="text" placeholder="Latitude" />
        <input className="bg-white" type="text" placeholder="Longitude" />
        <input className="bg-white" type="text" placeholder="Altitude" />
        <button className="border rounded-full">Add</button>
      </div>
    </div>
  );
}
