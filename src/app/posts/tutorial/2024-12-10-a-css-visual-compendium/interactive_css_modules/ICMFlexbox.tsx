import React from "react";
import ICMTemplate from "./ICM_Template/ICMTemplate";
import FlexContainer from "./ICM_Template/ICM_Containers/FlexContainer";

export default function ICMFlexbox() {
  return (
    <ICMTemplate
      styledElement={
        <div>
          <p className="m-0 bg-white">A full commitment's</p>
        </div>
      }
      styledElementContainer={FlexContainer}
      additionalElements={[
        <div className="flex-1 bg-gray-100 p-4">what I'm</div>,
        <div className="flex-1 bg-gray-200 p-4">thinking of</div>,
        <div className="flex-1 bg-gray-300 p-4">You wouldn't</div>,
        <div className="flex-1 bg-gray-400 p-4 text-gray-50">get this</div>,
        <div className="flex-1 bg-gray-500 p-4 text-gray-200">from</div>,
        <div className="flex-1 bg-gray-600 p-4 text-gray-300">
          any other guy
        </div>,
      ]}
      styleInputs={[
        {
          level: "container", // apply flex to
          property: "flexDirection",
          inputType: "dropdown",
          startingValue: "row",
          options: ["row", "column", "row-reverse", "column-reverse"],
        },
        {
          property: "flex",
          inputType: "slider",
          startingValue: 1,
          min: 0,
          max: 8,
        },
        // {
        //   property: "flexBasis",
        //   inputType: "dropdown",
        //   startingValue: "100px",
        //   options: ["50px","100px", "200px", "300px", "400px", "500px"],
        // },
        // {
        //   property: "flexGrow",
        //   inputType: "slider",
        //   startingValue: 2,
        //   min: 0,
        //   max: 6,
        // },
        // {
        //   property: "flexShrink",
        //   inputType: "slider",
        //   startingValue: 0,
        //   min: 0,
        //   max: 3,
        // },
        {
          level: "container",
          property: "flexWrap",
          inputType: "dropdown",
          startingValue: "wrap",
          options: ["wrap", "nowrap", "wrap-reverse"],
        },
      ]}
    />
  );
}
