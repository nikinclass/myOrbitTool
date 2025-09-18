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



export function EditSatForm({
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

  const [meanMotion, setMeanMotion] = useState<number>(
    satellite?.MEAN_MOTION ?? 0
  );

  const [raan, setRAAN] = useState<number>(satellite?.RA_OF_ASC_NODE ?? 0);

  useEffect(() => {
    if (!changesMade) return;

    if (!satellite) return;
    console.log(changesMade);


    const updatedSat: Satellite = {
      ...satellite,
      INCLINATION: inclination,
      ECCENTRICITY: eccentricity,
      ARG_OF_PERICENTER: argOfPerigee,
      MEAN_ANOMALY: meanAnomaly,
      MEAN_MOTION: meanMotion,
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
              value={meanMotion}
              setValue={setMeanMotion}
              updateChange={setChangesMade}
              label="Mean Motion"
              unit="Rev/Day"
              min={0}
              max={20}
              step={1}
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
