import type { Site } from "@/types";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useAppSession } from "./AppSessionProvider";
import { SatelliteDishIcon, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SliderCombo } from "./SliderCombo";

export function EditSiteForm({
  site,
  closeModal,
}: {
  site: Site | null;
  closeModal: () => void;
}) {
  const { removeSite, updateSite, canEdit } = useAppSession();

  const [siteName, setSiteName] = useState<string>(site?.name ?? "site");

  const [changesMade, setChangesMade] = useState<boolean>(false);

  const [latitude, setLatitude] = useState<number>(site?.latitude ?? 0);

  const [longitude, setLongitude] = useState<number>(site?.longitude ?? 0);

  const [altitude, setAltitude] = useState<number>(site?.altitude ?? 0);

  useEffect(() => {
    if (!changesMade) return;

    if (!site) return;
    console.log(changesMade);
    console.log(site);

    const updatedSite: Site = {
      ...site,
      name: siteName,
      latitude: latitude,
      longitude: longitude,
      altitude: altitude,
    };

    updateSite(updatedSite);
    setChangesMade(false);
    console.log(changesMade);
  }, [changesMade]);

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
              defaultValue={site?.name}
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
                setChangesMade(true);
              }}
              placeholder="Ground Site Name"
              className="outline-none border-none flex-1 font-normal text-sm"
            ></input>
          </div>

          <SliderCombo
            value={latitude}
            setValue={setLatitude}
            updateChange={setChangesMade}
            label={"Latitude"}
            showUnits={false}
            min={-90}
            max={90}
          />

          <SliderCombo
            value={longitude}
            setValue={setLongitude}
            updateChange={setChangesMade}
            label={"Longitude"}
            showUnits={false}
            min={-180}
            max={180}
          />

          <SliderCombo
            className="flex-1"
            value={altitude}
            setValue={setAltitude}
            updateChange={setChangesMade}
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
            if (site) {
              await removeSite(site);
              closeModal();
            }
          }}
          variant={"destructive"}
        >
          <Trash2 className="self-center" size={16} /> Delete Ground Station
        </Button>
      </CardFooter>
    </Card>
  );
}
