'use client'

// import fontFamilies from '../../site_data/logo_fonts.json';

import './NavBar.css';
// import '../../Fonts.css'

// google analytics - change to next analytics?


// react
import React, { useEffect, useState, useContext } from "react";
import Link from 'next/link';
import Image from 'next/image';

import { HomeContext } from '@/app/page';

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

// mobile
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

const NavBar = () => {
    const { hoveredTab, setHoveredTab } = useContext(HomeContext);

    const [logoFontFamily, setLogoFontFamily] = useState('Gloock');
    // const [randomFontIndex, setRandomFontIndex] = useState(0);

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

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    const handleHoveredTab = (tab: string) => {
        setHoveredTab(tab);
    }

    return (
        <div className={`grid grid-cols-3 items-center bg-backgroundWhite 
            sticky top-0 
            transition-transform duration-700 ease-in-out 
            ${isVisible ? 'translate-y-0' : '-translate-y-full'
            }`}>
            {/* TPP logo */}
            <div className='h-10 pl-2 pt-1 justify-self-start'>
                <Link
                    className='flex flex-row gap-2 align-bottom'
                    href="/"
                >
                    <div className="flex flex-row items-end"
                        onMouseEnter={() => { handleHoveredTab('pigs!') }}
                        onMouseLeave={() => { handleHoveredTab('___') }}
                    >
                        <p
                            className="text-2xl text-end hover:text-hoverDeepPink transition-colors duration-1000 ease-in-out"
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
            <div className='justify-self-center'>
                <NavigationMenu>
                    <NavigationMenuList className='gap-3'>
                        {/* items */}
                        <NavigationMenuItem
                            className={"md:min-w-[40px] lg:min-w-[60px] flex justify-center hover:text-pink-600 p-1 rounded-md"}
                            onMouseEnter={() => { handleHoveredTab('art') }}
                            onMouseLeave={() => { handleHoveredTab('___') }}
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
                            className={"md:min-w-[40px] flex justify-center hover:text-pink-600 p-1 rounded-md"}
                            onMouseEnter={() => { handleHoveredTab('data') }}
                            onMouseLeave={() => { handleHoveredTab('___') }}
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
                            className={"md:min-w-[40px] flex justify-center hover:text-pink-600 p-1 rounded-md"}
                            onMouseEnter={() => { handleHoveredTab('learning') }}
                            onMouseLeave={() => { handleHoveredTab('___') }}
                        >
                            <NavigationMenuTrigger
                                className='appearance-none font-normal text-[17px] bg-transparent hover:text-pink-600'
                            >
                                Learning
                            </NavigationMenuTrigger>
                            <NavigationMenuContent
                                className='appearance-none font-normal text-[17px] bg-background'
                            >
                                <ul className="grid gap-3 p-4 md:w-[200px] lg:w-[300px]">
                                    <ListItem href="/section/cheatsheets" title="Cheatsheets" className='hover:text-pink-600'>
                                        for data science, web scraping, and web dev.
                                    </ListItem>
                                    <ListItem href="/section/tutorials" title="Tutorials" className='hover:text-pink-600'>
                                        for lots of stuff.
                                    </ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem
                            className={"md:min-w-[40px] flex justify-center hover:text-pink-600 p-1 rounded-md"}
                            onMouseEnter={() => { handleHoveredTab('projects') }}
                            onMouseLeave={() => { handleHoveredTab('___') }}
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
                            className={"md:min-w-[40px] flex justify-center hover:text-pink-600 p-1 rounded-md"}
                            onMouseEnter={() => { handleHoveredTab('writing') }}
                            onMouseLeave={() => { handleHoveredTab('___') }}
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
                            className={"md:min-w-[40px] flex justify-center p-1 rounded-md"}
                            onMouseEnter={() => { handleHoveredTab('people') }}
                            onMouseLeave={() => { handleHoveredTab('___') }}
                        >
                            <NavigationMenuTrigger
                                className='appearance-none font-normal text-[17px] bg-transparent focus:bg-transparent hover:bg-transparent active:bg-transparent hover:text-pink-600'
                            >
                                People
                            </NavigationMenuTrigger>
                            <NavigationMenuContent
                                className='font-normal text-[17px] bg-background'
                            >
                                <ul className="grid gap-3 p-4 md:w-[200px] lg:w-[300px]">
                                    <ListItem href="/section/collaborators" title="Collaborators" className='hover:text-pink-600'>
                                        the people that contribute to this blog.
                                    </ListItem>
                                    <ListItem href="/me" title="Me" className='hover:text-pink-600'>
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