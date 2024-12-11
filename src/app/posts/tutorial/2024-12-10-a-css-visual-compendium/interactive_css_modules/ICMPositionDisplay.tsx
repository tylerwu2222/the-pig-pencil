import React from "react";
import ICMTemplate from "./ICM_Template/ICMTemplate";

export default function ICMBoxModel() {
  return (
    <div>
      <ICMTemplate
        styledElement={
          <div>
            <p className="m-0 bg-white">some text</p>
          </div>
        }
        styleInputs={[
          {
            property: "display",
            inputType: "dropdown",
            options: ["inline", "inline-block", "block", "none"],
            startingValue: "block",
          },
        ]}
      />
    </div>
  );
}
