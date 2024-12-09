import React from "react";
import { MdEmail } from "react-icons/md";
import ExternalIconButton from "./ExternalIconButton";

interface EmailIconProps {
  link: string;
  size: number;
  color: string;
  hoverColor: string;
  text: string | undefined;
  position: "left" | "right";
}

export default function EmailIcon({
  link = "mailto:thepigpencil@gmail.com",
  size = 25,
  color = "text-black",
  hoverColor = "hover:text-hoverDeepPink",
  text,
  position = "left",
}: Partial<EmailIconProps>) {
  return (
    <ExternalIconButton
      icon={<MdEmail size={size} />}
      {...{ link, size, color, hoverColor, text, position }}
    />
  );
}
