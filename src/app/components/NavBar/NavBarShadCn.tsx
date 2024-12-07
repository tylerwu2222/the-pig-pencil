
// shadcn list item for nav sub menu
// const ListItem = React.forwardRef<
//     React.ElementRef<"a">,
//     React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, ...props }, ref) => {
//     return (
//         <li>
//             <NavigationMenuLink asChild>
//                 <a
//                     ref={ref}
//                     className={cn(
//                         "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//                         className
//                     )}
//                     {...props}
//                 >
//                     <div className="text-sm font-medium leading-none">{title}</div>
//                     <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                         {children}
//                     </p>
//                 </a>
//             </NavigationMenuLink>
//         </li>
//     )
// })
// ListItem.displayName = "ListItem"

{/* <NavigationMenu>
    <NavigationMenuList className='gap-3'>
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
            onMouseEnter={(e) => { handleHoveredTab('learning'); e.stopPropagation(); }}
            onMouseLeave={(e) => { handleHoveredTab('___'); e.stopPropagation(); }}
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
</NavigationMenu> */}