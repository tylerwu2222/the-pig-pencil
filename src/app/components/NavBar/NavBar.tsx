"use client";
// google analytics - change to next analytics?

// react
import React, { useEffect, useState, useContext } from "react";
import { HomeContext } from "@/app/page";

// components
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MenuItem from "./MenuItem";

import { usePathname } from "next/navigation";

// data
import navbar_items from "@/site_data/navbar_menu_items.json";

// mobile
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

const NavBar = () => {
  const pathname = usePathname();

  const { setHoveredTab } = useContext(HomeContext);
  const [logoFontFamily, setLogoFontFamily] = useState("Gloock");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // adds scroll hide/show listeners
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleHoveredTab = (tab: string) => {
    setHoveredTab(tab);
  };

  return (
    <div
      className={`sticky top-0 grid grid-cols-3 items-center bg-backgroundWhite transition-transform duration-700 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* TPP logo */}
      <div className="h-10 justify-self-start pl-2 pt-1">
        <Link className="flex flex-row gap-2 align-bottom" href="/">
          <div
            className="flex flex-row items-end"
            onMouseEnter={
              pathname == "/"
                ? () => {
                    handleHoveredTab("pigs!");
                  }
                : () => {}
            }
            onMouseLeave={
              pathname == "/"
                ? () => {
                    handleHoveredTab("___");
                  }
                : () => {}
            }
          >
            <p
              className="text-end text-2xl transition-colors duration-1000 ease-in-out hover:text-hoverDeepPink"
              style={{ fontFamily: logoFontFamily }}
              // onMouseOver={handleHover}
              // onMouseLeave={handleLeave}
            >
              The Pig Pencil
            </p>
          </div>
          <div>
            <Image
              src="/img/pigpencil.png"
              className="rounded-md"
              width={30}
              height={30}
              alt="tpp-brand-img"
            />
          </div>
        </Link>
      </div>
      {/* desktop menu items */}
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
                          handleHoveredTab(item.url);
                          e.stopPropagation();
                        }
                      : () => {}
                  }
                  onMouseLeaveFn={
                    pathname == "/"
                      ? (e) => {
                          handleHoveredTab("___");
                          e.stopPropagation();
                        }
                      : () => {}
                  }
                />
              );
            })}
          </ul>
        </nav>
      </div>
      {/* subscribe button */}
      <div className="justify-self-end pr-2 pt-1">
        <Button className="bg-pink-200 px-2 py-1 text-sm leading-3 hover:bg-pink-300">
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
