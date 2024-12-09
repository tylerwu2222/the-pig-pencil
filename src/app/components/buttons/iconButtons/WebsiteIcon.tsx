import React from "react";
import { FaGlobe } from "react-icons/fa6";
import ExternalIconButton from "./ExternalIconButton";

interface WebsiteIconProps {
  link: string;
  size: number;
  color: string;
  hoverColor: string;
  text: string | undefined;
  position: "left" | "right";
}

export default function WebsiteIcon({
  link = "https://thepigpencil.com",
  size = 25,
  color = "text-black",
  hoverColor = "hover:text-hoverDeepPink",
  text,
  position = "right",
}: Partial<WebsiteIconProps>) {

  return (
    <ExternalIconButton
      icon={<FaGlobe size={size}/>}
      {...{ link, size, color, hoverColor, text, position }}
    />
  );
}
