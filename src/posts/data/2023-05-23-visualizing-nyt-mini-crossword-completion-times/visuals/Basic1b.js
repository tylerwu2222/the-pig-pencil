import React from 'react'

// import * as d3 from "d3";
import { useContext } from "react";
import { NYTContext } from '../2023-05-23-visualizing-nyt-mini-crossword-completion-times';

export default function Basic1b({data}) {
    const {
        colors
    } = useContext(NYTContext);

    console.log('b1b',data);

    return (
    <svg id="basic-svg-1">
    </svg>
    )
}
