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
        return <h2 className={`pres-header inline ${include ? "included" : ""}`}>{header}</h2>
    }
    return (
        <h2 className={`pres-header ${include ? "included" : ""}`}> {header}</h2 >
        // <Tag className="presHeader">{
        //     nestedImage ? nestedImage : 'Default Text'
        // }</Tag>
    );
}


// const scrollToHeader = (headerID) => {
//     // console.log('scroll to', headerID);
//     const headerElement = document.querySelector('#section' + headerID);

//     if (headerElement) {
//         // Calculate the desired scroll position with some space above
//         const scrollPosition = headerElement.offsetTop - 70; // Adjust the value as needed

//         // Scroll to the calculated position
//         window.scrollTo({
//             top: scrollPosition,
//             //   behavior: 'smooth', // Optional: Add smooth scrolling animation
//         });
//     }
// };

// export const updateScrollspyHeaders = (sectionTitles) => {
//     const headerElements = document.querySelectorAll('.presHeader');
//     // console.log('header elts', headerElements);
//     headerElements.forEach(function (elt, i) {
//         elt.innerText = sectionTitles[i];
//         elt.setAttribute('id', 'section' + String(i));
//     });

// };

// export default function Scrollspy({ sectionTitles = ['section1', 'section2'] }) {
//     // const headerElements = document.querySelectorAll('.presHeader');

//     // MOVED UPDATE HEADER LOGIC TO INDIVIDUAL PAGE TEMPLATES
//     // update header elements when section titles change
//     //

//     return (
//         <div className='containerScrollspy'>
//             {/* <nav id="articleScrollspy" className="navbar scrollspyNavbar"> */}
//             <nav id="articleScrollspy" className="scrollspyNavbar">
//                 {
//                     sectionTitles.map((s, i) => {
//                         return (
//                             <a key={i}
//                                 className="scrollspyLink"
//                                 onClick={() => { scrollToHeader(i) }}
//                             // href={'#section' + String(i)}
//                             >{s}</a>
//                         )
//                     })

//                 }
//             </nav >
//         </div>
//     )
// }
