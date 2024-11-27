import * as d3 from "d3";

import ConversionToReactMessage from "../../../../components/Modules/ConversionToReactMessage.js";
import { useContext, useEffect, useState } from "react";
// import TNDContext from "./TNDContext";
import { NBAContext } from "../2021-05-09-a-visual-recap-of-the-2019-20-nba-season.js";

// const SVG1 = ({ data, view='relative' }) => {
const SVG1 = ({ data, teamData }) => {
    const {
        config,
        // teamNames
    } = useContext(NBAContext);
    // const [filteredWL, setFilteredWL] = useState(data);
    const teamDataDict = teamData.reduce(
        (obj, item) => Object.assign(obj, { [item.full_name]: item.value }), {});
    const [filteredTeamNames, setFilteredTeamNames] = useState(teamData.map(t => t.full_name));
    const gameDates = Object.keys(data);

    // initial render
    useEffect(() => {
        render_s1();
    }, [data]);


    // get WL for each team for given date
    // function update_WL(game_date){
    //     currDateDate = tScale.invert(currentDate);
    //     // update handle and label
    //     handle.attr("cx", tScale(game_date));
    //     label
    //         .attr("x", tScale(game_date))
    //         .text(formatDate(game_date));
    //     // format date to day spec
    //     const game_date_day = formatDate(game_date);

    //     // get notes fort date
    //     notes_data.forEach(note =>{
    //         if(Date.parse(note.Date) <= Date.parse(game_date_day)){
    //             notes = note.Notes;
    //         };
    //     })
    //     // get WL for date from WL_data
    //     dateWL = WL_data[0];
    //     WL_data.forEach(d => {
    //         // some dates are undefined, so round to closest previous date
    //         if(Date.parse(d.Date) <= Date.parse(game_date_day)){
    //             dateWL = d;
    //         }
    //     });

    //     // convert to correct AoO format
    //     filteredWL = Object.entries(dateWL).map(([team,WL]) => ({team,WL}));
    //     dateWL = filteredWL;
    //     // filteredWL.shift();
    //     filteredWL.forEach(f => { // add icon
    //         f['icon'] = team_icons[f.team];
    //     });
    //     filteredWL.sort((a,b) => b.WL - a .WL)

    //     // filter WL by split
    //     var filteredWLtemp = [];
    //     filteredWL.forEach(d => {
    //         if(filteredTeamNames.includes(d.team)){
    //             filteredWLtemp.push(d);
    //         }
    //     })
    //     filteredWL = filteredWLtemp;

    //     // also update names to reorder bars for graph 
    //     var filteredTeamNamesTemp = [];
    //     filteredWL.forEach(t => filteredTeamNamesTemp.push(t.team));
    //     // console.log('ftnt',filteredTeamNamesTemp);
    //     filteredTeamNames = filteredTeamNamesTemp;
    //     render()
    // }

    const render_s1 = () => {
        const t = d3.transition().duration(config.anim_speed).ease(d3.easeCubic);

        let filteredWL = data[gameDates[0]];
        console.log('ogdata', data, teamData, gameDates);
        console.log('filteredWL', filteredWL);
        console.log('names', filteredTeamNames);

        let svg = d3.select("#stat-svg1");
        svg
            .style("width", config.vw + 'px')
            .style("height", config.vh + 'px');
        // filter out teams using filteredTeams from filteredWL
        // filteredWL.filter(t => {
        //     return (filteredTeamNames.includes(t.team));
        // });
        // filteredWL.sort((a, b) => b.WL - a.WL)// sort bars IN RENDER

        // create xScale, Axis, and Labels
        const xScale = d3.scaleLinear()
            .domain([0, 1])
            .range([(config.vw - config.inner_vw * 0.95), config.inner_vw]);
        const xAxis = d3.axisBottom()
            .scale(xScale)
            .ticks(20)
            .tickFormat(config.format500)
            .tickSize(-config.inner_vh);
        svg.append("g")
            .attr('class', 'xaxis')
            .attr("transform", "translate(0," + config.inner_vh + ")")
            // .transition(t)
            .call(xAxis);
        const xLabel = svg.append("text")
            .attr("class", "xlabel");
        svg.select('.xlabel')
            .attr("text-anchor", "left")
            .attr("x", config.vw / 2)
            .attr("y", config.vh - 10)
            .text('W/L%');

        // create/update yScale, Axis, and Labels
        const yScale = d3.scaleBand()
            .domain(filteredTeamNames)
            .range([0, (config.inner_vh)])
            .padding(0.2);
        // console.log('yscale d',yScale.domain());
        // console.log('yscale r',yScale.range());
        // console.log('yscale2',yScale('Atlanta Hawks'));
        // create y axis
        const yAxis = d3.axisLeft()
            .scale(yScale);
        svg.append("g")
            .attr('class', 'yaxis')
            .attr("transform", "translate(" + (config.vw - config.inner_vw * 0.95) + ",0)")
            .call(yAxis);

        //     // join 8th seed line
        //     let WL_8 = get_8_seed(dateWL);
        //     // console.log('WL_8',WL_8);

        //     var WL_8_lines = g_main.selectAll(".WL_8_line")
        //         .data(WL_8, d=>d.conference);

        //     WL_8_lines
        //         .enter()
        //         .append("line")
        //             .attr("class",'WL_8_line')
        //             .attr("y1",height)
        //             .attr("y2",height)
        //             .style("stroke-width", 1)
        //             .style("stroke", d=> {
        //                 if(d.conference == 'east'){
        //                     return "#03319F";
        //                 }
        //                 else{
        //                     return "#D80025"; 
        //                 }
        //             })
        //             .style("fill", "none")
        //         .merge(WL_8_lines)
        //             .style("stroke-dasharray", ("2, 2"))
        //             .transition()
        //             .delay( function(d,i){
        //                 return i / 2 * anim_speed;
        //             })
        //             .duration(anim_speed)
        //             .ease(easeCubic)
        //                 .attr("x1",d => xScale(d.WL))
        //                 .attr("x2",d => xScale(d.WL))
        //                 .attr("y2",d => yScale(d.team))
        //     WL_8_lines.exit().remove();
        //     // join 8th seed team and WL
        //     var WL_8_teams = g_main.selectAll(".WL_8_text")
        //         .data(WL_8, d=>d.conference);
        //     WL_8_teams
        //         .enter()
        //         .append("text")
        //             .attr("class", "WL_8_text")//easy to style with CSS
        //             .attr("y", (d,i) => height + 10 + (i + 1) * 15)//magic number here
        //             .attr('text-anchor', 'middle')
        //             .style("fill", d=> {
        //                 if(d.conference == 'east'){
        //                     return "#03319F";
        //                 }
        //                 else{
        //                     return "#D80025"; 
        //                 }
        //             })
        //         .merge(WL_8_teams)
        //             .transition()
        //                 .delay( function(d,i){
        //                     return i / 2 * anim_speed;
        //                 })
        //                 .duration(anim_speed)
        //                 .ease(easeCubic)
        //                     .attr("x", d => xScale(d.WL))
        //                     .text(d => d.team + ": " + parseFloat(d.WL).toFixed(3));  
        //     WL_8_teams.exit().remove();

        // join bars
        let bars = svg.selectAll("rect")
            .data(filteredWL, d => d.team);
        bars.attr("transform", "translate(" + (config.vw - config.inner_vw * 0.95) + ",0)");
        bars
            .enter()
            .append("rect")
            .attr("id", d => d.team + "-bar")
            .attr("y", d => yScale(d.team))
            .attr("height", yScale.bandwidth())
            .attr("opacity", "0.1")
            // .style("fill", d => d.colors)
            .style("fill", 'red')
            .merge(bars)
            .transition()
            .delay((d, i) => {
                return i / filteredTeamNames.length * config.anim_speed;
            })
            .duration(config.anim_speed)
            .ease(d3.easeCubic)
            .attr("width", d => {
                return d.WL === 0 ? xScale(0.003) : xScale(d.WL);
            })
            .attr("y", d => yScale(d.team))
            .attr("height", yScale.bandwidth())
            .attr("opacity", "1")
            .style("fill", d => { 
                // console.log('colors', teamData.filter(t => {return t.full_name == d.team})[0].colors);
                return (teamData.filter(t => {return t.full_name === d.team})[0].colors);
            });
        bars.exit()
            .transition()
            .attr("width", xScale(0))
            .attr("opacity", "0.1")
            .style("fill", d => d.colors)
            .delay((d, i) => {
                return i / filteredTeamNames.length * config.anim_speed / 2;
            })
            .duration(config.anim_speed / 2)
            .ease(d3.easeCubic)
            .remove()
    }

    return (
        <>
            <ConversionToReactMessage />
            <svg id="stat-svg1">
            </svg>
        </>
    )
};

export default SVG1;