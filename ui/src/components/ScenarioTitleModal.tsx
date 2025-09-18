import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAppSession } from "./AppSessionProvider";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/choicePopover";

export function ScenarioTitleModal() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");

  const {
    canEdit,
    scenario,
    isLoading,
    error,
    setTitle: setScenarioTitle,
  } = useAppSession();

  if (isLoading || error || !scenario) {
    return <></>;
  }

  return (
    <div className="relative inline-block">
      {!canEdit && (
        <div className="p-4 rounded text-center">
          <Label className="!text-3xl">
            {scenario.title || `Scenario ${scenario.id}`}
          </Label>
        </div>
      )}

      {canEdit && (
        <Popover open={show} onOpenChange={setShow}>
          <PopoverTrigger
            asChild
            className="flex justify-center items-center rounded-full hover:text-accent-foreground text-primary cursor-pointer w-fit pointer-events-auto"
          >
            {/* <Button variant="secondary" className="rounded-full w-8 h-8"> */}
            <Label className="!text-3xl">
              {scenario.title ?? `Scenario ${scenario.id}`}
            </Label>
            {/* </Button> */}
          </PopoverTrigger>
          <PopoverContent
            className="flex flex-col w-fit shadow-none opacity-75"
            side="bottom"
            align="center"
          >
            <Card className="min-w-[300px] rounded-xl shadow-lg gap-2 pt-4">
              <CardHeader>
                <CardTitle>Edit Title</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Input
                  defaultValue={scenario.title ?? `Scenario ${scenario.id}`}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Button
                  onClick={() => {
                    setShow(false);
                    setScenarioTitle(title);
                  }}
                >
                  Save Title
                </Button>
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>
      )}
      {/*
      {show && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50"></div>
      )} */}
    </div>
  );
}
