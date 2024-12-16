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
  fillColor = "pink-200",
  checkColor = "stone-700",
}: CheckboxGroupProps) => {
  const handleOnChange = (index: number) => {
    const updatedCheckedState = checked.map((value, i) =>
      i === index ? !value : value,
    );
    updateChecked(updatedCheckedState);
  };
  let fillClass;
  if (fillColor[0] === "#") {
    fillClass = "data-[state=checked]:[bg-[" + fillColor + "]]";
  } else {
    fillClass = "data-[state=checked]:[bg-" + fillColor + "]";
  }
  let checkClass;
  if (checkColor[0] === "#") {
    checkClass = "data-[state=checked]:text-[" + checkColor + "]";
  } else {
    checkClass = "data-[state=checked]:text-" + checkColor;
  }

  console.log("fill class", fillClass, "check class", checkClass);

  return (
    <div
      className={`flex ${inline ? "flex-row flex-wrap gap-4" : "flex-col gap-2"}`}
    >
      {labels.map((label, index) => (
        <div key={index} className="flex items-center gap-2">
          <Checkbox
            id={`custom-checkbox-${index}`}
            className={`data-[state=checked]:bg-white data-[state=checked]:text-stone-700 hover:bg-white active:border-hoverDeepPink active:text-hoverDeepPink`}
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
