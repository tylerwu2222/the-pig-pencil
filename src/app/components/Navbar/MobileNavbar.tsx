"use client";

import { Menu } from "lucide-react";
import React, { useState } from "react";

import MenuItem from "./MenuItem";

import navbar_items from "@/site_data/navbar_menu_items.json";

const MobileNavbar = () => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const handleMenuToggle = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div>
      {/* menu toggle button */}
      <button onClick={handleMenuToggle} className="absolute left-2 top-2 pt-1 pl-2">
        <Menu />
      </button>
      {/* menu items */}
      {menuVisible && (
        <div className="block">
          <nav>
            <ul className="grid grid-cols-3 gap-3 pt-2">
              {navbar_items.map((item, index) => {
                return (
                  <MenuItem
                    key={index}
                    item={item}
                    
                  />
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
