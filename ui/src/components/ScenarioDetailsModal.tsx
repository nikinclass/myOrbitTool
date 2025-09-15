import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAppSession } from "./AppSessionProvider";

export function ScenarioDetailsModal() {
  const { isLoggedIn } = useAppSession();
  const [show, setShow] = useState(false);
  const [someDetail, setSomeDetail] = useState("Scenario Title");

  if (!isLoggedIn) return null;

  function handleSaveClick() {
    alert("save button clicked");
  }

  return (
    <div className="relative inline-block">
      {isLoggedIn && (
        <div className="p-4 border rounded bg-red-200 cursor-pointer" onClick={() => setShow((bool) => !bool)}>
          <Label className="!text-3xl">
            ?
          </Label>
        </div>
      )}

      {show && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50">
          <Card className="min-w-[300px] rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle>Edit Details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Input
                value={someDetail}
                onChange={(e) => setSomeDetail(e.target.value)}
              />
              <Button onClick={() => setShow(false)}>Save Details</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
