import React from "react";
import ICMTemplate from "./ICM_Template/ICMTemplate";
// import FlexContainer from "./ICM_Template/ICM_Containers/FlexContainer";
import GridContainer from "./ICM_Template/ICM_Containers/GridContainer";


export default function ICMFlexbox() {
  return (
    <ICMTemplate
      styledElement={
        <div>
          <p className="m-0">I just wanna</p>
        </div>
      }
      styledElementContainer={GridContainer}
      additionalElements={[
        <div className="col-span-1 bg-gray-100 p-4">tell you</div>,
        <div className="col-span-1 bg-gray-200 p-4">what I'm</div>,
        <div className="col-span-1 bg-gray-300 p-4">feeling</div>,
        <div className="col-span-1 bg-gray-400 p-4 text-gray-50">Gotta make you</div>,
        <div className="col-span-1 bg-gray-500 p-4 text-gray-200">understand</div>
      ]}
      styleInputs={[
        {
          property: "gridColumnStart",
          inputType: "dropdown",
          startingValue: '1',
          options:['1','2','3','-1']
        },
        {
          property: "gridColumnEnd",
          inputType: "dropdown",
          startingValue: '2',
          options:['2','3','4','-1']
        },
        {
          property: "gridRowStart",
          inputType: "dropdown",
          startingValue: '1',
          options:['1','2','-1']
        },
        {
          property: "gridRowEnd",
          inputType: "dropdown",
          startingValue: '2',
          options:['2','3','-1']
        },
      ]}
    />
  );
}
