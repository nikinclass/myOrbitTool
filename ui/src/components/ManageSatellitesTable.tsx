import { Eye, EyeClosed, MoreHorizontal, SatelliteIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useAppSession } from "./AppSessionProvider";
import type { Satellite } from "@/types";
import { useEffect, useState } from "react";
import { ManualFieldForm } from "./ManualSatelliteForm";

export function ManageSatellitesTable() {
  const { scenario, toggleVisibility, removeSatellite, colorSatellite } =
    useAppSession();

  const [selectedSatellite, setSelectedSatellite] = useState<Satellite | null>(
    null
  );

  useEffect(() => {
    console.log(selectedSatellite);
  }, [selectedSatellite]);

  const someSatsVisible = scenario?.satellites.some((item) => item.VISIBLE);

  return (
    <>
      {selectedSatellite && <ManualFieldForm satellite={selectedSatellite} />}
      {!selectedSatellite && (
        <Table className="w-full bg-secondary text-secondary-foreground opacity-75">
          <TableCaption>A list of all satellites in this scenario</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>
                <button
                  className="cursor-pointer hover:bg-none flex justify-center items-center text-center"
                  onClick={() => {
                    if (scenario?.satellites)
                      toggleVisibility(scenario.satellites);
                  }}
                >
                  {someSatsVisible && <Eye size={20} />}
                  {!someSatsVisible && <EyeClosed size={20} />}
                </button>
              </TableHead>
              <TableHead>SATNO</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="">Color</TableHead>
              <TableHead className=""></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scenario?.satellites.map((sat: Satellite, index: number) => (
              <TableRow
                className="cursor-pointer select-none hover:bg-accent-foreground/10 hover:text-accent-foreground dark:hover:bg-card"
                key={index}
              >
                <TableCell className="font-medium">
                  {
                    <button
                      className="cursor-pointer hover:bg-none flex justify-center items-center"
                      onClick={() => {
                        toggleVisibility([sat]);
                      }}
                    >
                      {sat.VISIBLE && <Eye size={20} />}
                      {!sat.VISIBLE && <EyeClosed size={20} />}
                    </button>
                  }
                </TableCell>
                <TableCell>{sat.NORAD_CAT_ID}</TableCell>
                <TableCell>{sat.OBJECT_NAME}</TableCell>
                <TableCell className="text-right">
                  {
                    <input
                      className="rounded-full w-5 h-5"
                      type="color"
                      name=""
                      id=""
                      style={{ borderRadius: 100 }}
                    />
                  }
                </TableCell>
                <TableCell>
                  <MoreHorizontal
                    onClick={() => {
                      setSelectedSatellite(sat);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
