"use client";

import React, { ReactNode, useState } from "react";

import DropdownInputSelect from "@/app/components/inputs/DropdownInput/DropdownInputSelect";
import NumberInput from "@/app/components/inputs/NumberInput/NumberInput";
import SliderInput from "@/app/components/inputs/SliderInput/SliderInput";

type styleInputType = {
  property: string; // also used as label
  // type: "numberInput" | "stringInput";
  inputType: "slider" | "number" | "dropdown";
  options?: string[];
  min?: number;
  max?: number;
  // isWholeNumber?: boolean;

};

interface ICMTemplateProps {
  styledElement: ReactNode;
  styleInputs: styleInputType[]; // list of properties to toggle for as well as whether the toggle should be
  inputPosition?: "absolute" | "static"; // Option for positioning input div
  containerStyle?: React.CSSProperties; // Custom style for the outermost div
}

export default function ICMTemplate({
  styledElement,
  styleInputs,
  inputPosition,
  containerStyle
}: ICMTemplateProps) {
  // Initialize state for each style property w/ empty string
  const initialState = styleInputs.reduce(
    (acc, { property }) => {
      acc[property] = ""; // Or default values
      return acc;
    },
    {} as Record<string, string | number>,
  );
  // console.log("initialState", initialState);

  const [styles, setStyles] = useState(initialState);
  // e.g. {
  // color: 'red',
  // padding: 20
  // }

  // Handle style changes
  const handleStyleChange = (property: string, value: string | number) => {
    // for given property
    setStyles((prevStyles) => ({
      ...prevStyles,
      [property]: value,
    }));
  };

  // Clone styledElement and apply styles dynamically
  const StyledElementWithStyles = React.cloneElement(
    styledElement as React.ReactElement, // element
    {
      style: { ...styles, 'border':'1px black solid' },
    }, // props/styles, passed as object
  );

  return (
    <div className="border border-2 border-hoverLightPink shadow-sm rounded-sm p-3">
      {/* styled element */}
      {StyledElementWithStyles}
      {/* styleInput */}
      <div className={inputPosition === "absolute" ? "absolute bottom-0 left-0" : ""}>
        {styleInputs.map((i, index) => {
          let styleInput;
          if (i.inputType == "slider") {
            // slider input
            styleInput = (
              <SliderInput
                label={i.property}
                value={(styles[i.property] as number) || 0}
                min={i.min}
                max={i.max}
                onChange={(n) => handleStyleChange(i.property, n)}
              />
            );
          } else if (i.inputType == "number") {
            // number input
            styleInput = (
              <NumberInput
                label={i.property}
                value={(styles[i.property] as number) || 0}
                onChange={(n) => handleStyleChange(i.property, n)}
              />
            );
          } else if (i.inputType == "dropdown") {
            // number input
            styleInput = (
              <DropdownInputSelect
                label={i.property}
                value={(styles[i.property] as number) || 0}
                options={i.options}
                onChange={(n) => handleStyleChange(i.property, n)}
              />
            );
          }
          return <div key={index}>{styleInput}</div>;
        })}
      </div>
    </div>
  );
}
