import React from "react";
import ICMTemplate from "./ICM_Template/ICMTemplate";
// import FlexContainer from "./ICM_Template/ICM_Containers/FlexContainer";
// import GridContainer from "./ICM_Template/ICM_Containers/GridContainer";


export default function ICMFloat() {
  return (
    <ICMTemplate
      styledElement={
        <div>
          <p className="m-0">Never gonna</p>
        </div>
      }
    //   styledElementContainer={GridContainer}
      additionalElements={[
        <div className="col-span-1 bg-gray-100 p-4">give you up</div>,
      ]}
      styleInputs={[
        {
          property: "float",
          inputType: "dropdown",
          startingValue: 'none',
          options:['none','left','right']
        }
      ]}
    />
  );
}
