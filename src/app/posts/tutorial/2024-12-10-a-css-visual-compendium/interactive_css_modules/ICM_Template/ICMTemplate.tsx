"use client";

import React, { ReactNode, useState, FC } from "react";

import DropdownInputSelect from "@/app/components/inputs/DropdownInput/DropdownInputSelect";
import NumberInput from "@/app/components/inputs/NumberInput/NumberInput";
import SliderInput from "@/app/components/inputs/SliderInput/SliderInput";

type styleInputType = {
  property: string; // also used as label
  // type: "numberInput" | "stringInput";
  inputType: "slider" | "number" | "dropdown";
  options?: string[];
  startingValue?: string | number;
  min?: number;
  max?: number;
  // isWholeNumber?: boolean;
};


export type StyledElementContainerProps = {
  children: ReactNode;
};

interface ICMTemplateProps {
  styledElement: ReactNode;
  styledElementContainer?: FC<StyledElementContainerProps>;
  additionalElements?: ReactNode[];
  styleInputs: styleInputType[]; // list of properties to toggle for as well as whether the toggle should be
  inputPosition?: "absolute" | "static"; // Option for positioning input div
  styledElementBackgroundBorder?: boolean;
  containerStyle?: React.CSSProperties; // Custom style for the outermost div
}



// default styled element container
const DefaultContainer: React.FC<StyledElementContainerProps> = ({
  children,
}) => (
  <div>{children}</div> // Default layout with flexbox
);

export default function ICMTemplate({
  styledElement,
  styledElementContainer: StyledElementContainer =  DefaultContainer, // defaults to a div
  additionalElements,
  styleInputs,
  inputPosition,
  styledElementBackgroundBorder = true,
  containerStyle,
}: ICMTemplateProps) {
  // Initialize state for each style property w/ starting value
  const initialState = styleInputs.reduce(
    (acc, { property, startingValue }) => {
      acc[property] = startingValue ?? ""; // Or default values
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
      style: {
        ...styles,
        ...(styledElementBackgroundBorder && {
          border: "1px solid black",
          background: "lightgray", // Example background color
        }),
      },
    }, // props/styles, passed as object
  );

  return (
    <div className="rounded-sm border border-2 border-hoverLightPink p-3 shadow-sm">
      {/* styled element */}
      <StyledElementContainer>
        {StyledElementWithStyles}
        {additionalElements
          ? additionalElements.map((el, index) => <div key={index}>{el}</div>)
          : null}
      </StyledElementContainer>
      {/* styleInput */}
      <div
        className={
          inputPosition === "absolute" ? "absolute bottom-0 left-0" : ""
        }
      >
        {styleInputs.map((i, index) => {
          console.log("input props", i);
          let styleInput;

          if (i.inputType == "slider") {
            // slider input
            // state value is the property value in styles object
            styleInput = (
              <SliderInput
                label={i.property}
                value={i.property ? (styles[i.property] as number) : 0}
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
                value={i.property ? (styles[i.property] as number) : 0}
                onChange={(n) => handleStyleChange(i.property, n)}
              />
            );
          } else if (i.inputType == "dropdown") {
            // dropdown input
            styleInput = (
              <DropdownInputSelect
                label={i.property}
                value={
                  i.property
                    ? (styles[i.property] as string)
                    : i.options
                      ? (i.options[0] as string)
                      : ""
                }
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
