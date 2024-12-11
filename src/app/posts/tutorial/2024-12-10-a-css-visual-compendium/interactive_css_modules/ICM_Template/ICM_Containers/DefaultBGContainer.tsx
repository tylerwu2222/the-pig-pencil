'use client'

import React, { FC } from "react";
import { StyledElementContainerProps } from "../ICMTemplate";

const DefaultBGContainer: FC<StyledElementContainerProps> = ({
  children
}) => {
  return <div className="border-slate-400 bg-slate-100">{children}</div>;
}

export default DefaultBGContainer;
