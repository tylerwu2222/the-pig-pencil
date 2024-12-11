'use client'

import React, { FC } from "react";
import { StyledElementContainerProps } from "../ICMTemplate";

const GridContainer: FC<StyledElementContainerProps> = ({
  children,
  style
}) => {
  return <div style={style} className="grid grid-cols-4 border-slate-400 bg-slate-100">{children}</div>;
}

export default GridContainer;
