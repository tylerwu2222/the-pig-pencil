import React from "react";
import ICMTemplate from "./ICM_Template/ICMTemplate";

export default function ICMBoxModel() {
  return (
    <ICMTemplate
      styledElement={
        <div className="border-blue-400 outline-red-400 outline">
          <p className="m-0 bg-white">We're no</p>
        </div>
      }
      styleInputs={[
        {
          property: "height",
          inputType: "slider",
          startingValue: 75,
          min: 50,
          max: 150,
        },
        {
          property: "width",
          inputType: "slider",
          min: 100,
          startingValue: 250,
          max: 500,
        },
        {
          property: "margin",
          inputType: "slider",
          startingValue: 10,
          min: 0,
          max: 20,
        },
        {
          property: "padding",
          inputType: "slider",
          startingValue: 10,
          min: 0,
          max: 20,
        },
        {
          property: "borderWidth",
          inputType: "sliderUnits",
          unit: "px",
          startingValue: "1px",
          min: 0,
          max: 8,
        },
        {
          property: "outlineWidth",
          inputType: "sliderUnits",
          unit: "px",
          startingValue: "1px",
          min: 0,
          max: 8,
        },
      ]}
      styledElementBorder={false}
    />
  );
}
