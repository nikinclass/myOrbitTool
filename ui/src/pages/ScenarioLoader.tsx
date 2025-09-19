import { useAppSession } from "@/components/AppSessionProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function ScenarioLoader() {
  const navigate = useNavigate();
  const { isLoggedIn, createScenario, scenario } = useAppSession();

  const [scenarioID, setScenarioID] = useState<string>("");

  useEffect(() => {
    createScenario();
  }, [isLoggedIn]);

  return (
    <div className="self-center items-center text-center m-auto">
      {isLoggedIn && (
        <h1>Creating scenario page, you should be redirected soon </h1>
      )}
      {!isLoggedIn && (
        <div className="flex flex-col justify-center items-center gap-2">
          <h1>
            Please log in to create scenarios. Or enter a scenario ID to
            continue.
          </h1>
          <div className="flex gap-2">
            <Input
              aria-controls="hidden"
              placeholder="Scenario ID #"
              className="max-w-[300px] justify-center items-center"
              value={scenarioID}
              onChange={(e) => {
                setScenarioID(e.target.value);
              }}
            />
            <Button
              disabled={scenarioID.length < 1}
              onClick={() => {
                navigate(`/scenario/${scenarioID}`);
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
