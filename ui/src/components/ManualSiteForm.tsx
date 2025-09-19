import { Card, CardContent, CardFooter } from "./ui/card";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useAppSession } from "./AppSessionProvider";
import { toast } from "sonner";
import { Plus, SatelliteDishIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SliderCombo } from "./SliderCombo";

export function ManualSiteForm({ closeModal }: { closeModal: () => void }) {
  const scenario_id = useParams().id;

  const URL = "/api";

  const { addSite, canEdit } = useAppSession();

  const [siteName, setSiteName] = useState<string>("Ground Station");

  const [latitude, setLatitude] = useState<number>(0);

  const [longitude, setLongitude] = useState<number>(0);

  const [altitude, setAltitude] = useState<number>(0);

  useEffect(() => {
    // Try to load lat long on load
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log(position);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setAltitude(position.coords.altitude ?? 0);
        },
        () => {}
      );
    }
  }, [navigator.geolocation]);

  return (
    <Card className="w-full bg-secondary text-secondary-foreground opacity-75 rounded-lg w-[300px] sm:w-[500px]">
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <div
            className={cn(
              "h-8 overflow-hidden",
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground  dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive justify-start gap-1 items-center"
            )}
          >
            <SatelliteDishIcon className="w-5 h-5 self-center ml-2" />
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
                setSiteName(e.target.value);
              }}
              placeholder="Ground Site Name"
              className="outline-none border-none flex-1 font-normal text-sm"
            ></input>
          </div>

          <SliderCombo
            value={latitude}
            setValue={setLatitude}
            updateChange={() => {}}
            label={"Latitude"}
            showUnits={false}
            min={-90}
            max={90}
          />

          <SliderCombo
            value={longitude}
            setValue={setLongitude}
            updateChange={() => {}}
            label={"Longitude"}
            showUnits={false}
            min={-180}
            max={180}
          />

          <SliderCombo
            className="flex-1"
            value={altitude}
            setValue={setAltitude}
            updateChange={() => {}}
            label={"Altitude"}
            unit="m"
            min={0}
            max={100000}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          disabled={!canEdit}
          className="cursor-pointer w-full h-8"
          onClick={async () => {
            try {
              // Create record in db
              const response = await fetch(`${URL}/scenario/station`, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: siteName,
                  latitude: latitude,
                  longitude: longitude,
                  altitude: altitude,
                  scenario_id: scenario_id,
                }),
              });
              const fullItem = await response.json();
              fullItem[0].COLOR = [255, 255, 0, 255];
              await addSite(fullItem[0]);
              toast.success("Site added!", {
                description: `${siteName} at LAT:${latitude.toFixed(
                  3
                )} LONG:${longitude.toFixed(3)}`,
              });
              closeModal();
            } catch (error: any) {
              console.error(error);
            }
          }}
          // variant={"destructive"}
        >
          <Plus className="self-center" size={16} />
          Add Ground Station
        </Button>
      </CardFooter>
    </Card>
  );
}
