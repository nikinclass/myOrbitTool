import { Plus, SatelliteDish } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/choicePopover";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { AddEntityForm } from "./AddEntityForm";
import { ManageSitesTable } from "./ManageSitesTable";

export function ManageSitesButton({ className }: { className: string }) {
  return (
    <div className={className}>
      <Popover>
        <Tooltip delayDuration={500}>
          <TooltipTrigger asChild>
            <PopoverTrigger className="flex justify-center items-center rounded-full h-8 w-8 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 cursor-pointer">
              {/* <Button variant="secondary" className="rounded-full w-8 h-8"> */}
              <SatelliteDish className="h-[1.2rem] w-[1.2rem]" />
              {/* </Button> */}
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Manage sites in scenario</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent
          className="flex flex-col w-fit shadow-none"
          side="right"
        >
          <ManageSitesTable />
        </PopoverContent>
      </Popover>
    </div>
  );
}
