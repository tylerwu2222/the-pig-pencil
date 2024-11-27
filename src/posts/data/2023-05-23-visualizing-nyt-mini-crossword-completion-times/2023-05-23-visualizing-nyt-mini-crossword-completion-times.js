// styles
import './2023-05-23-visualizing-nyt-mini-crossword-completion-times.css';
import '../../../components/PostTemplates/ArtPostTemplates/ArtPage.css';

// data
import data from './data/mini_scores_long.csv';
import data2 from './data/mini_scores_c_wide.csv';

// visuals
import Basic1 from './visuals/Basic1.js';
import Basic1b from './visuals/Basic1b.js';
import Basic2 from './visuals/Basic2.js';

// other packages
import React, { useEffect, useState, createContext } from 'react'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as d3 from 'd3';
import ImageModal from '../../../components/Modules/ImageModal/ImageModal.js';
import DropdownMenu from '../../../components/Modules/DropdownMenu/DropdownMenu.js';
import Scrollspy from '../../../components/Modules/Scrollspy/Scrollspy.js';
import ConversionToReactMessage from '../../../components/Modules/ConversionToReactMessage.js';

export const NYTContext = createContext({});

const NYTProvider = NYTContext.Provider;

export default function NytMiniScores() {
    const img_folder = '/img/data/nyt_mini_scores/nyt_mini_scores';
    const sectionTitles = ['Collecting the Data', 'Preliminary Sketches', 'The Graphs', 'Closing Thoughts'];

    const [longData, setLongData] = useState(null);
    const [wideData, setWideData] = useState(null);
    
    const cumulative_stats = ['_sum', '_mean', '_median', '_max', '_min'];
    const [currentCumulativeStat, setCurrentCumulativeStat] = useState(cumulative_stats[0]);

    // load data
    useEffect(() => {
        d3.csv(data)
            .then(dta => {
                setLongData(dta);
                // console.log(dta);
            });
        d3.csv(data2)
            .then(dta => {
                setWideData(dta);
                // console.log(dta);
            });
    }, []);


    return (
        <NYTProvider
            value={{
                // config,
                // colors,
                currentCumulativeStat,
                DropdownMenu
            }}>
            <div className='nyt-mini-div'>
                <Scrollspy sectionTitles={sectionTitles} />
                <div className='container-narrow containerBottom'>
                    <p>
                        This past school year, I began playing the <a href='https://www.nytimes.com/crosswords/game/mini' target='_blank'>NYT Mini crossword</a> with some friends.
                    </p>
                    <p>
                        For those unfamiliar, The Mini is a 5x5 daily crossword by NYT that looks like this:
                    </p>
                    <img className="post-img-tall" src={img_folder + '1.png'} alt='example-mini'></img>

                    <h2 id='section1' className="pres-header">{sectionTitles[0]}</h2>
                    <p>
                        I thought it would be interesting to collect the time it took everyone to complete
                        each daily mini via screenshots and see if I could make some cool visualizations as a result of it.
                    </p>
                    <p>
                        Here's a diagram of what an example leaderboard looked like and how I converted it to data:
                    </p>
                    <ImageModal
                        imgTN={<img className="post-img-wide modalImgThumbnail" src={img_folder + '2.png'} alt='mini-process'></img>}
                        img={<img className="modalImgWide" src={img_folder + '2.png'} alt='mini-process'></img>}
                        desc='NYT Mini data conversion process'
                        title='fig. 2'
                    />
                    <h2 id='section2' className="pres-header">{sectionTitles[1]}</h2>
                    <p>
                        A simple visualization exercise I've learned this past year in my info viz class
                        is to come up with as many visualizations as you can from one dataset.
                        This can be a great exercise for thinking outside the box for creating innovative vizzes.
                    </p>
                    <p>To start, I begin with some rough sketches:</p>
                    <ImageModal
                        imgTN={<img className="post-img-wide modalImgThumbnail" src={img_folder + '3.png'} alt='mini-sketches'></img>}
                        img={<img className="modalImgWide" src={img_folder + '3.png'} alt='mini-sketches'></img>}
                        desc='NYT Mini early viz drafts'
                        title='fig. 3'
                    />
                    <p>Starting with simple graphs helped me get familiar with the type of data I had and how they are commonly visualized.</p>
                    <p>Once I had this stepping stone, it was easier to think about alterations and alternative ways I could visualize.</p>

                    <h2 id='section3' className="pres-header">{sectionTitles[2]}</h2>
                    <p>After sketching, I created each viz using D3 (and the basic graphs using recharts):</p>
                    <div>
                        <h3>Basic Graphs</h3>
                        <p>I first tried making the most basic linechart using Recharts, and the result looks... messy.</p>

                        <h4>Daily Completion Time Per User</h4>
                        <Basic1 data={wideData} />

                        <p>It turns out recharts is actually rendering all missing values as 0, so it might be a better idea to use d3 instead:
                        </p>
                        <ConversionToReactMessage />
                        <Basic1b data={longData} />

                        {/* smooth from sum to others, but not working for others */}
                        <p>Recharts' linechart does look a bit better with cumulative stats:</p>
                        <DropdownMenu label='Cumulative stat' options={cumulative_stats} handleChange={e => { setCurrentCumulativeStat(e.target.value) }} />
                        <Basic2 data={wideData} />


                        <svg id="basic-svg-3">
                        </svg>
                        <svg id="basic-svg-4">
                        </svg>
                    </div>
                    <div>
                        <h3>Fastest Times</h3>
                        <p>We could try to combine everyone's fastest time into one line, and color by the current record holder:</p>
                    </div>
                    <div>
                        <h3>Average Window</h3>
                        <p>We can also create a slider to gradiate (is that a word?) between individual dates and cumulative scores.</p>
                    </div>
                    <h3>Range Graph</h3>
                    <p>A combination of the min and max scores for each user:</p>
                    <h3>Streaks</h3>
                    <p>Holding streaks of <i>n</i> seconds is quite difficult with this puzzle, as we can see with the charts below:</p>
                    <h3>Date Frequency & User Cooccurence</h3>
                    <p>Many of my friends (including myself) played mini less and less throughout the year as our classes got busier.
                        Thus, it could also be interesting to track <i>when</i> we play the mini </p>

                    <h2 id='section4' className="pres-header">{sectionTitles[3]}</h2>
                    <p>In a perfect world, I would've captured every day and I might've also screenshotted the actual crosswords for each day
                        so I could look for relationships between the words/hints and completion time. But I'm human, so I didn't :(
                    </p>
                    <p>Maybe one day I'll work at NYT and have access to that sort of data...</p>
                </div>
            </div>
        </NYTProvider>
    )
}
