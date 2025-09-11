import { Satellite, SatelliteDish } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

function EntityChoices({
  setFormType,
}: {
  setFormType: React.Dispatch<React.SetStateAction<FormType | null>>;
}) {
  return (
    <>
      <Button
        variant="secondary"
        className="rounded-lg flex h-8 w-fit"
        onClick={() => {
          setFormType("live-satellite");
        }}
      >
        <Satellite />
        <p>Live Satellite</p>
      </Button>
      <Button
        variant="secondary"
        className="rounded-lg flex h-8 w-fit"
        onClick={() => {
          setFormType("manual-satellite");
        }}
      >
        <Satellite />
        <p>Manual Satellite</p>
      </Button>
      <Button
        variant="secondary"
        className="rounded-lg flex h-8 w-fit"
        onClick={() => {
          setFormType("manual-station");
        }}
      >
        <SatelliteDish />
        <p>Manual Ground Station</p>
      </Button>
    </>
  );
}
type FormType = "live-satellite" | "manual-satellite" | "manual-station";
export function AddEntityForm() {
  const [formType, setFormType] = useState<FormType | null>(null);
  if (!formType) return <EntityChoices setFormType={setFormType} />;
  return <></>;
}
