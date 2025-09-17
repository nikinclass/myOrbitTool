import type { Site } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { useState } from "react";
import { Button } from "./ui/button";
import { useAppSession } from "./AppSessionProvider";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";

export function ManualSiteForm({ site }: { site: Site }) {
  const scenario_id = useParams().id;

  const LOCALHOST_URL = "http://localhost:8080/api";

  const { addSite, canEdit } = useAppSession();

  const [siteName, setSiteName] = useState<string>("site");

  const [showLatitudeToggle, setLatitudeToggle] = useState<boolean>(false);

  const [latitude, setLatitude] = useState<number>(0);

  const [showLongitudeToggle, setLongitudeToggle] = useState<boolean>(false);

  const [longitude, setLongitude] = useState<number>(0);

  const [showAltitudeToggle, setAltitudeToggle] = useState<boolean>(false);

  const [altitude, setAltitude] = useState<number>(0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 justify-center items-center">
          <p className="text-left w-full">Create Site</p>
          <Button
            disabled={!canEdit}
            className="cursor-pointer"
            onClick={async () => {
              try {
                // Create record in db
                const response = await fetch(
                  `${LOCALHOST_URL}/scenario/station`,
                  {
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
                  }
                );
                const fullItem = await response.json();
                fullItem[0].COLOR = [255, 255, 0, 255];
                await addSite(fullItem[0]);
                toast.success("Site added!", {
                  description: `${fullItem.name} at LAT:${fullItem.latitude} LONG:${fullItem.longitude}`,
                });
              } catch (error: any) {
                console.error(error);
              }
            }}
            // variant={"destructive"}
          >
            <Plus className="self-center" size={16} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label className="cursor-pointer">Name</Label>
            <Input
              type="text"
              defaultValue={latitude}
              onChange={(e) => {
                setSiteName(e.target.value);
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
                }}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
