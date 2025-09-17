import { Satellite, SatelliteDish } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Search } from "./Search";
import { ManualSiteForm } from "@/components/ManualSiteForm"

function EntityChoices({
  setFormType,
}: {
  setFormType: React.Dispatch<React.SetStateAction<FormType | null>>;
}) {
  return (
    <>
      <Button
        variant="secondary"
        className="rounded-lg flex h-8 w-fit opacity-75"
        onClick={() => {
          setFormType("live-satellite");
        }}
      >
        <Satellite />
        <p>Live Satellite</p>
      </Button>
      <Button
        variant="secondary"
        className="rounded-lg flex h-8 w-fit opacity-75"
        onClick={() => {
          setFormType("manual-satellite");
        }}
      >
        <Satellite />
        <p>Manual Satellite</p>
      </Button>
      <Button
        variant="secondary"
        className="rounded-lg flex h-8 w-fit opacity-75"
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
function LiveSatForm() {
  return <Search />;
}

function ManualSatForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="w-fit">
          Add Live Satellite From Space-Track
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Search />
      </CardContent>
    </Card>
  );
}
type FormType = "live-satellite" | "manual-satellite" | "manual-station";
export function AddEntityForm() {
  const [formType, setFormType] = useState<FormType | null>(null);
  if (!formType) return <EntityChoices setFormType={setFormType} />;
  if (formType === "live-satellite") return <LiveSatForm />;
  if (formType === "manual-station") return <ManualSiteForm />;
  return <></>;
}
