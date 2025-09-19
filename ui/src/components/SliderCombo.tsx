import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { useState, type Dispatch, type SetStateAction } from "react";

export type SliderComboProps = {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  updateChange: Dispatch<SetStateAction<boolean>>;
  label: string;
  unit?: string;
  max: number;
  min: number;
  step?: number;
  showUnits?: boolean;
  className?: string;
};

export function SliderCombo({
  value,
  setValue,
  updateChange,
  label,
  unit = "°",
  max,
  min,
  step = 0.1,
  className,
  showUnits = true,
}: SliderComboProps) {
  const [show, setToggle] = useState<boolean>(false);

  return (
    <div
      className={`flex flex-col gap-2 justify-start items-start h-full w-full sm:w-[48%] ${
        className ? className : ""
      }`}
    >
      <Label
        className="cursor-pointer self-start"
        onClick={() => {
          setToggle(!show);
        }}
      >
        {label}
        {!showUnits ? "" : ` (${unit})`}
      </Label>
      {show && (
        <div className="flex justify-start items-center truncate overflow-hidden ">
          <Slider
            className="pt-2 flex-1 w-[100px] pb-2"
            value={[value]}
            onValueChange={(e) => {
              setValue(e[0]);
              updateChange(true);
            }}
            min={min}
            max={max}
            step={step}
          />
          <Label className="pr-2 pl-2 ">{value}</Label>
        </div>
      )}
      {!show && (
        <Input
          type="number"
          className="h-8 text-sm"
          value={value}
          onChange={(e) => {
            const val = Number.parseFloat(e.target.value);
            if (Number.isNaN(val)) return;
            setValue(val);
            updateChange(true);
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
      )}
    </div>
  );
}
