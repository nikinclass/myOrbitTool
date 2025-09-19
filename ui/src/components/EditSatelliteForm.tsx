import type { Satellite } from "@/types";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { SatelliteIcon, Trash2 } from "lucide-react";
import { useAppSession } from "./AppSessionProvider";
import { SliderCombo } from "./SliderCombo";
import { cn } from "@/lib/utils";

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

  const [name, setName] = useState<string>(
    satellite?.OBJECT_NAME ?? "Satellite"
  );

  const [raan, setRAAN] = useState<number>(satellite?.RA_OF_ASC_NODE ?? 0);

  useEffect(() => {
    if (!changesMade) return;

    if (!satellite) return;
    console.log(changesMade);

    const updatedSat: Satellite = {
      ...satellite,
      OBJECT_NAME: name,
      INCLINATION: inclination,
      ECCENTRICITY: eccentricity,
      ARG_OF_PERICENTER: argOfPerigee,
      MEAN_ANOMALY: meanAnomaly,
      MEAN_MOTION: meanMotion,
      RA_OF_ASC_NODE: raan,
    };

    satellite.NORAD_CAT_ID = "CUSTOM";

    updateSatellite(updatedSat);
    setChangesMade(false);
    console.log(changesMade);
  }, [changesMade]);

  return (
    <Card className="full bg-secondary text-secondary-foreground opacity-75 rounded-lg w-[300px] sm:w-[500px]">
      <CardContent>
        <div className="w-full flex flex-wrap justify-center gap-4 h-fit text-start items-start">
          <div
            className={cn(
              "h-8 overflow-hidden",
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground  dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive justify-start gap-1 items-center"
            )}
          >
            <SatelliteIcon className="w-5 h-5 self-center ml-2" />
            <div className="h-full w-1 border-r border-input cursor-not-allowed"></div>
            <p className="outline-none border-none font-normal text-sm text-gray-500 cursor-not-allowed w-fit">{`(#${satellite?.NORAD_CAT_ID})`}</p>
            <input
              autoFocus
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setChangesMade(true);
              }}
              className="outline-none border-none flex-1 font-normal text-sm"
              onFocus={(e) => {
                e.target.select();
              }}
              onMouseDown={(e) => {
                if (document.activeElement !== e.target) {
                  (e.target as HTMLInputElement).focus();
                  e.preventDefault();
                }
              }}
            />
          </div>

          <SliderCombo
            value={eccentricity}
            setValue={setEccentricity}
            updateChange={setChangesMade}
            label="Eccentricity"
            showUnits={false}
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
      </CardContent>
      <CardFooter>
        <Button
          disabled={!canEdit || !satellite}
          className="cursor-pointer h-8 w-full"
          onClick={async () => {
            if (satellite) {
              await removeSatellite(satellite);
              closeModal();
            }
          }}
          variant={"destructive"}
        >
          <Trash2 />
          Delete Satellite
        </Button>
      </CardFooter>
    </Card>
  );
}
