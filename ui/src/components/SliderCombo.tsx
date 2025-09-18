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
}: SliderComboProps) {
  const [show, setToggle] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-2 justify-start items-start h-full w-[150px]">
      <Label
        className="cursor-pointer self-start"
        onClick={() => {
          if (unit === "°") setToggle(!show);
        }}
      >
        {label} ({unit})
      </Label>
      {show && unit === "°" && (
        <div className="flex justify-start items-start truncate overflow-hidden w-full">
          <Slider
            className="pt-2 flex-1 w-[100px] pb-2"
            defaultValue={[value]}
            onValueChange={(e) => {
              setValue(e[0]);
              updateChange(true);
            }}
            min={min}
            max={max}
            step={step}
          />
          <Label className="pr-2 pl-2 ">
            {value}
            {unit}
          </Label>
        </div>
      )}
      {!show && (
        <Input
          type="number"
          defaultValue={value}
          onChange={(e) => {
            const val = Number.parseFloat(e.target.value);
            if (Number.isNaN(val)) return;
            setValue(val);
            updateChange(true);
          }}
        />
      )}
    </div>
  );
}
