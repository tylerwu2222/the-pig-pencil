'use client'

import React, { FC } from "react";
import { StyledElementContainerProps } from "../ICMTemplate";

const FlexContainer: FC<StyledElementContainerProps> = ({
  children,
  style
}) => {
  return <div style={style} className="flex bg-slate-100 w-1/2 border-red-400 border-2">{children}</div>;
}

export default FlexContainer;
