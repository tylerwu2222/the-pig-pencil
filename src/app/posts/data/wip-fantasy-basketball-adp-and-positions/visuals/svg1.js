import * as d3 from "d3";
import { useEffect, useState } from "react";

import Slider from '@mui/material/Slider';
import { Box } from "@mui/material";

import config_builder from "../../config_builder";
import '../../config_builder.css'

const SVG1 = ({ data, colors }) => {

    const avg_pick_array = data.map(d => d.average_pick);
    console.log('pick_array', avg_pick_array)

    const [xAxisRange, setXAxisRange] = useState([Math.min(...avg_pick_array) - 1, Math.max(...avg_pick_array)]);
    const config = config_builder();

    console.log('data', data);
    // console.log('colors', colors);
    console.log('config', config);

    // initial render & rerender each time x axis is adjusted
    useEffect(() => {
        render_s1();
    }, [xAxisRange]);

    const handleXAxisChange = (event, newValue) => {
        setXAxisRange(newValue)
    };

    // renders vertical line for average pick
    const render_s1 = () => {
        const t = d3.transition().duration(config.anim_speed).ease(d3.easeCubic);
        let svg1 = d3.select("#adp-svg1");
        svg1
            .style("width", config.total_w + 'px')
            .style("height", config.total_h + 'px');


        // x    
        // scale     
        let xScale = d3.scaleLinear()
            .domain(xAxisRange) // dynamically changes with slider
            .range([config.x_axis_start, config.x_axis_end]);
        // axis  
        const xAxis = d3.axisBottom()
            .scale(xScale)
            .tickSize(-(config.inner_h)) // creates grid lines
            .ticks(20);
        svg1.append("g").attr('class', 'xaxis');
        svg1.select('g.xaxis')
            .attr("transform", "translate(0," + (config.inner_h + config.padding_v / 2) + ")")
            // .transition(t)
            .call(xAxis);
        // label
        const xLabel = svg1.append("text")
            .attr("class", "xlabel");
        svg1.select('.xlabel')
            .attr("text-anchor", "left")
            .attr("x", config.total_w / 2)
            .attr("y", config.total_h - 10)
            .text('ADP (Average Draft Position)');


        // y
        let yScale = d3.scaleLinear()
            .domain([0, 10])
            .range([config.y_axis_end, config.y_axis_start]);
        // axis
        const yAxis = d3.axisLeft()
            .scale(yScale)
            .tickSize(-config.inner_w); // creates grid lines;
        svg1.append("g").attr('class', 'yaxis');
        svg1.select('g.yaxis')
            .attr("transform", "translate(" + (config.padding_h / 2) + ", 0)")
            .call(yAxis);
        // label
        const yLabel = svg1.append("text")
            .attr("class", "ylabel");
        svg1.select('.ylabel')
            .attr("text-anchor", "middle")
            .attr("x", (-config.total_h / 2))
            .attr("y", 20)
            .attr("transform", "rotate(-90)")
            .text('Frequency');

        // add bars
        svg1.selectAll("rect")
            .data(data, d => d.player)
            .join(
                enter => enter.append("rect")
                    .call(enter => enter
                        .attr("player", d => d.player)
                        .attr("fill", (d, i) => colors[i % 10])
                        .attr("opacity", 0.5)
                        .attr("x", d => xScale(d.average_pick))
                        .attr("y", d => yScale(0))
                        .attr("width", 2)
                        .attr("height", d => yScale(11) + config.padding_h / 2)
                        .transition(t)
                        .attr("y", d => yScale(d.num_picks))
                        .attr("width", 3)
                        .attr("height", d => yScale(11 - d.num_picks) + config.padding_h / 2)
                    ),
                update => update
                    .call(update => update.transition(t)
                        .attr("fill", (d, i) => colors[i % 10])
                        .attr("opacity", 0.5)
                        .attr("x", d => xScale(d.average_pick))
                        .attr("y", d => yScale(d.num_picks))
                        .attr("width", 3)
                        // .attr("height", d => yScale(d.num_picks) + config.padding_h / 2)
                        .attr("height", d => yScale(11 - d.num_picks) + config.padding_h / 2)
                    ),
                exit => exit
                    .call(exit => exit.transition()
                        .attr('height', 0)
                        .attr('y', config.inner_h)
                        .remove())
            );

        // add legend
    };

    // renders pick distributions
    return (
        <>
            {/* color toggle */}
            <label htmlFor="positionColor">Color by position</label>
            <input type="checkbox" name="positionColor"></input>

            <svg id="adp-svg1">
            </svg>

            {/* x-axis adjuster */}
            <Box>
                <Slider
                    getAriaLabel={() => 'Pick Range'}
                    value={xAxisRange}
                    min={0}
                    max={220}
                    onChange={handleXAxisChange}
                    valueLabelDisplay="auto"
                // getAriaValueText={valuetext}
                />
            </Box>
        </>
    )
};

export default SVG1;