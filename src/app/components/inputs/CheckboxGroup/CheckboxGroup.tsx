import React from "react";
import { Checkbox } from "@/components/ui/checkbox"; // Assuming Shadcn's Checkbox is imported from here.

type CheckboxGroupProps = {
  labels: string[];
  checked: boolean[];
  updateChecked: (updatedCheckedState: boolean[]) => void;
  inline?: boolean;
  fillColor?: string;
  checkColor?: string;
};

const CheckboxGroup = ({
  labels,
  checked,
  updateChecked,
  inline = true,
//   fillColor = "bg-pink-200",
//   checkColor = "text-stone-700",
}: CheckboxGroupProps) => {
  const handleOnChange = (index: number) => {
    const updatedCheckedState = checked.map((value, i) =>
      i === index ? !value : value,
    );
    updateChecked(updatedCheckedState);
  };

  return (
    <div
      className={`flex ${inline ? "flex-row flex-wrap gap-4" : "flex-col gap-2"}`}
    >
      {labels.map((label, index) => (
        <div key={index} className="flex items-center gap-2">
          <Checkbox
            id={`custom-checkbox-${index}`}
            // className={`data-[state=checked]:bg-yellow-300 data-[state=checked]:${checkColor}`}
            checked={checked[index]}
            onCheckedChange={() => handleOnChange(index)}
          />
          <label
            htmlFor={`custom-checkbox-${index}`}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
