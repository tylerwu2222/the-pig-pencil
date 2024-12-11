import React from "react";
import ICMTemplate from "./ICM_Template/ICMTemplate";

export default function ICMBoxModel() {
  return (
    <div>
      <p>
        The interactive element here is the{" "}
        <span className="border-[1px] border-black bg-[#D3D3D3]">
          gray bordered box
        </span>, all styles are applied to it
        :
      </p>
      <ICMTemplate
        styledElement={
          <div>
            <p className="m-0 bg-white">some text</p>
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
        ]}
      />
    </div>
  );
}
