"use client";
// google analytics - change to next analytics?

// react
import React, { useEffect, useState } from "react";
import { useHome } from "@/app/HomeContextProvider";

// components
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";
import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";


const Navbar = () => {
  const pathname = usePathname();

  const { setHoveredTab } = useHome();

  // const [logoFontFamily, setLogoFontFamily] = useState("Gloock");
  const logoFontFamily = "Gloock";
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
      className={`sticky top-0 bg-backgroundWhite pt-2 transition-transform duration-700 ease-in-out md:grid md:grid-cols-3 md:pt-0 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* TPP logo */}
      <div className="h-10 justify-self-center pl-2 pt-1 md:justify-self-start">
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
          >
            <p
              className="text-end text-3xl transition-colors duration-700 ease-in-out hover:text-hoverDeepPink md:text-2xl"
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
      {/* mobile menu items */}
      <div className="block md:hidden bg-backgroundWhite">
        <MobileNavbar />
      </div>
      {/* desktop menu items */}
      <div className="hidden md:block bg-backgroundWhite">
        <DesktopNavbar tabHoverFn={handleHoveredTab} />
      </div>
    </div>
  );
};

export default Navbar;
