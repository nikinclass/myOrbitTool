import { Eye, EyeClosed, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { useAppSession } from "./AppSessionProvider";
import type { Satellite } from "@/types";

export function ManageSatellitesTable() {
  const { satellites, setSatellites } = useAppSession();

  const someSatsVisible = satellites.some((item) => item.VISIBLE);

  return (
    <Table>
      <TableCaption>A list of all satellites in this scenario</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            <button
              className="cursor-pointer hover:bg-none flex justify-center items-center text-center"
              onClick={() => {
                setSatellites(
                  satellites.map((originalItem) => ({
                    ...originalItem,
                    visible: !someSatsVisible,
                  }))
                );
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
        {satellites.map((record: Satellite, index: number) => (
          <TableRow className="cursor-pointer select-none" key={index}>
            <TableCell className="font-medium">
              {
                <button
                  className="cursor-pointer hover:bg-none flex justify-center items-center"
                  onClick={() => {
                    const newRecord: Satellite = {
                      ...record,
                      VISIBLE: !record.VISIBLE,
                    };

                    setSatellites(
                      satellites.map((originalItem) =>
                        originalItem.NORAD_CAT_ID === record.NORAD_CAT_ID
                          ? newRecord
                          : originalItem
                      )
                    );
                  }}
                >
                  {record.VISIBLE && <Eye size={20} />}
                  {!record.VISIBLE && <EyeClosed size={20} />}
                </button>
              }
            </TableCell>
            <TableCell>{record.NORAD_CAT_ID}</TableCell>
            <TableCell>{record.OBJECT_NAME}</TableCell>
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
              <MoreHorizontal />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
