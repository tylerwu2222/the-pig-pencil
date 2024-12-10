import React from "react";
import ICMTemplate from "./ICM_Template/ICMTemplate";

export default function ICMBoxModel() {
  return (
    <ICMTemplate
      styledElement={<div className="box">A lotta text</div>}
      styleInputs={[
        {
          property: "float",
          inputType: "dropdown",
          options: ["left", "right", "none"],
        },
        {
          property: "margin",
          inputType: "slider",
          min: 0,
          max: 100,
        },
        {
          property: "padding",
          inputType: "slider",
          min: 0,
          max: 100,
        },
      ]}
    />
  );
}
