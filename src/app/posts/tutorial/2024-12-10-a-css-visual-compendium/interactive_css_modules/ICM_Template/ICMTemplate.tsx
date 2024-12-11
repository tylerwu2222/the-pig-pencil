"use client";

import React, {
  ReactNode,
  ReactElement,
  CSSProperties,
  useState,
  FC,
} from "react";

// input components
import DropdownInputSelect from "@/app/components/inputs/DropdownInput/DropdownInputSelect";
import NumberInput from "@/app/components/inputs/NumberInput/NumberInput";
import SliderInput from "@/app/components/inputs/SliderInput/SliderInput";

type styleInputType = {
  property: string; // also used as label
  level?: "self" | "container"; // whether the style is applied to self or parent container
  inputType: "slider" | "number" | "dropdown";
  options?: string[];
  startingValue?: string | number;
  min?: number;
  max?: number;
  // isWholeNumber?: boolean;
};

export type StyledElementContainerProps = {
  children: ReactNode;
  style?: CSSProperties; // Add style prop for container-level styles
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
  style,
}) => (
  <div style={style}>{children}</div> // Default layout with flexbox
);

export default function ICMTemplate({
  styledElement,
  styledElementContainer: StyledElementContainer = DefaultContainer, // defaults to a div
  additionalElements,
  styleInputs,
  inputPosition,
  styledElementBackgroundBorder = true,
  containerStyle,
}: ICMTemplateProps) {
  // Initialize state for each style property w/ starting value
  const initialState = styleInputs
    .filter((s) => s.level === undefined || s.level == "self")
    .reduce(
      (acc, { property, startingValue }) => {
        acc[property] = startingValue ?? "";
        return acc;
      },
      {} as Record<string, string | number>,
    );
  const initialStateContainer = styleInputs
    .filter((s) => s.level == "container")
    .reduce(
      (acc, { property, startingValue }) => {
        acc[property] = startingValue ?? "";
        return acc;
      },
      {} as Record<string, string | number>,
    );

  console.log("initialState", initialState);
  console.log("initialStateContainer", initialStateContainer);

  const [styles, setStyles] = useState(initialState);
  const [stylesContainer, setStylesContainer] = useState(initialStateContainer);
  // e.g. {
  // color: 'red',
  // padding: 20
  // }

  // Handle style changes
  const handleStyleChange = (
    property: string,
    level: "self" | "container" | undefined,
    value: string | number,
  ) => {
    if (!level || level == "self") {
      setStyles((prevStyles) => ({
        ...prevStyles,
        [property]: value,
      }));
    } else {
      setStylesContainer((prevStyles) => ({
        ...prevStyles,
        [property]: value,
      }));
    }
  };

  // Clone styledElement and apply styles dynamically
  const StyledElementWithStyles = React.cloneElement(
    styledElement as ReactElement, // element
    {
      style: {
        ...(styledElement as ReactElement).props.style,
        ...styles,
        ...(styledElementBackgroundBorder && {
          border: "1px solid black",
          background: "lightgray", // Example background color
        }),
      },
    }, // props/styles, passed as object
  );

  return (
    <div className="rounded-sm border-2 border-hoverLightPink p-3 shadow-sm">
      {/* styled element */}
      <StyledElementContainer style={stylesContainer}>
        {StyledElementWithStyles}
        {additionalElements
          ? additionalElements.map((el, index) => {
              return el
            })
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
                value={
                  i.property
                    ? i.level == "container"
                      ? (stylesContainer[i.property] as number)
                      : (styles[i.property] as number)
                    : 0
                }
                min={i.min}
                max={i.max}
                onChange={(n) => {
                  handleStyleChange(i.property, i.level, n);
                }}
              />
            );
          } else if (i.inputType == "number") {
            // number input
            styleInput = (
              <NumberInput
                label={i.property}
                value={
                  i.property
                    ? i.level == "container"
                      ? (stylesContainer[i.property] as number)
                      : (styles[i.property] as number)
                    : 0
                }
                onChange={(n) => handleStyleChange(i.property, i.level, n)}
              />
            );
          } else if (i.inputType == "dropdown") {
            // dropdown input
            styleInput = (
              <DropdownInputSelect
                label={i.property}
                value={
                  i.property // property is defined
                    ? i.level == "container"
                      ? (stylesContainer[i.property] as string) // container
                      : (styles[i.property] as string) // self
                    : i.options // fallback
                      ? (i.options[0] as string) // 1. first option
                      : "" // 2. empty string
                }
                options={i.options}
                onChange={(n) => handleStyleChange(i.property, i.level, n)}
              />
            );
          }
          return <div key={index}>{styleInput}</div>;
        })}
      </div>
    </div>
  );
}
