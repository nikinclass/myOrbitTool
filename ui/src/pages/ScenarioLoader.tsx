import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const PROXIED_URL = "/api/scenario";
const LOCALHOST_URL = "http://localhost:8080/api/scenario";

export function ScenarioLoader() {
  const navigate = useNavigate();
  const createScenario = async () => {
    const response = await fetch(PROXIED_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const json = await response.json();
    navigate(`/scenario/${json.id}`);
  };

  useEffect(() => {
    createScenario();
  }, []);

  return (
    <div className="flex flex-col border p-4 bg-green-500">
      <h1>Creating scenario page, you should be redirected soon </h1>
    </div>
  );
}
