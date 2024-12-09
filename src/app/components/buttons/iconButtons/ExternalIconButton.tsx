import React, { ReactNode } from "react";
import { FaGlobe } from "react-icons/fa6";
interface ExternalIconButtonProps {
  icon: ReactNode;
  link: string;
  size: number;
  color: string;
  hoverColor: string;
  text: string | undefined;
  position: "left" | "right";
}

export default function ExternalIconButton({
  icon = <FaGlobe size={25} />,
  link = "https://thepigpencil.com",
  color = "text-black",
  hoverColor = "hover:text-hoverDeepPink",
  text,
  position = "right",
}: Partial<ExternalIconButtonProps>) {
  // console.log("text", text, "position", position);

  return (
    <a
      className={`${color} flex w-fit flex-row items-center font-medium transition-all duration-500 ease-in-out ${hoverColor}`}
      href={link}
      target="_blank"
    >
      {text && position === "left" ? (
        <div className="pr-1 text-sm"> {text}</div>
      ) : (
        <></>
      )}
      {icon}
      {text && position === "right" ? (
        <div className="pl-1 text-sm"> {text}</div>
      ) : (
        <></>
      )}
    </a>
  );
}
