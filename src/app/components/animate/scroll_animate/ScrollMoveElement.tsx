import React, { useEffect, useState } from 'react';
import './ScrollMoveElement.css'


// 
const ScrollMoveElement = ({
    id,
    content = <div>content</div>,
    horizontalEquation = x => x, // linear equation
    verticalEquation = x => x, // linear equation
    startHorizontal = 0, // in vw?
    endHorizontal = 100, // in vw?
    startVertical = 30, // in vh
    endVertical = 80, // in vh
    minScroll = 0, // in pixels
    maxScroll = (document.body.scrollHeight - window.innerHeight), // in pixels
    startPos = "left",
    zIndex = 0,
    containerClassName = ''
}) => {
    const [horizontalPosition, setHorizontalPosition] = useState(startHorizontal);
    const [verticalPosition, setVerticalPosition] = useState(startVertical);
    const [zPosition, setZPosition] = useState(zIndex);

    // console.log('generate',);
    // handle scroll movement
    useEffect(() => {
        const handleScroll = () => {
            // check if Y scroll within window
            if (window.scrollY <= maxScroll & window.scrollY >= minScroll) {
                //  & horizontalPosition <= endHorizontal) {
                let verticalSign = 1, horizontalSign = 1;

                // set X POSITION
                if (endHorizontal < startHorizontal) {
                    horizontalSign = -1
                }
                setHorizontalPosition(
                    // transformation(ratio of vertical scrolled) * horizontal distance to scroll
                    horizontalSign * horizontalEquation((window.scrollY - minScroll) / (maxScroll - minScroll)) * Math.abs(endHorizontal - startHorizontal) + startHorizontal
                );

                // set Y POSITION
                if (endVertical < startVertical) {
                    verticalSign = -1
                }
                setVerticalPosition(
                    verticalSign * verticalEquation((window.scrollY - minScroll) / (maxScroll - minScroll)) * Math.abs(endVertical - startVertical) + startVertical
                    // verticalEquation((window.scrollY - minScroll) / (maxScroll - minScroll)) * ((endVertical - startVertical) + startVertical)
                );

            }


        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const bringEltToFront = () => {
        setZPosition(1000);
    };

    const resetElt = () => {
        setZPosition(zIndex);
    };

    let positionedElement;
    if (startPos == "left") {
        positionedElement = <div
            className={`moving-container ${containerClassName}`}
            id={id}
            style={{ left: `${horizontalPosition}vw`, top: `${verticalPosition}vh`, zIndex: zPosition }}
            onMouseEnter={() => bringEltToFront()}
            onMouseLeave={() => resetElt()}
        >
            {content}
        </div>;
    }
    else if (startPos == "right") {
        positionedElement = <div
            className={`moving-container ${containerClassName} `}
            id={id}
            style={{ right: `${horizontalPosition}vw`, top: `${verticalPosition}vh`, zIndex: zPosition }}
            onMouseEnter={() => bringEltToFront()}
            onMouseLeave={() => resetElt()}
        >
            {content}
        </div>;
    }
    return positionedElement;
};

export default ScrollMoveElement;