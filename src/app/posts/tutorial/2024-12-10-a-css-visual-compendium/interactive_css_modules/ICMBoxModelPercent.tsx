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
          inputType: "sliderUnits",
          unit: "%",
          startingValue: "50%",
          min: 0,
          max: 100,
        },
        {
          property: "width",
          inputType: "sliderUnits",
          unit: "%",
          startingValue: "50%",
          min: 0,
          max: 100,
        },
      ]}
    />
  );
}
