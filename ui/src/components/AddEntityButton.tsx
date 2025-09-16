import { Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/choicePopover";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { AddEntityForm } from "./AddEntityForm";
import { useAppSession } from "./AppSessionProvider";

export function AddEntityButton({ className }: { className: string }) {
  const { isLoggedIn } = useAppSession();
  return (
    <div className={className}>
      <Popover>
        <Tooltip delayDuration={500}>
          <TooltipTrigger asChild>
            <PopoverTrigger
              disabled={!isLoggedIn}
              className="flex justify-center disabled:cursor-not-allowed items-center rounded-full h-8 w-8 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 cursor-pointer"
            >
              {/* <Button variant="secondary" className="rounded-full w-8 h-8"> */}
              <Plus className="h-[1.2rem] w-[1.2rem]" />
              {/* </Button> */}
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="top">
            {isLoggedIn && <p>Add an entity to the scene!</p>}
            {!isLoggedIn && <p>Please log in to add to the scene!</p>}
          </TooltipContent>
        </Tooltip>
        <PopoverContent
          className="flex flex-col w-fit shadow-none"
          side="right"
        >
          <AddEntityForm />
        </PopoverContent>
      </Popover>
    </div>
  );
}
