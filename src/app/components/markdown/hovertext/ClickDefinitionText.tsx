import { PropsWithChildren } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ClickDefinitionText extends PropsWithChildren {
  hoverText: string;
  link?: string;
  linkText?: string;
  additionalStyles?: string;
}

const ClickDefinitionText = ({
  children,
  hoverText,
  link,
  linkText,
  additionalStyles,
}: ClickDefinitionText) => {
  return (
    <Popover>
      <PopoverTrigger
        className={`cursor-text rounded-md bg-lime-400 px-1 outline-none transition duration-500 hover:bg-lime-300`}
      >
        {children}
      </PopoverTrigger>
      <PopoverContent className="border-[1px] border-lime-400">
        <span className="text-sm">{hoverText}</span>
        {link ? (
          <span className="block">
            <a href={link} target="_blank" className="text-sm italic underline">
              {linkText ? linkText : "read more"}
            </a>
          </span>
        ) : null}
      </PopoverContent>
    </Popover>
  );
};

export default ClickDefinitionText;
