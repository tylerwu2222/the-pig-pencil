import React, { ReactNode } from "react";
import { FaGlobe } from "react-icons/fa6";

interface IconWithTextProps {
  icon: ReactNode;
  size: number;
  textColor: string;
  text?: string | undefined;
  position: "left" | "right";
}

export default function IconWithText({
  icon = <FaGlobe size={25} />,
  textColor = "text-white",
  text,
  position = "right",
}: Partial<IconWithTextProps>) {
  // console.log("text", text, "position", position);

  return (
    <div
      className={`${textColor} flex w-fit flex-row items-center font-medium transition-all duration-500 ease-in-out`}
    >
      {position === "left" ? (
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
    </div>
  );
}
