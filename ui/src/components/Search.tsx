import { Plus, SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Search({ items }: { items: [] }) {
  const [search, setSearch] = useState<string>();

  return (
    <div className="text-card-foreground rounded-lg overflow-hidden">
      <div
        className={cn(
          "flex gap-1 justify-center items-center bg-card ",
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30  flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          `${search && search.length > 0 ? "rounded-b-none border-b" : ""}`
        )}
      >
        <SearchIcon size={16} />
        <input
          onFocus={(e) => {
            e.target.select();
          }}
          placeholder="Search"
          className="border-none outline-none"
          autoFocus
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            console.log(e.target.value);
          }}
        />
      </div>
      {search && search.length > 0 && (
        <div className="flex flex-col gap-1 text-sm bg-card p-2">
          {items.map((item, index) => {
            return (
              <div
                key={index}
                className="p-1 pr-4 pl-4 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 rounded-lg w-full h-fit"
              >
                <div className="[&:not(:last-child)]:border-b flex">
                  <p className="flex-1">Item</p>
                  <Plus className="self-center" size={16} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
