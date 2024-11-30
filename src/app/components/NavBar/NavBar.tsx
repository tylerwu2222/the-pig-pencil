'use client'

// import fontFamilies from '../../site_data/logo_fonts.json';

import './NavBar.css';
// import '../../Fonts.css'

// google analytics - change to next 3rd party

// react
import React, { useEffect, useState, createContext } from "react";
import Link from 'next/link';
import Image from 'next/image';

// context
// import { appContext } from "../../App";

// navbar components & data
// import menuItems from "../../../site_data/navbar_menu_items.json";
// import randomFontFamilies from '../../site_data/logo_font_names.json';

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    // NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    // NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"


// sections
// import Home from "../Sections/Home/Home.js";
// import Data from "../Sections/Data/Data.js";
// import Writing from "../Sections/Writing/Writing.js";
// import Art from "../Sections/Art/Art.js";
// import Cheatsheets from "../Sections/Learning/Cheatsheets.js";
// import Tutorials from "../Sections/Learning/Tutorials.js";
// import Projects from '../Sections/Projects/Projects.js';
// import Me from "../Sections/People/Me.js";
// import Collaborators from '../Sections/People/Collaborators.js';
// import Subscribe from "../Sections/Subscribe/Subscribe.js";

// // post templates
// import ArtPage from "../PostTemplates/ArtPostTemplates/ArtPage.js";
// import DataPage from "../PostTemplates/DataPostTemplates/DataPage.js";
// import CheatsheetPage from "../PostTemplates/LearningPostTemplates/CheatsheetPage.js";
// import TutorialPage from "../PostTemplates/LearningPostTemplates/TutorialPage.js";
// import ProjectsPage from '../PostTemplates/ProjectsPostTemplates/ProjectsPage.js';
// import WritingPage from '../PostTemplates/WritingPostTemplates/WritingPage.js';

// import MDXtoJSTemplate from '../PostTemplates/WritingPostTemplates/MDXtoJSTemplate.js';
// import PhotoEssay from "../PostTemplates/WritingPostTemplates/PhotoEssay/PhotoEssay.js";

// post data (+ individual posts)
// import artPosts from '../../post_data/art_sections.json';
// import dataPosts from '../../post_data/data_articles.json';
// import writingPosts from '../../post_data/writing_articles.json';
// import cheatSheetPosts from '../../post_data/cheatsheet_articles.json';
// import tutorialPosts from '../../post_data/tutorial_articles.json';
// import projectsPosts from '../../post_data/projects_articles.json';

// mobile
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

// import { useWindowSize } from '../Functions/useWindowSize.js';
// import DataPageJS from '../PostTemplates/DataPostTemplates/DataPageJS.js';




// export const hideNavbarFooter = () => {
//     const navbar = document.getElementsByClassName('navbar')[0];
//     navbar.style.display = "none";
//     const footer = document.getElementsByClassName('footer')[0];
//     footer.style.display = "none";
// };

const NavBar = () => {

    const [menuVisible, setMenuVisible] = useState(false);
    const [currentHoveredTab, setCurrentHoveredTab] = useState('___');

    const [userHovered, setUserHovered] = useState(false);
    const [hoverTabInterval, setHoverTabInterval] = useState(null);

    const [logoFontFamily, setLogoFontFamily] = useState('Gloock');
    const [randomFontIndex, setRandomFontIndex] = useState(0);

    return (
        <div className='grid grid-cols-3 items-center'>
            {/* TPP logo */}
            <div className='h-10 pl-2 pt-1 justify-self-start'>
                <Link
                    className='flex flex-row gap-2 align-bottom'
                    href="/"
                >
                    <div className="flex flex-row items-end">
                        <p
                            className="text-2xl text-end"
                            style={{ fontFamily: logoFontFamily }}
                        // onMouseOver={handleHover}
                        // onMouseLeave={handleLeave}
                        >The Pig Pencil</p>
                    </div>
                    <div>
                        <Image
                            src="/img/pigpencil.png"
                            className='rounded-md'
                            width={30}
                            height={30}
                            alt="tpp-brand-img"
                        />
                    </div>
                </Link>
            </div>
            {/* desktop menu items */}
            {/* <hoveredTabContext.Provider
                    value={{
                        currentHoveredTab,
                        setCurrentHoveredTab,
                        setUserHovered,
                        location,
                        menuVisible,
                        setMenuVisible
                    }}> */}
            <div className='justify-self-center'>
                <NavigationMenu>
                    <NavigationMenuList className='gap-3'>
                        {/* items */}
                        <NavigationMenuItem
                            className={"md:min-w-[40px] lg:min-w-[60px] flex justify-center"}
                        >
                            <Link href="/section/art" legacyBehavior passHref>
                                <NavigationMenuLink
                                    className='font-normal text-[17px]'
                                >
                                    Art
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem
                            className={"md:min-w-[40px] flex justify-center"}
                        >
                            <Link href="/section/data" legacyBehavior passHref>
                                <NavigationMenuLink
                                    className='font-normal text-[17px]'
                                >
                                    Data
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem
                            className={"md:min-w-[40px] flex justify-center"}
                        >
                            <NavigationMenuTrigger
                                className='font-normal text-[17px]'
                            >
                                Learning
                            </NavigationMenuTrigger>
                            <NavigationMenuContent
                                className='font-normal text-[17px]'
                            >
                                <ul className="grid gap-3 p-4 md:w-[200px] lg:w-[300px]">
                                    <ListItem href="/section/cheatsheets" title="Cheatsheets">
                                        for data science, web scraping, and web dev.
                                    </ListItem>
                                    <ListItem href="/section/tutorials" title="Tutorials">
                                        for lots of stuff.
                                    </ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem
                            className={"md:min-w-[40px] flex justify-center"}
                        >
                            <Link href="/section/projects" legacyBehavior passHref>
                                <NavigationMenuLink
                                    className='font-normal text-[17px]'
                                >
                                    Projects
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem
                            className={"md:min-w-[40px] flex justify-center"}
                        >
                            <Link href="/section/writing" legacyBehavior passHref>
                                <NavigationMenuLink
                                    className='font-normal text-[17px]'
                                >
                                    Writing
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem
                            className={"md:min-w-[40px] flex justify-center"}
                        >
                            <NavigationMenuTrigger
                                className='font-normal text-[17px]'
                            >People</NavigationMenuTrigger>
                            <NavigationMenuContent
                                className='font-normal text-[17px]'
                            >
                                <ul className="grid gap-3 p-4 md:w-[200px] lg:w-[300px]">
                                    <ListItem href="/section/collaborators" title="Collaborators">
                                        the people that contribute to this blog.
                                    </ListItem>
                                    <ListItem href="/me" title="Me">
                                        a portfolio by tyler wu for tyler wu.
                                    </ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            {/* subscribe button */}
            <div className='pr-2 pt-1 justify-self-end'>
                <Button
                    className='bg-pink-200 hover:bg-pink-300 px-2 py-1 text-sm leading-3 '
                >
                    Subscribe
                </Button>
            </div>
        </div>
    );
}

// shadcn list item for nav sub menu
const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"


export default NavBar;