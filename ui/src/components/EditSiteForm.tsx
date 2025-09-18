import type { Site } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useAppSession } from "./AppSessionProvider";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";

export function EditSiteForm({
  site,
  closeModal,
}: {
  site: Site | null;
  closeModal: () => void;
}) {
  const scenario_id = useParams().id;

  const LOCALHOST_URL = "http://localhost:8080/api";

  const { removeSite, updateSite, canEdit } = useAppSession();

  const [siteName, setSiteName] = useState<string>(site?.name ?? "site");

  const [changesMade, setChangesMade] = useState<boolean>(false);

  const [showLatitudeToggle, setLatitudeToggle] = useState<boolean>(false);

  const [latitude, setLatitude] = useState<number>(site?.latitude ?? 0);

  const [showLongitudeToggle, setLongitudeToggle] = useState<boolean>(false);

  const [longitude, setLongitude] = useState<number>(site?.longitude ?? 0);

  const [showAltitudeToggle, setAltitudeToggle] = useState<boolean>(false);

  const [altitude, setAltitude] = useState<number>(site?.altitude ?? 0);

  useEffect(() => {
    if (!changesMade) return;

    if (!site) return;
    console.log(changesMade);
    console.log(site)

    const updatedSite: Site = {
      ...site,
      name: siteName,
      latitude: latitude,
      longitude: longitude,
      altitude: altitude
    };

    updateSite(updatedSite);
    setChangesMade(false);
    console.log(changesMade);
  }, [changesMade]);


  return (
    <Card className="opacity-75">
      <CardHeader>
        <CardTitle className="flex gap-2 justify-center items-center">
          <p className="text-left w-full">Edit Site</p>
          <Button
            disabled={!canEdit}
            className="cursor-pointer"
            onClick={async () => {
              if (site) {
                await removeSite(site);
                closeModal();
              }
            }}
            variant={"destructive"}
          >
            <Trash2 className="self-center" size={16} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label className="cursor-pointer">Name</Label>
            <Input
              type="text"
              defaultValue={site?.name}
              onChange={(e) => {
                setSiteName(e.target.value);
                setChangesMade(true);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              className="cursor-pointer"
              onClick={() => setLatitudeToggle(!showLatitudeToggle)}
            >
              Latitude
            </Label>
            {showLatitudeToggle && (
              <div className="flex">
                <Slider
                  className="pt-2 flex-1"
                  defaultValue={[latitude]}
                  onValueChange={(e) => {
                    setLatitude(e[0]);
                    setChangesMade(true)
                  }}
                  max={360}
                  step={0.1}
                />
                <Label className="pr-2 pl-2">{latitude}°</Label>
              </div>
            )}
            {!showLatitudeToggle && (
              <Input
                type="number"
                defaultValue={latitude}
                onChange={(e) => {
                  const val = Number.parseFloat(e.target.value);
                  if (Number.isNaN(val)) return;
                  setLatitude(val);
                  setChangesMade(true)
                }}
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              className="cursor-pointer"
              onClick={() => setLongitudeToggle(!showLongitudeToggle)}
            >
              Longitude
            </Label>
            {showLongitudeToggle && (
              <div className="flex">
                <Slider
                  className="pt-2 flex-1"
                  defaultValue={[longitude]}
                  onValueChange={(e) => {
                    setLongitude(e[0]);
                    setChangesMade(true)
                  }}
                  max={360}
                  step={0.1}
                />
                <Label className="pr-2 pl-2">{longitude}°</Label>
              </div>
            )}
            {!showLongitudeToggle && (
              <Input
                type="number"
                defaultValue={longitude}
                onChange={(e) => {
                  const val = Number.parseFloat(e.target.value);
                  if (Number.isNaN(val)) return;
                  setLongitude(val);
                  setChangesMade(true)
                }}
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              className="cursor-pointer"
              onClick={() => setAltitudeToggle(!showAltitudeToggle)}
            >
              Altitude
            </Label>
            {showAltitudeToggle && (
              <div className="flex">
                <Slider
                  className="pt-2 flex-1"
                  defaultValue={[altitude]}
                  onValueChange={(e) => {
                    setAltitude(e[0]);
                    setChangesMade(true)
                  }}
                  max={5000}
                  step={0.1}
                />
                <Label className="pr-2 pl-2">{altitude}°</Label>
              </div>
            )}
            {!showAltitudeToggle && (
              <Input
                type="number"
                defaultValue={altitude}
                onChange={(e) => {
                  const val = Number.parseFloat(e.target.value);
                  if (Number.isNaN(val)) return;
                  setAltitude(val);
                  setChangesMade(true)
                }}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
