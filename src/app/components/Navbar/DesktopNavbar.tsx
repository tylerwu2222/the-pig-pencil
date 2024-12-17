import React from "react";

// components
import MenuItem from "./MenuItem";
import { Button } from "@/components/ui/button";
// import { useHome } from "@/app/HomeContextProvider";
import { usePathname } from "next/navigation";

// data
import navbar_items from "@/site_data/navbar_menu_items.json";

interface DesktopNavbarProps {
  tabHoverFn: (tab:string) => void;
}

const DesktopNavbar = ({ tabHoverFn }:DesktopNavbarProps) => {
  const pathname = usePathname();

  return (
    <div className="justify-self-center">
      <nav>
        <ul className="flex gap-3">
          {navbar_items.map((item, index) => {
            return (
              <MenuItem
                key={index}
                item={item}
                onMouseEnterFn={
                  pathname == "/"
                    ? (e) => {
                        tabHoverFn(item.url);
                        e.stopPropagation();
                      }
                    : () => {}
                }
                // onMouseLeaveFn={
                //   pathname == "/"
                //     ? (e) => {
                //         handleHoveredTab("___");
                //         e.stopPropagation();
                //       }
                //     : () => {}
                // }
              />
            );
          })}
        </ul>
      </nav>
      {/* subscribe button */}
      <div className="absolute top-2 right-2">
        <Button className="bg-pink-200 px-2 py-1 text-sm leading-3 hover:bg-pink-300">
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default DesktopNavbar;
