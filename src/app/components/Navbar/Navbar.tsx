"use client";
// include next analytics?

// react
import React, { useEffect, useState } from "react";
import { useHome } from "@/app/HomeContextProvider";

import { Gloock } from 'next/font/google'

// components
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";
import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";

const gloock = Gloock({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const Navbar = () => {
  const pathname = usePathname();

  const { setHoveredTab } = useHome();
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
      // className={`sticky top-0 bg-backgroundWhite pt-2 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      className={`sticky top-0 z-50 sm:h-10 bg-backgroundWhite pb-1 pt-2 transition-transform duration-700 ease-in-out md:grid md:grid-cols-3 md:pb-0 md:pt-0 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* TPP logo */}
      <div className={"h-10 justify-self-center pl-2 pt-1 md:justify-self-start"}>
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
              className={`${gloock.className} text-end text-3xl transition-colors duration-700 ease-in-out hover:text-hoverDeepPink sm:text-2xl`}
              
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
      <div className="block bg-backgroundWhite md:hidden">
        <MobileNavbar />
      </div>
      {/* desktop menu items */}
      <div className="hidden bg-backgroundWhite md:block">
        <DesktopNavbar tabHoverFn={handleHoveredTab} />
      </div>
    </div>
  );
};

export default Navbar;
