'use client'

import React, { FC } from "react";
import { StyledElementContainerProps } from "../ICMTemplate";

const ShortScrollContainer: FC<StyledElementContainerProps> = ({
  children
}) => {
  return <div className="border-slate-400 bg-slate-100 h-24 overflow-y-scroll">{children}</div>;
}

export default ShortScrollContainer;
