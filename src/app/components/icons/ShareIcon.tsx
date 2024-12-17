import React, { ReactNode } from "react";
import { Share2 } from "lucide-react";

interface ShareIconProps {
  size: number;
  color: string;
  hoverColor: string;
  text: string | undefined;
  position: "left" | "right";
}

export default function ShareIcon({
  size = 25,
  color = "text-black",
  hoverColor = "hover:text-hoverDeepPink",
  text,
  position = "right",
}: Partial<ShareIconProps>) {
  // console.log("text", text, "position", position);

  return (
    <div>
      {text && position === "left" ? (
        <div className="pr-1 text-sm"> {text}</div>
      ) : (
        <></>
      )}
      <Share2 size={size} />
      {text && position === "right" ? (
        <div className="pl-1 text-sm"> {text}</div>
      ) : (
        <></>
      )}
    </div>
  );
}
