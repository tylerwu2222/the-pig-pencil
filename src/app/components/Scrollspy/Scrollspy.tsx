"use client";

import React, { useEffect, useState } from "react";

// icons
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScrollspyHeaderProps {
  include: boolean;
  level: number;
  isInline: boolean;
  header: string;
}

export function ScrollspyHeader({
  include = true,
  level = 2,
  isInline = false,
  header = "header",
}: ScrollspyHeaderProps) {
  const Tag =
    `h${Math.min(Math.max(level, 1), 6)}` as keyof JSX.IntrinsicElements; // Ensure level is between 1 and 6

  return (
    <Tag
      className={`scrollspy-header ${isInline ? "inline" : ""} ${include ? "included" : ""}`}
    >
      {header}
    </Tag>
  );
}

export default function Scrollspy() {
  const [isVisible, setIsVisible] = useState(true);
  const [sectionTitles, setSectionTitles] = useState<string[]>([]);
  const [headerLevels, setHeaderLevels] = useState<number[]>([]);

  useEffect(() => {
    // Query the DOM for elements with the specific class after the DOM is rendered
    const headerElements = Array.from(
      document.querySelectorAll(".scrollspy-header.included"),
    );

    // Extract innerHTML or textContent from the header elements
    const titles = headerElements.map((e) => e.textContent || "");
    setSectionTitles(titles);

    // Extract
    const levels = headerElements.map((e) => {
      const level = parseInt(e.tagName.replace("H", ""), 10); // Get the header level (1-6)
      return level;
    });
    setHeaderLevels(levels);
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Scroll to the header element based on index
  const scrollToHeader = (index: string) => {
    const header = document.querySelectorAll(".scrollspy-header.included")[
      Number(index)
    ];
    if (header) {
      const headerTop = header.getBoundingClientRect().top;
      const offsetTop = window.pageYOffset + headerTop - 40; // Leave 20px of space above the header
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  // console.log('ss titles in ss:', sectionTitles);

  return (
    <div className="hidden sm:block sm:relative">
      <div
        className={`fixed left-0 top-[20vh] max-h-[70vh] ${isVisible ? "overflow-y-auto" : "overflow-hidden"}`}
      >
        {/* <nav id="articleScrollspy" className="navbar scrollspyNavbar"> */}
        <nav
          className={`w-[18vw] flex-col flex-wrap bg-transparent pl-[1.5vw] text-[14px] transition-all duration-500 ease-in-out ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
        >
          {sectionTitles.map((s, i) => {
            const headerLevel = headerLevels[i]; // Assuming `headerLevels` is an array with levels (1-6) for each section title
            const isIndented = headerLevel >= 3;
            const textSize = headerLevel <= 2 ? "text-[14px]" : "text-[13px]";

            return (
              <div
                key={i}
                className={`my-2 text-wrap p-1 ${
                  isIndented ? "pl-3" : "pl-0"
                } ${textSize}`}
              >
                <a
                  className="text-textGrey transition duration-500 ease-in-out hover:cursor-pointer hover:text-hoverDeepPink"
                  title={"navigate to: " + s}
                  onClick={() => {
                    scrollToHeader(String(i));
                  }}
                  // href={'#section' + String(i)}
                >
                  {s}
                </a>
              </div>
            );
          })}
        </nav>
        <button
          onClick={toggleVisibility}
          className={`fixed left-[5vw] top-[16.5vh] ml-[1vw] flex h-7 w-7 items-center justify-center rounded-full border border-textGrey bg-transparent font-bold text-textGrey opacity-30 transition-transform duration-500 ease-in-out hover:border-hoverDeepPink hover:text-hoverDeepPink hover:opacity-100 ${
            isVisible ? "translate-x-0" : "-translate-x-[4vw]"
          }`}
          title={isVisible ? "hide scrollspy links" : "show scrollspy links"}
        >
          {isVisible ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>
    </div>
  );
}
