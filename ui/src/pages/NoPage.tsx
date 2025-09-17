import { useAppSession } from "@/components/AppSessionProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function NoPage() {
  const [scenarioID, setScenarioID] = useState<string>("");
  const navigate = useNavigate();

  const { isLoggedIn } = useAppSession();

  return (
    <>
      <div className="flex flex-col p-4 items-center h-full justify-center gap-4">
        <p className="text-lg text-destructive font-bold text-center">
          Page not found!
        </p>
        <div className="flex flex-col justify-center items-center gap-2">
          {isLoggedIn && (
            <h1>
              Use the options below to navigate to an existing scenario or
              create a new one!
            </h1>
          )}
          {!isLoggedIn && (
            <h1>
              Please log in to create scenarios. Or enter a scenario ID to
              continue.
            </h1>
          )}
          <div className="flex gap-2">
            {isLoggedIn && (
              <Button
                onClick={() => {
                  navigate("/scenario");
                }}
              >
                Create Scenario
              </Button>
            )}
            <Input
              autoFocus
              onFocus={(e) => {
                e.target.select();
              }}
              aria-controls="hidden"
              placeholder="Scenario ID #"
              className="max-w-[300px] justify-center items-center"
              value={scenarioID ?? -1}
              onChange={(e) => {
                setScenarioID(e.target.value);
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  const num = Number.parseInt(scenarioID);
                  if (Number.isNaN(num)) navigate(`/scenario/-1 `);
                  else {
                    navigate(`/scenario/${num}`);
                  }
                }
              }}
            />
            <Button
              disabled={!scenarioID}
              onClick={() => {
                const num = Number.parseInt(scenarioID);
                if (Number.isNaN(num)) navigate(`/scenario/-1 `);
                else {
                  navigate(`/scenario/${num}`);
                }
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
