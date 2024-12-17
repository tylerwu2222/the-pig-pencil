import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MenuItemDropdownProps {
  item: {
    title: string;
    url: string;
    submenu: Record<string, string>[];
  };
}

export default function MenuItemDropdown({ item }: MenuItemDropdownProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // console.log('item', item);

  return (
    <div className="relative">
      <div
        className="flex items-center px-2 py-1 transition-all duration-300 hover:cursor-pointer hover:bg-stone-50 hover:text-pink-600"
        onClick={(e) => {
          e.stopPropagation();
          setIsVisible(!isVisible);
        }}
      >
        <p className="flex justify-center rounded-md p-0 md:min-w-[40px] lg:min-w-[60px]">
          {item.title}
        </p>
        {isVisible ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </div>
      {isVisible && (
        // <div className="absolute bg-backgroundWhite rounded-md p-3 shadow-lg md:w-[20vw] ">
        <div className="absolute z-50 bg-backgroundWhite left-1/2 top-8 w-[60vw] -translate-x-[50vw] rounded-md p-3 shadow-lg md:w-[20vw] md:-translate-x-1/2 xl:w-[20vw]">
          {item.submenu.map((subitem, index) => {
            let submenu_href = "/" + subitem.url;
            if (subitem.url !== "me") {
              submenu_href = "/section" + submenu_href;
            }
            return (
              <Link
                className="cursor-pointer"
                href={submenu_href}
                onClick={() => setIsVisible(false)}
                key={index}
              >
                <div className="rounded-md p-1 transition-all duration-300 hover:text-pink-600">
                  <p className="font-semibold">{subitem.title}</p>
                  <p className="text-sm">{subitem.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
