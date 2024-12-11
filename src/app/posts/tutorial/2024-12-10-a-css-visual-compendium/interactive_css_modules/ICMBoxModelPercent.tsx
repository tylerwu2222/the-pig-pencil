import React from "react";
import ICMTemplate from "./ICM_Template/ICMTemplate";
import DefaultFixedSizeContainer from "./ICM_Template/ICM_Containers/DefaultFixedSizeContainer";

export default function ICMBoxModelPercent() {
  return (
    <ICMTemplate
      styledElement={
        <div>
          <p className="m-0 bg-white">strangers to love</p>
        </div>
      }
      styledElementContainer={DefaultFixedSizeContainer}
      styleInputs={[
        {
          property: "height",
          inputType: "dropdown",
          startingValue: "50%",
          options: ["0%", "25%", "50%", "75%", "100%"],
        },
        {
          property: "width",
          inputType: "dropdown",
          startingValue: "50%",
          options: ["0%", "25%", "50%", "75%", "100%"],
        },
      ]}
    />
  );
}
