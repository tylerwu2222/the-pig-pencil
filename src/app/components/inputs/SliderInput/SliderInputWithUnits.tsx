import React, { useState } from "react";
// import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

// extension of slider input to display with units
// NOTE: value and onChange must preserve the value as number for the slider to visually update
type SliderInputWithUnitsProps = {
  label: string | undefined;
  value: number;
  //   onChange: (value: number) => void;
  onChange: (value: string) => void;
  unit: string | undefined;
  min?: number;
  max?: number;
  step?: number;
  className?: string; // Additional custom className
  percentWidth?: string;
  marginH?: number;
};

export default function SliderInputWithUnits({
  label,
  value,
  onChange,
  unit = "",
  min = 0,
  max = 100,
  step = 1,
  className,
  percentWidth = "60",
  marginH = 10,
}: SliderInputWithUnitsProps) {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;
//   console.log("slider input value", value);

  // Handle the change event from the slider component
  const handleChange = (newValue: number[]) => {
    // console.log("new value in %", newValue);
    // onChange(newValue[0]); // Only take the first value, as Slider provides an array
    onChange(`${newValue[0]}${unit}`);
  };

  return (
    <div
      className="relative mb-8 flex w-full items-center pt-2"
      style={{
        width: `${percentWidth}%`,
        // marginRight: `${marginH / 2}px`,
        // marginLeft: `${marginH / 2}px`,
      }}
    >
      <div className="w-full">
        {label && (
          <Label
            htmlFor="number-input"
            className="mb-[0.15rem] mt-2 block text-sm font-medium text-gray-700"
          >
            {label} {unit ? `(${String(unit)})` : null}
          </Label>
        )}
        <Slider
          value={[numericValue]} // Pass the controlled value as an array
          onValueChange={handleChange} // Handle value change
          min={min} // Set the minimum value
          max={max} // Set the maximum value
          step={step} // Set the step value
          // className={cn("w-[60%]", className)} // Apply custom className
          className={className} // Apply custom className
        />
      </div>
      {/* Display Min and Max values */}
      <div className="absolute bottom-[-20px] left-0 text-xs leading-3 text-gray-500">
        {min}
        {unit}
      </div>
      <div className="absolute bottom-[-20px] right-0 text-xs leading-3 text-gray-500">
        {max}
        {unit}
      </div>
      {/* Display Current Value */}
      {/* <div className="absolute top-[-25px] text-sm">{value}</div> */}
    </div>
  );
}
