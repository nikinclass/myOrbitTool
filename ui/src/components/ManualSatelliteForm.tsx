import type { Satellite } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { useState } from "react";

export function ManualFieldForm({
  satellite,
}: {
  satellite: Satellite | null;
}) {
  const [showInclinationToggle, setInclinationToggle] =
    useState<boolean>(false);
  const [showAxisToggle, setAxisToggle] = useState<boolean>(false);

  const [showEccentricityToggle, setEccentricityToggle] =
    useState<boolean>(false);
  const [eccentricity, setEccentricity] = useState<number>(0);

  const [showPeriapsisToggle, setPeriapsisToggle] = useState<boolean>(false);

  const [showRAANToggle, setRAANToggle] = useState<boolean>(false);

  const [showMeanAnomalyToggle, setMeanAnomalyToggle] =
    useState<boolean>(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit a Satellite</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label
              className="cursor-pointer"
              onClick={() => setEccentricityToggle(!showEccentricityToggle)}
            >
              Eccentricity
            </Label>
            {showEccentricityToggle && (
              <div className="flex">
                <Slider
                  className="pt-2 flex-1"
                  defaultValue={[eccentricity]}
                  onValueChange={(e) => {
                    setEccentricity(e[0]);
                  }}
                  max={0.999}
                  step={0.1}
                />
                <Label className="pr-2 pl-2">{eccentricity}°</Label>
              </div>
            )}
            {!showEccentricityToggle && (
              <Input
                type="number"
                defaultValue={eccentricity}
                onChange={(e) => {
                  const val = Number.parseFloat(e.target.value);
                  if (Number.isNaN(val)) return;
                  setEccentricity(val);
                }}
              />
            )}
          </div>
          <Label>Semi-major Axis</Label>
          <Input />
          <Label>Inclination</Label>
          <Slider defaultValue={[0]} max={360} step={1} />
          <Label>Argument of Periapsis</Label>
          <Slider defaultValue={[0]} max={360} step={1} />
          <Label>RAAN</Label>
          <Slider defaultValue={[0]} max={360} step={1} />
          <Label>Mean Anomaly</Label>
          <Slider defaultValue={[0]} max={360} step={1} />
        </div>
      </CardContent>
    </Card>
  );
}
