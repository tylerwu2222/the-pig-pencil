import React from "react";
import ICMTemplate from "./ICM_Template/ICMTemplate";
import ShortScrollContainer from "./ICM_Template/ICM_Containers/ShortScrollContainer";

export default function ICMBoxModel() {
  return (
    <ICMTemplate
      styledElement={
        <div key={1} style={{ top: "5px" }}>
          <p className="m-0 bg-white">You know</p>
        </div>
      }
      additionalElements={[
        <div key={2} className="bg-gray-100 p-4">
          the rules
        </div>,
        <div key={3} className="bg-gray-200 p-4">
          and so do I
        </div>,
      ]}
      styledElementContainer={ShortScrollContainer}
      styleInputs={[
        {
          property: "display",
          inputType: "dropdown",
          options: ["block", "inline", "inline-block", "none", "contents"],
          startingValue: "block",
        },
        {
          property: "position",
          inputType: "dropdown",
          options: ["absolute", "fixed", "relative", "static", "sticky"],
          startingValue: "static",
        },
      ]}
    />
  );
}
