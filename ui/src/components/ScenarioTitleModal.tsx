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
import { Popover, PopoverContent, PopoverTrigger } from "./ui/choicePopover";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function ScenarioTitleModal() {
  const { isLoggedIn } = useAppSession();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("Scenario Title");

  const { title: scenarioTitle, setTitle: setScenarioTitle } = useAppSession();

  if (!isLoggedIn) return null;

  return (
    <div className="relative inline-block">
      {!isLoggedIn && (
        <div className="p-4 border rounded bg-red-200 cursor-pointer">
          <Label className="!text-3xl">{scenarioTitle}</Label>
        </div>
      )}

      {isLoggedIn && (
        <Popover open={show} onOpenChange={setShow}>
          <PopoverTrigger
            asChild
            className="flex justify-center items-center rounded-full hover:text-accent-foreground text-primary cursor-pointer w-fit"
          >
            {/* <Button variant="secondary" className="rounded-full w-8 h-8"> */}
            <Label className="!text-3xl">{scenarioTitle}</Label>
            {/* </Button> */}
          </PopoverTrigger>
          <PopoverContent
            className="flex flex-col w-fit shadow-none"
            side="bottom"
            align="center"
          >
            <Card className="min-w-[300px] rounded-xl shadow-lg">
              <CardHeader>
                <CardTitle>Edit Title</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Input
                  defaultValue={title}
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
