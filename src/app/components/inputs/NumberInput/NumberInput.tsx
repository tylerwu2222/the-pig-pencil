import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type NumberInputProps = {
  label?: string;
  min?: number;
  max?: number | null;
  stepSize?: number;
  value: number;
  onChangeFn: (value: number) => void;
  // setValue: (value: number) => void;
  percentWidth?: string;
  marginH?: number;
};

const NumberInput: React.FC<NumberInputProps> = ({
  label = "number",
  min = 0,
  max = null,
  stepSize = 1,
  value = 0,
  onChangeFn = () => {},
  // setValue = () => { },
  percentWidth = "30",
  marginH = 10,
}) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      onChangeFn(newValue);  // Calls the parent handler with the new value
    }
  };

  return (
    <div
      style={{
        width: `${percentWidth}%`,
        marginRight: `${marginH / 2}px`,
        marginLeft: `${marginH / 2}px`,
      }}
    >
      {label && (
        <Label
          htmlFor="number-input"
          className="mb-[0.15rem] mt-2 block text-sm font-medium text-gray-700"
        >
          {label}
        </Label>
      )}
      <Input
        id="number-input"
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max ?? undefined}
        step={stepSize}
        className="w-full"
      />
    </div>
  );
};

export default NumberInput;
