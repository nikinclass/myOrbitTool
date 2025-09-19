import { Card, CardContent, CardFooter } from "./ui/card";
import { useState } from "react";
import { Button } from "./ui/button";
import { useAppSession } from "./AppSessionProvider";
import { SliderCombo } from "./SliderCombo";
import { toast } from "sonner";
import { Plus, SatelliteIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const URL = "/api";

// function meanMotionToSemiMajorAxis(mean_motion: number | undefined) {
//     if (mean_motion === undefined) return undefined;
//     // mean_motion is rev/day
//     const M = 3.986004418 * Math.pow(10, 14); // m^3/s^2
//     const n = (mean_motion * (2 * Math.PI)) / (24 * 60 * 60);

//     return Math.cbrt(M / (n * n));
// }

// function semiMajorAxisToMeanMotion(semiMajorAxis: number) {
//     const M = 3.986004418 * Math.pow(10, 14); // m^3/s^2

//     return ((24 * 60 * 60) / Math.PI) * Math.sqrt(M / Math.pow(semiMajorAxis, 3));
// }

export function ManualSatForm({ closeModal }: { closeModal: () => void }) {
  const { addSatellite, canEdit, scenario } = useAppSession();

  const [name, setName] = useState<string>("Default Satellite");

  const [eccentricity, setEccentricity] = useState<number>(0.00043409);

  const [inclination, setInclination] = useState<number>(51.6329);

  const [argOfPerigee, setArgOfPerigee] = useState<number>(352.6018);

  const [meanAnomaly, setMeanAnomaly] = useState<number>(7.4906);

  const [meanMotion, setMeanMotion] = useState<number>(
    //satellite?.MEAN_MOTION ?? 0
    // 6793.789 * 1000
    15.50367586
  );

  const [raan, setRAAN] = useState<number>(206.2777);

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
            <div className="h-full w-1 border-r border-input"></div>
            <input
              autoFocus
              onFocus={(e) => {
                e.target.select();
              }}
              onMouseDown={(e) => {
                if (document.activeElement !== e.target) {
                  (e.target as HTMLInputElement).focus();
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Satellite Name"
              className="outline-none border-none flex-1 font-normal text-sm"
            ></input>
          </div>
          <SliderCombo
            value={eccentricity}
            setValue={setEccentricity}
            updateChange={() => {}}
            label="Eccentricity"
            showUnits={false}
            min={0}
            max={0.9}
            step={0.01}
          />
          <SliderCombo
            value={inclination}
            setValue={setInclination}
            updateChange={() => {}}
            label="Inclination"
            min={0}
            max={360}
            step={1}
          />
          <SliderCombo
            value={meanMotion}
            setValue={setMeanMotion}
            updateChange={() => {}}
            label="Mean Motion"
            unit="Rev/Day"
            min={1000}
            max={10000000000}
            step={1000}
          />
          <SliderCombo
            value={argOfPerigee}
            setValue={setArgOfPerigee}
            updateChange={() => {}}
            label="Arg of Perigee"
            min={0}
            max={360}
            step={1}
          />
          <SliderCombo
            value={meanAnomaly}
            setValue={setMeanAnomaly}
            updateChange={() => {}}
            label="Mean Anomaly"
            min={0}
            max={360}
            step={1}
          />
          <SliderCombo
            value={raan}
            setValue={setRAAN}
            updateChange={() => {}}
            label="RAAN"
            min={0}
            max={360}
            step={1}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          disabled={!canEdit}
          className="cursor-pointer h-8 w-full"
          onClick={async () => {
            try {
              // Create record in db
              const response = await fetch(`${URL}/scenario/satellite`, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  scenario_id: scenario?.id,
                  INCLINATION: inclination,
                  ECCENTRICITY: eccentricity,
                  ARG_OF_PERICENTER: argOfPerigee,
                  MEAN_ANOMALY: meanAnomaly,
                  MEAN_MOTION: meanMotion, //semiMajorAxisToMeanMotion(semiMajorAxis)
                  RA_OF_ASC_NODE: raan,
                  OBJECT_NAME: name,
                  OBJECT_ID: "", // NOT NEEDED
                  EPOCH: new Date(Date.now()).toISOString(), // SET TO CURRENT TIME IN JS .NOW OR SOMETHING
                  EPHEMERIS_TYPE: "0", // NOT NEEDED CAN DEFAULT TO 0
                  CLASSIFICATION_TYPE: "U", // NOT NEEDED CAN DEFAULT TO U
                  NORAD_CAT_ID: "CUSTOM", // NOT NEEDED
                  ELEMENT_SET_NO: "1", // NOT NEEDED
                  REV_AT_EPOCH: "1", // NOT NEEDED? PRETTY SURE
                  BSTAR: "0",
                  MEAN_MOTION_DOT: "0.00009099",
                  MEAN_MOTION_DDOT: "0",
                  COLOR: [255, 0, 255, 255], // DEFAULT TO SOMETHING LIKE [255, 0, 255, 255] but we shoudl give this to the user somehow
                }),
              });
              const fullItem = await response.json();
              console.log(fullItem);
              await addSatellite(fullItem);
              toast.success("Satellite added!", {
                description: `${name}`,
              });
              closeModal();
            } catch (error: any) {
              console.error(error);
            }
          }}
        >
          <Plus className="self-center" size={16} />
          Add Satellite
        </Button>
      </CardFooter>
    </Card>
  );
}
