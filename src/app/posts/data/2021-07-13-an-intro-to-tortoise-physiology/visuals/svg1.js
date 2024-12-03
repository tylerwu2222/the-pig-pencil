'use client'

import * as d3 from "d3";
import { useEffect, useState } from "react";
import { config } from "./config";
import DropdownInputSelect from "@/app/components/inputs/DropdownInput/DropdownInputSelect";

// import data from '../data/tort_data.csv';
import { loadPublicCSV } from "@/app/lib/data_section/loadPublicCSV";

const initialHC = {
    'tropical forest': 0,
    'deciduous forest': 0,
    'savanna': 0,
    'grassland': 0,
    'coastal': 0,
    'desert': 0,
    'mountain': 0,
    'island': 0
};

// type DataRow = {
//     [key: string]: string | number;
//   };

const SVG1 = () => {
    const [tortData, setTortData] = useState([]);
    const [habitatCounts, setHabitatCounts] = useState({});
    // const [xStat, setXStat] = useState([]);
    // const [yStat, setYStat] = useState([]);

    useEffect(() => {
        async function fetchData() {
            loadPublicCSV({ fileName: '2021-07-13-an-intro-to-tortoise-physiology' })
                .then(dta => {
                    let habitat_counts = structuredClone(initialHC);
                    dta.forEach((d, i) => {
                        d.dist_list = d.dist.split(",");
                        d.coords = d.coords.split(",").map(x => +x);
                        d.c_name = eval(d.c_name)[0];
                        d.s_name = d.sci_name.replace(' ', '');
                        d.length = +d.length;
                        d.age = +d.avg_age;
                        d.img = "/img/data/tortoise_taxonomy/tort_imgs/tort_icons/" + d.s_name + ".jpg";
                        d.h_pos = habitat_counts[d.habitat];
                        habitat_counts[d.habitat] = habitat_counts[d.habitat] + 1;
                    });
                    setTortData(dta);
                    setHabitatCounts(habitat_counts);
                });
        }
        fetchData();
        console.log('tort data state', tortData);
    }, []);

    tortData.forEach((e, i) => { e.index = i });
    // console.log('tortdata', data);

    // console.log('hc', habitat_counts)
    const stats = ['Max Size', 'Max Size vs. Max Age', 'Max Age', 'Habitat vs. Max Size', 'Habitat'];
    const [stat, setStat] = useState(stats[3]);
    // const [showY, setShowY] = useState('hidden');
    let showY;
    // const [tooltipContent, setTooltipContent] = useState('bleh');
    let xStat, yStat, xMeasure, yMeasure, xUnits, yUnits, xLabelValue, yLabelValue;
    let tooltip_content;

    const updateAxes = () => {
        if (stat == "Max Size") {
            xStat = tortData.map(t => t.length);
            yStat = Array.from({ length: xStat.length }, () => Math.floor(Math.random() * 60));
            xMeasure = "Max Size"
            xUnits = "in"
            showY = 'hidden';
            // setShowY('hidden');
        }
        else if (stat == "Max Age") {
            xStat = tortData.map(t => t.age);
            yStat = Array.from({ length: xStat.length }, () => Math.floor(Math.random() * 60));
            xMeasure = "Maximum Age"
            xUnits = "years"
            showY = 'hidden';
            // setShowY('hidden');
        }
        else if (stat == "Max Size vs. Max Age") {
            xStat = tortData.map(t => t.length);
            yStat = tortData.map(t => t.age);
            xMeasure = "Max Size"
            xUnits = "in"
            yMeasure = "Maximum Age"
            yUnits = "years"
            showY = 'visible';
            // setShowY('visible');
        }
        else if (stat == "Habitat vs. Max Size") {
            xStat = tortData.map(t => t.habitat);
            yStat = tortData.map(t => t.length);
            xMeasure = "Habitat"
            xUnits = ""
            yMeasure = "Max Size"
            yUnits = "cm"
            showY = 'visible';
            // setShowY('visbile');
        }
        else {
            xStat = tortData.map(t => t.habitat);
            yStat = tortData.map(t => t.h_pos);
            xMeasure = "Habitat"
            xUnits = ""
            showY = 'hidden';
            // setShowY('hidden');
        }
    }

    const render_s1 = () => {
        console.log('rendering')
        // modify data based on selected stat

        // svg attributes
        const stat_svg = d3.select("#stat-svg1");
        stat_svg
            .style("width", '100%')
            .style("height", config.vh + 'px');

        // update axes, labels, etc.
        updateAxes();

        // set label titles
        if (xMeasure != "Habitat") {
            xLabelValue = xMeasure + ' (' + xUnits + ')';
        }
        else {
            xLabelValue = xMeasure;
        }
        yLabelValue = yMeasure + ' (' + yUnits + ')';

        // tooltip
        const tooltip_s = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        // scales, axes, labels
        let xScale;
        if (xMeasure == "Habitat") {
            xScale = d3.scaleBand()
                .domain(Object.keys(habitatCounts))
                .range([config.inner_vw * 0.1, config.inner_vw * 0.9]);
        }
        else {
            xScale = d3.scaleLinear()
                .domain([0, Math.max(...xStat)])
                .range([config.inner_vw * 0.1, config.inner_vw * 0.9]);
        }

        const yScale = d3.scaleLinear()
            .domain([0, Math.max(...yStat)])
            .range([config.inner_vh, config.inner_vh * 0.1]);

        const xAxis = d3.axisBottom().scale(xScale);
        stat_svg.append('g')
            .attr('class', 'xaxis');
        stat_svg.select('.xaxis')
            .attr('transform', 'translate(0,' + (config.inner_vh + config.node_size / 2) + ')')
            .transition()
            .duration(config.anim_speed / 3)
            .ease(d3.easeCubic)
            .call(xAxis);
        const xLabel = stat_svg.append("text")
            .attr("class", "xlabel");
        stat_svg.select('.xlabel')
            .attr("text-anchor", "middle")
            .attr("x", config.vw / 2)
            .attr("y", config.vh - 10)
            .text(xLabelValue);
        xLabel.exit().remove();

        const yAxis = d3.axisLeft().scale(yScale);
        stat_svg.append('g')
            .attr('class', 'yaxis');
        stat_svg.select('.yaxis')
            .attr('transform', 'translate(' + (config.inner_vw * 0.1) + ',0)')
            .transition()
            .duration(config.anim_speed / 3)
            .ease(d3.easeCubic)
            .style('visibility', showY)
            .call(yAxis);
        const yLabel = stat_svg.append("text")
            .attr("class", "ylabel");
        stat_svg.select('.ylabel')
            .attr("text-anchor", "middle")
            .attr("x", -config.vh / 2)
            .attr("y", 40)
            .attr("transform", "rotate(-90)")
            .style('visibility', showY)
            .text(yLabelValue);
        yLabel.exit().remove();

        // move fn for moving tort nodes to front
        d3.selection.prototype.moveToFront = function () {
            return this.each(function () {
                this.parentNode.appendChild(this);
            });
        };

        // nodes
        const tort_node = stat_svg.selectAll('image')
            .data(tortData, d => d.c_name);
        tort_node
            .enter()
            .append('svg:image')
            .attr('class', 'tort-node')
            .attr('id', d => d.c_name + '-node')
            .attr('x', (d, i) => (xScale(xStat[i]) - config.node_size / 2))
            .attr('y', (d, i) => (yScale(yStat[i]) - config.node_size / 2))
            .attr('width', config.node_size)
            .attr('height', config.node_size)
            .attr('xlink:href', d => {
                return (d.img)
            })
            .on("mouseover", function (event, d) {
                // console.log('d',d);
                tooltip_s.transition()
                    .duration(100)
                    .style("opacity", .8);
                // if (showY == 'visible') {
                //     tooltip_content = (d.c_name + "<br>" + xStat[d.index] + ' ' + xUnits + "<br>" + yStat[d.index] + ' ' + yUnits);
                // }
                // else {
                // console.log('showYnotV', showY);
                tooltip_content = (d.c_name)
                //  + "<br>" + xStat[d.index] + ' ' + xUnits);
                // }
                d3.select(this).moveToFront();
                tooltip_s.html(tooltip_content)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY) + "px");
            })
            .on("mouseout", function (d) {
                tooltip_s.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            .merge(tort_node)
            .transition()
            .delay(function (d, i) {
                return i / tortData.length * config.anim_speed / 3;
            })
            .attr('x', (d, i) => xLabelValue == "Habitat" ?
                xScale(xStat[i]) + xScale.bandwidth() / 2 - config.node_size / 2 :
                xScale(xStat[i]) - config.node_size / 2
            )
            .attr('y', (d, i) => yScale(yStat[i]) - config.node_size / 2)
            .attr('xlink:href', d => d.img)

        // tort_node
        //     .exit()
        //     .transition()
        //     .attr('width', 0)
        //     .attr('height', 0)
        //     .attr("opacity", "0")
        //     .delay(function (d, i) {
        //         return i / data.length * config.anim_speed / 2;
        //     })
        //     .duration(config.anim_speed / 2)
        //     .ease(d3.easeCubic)
        //     .remove()
    };

    // initial render_s1 and when stat changes
    useEffect(() => {
        render_s1();
        // console.log('new stat',stat,'rerendering...')
    }, [tortData, stat]);

    // update tooltip content with stat
    // const onStatClicked = selection => {
    //     setStat(selection)
    // };

    return (
        <>
            <DropdownInputSelect
                label='Stat'
                options={stats}
                initialOption={stat}
                selectedOption={stat}
                setSelectedOption={setStat}
                maxWidth={300}
                color={config.colors[0]}
            // handleChange={e => { onStatClicked(e.target.value) }}
            />
            <svg id="stat-svg1">
            </svg>
        </>
    )
};

export default SVG1;