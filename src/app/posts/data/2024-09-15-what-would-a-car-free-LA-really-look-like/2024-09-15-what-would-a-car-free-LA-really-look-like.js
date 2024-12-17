import * as d3 from "d3";

import { createContext, useEffect, useState } from "react";

// scroll components
// import ScrollyVideo from 'scrolly-video/dist/ScrollyVideo.cjs.jsx';
import { Scrollama, Step } from 'react-scrollama';
import ScrollyVideo from 'scrolly-video/dist/ScrollyVideo.esm.jsx';
import video from './la-olympics-transit.mp4';
// visualizations
import SVG1 from "./visuals/svg1";

import Scrollspy, { ScrollspyHeader, updateScrollspyHeaders } from "../../../components/Modules/Scrollspy/Scrollspy";
import { hideNavbarFooter } from "../../../components/Navbar/Navbar";

import './2024-09-15-what-would-a-car-free-LA-really-look-like.css';

export const CarFreeContext = createContext({});

const sectionTitles = [
    'The effect of Olympics on public transit',
    'The LA situation',
    'Feasibility',
    'Long-term implications']


// handle displaying title + byline over video
const handleThumbnailScroll = () => {
    console.log('scrolling...')
};


const WhatWouldACarfreeLAReallyLookLike = ({ postData }) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    // This callback fires when a Step hits the offset threshold. It receives the
    // data prop of the step, which in this demo stores the index of the step.
    const onStepEnter = ({ data }) => {
        setCurrentStepIndex(data);
    };

    // update headers on page load and hide navbar
    useEffect(() => {
        hideNavbarFooter();
        updateScrollspyHeaders(sectionTitles);
    }, []);

    return (
        <CarFreeContext.Provider
            value={{
            }}>
            <Scrollspy sectionTitles={sectionTitles} />
            {/* gif header image */}
            {/* interactive thumbnail */}
            <div style={{ height: '500vh' }}>
                {/* scroll video */}
                <ScrollyVideo src={video} onChange={handleThumbnailScroll} />
                <Scrollama offset={0.3} onStepEnter={onStepEnter}>
                    <Step data={1} key={1}>
                        <div
                            style={{
                                margin: '50vh 0',
                                border: '1px solid gray',
                                opacity: currentStepIndex === 0 ? 1 : 0.2,
                            }}
                        >
                            <h1>{postData.Title}</h1>
                            <i className='post-byline'>{postData.Author} - {postData.Date}</i>
                        </div>
                    </Step>
                </Scrollama>
            </div>
            {/* main article content */}
            <div className='container-narrow'>
                {/* content here */}
                <ScrollspyHeader />
                <p>
                    I've recently become interested in public-transit, writing about the BayPass in SF.
                    With that, something that's come to my awareness is the impact that the Olympics can have on improving public transit ridership for a city long term.
                    For example, with the 2010 Winter games in Vancouver, the rapid line that was built to address increased transit needs. Ridership peaked to
                </p>
                <ScrollspyHeader />
                <p>LA definitely has a unique situation, being one of the most car-centric cities in the world.</p>
                <p>Even with this precedent, the Mayor, Karen Bass, had promised that LA would be car-free ahead of the 2028 games.</p>
                <ScrollspyHeader />
                Of the discussions surrounding potential solutions, relying on purchased buses from surrounding universities and _ counties seems to be a promising solution.
                The issue with the solution however, is there might then be an excess of busses in the area following the Olympics.
                A much more sustainable long term solution is the expansion of the LA metro service, particularly the K line and __.
                The question is then whether this '28 by 28' plan is actually feasible.

                <ScrollspyHeader />
                Long term, a car-free or at least car-reduced LA could have drastic implications on commuter behavior, reducing travel time, accidents, and reducing environmental impact.

            </div>
        </CarFreeContext.Provider >
    )
}
export default WhatWouldACarfreeLAReallyLookLike;