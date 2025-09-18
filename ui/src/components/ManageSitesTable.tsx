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
import type { Satellite, Site } from "@/types";
import { useEffect, useState } from "react";
import { EditSiteForm } from "./EditSiteForm";

export function ManageSitesTable() {
  const { scenario, removeSatellite, colorSatellite } = useAppSession();

  const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  useEffect(() => {
    console.log(selectedSite);
  }, [selectedSite]);

  return (
    <>
      {selectedSite && <EditSiteForm site={selectedSite} closeModal={() => {}}/>}
      {!selectedSite && (
        <Table>
          <TableCaption>A list of all satellites in this scenario</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Lat</TableHead>
              <TableHead>Long</TableHead>
              <TableHead className="">Color</TableHead>
              <TableHead className=""></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scenario?.sites.map((site: Site, index: number) => (
              <TableRow key={index} className="cursor-pointer select-none">
                <TableCell>{site.name}</TableCell>
                <TableCell>{site.latitude}</TableCell>
                <TableCell>{site.longitude}</TableCell>
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
                    key={index}
                    onClick={() => {
                      setSelectedSite(site);
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
