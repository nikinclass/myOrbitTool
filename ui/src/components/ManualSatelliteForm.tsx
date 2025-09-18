import type { Satellite } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useAppSession } from "./AppSessionProvider";
import { SliderCombo } from "./SliderCombo";
import { toast, Toaster } from "sonner";
import { Plus } from "lucide-react";
import { Scenario } from "@/pages/Scenario";

const URL = "/api";

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

export function ManualSatForm() {
    const { addSatellite, removeSatellite, canEdit, updateSatellite, scenario } = useAppSession();

    const [name, setName] = useState<string>("Default Satellite")


    const [eccentricity, setEccentricity] = useState<number>(
        0.00043409
    );

    const [inclination, setInclination] = useState<number>(
        51.6329
    );

    const [argOfPerigee, setArgOfPerigee] = useState<number>(
        352.6018
    );

    const [meanAnomaly, setMeanAnomaly] = useState<number>(
        7.4906
    );

    const [semiMajorAxis, setSemiMajorAxis] = useState<number>(
        //satellite?.MEAN_MOTION ?? 0
        // 6793.789 * 1000
        15.50367586
    );

    const [raan, setRAAN] = useState<number>(206.2777);



    return (
        <Card className="full bg-secondary text-secondary-foreground opacity-75 rounded-lg">
            <CardHeader>
                <CardTitle className="flex gap-2 justify-center items-center">
                    <p className="text-left w-full">
                        Add Satellite
                    </p>
                    <Button
                        disabled={!canEdit}
                        className="cursor-pointer"
                        onClick={async () => {
                            try {
                                // Create record in db
                                const response = await fetch(
                                    `${URL}/scenario/satellite`,
                                    {
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
                                            MEAN_MOTION: semiMajorAxis,//semiMajorAxisToMeanMotion(semiMajorAxis)
                                            RA_OF_ASC_NODE: raan,
                                            OBJECT_NAME: name,
                                            OBJECT_ID: '', // NOT NEEDED
                                            EPOCH: (new Date(Date.now())).toISOString(), // SET TO CURRENT TIME IN JS .NOW OR SOMETHING
                                            EPHEMERIS_TYPE: '0', // NOT NEEDED CAN DEFAULT TO 0
                                            CLASSIFICATION_TYPE: 'U', // NOT NEEDED CAN DEFAULT TO U
                                            NORAD_CAT_ID: "CUSTOM", // NOT NEEDED
                                            ELEMENT_SET_NO: '1', // NOT NEEDED
                                            REV_AT_EPOCH: '1', // NOT NEEDED? PRETTY SURE
                                            BSTAR: '0',
                                            MEAN_MOTION_DOT: '0.00009099',
                                            MEAN_MOTION_DDOT: '0',
                                            COLOR: [255, 0, 255, 255], // DEFAULT TO SOMETHING LIKE [255, 0, 255, 255] but we shoudl give this to the user somehow
                                        }),
                                    }
                                );
                                const fullItem = await response.json();
                                console.log(fullItem)
                                await addSatellite(fullItem);
                                toast.success("Satellite added!", {
                                    description: `${name}`,
                                });
                            } catch (error: any) {
                                console.error(error);
                            }
                        }}
                    >
                        <Plus className="self-center" size={16} />
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="min-h-[50px] w-fit flex">
                    <div className="flex flex-1 flex-row flex-wrap max-w-[400px] justify-center gap-4 h-fit text-start items-start">
                        <SliderCombo
                            value={eccentricity}
                            setValue={setEccentricity}
                            updateChange={() => {}}
                            label="Eccentricity"
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
                            value={semiMajorAxis}
                            setValue={setSemiMajorAxis}
                            updateChange={() => {}}
                            label="Semi-Major Axis"
                            unit="m"
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
                </div>
            </CardContent>
        </Card >
    );
}
