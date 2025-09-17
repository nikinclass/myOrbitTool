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
import { ScrollArea } from "./ui/scroll-area";

export function ManageSatellitesTable() {
  const {
    scenario,
    toggleVisibility,
    removeSatellite,
    colorSatellite,
    isLoading,
  } = useAppSession();

  const [selectedSatellite, setSelectedSatellite] = useState<Satellite | null>(
    null
  );

  useEffect(() => {
    console.log(selectedSatellite);
  }, [selectedSatellite]);

  const someSatsVisible = scenario?.satellites.some(
    (item) => item.CZML.props.show
  );

  if (isLoading) return <></>;

  return (
    <>
      {selectedSatellite && <ManualFieldForm satellite={selectedSatellite} />}
      {!selectedSatellite && (
        <Table className="w-full bg-secondary text-secondary-foreground opacity-75 rounded-lg">
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
          <TableBody className="">
            {scenario?.satellites.length === 0 && (
              <TableRow className="">
                <td className="p-4">
                  There are no satellites in the scenario.
                </td>
              </TableRow>
            )}
            {scenario?.satellites.length !== 0 &&
              scenario?.satellites.map((sat: Satellite, index: number) => (
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
                        {sat.CZML.props.show && <Eye size={20} />}
                        {!sat.CZML.props.show && <EyeClosed size={20} />}
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
