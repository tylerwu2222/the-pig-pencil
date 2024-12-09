import React from "react";
import { FaYoutube } from "react-icons/fa6";
import ExternalIconButton from "./ExternalIconButton";

interface YoutubeIconProps {
  link: string;
  size: number;
  color: string;
  hoverColor: string;
  text: string | undefined;
  position: "left" | "right";
}

export default function YoutubeIcon({
  link = "https://www.youtube.com/@ThePigPencil",
  size = 25,
  color = "text-black",
  hoverColor = "hover:text-hoverDeepPink",
  text,
  position = "right",
}: Partial<YoutubeIconProps>) {
  return (
    <ExternalIconButton
      icon={<FaYoutube size={size}/>}
      {...{ link, size, color, hoverColor, text, position }}
    />
  );
}