import React from "react";
import ICMTemplate from "./ICM_Template/ICMTemplate";

export default function ICMBoxModel() {
  return (
    <ICMTemplate
      styledElement={<div className="bg-gray-200"><p className="bg-white m-0">some text</p></div>}
      styleInputs={[
        // {
        //   property: "float",
        //   inputType: "dropdown",
        //   options: ["left", "right", "none"],
        // },
        {
          property: "height",
          inputType: "slider",
          min: 50,
          max: 150,
        },
        {
          property: "width",
          inputType: "slider",
          min: 100,
          max: 500,
        },
        {
          property: "margin",
          inputType: "slider",
          min: 0,
          max: 20,
        },
        {
          property: "padding",
          inputType: "slider",
          min: 0,
          max: 20,
        },
      ]}
    />
  );
}
