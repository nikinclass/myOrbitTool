import { Satellite, SatelliteDish } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Search } from "./Search";
import { ManualSiteForm } from "@/components/ManualSiteForm";
import { ManualSatForm } from "@/components/ManualSatelliteForm";

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

type FormType = "live-satellite" | "manual-satellite" | "manual-station";
export function AddEntityForm({ closeModal }: { closeModal: () => void }) {
  const [formType, setFormType] = useState<FormType | null>(null);
  if (!formType) return <EntityChoices setFormType={setFormType} />;
  if (formType === "live-satellite") return <Search />;
  if (formType === "manual-satellite")
    return <ManualSatForm closeModal={closeModal} />;
  if (formType === "manual-station")
    return <ManualSiteForm closeModal={closeModal} />;
  return <></>;
}
