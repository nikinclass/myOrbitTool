import { Plus, SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAppSession } from "./AppSessionProvider";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const URL = "/api";

type SatItem = {
  id: number;
  NORAD_CAT_ID: string;
  OBJECT_NAME: string;
};

export function Search() {
  const [search, setSearch] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<SatItem[] | null>();
  const { addSatellite } = useAppSession();

  const scenario_id = useParams().id;

  useEffect(() => {
    const getSearchItems = async () => {
      try {
        const response = await fetch(
          `${URL}/satellites?filter=${search?.toLowerCase()}`
        );
        const payload = await response.json();
        setFilteredItems(payload);
      } catch (err: unknown) {}
    };
    getSearchItems();
  }, [search]);
  return (
    <div className="text-card-foreground opacity-75 bg-card rounded-lg overflow-hidden w-[300px]">
      <div
        className={cn(
          "flex gap-1 items-center text-secondary-foreground ",
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-background flex h-8 w-full min-w-0 rounded-md px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          `${search && search.length > 0 ? "rounded-b-none border-b" : ""}`
        )}
      >
        <SearchIcon size={16} />
        <input
          placeholder="Search by SATNO or name"
          className="border-none outline-none flex-1 text-sm"
          autoFocus
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onFocus={(e) => {
            e.target.select();
          }}
          onMouseDown={(e) => {
            if (document.activeElement !== e.target) {
              (e.target as HTMLInputElement).focus();
              e.preventDefault();
            }
          }}
        />
      </div>
      {search && search.length > 0 && (
        <div className="flex flex-col gap-1 text-sm bg-secondary text-secondary-foreground p-2 w-full">
          {filteredItems &&
            filteredItems.length > 0 &&
            filteredItems.map((item, index) => {
              return (
                <div
                  key={index}
                  className="p-1 pr-4 pl-4 hover:bg-accent-foreground/10 hover:text-accent-foreground dark:hover:bg-card rounded-lg w-full h-fit flex select-none cursor-pointer"
                  title={`#${item.NORAD_CAT_ID} ${item.OBJECT_NAME}`}
                  onClick={async () => {
                    try {
                      // Get entire record
                      const response = await fetch(
                        `${URL}/satellites/${item.id}`
                      );
                      // Add the data to the record

                      if (!response.ok) {
                        console.log(response);
                        return;
                      }

                      const { id: old_id, ...fullItem } = await response.json();
                      fullItem.COLOR = [255, 0, 255, 255];
                      fullItem.VISIBLE = true;

                      // Create record in db
                      const { id } = await (
                        await fetch(`${URL}/scenario/satellite`, {
                          method: "POST",
                          headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            ...fullItem,
                            scenario_id: scenario_id,
                          }),
                        })
                      ).json();

                      fullItem.id = id;
                      await addSatellite(fullItem);
                      toast.success("Satellite added!", {
                        description: `(${item.NORAD_CAT_ID}) ${item.OBJECT_NAME}`,
                      });
                    } catch (error: any) {
                      console.error(error);
                    }
                  }}
                >
                  <div className="flex-1 flex text-sm gap-1 truncate pr-4">
                    <p>(#{item.NORAD_CAT_ID})</p>
                    <p className="truncate text-nowrap w-full font-bold">
                      {item.OBJECT_NAME}
                    </p>
                  </div>
                  <Plus className="self-center" size={16} />
                </div>
              );
            })}
          {!(filteredItems && filteredItems.length > 0) && (
            <div className="p-1 pr-4 pl-4 rounded-lg w-full h-fit">
              No matching satellite found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
