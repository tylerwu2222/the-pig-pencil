import React, { useRef, useState, useEffect, ReactNode } from 'react'

import './ScrollDynamicStickyHeader.css'

interface ScrollDynamicStickyHeaderProps {
    content: ReactNode,
    topPosition: number,
    startingLeftPosition: number,
    endLeftPosition: number,
    startingFontSize: string,
    endingFontSize: string,
    clickBack: boolean
}

export default function ScrollDynamicStickyHeader({
    content = <p>header text</p>,
    topPosition = 0,
    startingLeftPosition = 20,
    endLeftPosition = 1,
    startingFontSize = 'x-large',
    endingFontSize = 'medium',
    clickBack = true
}: Partial<ScrollDynamicStickyHeaderProps>
) {
    const [initialYPosition, setInitialYPosition] = useState<number | undefined>();
    const [leftPosition, setLeftPosition] = useState(startingLeftPosition);
    const [headerSize, setHeaderSize] = useState(startingFontSize);
    const headerRef = useRef<HTMLDivElement | null>(null);

    // update distance of element from top when scrolling
    useEffect(() => {
        const handleScroll = () => {
            if (!headerRef.current) return; // Safeguard against null or undefined
            // get distance of element from top of screen
            const rect = headerRef.current.getBoundingClientRect();
            const distance = rect.top;
            // console.log('dist', distance);
            // if distance == topPosition, start moving element to left & shrink
            if (distance <= topPosition) {
                setLeftPosition(endLeftPosition);
                setHeaderSize(endingFontSize);
            }
            // reset position if scrolled up, & resize
            if (distance > topPosition) {
                setLeftPosition(startingLeftPosition);
                setHeaderSize(startingFontSize);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Run the effect only once on mount

    useEffect(() => {
        if (!headerRef.current) return;
        const rect = headerRef.current.getBoundingClientRect();
        // setInitialYPosition(window.scrollY + rect.top); // offset so header has correct space above
        setInitialYPosition(window.scrollY + rect.top - topPosition); // offset so header has correct space above
    }, []);

    const handleClick = () => {
        window.scrollTo({ top: initialYPosition, behavior: 'smooth' });
        // reset header position
        // setLeftPosition(startingLeftPosition);
        // setHeaderSize(startingFontSize);
    }

    return (
        <h2
            className='sticky-header px-1 font-semibold z-10'
            ref={headerRef}
            onClick={clickBack ? handleClick : undefined}
            style={{
                cursor: clickBack ? 'pointer' : 'default',
                top: topPosition,
                left: `${leftPosition}%`,
                fontSize: headerSize,
                transition: 'left 1s, fontSize 1s'
            }}>
            {content}
        </h2>
    )
}
