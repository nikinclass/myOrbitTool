import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useAppSession } from "./AppSessionProvider";
import { CircleQuestionMark } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/choicePopover";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Textarea } from "./ui/textarea";

export function ScenarioDetailsModal() {
  const { isLoggedIn } = useAppSession();
  const [show, setShow] = useState(false);
  const [someDetail, setSomeDetail] = useState("");

  const { setDescription, description } = useAppSession();

  return (
    <>
      {!isLoggedIn && (
        <Tooltip open={show} onOpenChange={setShow}>
          <TooltipTrigger
            asChild
            className="flex justify-center items-center rounded-full hover:text-accent-foreground text-primary cursor-pointer w-fit pointer-events-auto"
          >
            {/* <Button variant="secondary" className="rounded-full w-8 h-8"> */}
            <CircleQuestionMark />
            {/* </Button> */}
          </TooltipTrigger>
          <TooltipContent
            className="flex flex-col shadow-none max-w-[200px] wrap"
            side="bottom"
            align="center"
          >
            {description ? (
              <p className="text-wrap trim text-left w-full">{description}</p>
            ) : (
              <p className="text-wrap trim text-left w-full">
                A scenario created by myOrbitTool
              </p>
            )}
          </TooltipContent>
        </Tooltip>
      )}
      {isLoggedIn && (
        <Popover open={show} onOpenChange={setShow}>
          <PopoverTrigger
            asChild
            className="flex justify-center items-center rounded-full hover:text-accent-foreground text-primary cursor-pointer w-fit pointer-events-auto"
          >
            <CircleQuestionMark />
          </PopoverTrigger>
          <PopoverContent
            className="flex flex-col w-fit shadow-none"
            side="bottom"
            align="center"
          >
            <Card className="min-w-[300px] rounded-xl shadow-lg gap-1 pt-3">
              <CardHeader className="font-bold">Edit Description</CardHeader>
              <CardContent className="flex flex-col gap-3 ">
                <Textarea
                  maxLength={250}
                  autoFocus
                  onFocus={(e) => {
                    e.target.select();
                  }}
                  defaultValue={description}
                  onChange={(e) => setSomeDetail(e.target.value)}
                  placeholder="Type scenario description here."
                />
                <Button
                  onClick={() => {
                    setShow(false);
                    setDescription(someDetail);
                  }}
                >
                  Save Description
                </Button>
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
