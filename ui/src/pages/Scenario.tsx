import { Viewer } from "resium";

import { useAppSession } from "@/components/AppSessionProvider";

export function Scenario() {
  const { scenario, getSatelliteCZMLs } = useAppSession();

  if (!scenario) return <></>;

  // const satCzmlArray = scenario.satellites.map((sat) => sat.CZML);
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
