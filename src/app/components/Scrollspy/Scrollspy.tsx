'use client'

import React, { useEffect, useState } from 'react';
import './Scrollspy.css';

interface ScrollspyHeaderProps {
    include: boolean;
    level: number;
    isInline: boolean;
    header: string;
}

export function ScrollspyHeader({
    include = true,
    level = 2,
    isInline = false,
    header = 'header' }: ScrollspyHeaderProps) {
    // default h2
    // const Tag = `h${level}`;
    if (isInline) {
        return <h2 className={`scrollspy-header inline ${include ? "included" : ""}`}>{header}</h2>
    }
    return (
        <h2 className={`scrollspy-header ${include ? "included" : ""}`}> {header}</h2 >
        // <Tag className="presHeader">{
        //     nestedImage ? nestedImage : 'Default Text'
        // }</Tag>
    );
}

export default function Scrollspy() {
    const [sectionTitles, setSectionTitles] = useState<string[]>([]);

    useEffect(() => {
        // Query the DOM for elements with the specific class after the DOM is rendered
        const headerElements = Array.from(
            document.querySelectorAll('.scrollspy-header.included')
        );

        // Extract innerHTML or textContent from the header elements
        const titles = headerElements.map((e) => e.textContent || '');
        setSectionTitles(titles);
    }, []);

    // Scroll to the header element based on index
    const scrollToHeader = (index: string) => {
        const header = document.querySelectorAll('.scrollspy-header.included')[Number(index)];
        if (header) {
            const headerTop = header.getBoundingClientRect().top;
            const offsetTop = window.pageYOffset + headerTop - 40; // Leave 20px of space above the header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        }
    };

    console.log('ss titles in ss:', sectionTitles);

    return (
        <div className='fixed top-[30vh] left-0'>
            {/* <nav id="articleScrollspy" className="navbar scrollspyNavbar"> */}
            <nav className="bg-transparent text-[14px] w-[18vw] pl-[2vw] flex-col flex-wrap">
                {
                    sectionTitles.map((s, i) => {
                        return (
                            <div
                                key={i}
                                className='p-1 my-2 text-wrap'>
                                <a
                                    className="hover:text-hoverDeepPink hover:cursor-pointer transition duration-500 ease-in-out"
                                    onClick={() => { scrollToHeader(String(i)) }}
                                // href={'#section' + String(i)}
                                >{s}</a>
                            </div>
                        )
                    })

                }
            </nav >
        </div>
    )
}
