import { useLocation } from "react-router-dom";

import { AddEntityButton } from "./AddEntityButton";
import { ManageSatellitesButton } from "./ManageSatellitesButton";
import { ScenarioTitleModal } from "./ScenarioTitleModal";
import { ScenarioDetailsModal } from "./ScenarioDetailsModal";

export const Controls = () => {
  const location = useLocation();

  if (location.pathname.split("/")[1] !== "scenario") {
    return;
  }

  return (
    <>
      <div className="absolute top-2 left-0 right-0 gap-2 z-1 opacity-75 flex items-center justify-center pointer-events-none">
        <ScenarioTitleModal />
        <ScenarioDetailsModal />
      </div>

      <AddEntityButton className="absolute z-10 top-1/3 flex flex-col opacity-75 p-4" />
      <ManageSatellitesButton className="absolute z-10 top-2/5 flex flex-col opacity-75 p-4" />
    </>
  );
};
