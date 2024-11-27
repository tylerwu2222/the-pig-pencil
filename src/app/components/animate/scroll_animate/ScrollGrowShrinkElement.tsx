'use client'

import React, { useState, useEffect } from 'react';


interface ScrollGrowShrinkElementProps{
  type: string;
  grow: boolean;
  startSize: number;
  minScale: number;
  maxScale: number;
  startHorizontal: number; // in vw?
  endHorizontal: number; // in vw?
  startVertical: number; // padding in vh
  endVertical: number; // in vh
  minScroll: number; // in pixels
  maxScroll: number; // in pixels
  iconZIndex: number;
}

// shrinks or grows element
const ScrollGrowShrinkElement = ({
  // id,
  type = "div",
  grow = true,
  startSize = 95,
  minScale = 0.1,
  maxScale = 1,
  startHorizontal = 0, // in vw?
  endHorizontal = 100, // in vw?
  startVertical = 0, // padding in vh
  endVertical = 80, // in vh
  minScroll = 0, // in pixels
  maxScroll = window.innerHeight / 2, // in pixels
  iconZIndex = 1, // appear in front by default
  ...props
  // maxScroll = (document.body.scrollHeight - window.innerHeight) // in pixels
}:ScrollGrowShrinkElementProps) => {

  const [iconPaddingTop, setIconPaddingTop] = useState(startVertical); // padding
  const [iconMarginLeft, setIconMarginLeft] = useState(startHorizontal); // padding
  const [iconSize, setIconSize] = useState(startSize); // Initial size of the icon in vh

  useEffect(() => {
    const handleScroll = () => {
      // check if Y scroll within window
      if (window.scrollY <= maxScroll && window.scrollY >= minScroll) {
        // Calculate the scale factor based on scroll position
        let scale;
        if (grow) {
          scale = 1 - window.scrollY / maxScroll; // You can adjust the divisor for a faster or slower effect
        }
        else {
          scale = window.scrollY / maxScroll;
        }
        // console.log('curr scale', scale)

        // Ensure the scale factor is within a specific range (e.g., between minScale and maxScale)
        const clampedScale = Math.min(Math.max(scale, minScale), maxScale);

        // Calculate the new icon size based on the scale factor
        const newSize = clampedScale * startSize; // scale value * initial size

        // Update the state with the new size and updated compensatory padding
        setIconSize(newSize);
        setIconPaddingTop(startSize + startVertical - newSize);
      }
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={'relative ' + 'z-10'}>
    {/* <div id={id + '-div'} style={{szIndex:iconZIndex}}> */}
      {
      // creating an element of type-type (prob image), doing this so we can style with id and add src
      React.createElement(type, {
        // id: id,
        style: {
          height: `${iconSize}vh`,
          paddingTop: `${iconPaddingTop}vh`,
          marginLeft: `${iconMarginLeft}vh`,
          transition: 'font-size 0.1s ease',
          zIndex: `${iconZIndex}`
        },
        ...props
      })}
    </div>

  );
};

export default ScrollGrowShrinkElement;
