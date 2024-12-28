import React from "react";
import { PropsWithChildren } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HoverDefinitionText extends PropsWithChildren {
  hoverText: string;
  link?: string;
  linkText?: string;
}

const HoverDefinitionText = ({
  children,
  hoverText = "extremely long lorem ipsum text that does not seem to end. extremely long lorem ipsum text that does not seem to end. extremely long lorem ipsum text that does not seem to end.",
  link,
  linkText,
}: HoverDefinitionText) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span
            className={`rounded-md cursor-text bg-lime-400 p-1 outline-none transition duration-500 group-hover:bg-lime-500`}
          >
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-sm italic">{hoverText}</span>
          {link ? (
            <span className="block">
              <a href={link} target="_blank">
                {linkText ? linkText : "read more"}
              </a>
            </span>
          ) : null}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HoverDefinitionText;
