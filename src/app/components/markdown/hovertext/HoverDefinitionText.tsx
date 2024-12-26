"use client";

import React, { useState, useRef } from "react";
import { PropsWithChildren } from "react";

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
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <span
      className="group relative inline-block outline-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        className={`left-1/2 top-5 mt-1 min-w-[50vw] max-w-[80vw] -translate-x-1/2 rounded-lg border-[1px] border-lime-500 bg-backgroundWhite p-3 shadow-lg outline-none transition duration-500 sm:left-10 sm:min-w-[20vw] sm:max-w-[30vw] ${isVisible ? "absolute block" : "hidden"}`}
      >
        <span className="text-sm italic">{hoverText}</span>
        {link ? (
          <span className="block">
            <a href={link} target="_blank">
              {linkText ? linkText : "read more"}
            </a>
          </span>
        ) : null}
      </span>
      <span
        className={`${isVisible ? "rounded-t-md" : "rounded-md"} cursor-text bg-lime-400 p-1 outline-none transition duration-500 group-hover:bg-lime-500 `}
      >
        {children}
      </span>
    </span>
  );
};

export default HoverDefinitionText;
