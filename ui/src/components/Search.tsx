import { Plus, SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const PROXIED_URL = "/api/satellites";
const LOCALHOST_URL = "http://localhost:8080/api/satellites";

type SatItem = {
  id: number;
  NORAD_CAT_ID: string;
  OBJECT_NAME: string;
};

export function Search({ items }: { items: [] }) {
  const [search, setSearch] = useState<string>();
  const [filteredItems, setFilteredItems] = useState<SatItem[] | null>();
  useEffect(() => {
    const getSearchItems = async () => {
      try {
        const response = await fetch(
          `${LOCALHOST_URL}?filter=${search?.toLowerCase()}`
        );
        const payload = await response.json();
        setFilteredItems(payload);
      } catch (err: unknown) {}
    };
    getSearchItems();
  }, [search]);

  return (
    <div className="text-card-foreground rounded-lg overflow-hidden w-[300px]">
      <div
        className={cn(
          "flex gap-1 items-center bg-secondary text-secondary-foreground ",
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30  flex h-8 w-full min-w-0 rounded-md px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          `${search && search.length > 0 ? "rounded-b-none border-b" : ""}`
        )}
      >
        <SearchIcon size={16} />
        <input
          onFocus={(e) => {
            e.target.select();
          }}
          placeholder="Search by SATNO or name"
          className="border-none outline-none flex-1"
          autoFocus
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            console.log(e.target.value);
          }}
        />
      </div>
      {search && search.length > 0 && (
        <div className="flex flex-col gap-1 text-sm bg-secondary text-secondary-foreground p-2 w-full ">
          {filteredItems &&
            filteredItems.length > 0 &&
            filteredItems.map((item, index) => {
              return (
                <div
                  key={index}
                  className="p-1 pr-4 pl-4 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 rounded-lg w-full h-fit flex select-none cursor-pointer"
                  title={`#${item.NORAD_CAT_ID} ${item.OBJECT_NAME}`}
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
