import { MouseEventHandler } from "react";
import MenuItemDropdown from "./MenuItemDropdown";
import Link from "next/link";

interface MenuItemsProps {
    item: {
        title: string;
        url: string;
        submenu?: undefined;
    }
    | {
        title: string;
        url: string;
        submenu: {
            title: string;
            url: string;
            description: string;
        }[];
    };
    onMouseEnterFn?: MouseEventHandler;
    onMouseLeaveFn?: MouseEventHandler;
}

const MenuItem = ({ item, onMouseEnterFn = () => { }, onMouseLeaveFn = () => { } }: MenuItemsProps) => {

    return (
        <li
            className="md:min-w-[40px] lg:min-w-[60px] flex justify-center"
            //  ${currentHoveredTab == items.title.toLowerCase() ? 'menu-item-hovered': ''}`}
            onMouseEnter={onMouseEnterFn}
            onMouseLeave={onMouseLeaveFn}
        >
            {/* add submenu if submenu property exists, otherwise, just link */}
            {item.submenu ?
                <MenuItemDropdown item={item} />
                : <Link className='hover:text-pink-600 hover:bg-stone-50 px-2 py-1 rounded-md transition-all duration-300' href={'/section/' + item.url}><p>{item.title}</p></Link>
            }
        </li>
    );
};

export default MenuItem;