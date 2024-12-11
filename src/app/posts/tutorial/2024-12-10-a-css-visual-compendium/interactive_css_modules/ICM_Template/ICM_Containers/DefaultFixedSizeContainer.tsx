'use client'

import React, { FC } from "react";
import { StyledElementContainerProps } from "../ICMTemplate";

const DefaultFixedSizeContainer: FC<StyledElementContainerProps> = ({
  children
}) => {
  return <div className="border-slate-400 bg-slate-100 h-36 w-1/2">{children}</div>;
}

export default DefaultFixedSizeContainer;
