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

type RecordType = {
  visible: boolean;
  SATNO: string;
  name: string;
  color: string;
};

export function ManageSatellitesTable() {
  const initialRecords: RecordType[] = [
    {
      visible: true,
      SATNO: "123",
      name: "Sat1",
      color: "123",
    },
    {
      visible: true,
      SATNO: "1223",
      name: "Sat1",
      color: "123",
    },
    {
      visible: true,
      SATNO: "1243",
      name: "Sat1",
      color: "123",
    },
  ];

  const [records, updateRecords] = useState<RecordType[]>(initialRecords);
  const someSatsVisible = records.some((item) => item.visible);

  return (
    <Table>
      <TableCaption>A list of all satellites in this scenario</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            <button
              className="cursor-pointer hover:bg-none flex justify-center items-center text-center"
              onClick={() => {
                updateRecords(
                  records.map((originalItem) => ({
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
        {records.map((record: RecordType, index: number) => (
          <TableRow className="cursor-pointer select-none" key={index}>
            <TableCell className="font-medium">
              {
                <button
                  className="cursor-pointer hover:bg-none flex justify-center items-center"
                  onClick={() => {
                    const newRecord: RecordType = {
                      ...record,
                      visible: !record.visible,
                    };

                    updateRecords(
                      records.map((originalItem) =>
                        originalItem.SATNO === record.SATNO
                          ? newRecord
                          : originalItem
                      )
                    );
                  }}
                >
                  {record.visible && <Eye size={20} />}
                  {!record.visible && <EyeClosed size={20} />}
                </button>
              }
            </TableCell>
            <TableCell>{record.SATNO}</TableCell>
            <TableCell>{record.name}</TableCell>
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
