import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MenuItemDropdownProps {
    item: {
        title: string,
        url: string,
        submenu: Record<string, string>[],
    }
}

export default function MenuItemDropdown({ item }: MenuItemDropdownProps) {

    const [isVisible, setIsVisible] = useState<boolean>(false);

    // console.log('item', item);

    return (
        <div className='relative'>
            <div
                className='flex items-center hover:cursor-pointer hover:text-pink-600 hover:bg-stone-50 px-2 py-1 transition-all duration-300'
                onClick={(e) => {
                    e.stopPropagation();
                    setIsVisible(!isVisible)
                }
                }
            >
                <p className="md:min-w-[40px] lg:min-w-[60px] flex justify-center  p-0 rounded-md"
                >{item.title}</p>
                {isVisible ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </div>
            {isVisible &&
                <div className='absolute top-full left-1/2 -translate-x-1/2 bg-white w-[20vw] xl:w-[20vw] shadow-lg p-3 rounded-md z-50'>
                    {item.submenu.map((subitem, index) => {
                        let submenu_href = '/' + subitem.url
                        if (subitem.url !== 'me') {
                            submenu_href = '/section' + submenu_href
                        }
                        return <Link className='cursor-pointer' href={submenu_href} onClick={() => setIsVisible(false)} key={index}>
                            <div className='p-1 hover:text-pink-600 rounded-md transition-all duration-300'>
                                <p className='font-semibold'>{subitem.title}</p>
                                <p className='text-sm'>{subitem.description}</p>
                            </div>
                        </Link>
                    })}
                </div>}
        </div>
    )
}
