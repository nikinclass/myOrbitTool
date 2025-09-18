import type { Satellite } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useAppSession } from "./AppSessionProvider";
import { SliderCombo } from "./SliderCombo";

function meanMotionToSemiMajorAxis(mean_motion: number | undefined) {
  if (mean_motion === undefined) return undefined;
  // mean_motion is rev/day
  const M = 3.986004418 * Math.pow(10, 14); // m^3/s^2
  const n = (mean_motion * (2 * Math.PI)) / (24 * 60 * 60);

  return Math.cbrt(M / (n * n));
}

function semiMajorAxisToMeanMotion(semiMajorAxis: number) {
  const M = 3.986004418 * Math.pow(10, 14); // m^3/s^2

  return ((24 * 60 * 60) / Math.PI) * Math.sqrt(M / Math.pow(semiMajorAxis, 3));
}

export function ManualSatForm({
  satellite,
  closeModal,
}: {
  satellite: Satellite | null;
  closeModal: () => void;
}) {
  const { removeSatellite, canEdit, updateSatellite } = useAppSession();

  const [changesMade, setChangesMade] = useState<boolean>(false);

  const [eccentricity, setEccentricity] = useState<number>(
    satellite?.ECCENTRICITY ?? 0
  );

  const [inclination, setInclination] = useState<number>(
    satellite?.INCLINATION ?? 0
  );

  const [argOfPerigee, setArgOfPerigee] = useState<number>(
    satellite?.ARG_OF_PERICENTER ?? 0
  );

  const [meanAnomaly, setMeanAnomaly] = useState<number>(
    satellite?.MEAN_ANOMALY ?? 0
  );

  const [semiMajorAxis, setSemiMajorAxis] = useState<number>(
    //satellite?.MEAN_MOTION ?? 0
    meanMotionToSemiMajorAxis(satellite?.MEAN_MOTION) ?? 0
  );

  const [raan, setRAAN] = useState<number>(satellite?.RA_OF_ASC_NODE ?? 0);

  useEffect(() => {
    if (!changesMade) return;

    if (!satellite) return;
    console.log(changesMade);

    const mean_motion = semiMajorAxisToMeanMotion(semiMajorAxis);

    const updatedSat: Satellite = {
      ...satellite,
      INCLINATION: inclination,
      ECCENTRICITY: eccentricity,
      ARG_OF_PERICENTER: argOfPerigee,
      MEAN_ANOMALY: meanAnomaly,
      MEAN_MOTION: mean_motion,
      RA_OF_ASC_NODE: raan,
    };

    updateSatellite(updatedSat);
    setChangesMade(false);
    console.log(changesMade);
  }, [changesMade]);

  return (
    <Card className="full bg-secondary text-secondary-foreground opacity-75 rounded-lg">
      <CardHeader>
        <CardTitle className="flex gap-2 justify-center items-center">
          <p className="text-left w-full">
            Edit {satellite ? `Sat#${satellite?.NORAD_CAT_ID}` : "Satellite"}
          </p>
          <Button
            disabled={!canEdit || !satellite}
            className="cursor-pointer"
            onClick={async () => {
              if (satellite) {
                await removeSatellite(satellite);
                closeModal();
              }
            }}
            variant={"destructive"}
          >
            <Trash2 />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="min-h-[50px] w-fit flex">
          <div className="flex flex-1 flex-row flex-wrap max-w-[400px] justify-center gap-4 h-fit text-start items-start">
            <SliderCombo
              value={eccentricity}
              setValue={setEccentricity}
              updateChange={setChangesMade}
              label="Eccentricity"
              min={0}
              max={0.9}
              step={0.01}
            />
            <SliderCombo
              value={inclination}
              setValue={setInclination}
              updateChange={setChangesMade}
              label="Inclination"
              min={0}
              max={360}
              step={1}
            />
            <SliderCombo
              value={semiMajorAxis}
              setValue={setSemiMajorAxis}
              updateChange={setChangesMade}
              label="Semi-Major Axis"
              unit="m"
              min={1000}
              max={10000000000}
              step={1000}
            />
            <SliderCombo
              value={argOfPerigee}
              setValue={setArgOfPerigee}
              updateChange={setChangesMade}
              label="Arg of Perigee"
              min={0}
              max={360}
              step={1}
            />
            <SliderCombo
              value={meanAnomaly}
              setValue={setMeanAnomaly}
              updateChange={setChangesMade}
              label="Mean Anomaly"
              min={0}
              max={360}
              step={1}
            />
            <SliderCombo
              value={raan}
              setValue={setRAAN}
              updateChange={setChangesMade}
              label="RAAN"
              min={0}
              max={360}
              step={1}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
