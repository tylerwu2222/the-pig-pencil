import * as d3 from "d3";

import { createContext, useEffect, useState } from "react";
import SVG1 from "./visuals/svg1";
import SVG2 from "./visuals/svg2";
import WLdataCSV from './data/WL2019_20.csv';
import teamDataCSV from './data/team_data.csv';

export const NBAContext = createContext({});

const w_width = window.innerWidth, w_height = window.innerHeight;
const article_width = (w_width <= 450) ? 0.95 : 0.6; // ternary operator
const article_height = 0.75;
const padding_v = 60, padding_h = 60;
const formatDateIntoMonth = d3.timeFormat("%B");
const formatDate = d3.timeFormat("%m/%d/%Y");
const format500 = d3.format('.3f');
const config = {
    "vw": article_width * w_width,
    "vh": article_height * w_height,
    "small_vh": article_height * w_height * 0.8,
    "inner_vw": article_width * w_width - padding_h,
    "inner_vh": article_height * w_height - padding_v,
    "small_inner_vh": article_height * w_height * 0.8 - padding_v,
    "anim_speed": 3000,
    "color1": "#FCF281",
    "stroke1": "#262626",
    "formatDateToMonth": formatDateIntoMonth,
    "formatDate": formatDate,
    "format500": format500
}



const NBARegularSeason2019 = () => {
    const [originalWL, setOriginalWL] = useState(null);
    // const [filteredWL, setFilteredWL] = useState([]);
    const [teamData, setTeamData] = useState([]);
    // let originalWL;
    let [teamNames, setTeamNames] = useState(null);
    let team_names;

    useEffect(() => {
        d3.csv(teamDataCSV)
            .then(dta => {
                dta.forEach(d => {
                    d.colors = d.colors.split("'")[1];
                    // d.icon = '/static/images/blog_posts/nba_reg_season_2019-20/team_logos/' + d.abbreviation + '-logo.png'
                })
                setTeamData(dta);
                team_names = dta.map(d => d.full_name);
                setTeamNames(team_names);
                // console.log('team data', dta);
            });

        d3.csv(WLdataCSV)
            .then(dta => {

                let WLbyDate = {};
                dta.forEach(d => {
                    let WLforDate = [];
                    team_names.forEach(name => {
                        // console.log('teamWL',name,d[name]);
                        let teamWL = {}
                        teamWL['team'] = name;
                        teamWL['WL'] = d[name];
                        WLforDate.push(teamWL);
                    });
                    WLbyDate[d['Date']] = WLforDate;
                    // delete WLbyDate[d['Date']]['Date'];
                })
                // originalWL = WLbyDate;
                setOriginalWL(WLbyDate)
                // console.log('WLbyDate', WLbyDate);
                // setFilteredWL(dta[0]);
                // delete filteredWL['Date'];
                // setFilteredWL(Object.entries(filteredWL).map(([team, WL]) => ({ team, WL })));
                // console.log('filt', filteredWL);
                // dateWL = filteredWL;
                // filteredWL.forEach(f => { // add icon
                //     f['icon'] = team_icons[f.team];
                // });
                // console.log('FWL:', filteredWL);
                // render();
            })

    }, []);


    return (
        <NBAContext.Provider
            value={{
                config,
                teamNames
            }}>
            <div className='container-narrow containerBottom'>
                <h2 id="section1" className="pres-header">Regular Season W-L Bar Chart Race</h2>
                <p>
                    Yes, I know bar chart races are one of those infamous
                    "looks-cool-but-isn't-actually-that-insightful" chart types,
                    but I wanted to learn how to make one, so this is the result.
                </p>
                <p>
                    Plus, I wanted commemorate the Lakers championship season so here we are. (RIP Celtics, RIP Clips).
                </p>
                <div className="row display-row">
                    <div className="col-4">
                        <span id="splits-menu">
                        </span>
                        <span id="speed-btns">
                        </span>
                    </div>
                    <div className="col-8">
                        <span id="notes-display"></span>
                        <svg id="svg-skip"></svg>
                    </div>
                </div>
                <div id="chart1">
                    {originalWL && teamData && teamNames && <SVG1 data={originalWL} teamData={teamData} />}
                    {/* <svg id="svg-reg">
                    <g id="main-g"></g>
                </svg> */}
                </div>
                <h2 id="section1" className="pres-header">Static Regular Season W-L</h2>

                <div id="chart2">
                    <SVG2 />
                    {/* <svg id="svg-reg2">
                    <g id="main-g2"></g>
                </svg> */}
                </div>
            </div>
        </NBAContext.Provider>
    )
}

export default NBARegularSeason2019;
