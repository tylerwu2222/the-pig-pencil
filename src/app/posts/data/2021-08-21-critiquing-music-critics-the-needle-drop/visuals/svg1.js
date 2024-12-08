'use client'
import * as d3 from "d3";
import { useState, useEffect } from "react";

// components
import DropdownInputSelect from "@/app/components/inputs/DropdownInput/DropdownInputSelect";

// data
import { loadPublicCSV } from "@/lib/data_section/loadPublicCSV.js";

// styles
import config from "./config.js";

const parseTime = d3.timeParse("%d-%b-%y");

// const SVG1 = ({ data, view='relative' }) => {
const SVG1 = ({ view = 'absolute' }) => {
    // console.log('svg1 init data', data);

    const [albumData, setAlbumData] = useState([]);
    const stats1 = ['All years'].concat([...Array(10).keys()].map(yr => yr + 2012));
    const [stat, setStat] = useState(stats1[0]);

    // load data on load
    useEffect(() => {
        // d3.csv(data)
        async function fetchData() {
            loadPublicCSV({ fileName: '2021-08-21-critiquing-music-critics-the-needle-drop' })
                .then(dta => {
                    dta.forEach(d => {
                        d.Year = +d.Year; // year to numeric
                        d.Score = +d.Score; // year to numeric
                        d.Date = parseTime(d.Date); // format to date
                        d.Artists = d.Artists.split('<,>');
                        d.Genres = d.Genres.split(',');
                    });
                    // init album datas
                    setAlbumData(dta);
                })
                .catch(error => {
                    console.error('Error loading or parsing CSV data:', error);
                })
        }
        fetchData();
    }, []);



    // render svg1 based on year
    const render_s1 = (stat) => {
        // console.log('new render', stat);
        const t = d3.transition().duration(config.anim_speed).ease(d3.easeCubic);
        let svg1 = d3.select("#stat-svg1");
        svg1
            // .attr("viewBox", [0, 0, config.vh, config.vw]);
            .style("width", config.vw + 'px')
            .style("height", config.vh + 'px');

        let filtered_data;
        // filter data by year
        if (stat[0] == "2") {
            filtered_data = albumData.filter(function (a) {
                return a.Year == +stat;
            })
            // );
        }
        // otherwise all data
        else {
            filtered_data = albumData;
        }
        // console.log('albumdata',albumData);
        // console.log('filtered_data',filtered_data);

        // render hist
        let scores = filtered_data.map(a => a.Score);
        // let min = Math.min(...scores);
        const min = -1;
        const max = 10;
        // let max = Math.max(...scores);
        let domain = [min, max];
        let xScale = d3.scaleLinear()
            .domain(domain)
            .range([(config.vw - config.inner_vw * 0.95), config.inner_vw]);
        let score_labels = new Set(scores);
        // let n_bin = score_labels.size;

        let bin1 = d3.bin();
        let bins = bin1(scores);

        //x axis
        const xAxis = d3.axisBottom().scale(xScale);
        svg1.append("g").attr('class', 'xaxis');
        svg1.select('g.xaxis')
            .attr("transform", "translate(0," + config.inner_vh + ")")
            .transition(t)
            .call(xAxis);
        const xLabel = svg1.append("text")
            .attr("class", "xlabel");
        svg1.select('.xlabel')
            .attr("text-anchor", "left")
            .attr("x", config.vw / 2)
            .attr("y", config.vh - 10)
            .text('Score');

        // y axis
        let yMax;
        if (view === 'relative') {
            yMax = d3.max(bins, d => d.length);
        }
        else {
            if (stat[0] == "A") {
                yMax = 500;
            }
            else {
                yMax = 70;
            }
        }
        let yScale = d3.scaleLinear()
            .range([config.inner_vh, config.vh - config.inner_vh])
            .domain([0, yMax]);

        const yAxis = d3.axisLeft().scale(yScale);
        svg1.append("g").attr('class', 'yaxis');
        svg1.select('g.yaxis')
            .attr("transform", "translate(" + (config.vw - config.inner_vw) + ",0)")
            .transition(t)
            .call(yAxis);
        const yLabel = svg1.append("text")
            .attr("class", "ylabel");
        svg1.select('.ylabel')
            .attr("text-anchor", "middle")
            .attr("x", (-config.vh / 2))
            .attr("y", 20)
            .attr("transform", "rotate(-90)")
            .text('Number of Reviews');

        // add bars
        svg1.selectAll("rect")
            .data(bins, d => d.x0)
            .join(
                enter => enter.append("rect")
                    .attr("x", d => xScale(d.x0 - 0.5))
                    .attr("y", config.inner_vh)
                    .attr("width", function (d) {
                        return xScale(d.x1) - xScale(d.x0) - 2;
                    })
                    .call(enter => enter.transition(t)
                        .attr("fill", config.color1)
                        .attr("stroke", config.stroke1)
                        .attr("x", d => xScale(d.x0 - 0.5))
                        .attr("y", d => yScale(d.length))
                        // .attr("width", function (d) {
                        //     return xScale(d.x1) - xScale(d.x0) - 2;
                        // })
                        .attr("height", function (d) {
                            return yScale(0) - yScale(d.length);
                        })
                    ),
                update => update
                    .call(update => update.transition(t)
                        .attr("x", d => xScale(d.x0 - 0.5))
                        .attr("y", d => yScale(d.length))
                        .attr("width", function (d) {
                            return xScale(d.x1) - xScale(d.x0) - 2;
                        })
                        .attr("height", function (d) {
                            return yScale(0) - yScale(d.length);
                        })
                    ),
                exit => exit
                    .call(exit => exit.transition()
                        .attr('height', 0)
                        .attr('y', config.inner_vh)
                        .remove())
            );
    };

    // render svg1 when dropdown clicked
    // const onStat1Clicked = (event, child) => {
    //     render_s1(event.target.value);
    // };

    // render s1 whenever album data or stat changes (i.e. after data loaded)
    useEffect(() => {
        render_s1(stat);
    }, [albumData, stat]);

    return (
        <>
            {/* <DropdownMenu label='Year' options={stats1} maxWidth={300} color = {config.stroke1}/> */}
            <DropdownInputSelect
                label='Year'
                options={stats1}
                initialOption={stat}
                selectedOption={stat}
                setSelectedOption={setStat}
                color={config.color1}
            />
            <svg id="stat-svg1">
            </svg>
        </>
    )
}



export default SVG1;