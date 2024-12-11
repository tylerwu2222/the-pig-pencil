import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

// Extend SliderProps to accept min, max, step, and value props
type SliderInputProps = {
  label: string | undefined;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string; // Additional custom className
  percentWidth?: string;
  marginH?: number;
};

export default function SliderInput({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className,
  percentWidth = "60",
  marginH = 10,
}: SliderInputProps) {
  console.log("slider input value", value);

  // Handle the change event from the slider component
  const handleChange = (newValue: number[]) => {
    onChange(newValue[0]); // Only take the first value, as Slider provides an array
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
            {label}
          </Label>
        )}
        <Slider
          value={[value]} // Pass the controlled value as an array
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
      </div>
      <div className="absolute bottom-[-20px] right-0 text-xs leading-3 text-gray-500">
        {max}
      </div>
      {/* Display Current Value */}
      {/* <div className="absolute top-[-25px] text-sm">{value}</div> */}
    </div>
  );
}
