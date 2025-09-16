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
    <div className="max-h-[400px] overflow-y-scroll">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>
              <button
                className="cursor-pointer hover:bg-none flex justify-center items-center text-center"
                onClick={() => {
                  setSatellites(
                    satellites.map((originalItem) => ({
                      ...originalItem,
                      VISIBLE: !someSatsVisible,
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
                    onChange={(e) => {
                      var hex_code = e.target.value
                      var red = parseInt(hex_code[1] + hex_code[2], 16);
                      var green = parseInt(hex_code[3] + hex_code[4], 16);
                      var blue = parseInt(hex_code[5] + hex_code[6], 16);
                      const newRecord: Satellite = {
                        ...record,
                        COLOR: [red, green, blue, 255],
                      };
                      setSatellites(
                        satellites.map((originalItem) =>
                          originalItem.NORAD_CAT_ID === record.NORAD_CAT_ID
                            ? newRecord
                            : originalItem
                        )
                      );
                    }}
                  />
                }
              </TableCell>
              <TableCell>
                <MoreHorizontal />
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table >
    </div >
  );
}
