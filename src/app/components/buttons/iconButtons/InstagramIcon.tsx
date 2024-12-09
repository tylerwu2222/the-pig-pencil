import React from "react";
import { FaInstagram } from "react-icons/fa6";
import ExternalIconButton from "./ExternalIconButton";

interface InstagramIconProps {
  link: string;
  size: number;
  color: string;
  hoverColor: string;
  text: string | undefined;
  position: "left" | "right";
}

export default function InstagramIcon({
  link = "http://www.instagram.com/pigpencil/",
  size = 25,
  color = "text-black",
  hoverColor = "hover:text-hoverDeepPink",
  text,
  position = "left",
}: Partial<InstagramIconProps>) {
  return (
    <ExternalIconButton
      icon={<FaInstagram size={size}/>}
      {...{ link, size, color, hoverColor, text, position }}
    />
  );
}
