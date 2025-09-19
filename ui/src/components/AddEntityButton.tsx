import { Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/choicePopover";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { AddEntityForm } from "./AddEntityForm";
import { useAppSession } from "./AppSessionProvider";
import { useState } from "react";

export function AddEntityButton({ className }: { className: string }) {
  const { canEdit } = useAppSession();
  const [open, setOpen] = useState<boolean>(true)
  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <Tooltip delayDuration={500}>
          <TooltipTrigger asChild>
            <PopoverTrigger
              disabled={!canEdit}
              className="flex justify-center disabled:cursor-not-allowed items-center rounded-full h-8 w-8 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 cursor-pointer"
            >
              {/* <Button variant="secondary" className="rounded-full w-8 h-8"> */}
              <Plus className="h-[1.2rem] w-[1.2rem]" />
              {/* </Button> */}
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="top">
            {canEdit && <p>Add an entity to the scene!</p>}
            {!canEdit && (
              <p>You must own this scenario to make edits/additions</p>
            )}
          </TooltipContent>
        </Tooltip>
        <PopoverContent
          className="flex flex-col w-fit shadow-none"
          side="right"
        >
          <AddEntityForm closeModal={()=>{setOpen(false)}} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
