// // import 'dataPage.css';

// import React, { useEffect, useState } from 'react'
// import * as d3 from 'd3';

// import data from './data/nba-adp-21-22.csv';
// import ADP_data from './data/LOFB_average_picks.csv';
// // import graph from './SVGs/Basic1';

// import DropdownMenu from '../../../components/Modules/DropdownMenu/DropdownMenu.js';
// import Scrollspy, { ScrollspyHeader } from '../../../components/Modules/Scrollspy/Scrollspy.js';
// // import ConversionToReactMessage from '../../../components/Modules/ConversionToReactMessage.js';

// import SVG1 from './visuals/svg1.js';

// export default function NBAFantasyADPPositions() {
//     // const img_folder = '/img/data/dataPost';

//     const positionColors = {
//         'center': '#9295D0',
//         'power forward': '#46A2CB',
//         'small forward': '#73C2A6',
//         'shooting guard': '#CC8D4C',
//         'point guard': '#C15E84',
//     };
//     const tableauColors = {
//         "blue": "#5778a4",
//         "orange": "#e49444",
//         "red": "#d1615d",
//         "teal": "#85b6b2",
//         "green": "#6a9f58",
//         "yellow": "#e7ca60",
//         "purple": "#a87c9f",
//         "pink": "#f1a2a9",
//         "brown": "#967662",
//         "grey": "#b8b0ac"
//     };
//     const img_folder = '/img/data/nba_fantasy_adp_positions/nba_fantasy_adp_positions';
//     const sectionTitles = [
//         'What is Fantasy Basketball?',
//         'What is ADP?',
//         "What about Player Position?",
//         "Drafting Strategies",
//     ];

//     const [ADPData, setADPData] = useState(null);
//     const [draftData, setDraftData] = useState(null);
//     const [positionData, setPositionData] = useState({});

//     // load data
//     useEffect(() => {
//         d3.csv(ADP_data)
//             .then(dta => {
//                 dta.forEach(d => {
//                     d.average_pick = +d.average_pick;
//                     d.num_picks = +d.num_picks;
//                 });
//                 setADPData(dta);
//             });
//     }, []);

//     return (
//         <div>
//             <Scrollspy sectionTitles={sectionTitles} />
//             <div className='container-narrow containerBottom'>
//                 <ScrollspyHeader />
//                 <p>
//                     Fantasy basketball is when a group of people get together
//                     and take turns drafting an imaginary (hence: fantasy) team from current NBA basketball players.
//                 </p>
//                 <img className="post-img-wide post-img-bordered" src={img_folder + '1.png'} alt={img_folder + '1.png'}></img>
//                 <p>
//                     Naturally, the best players would be selected first in the draft and the players should get progressively worse as the draft goes on,
//                     (assuming that the fantasy managers, the people doing the drafting, are picking optimally).
//                 </p>
//                 <p>
//                     What's special about fantasy is that there is a point system that is used to convert each player's game stats can be converted to a singular fantasy point value.
//                 </p>
//                 <p>
//                     Recently, I participated in a fantasy event: the Locked on Fantasy Basketball (LOFB) Bowl. This was a big competition, 8 leagues with 12 players each that culminated in one winner.
//                 </p>
//                 <p>
//                     The site we used, FanTrax, allows us to download data about all leagues draft results, which piqued my interest for looking into data trends from this event.
//                     The first stat I (and most people) reference when researching for this event is something called ADP.
//                 </p>
//                 <ScrollspyHeader />
//                 <p>
//                     ADP, or <b> Average Draft Position</b>, is one of the most common metrics for determining how good a player is, or specifically,
//                     how good fantasy managers believe a player is.
//                 </p>
//                 <p>
//                     Players that are universally accepted as good will have ADP of 1-2 (basically Jokic as of 2018-present). Over-hyped players will have inflated ADPs, and vice-versa for underrated players.
//                 </p>
//                 <p>
//                     Something, that ADP, and many stats fail to include is <i>variance</i>. If there's a lot of disagreement about a player,
//                     there will be greater variance in their ADP. This is what the following viz aims to show:
//                 </p>
//                 {ADPData && <SVG1 data={ADPData} colors={Object.values(tableauColors)} />}
//                 <ScrollspyHeader />
//                 <p>
//                     Another parameter in drafting is a player's position:
//                     <ul>
//                         <li><b>PG: Point Guard </b>(e.g. Steph Curry, Tyrese Haliburton)</li>
//                         <li><b>SG: Shooting Guard</b> (e.g. James Harden, Devin Booker)</li>
//                         <li><b>SF: Small Forward</b> (e.g. Kawhi Leonard, Jaylen Brown)</li>
//                         <li><b>PF: Power Forward</b> (e.g. Lebron James, Jayson Tatum)</li>
//                         <li><b>C: Center</b> (e.g. Nikola Jokic, Joel Embiid)</li>
//                     </ul>
//                     Which is sometimes condensed to:
//                     <ul>
//                         <li><b>G: Guard</b></li>
//                         <li><b>F: Forward</b></li>
//                         <li><b>C: Center</b></li>
//                     </ul>
//                 </p>
//                 <p>
//                     This restrictive parameter means you can't just willy-nilly draft the best player available regardless of position.
//                     You have to make sure you select at least one or two players for each position (depending on how large your fantasy team is).
//                 </p>
//                 <p>Let's see how the different positions were drafted for my LOFB Bowl:</p>
//                 {/* {draftData && <SVG1 data={draftData} colors={positionColors2} />} */}
//                 <ScrollspyHeader />
//             </div>
//         </div >
//     )
// }
