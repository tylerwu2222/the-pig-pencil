import React from "react";
import { FaGithub } from "react-icons/fa6";
import ExternalIconButton from "./ExternalIconButton";

interface GithubIconProps {
  link: string;
  size: number;
  color: string;
  hoverColor: string;
  text: string | undefined;
  position: "left" | "right";
}

export default function GithubIcon({
  link = "https://github.com/tylerwu2222",
  size = 25,
  color = "text-black",
  hoverColor = "hover:text-hoverDeepPink",
  text,
  position = "right",
}: Partial<GithubIconProps>) {

  return (
    <ExternalIconButton
      icon={<FaGithub size={size} />}
      {...{ link, size, color, hoverColor, text, position }}
    />
  );
}
