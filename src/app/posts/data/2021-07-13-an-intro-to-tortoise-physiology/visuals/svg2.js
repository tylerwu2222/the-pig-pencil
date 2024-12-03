'use client'
import * as d3 from "d3";
import { useEffect, useState } from "react";

// components
import { createEphemeralD3Tooltip } from "@/app/components/d3/tooltips/EphemeralTooltip";

// data
import { loadPublicCSV } from "@/app/lib/data_section/loadPublicCSV";

// styles
import { config, cs_key, cs_mapping } from "./config";

const initialCC = {
    'VU': 0,
    'CR': 0,
    'EN': 0,
    'EX': 0,
    'NE': 0,
    'LC': 0,
    'NT': 0
};


const SVG2 = () => {

    const [conservationData, setConservationData] = useState([]);
    let cs_counts = initialCC;

    // load data
    useEffect(() => {
        async function fetchData() {
            loadPublicCSV({ fileName: '2021-07-13-an-intro-to-tortoise-physiology' })
                .then(dta => {
                    dta.forEach((d, i) => {
                        d.dist_list = d.dist.split(",");
                        d.coords = d.coords.split(",").map(x => +x);
                        d.c_name = eval(d.c_name)[0];
                        d.s_name = d.sci_name.replace(' ', '');
                        d.length = +d.length;
                        d.age = +d.avg_age;
                        cs_counts[d.cons_status] = cs_counts[d.cons_status] + 1;
                        d.cs_pos = cs_counts[d.cons_status];
                        d.img = "/img/data/tortoise_taxonomy/tort_imgs/tort_icons/" + d.s_name + ".jpg";
                    });
                    setConservationData(dta);
                });
        }
        fetchData();
    }, []);

    const render_CS = () => {
        console.log('td', conservationData);

        var cs_svg = d3.select("#cons-status-svg");
        cs_svg
            .style("width", config.vw + 'px')
            .style("height", config.vh + 'px');

        // scale and axes
        const xScale = d3.scaleBand()
            .domain(Object.keys(cs_key))
            .range([0, config.inner_vw * 0.9]);
        const xAxis = d3.axisBottom().scale(xScale);
        cs_svg.append("g")
            .attr("transform", "translate(0," + config.inner_vh + ")")
            .call(xAxis);
        const xLabel = cs_svg.append("text")
            .attr("class", "xlabel");
        cs_svg.select('.xlabel')
            .attr("text-anchor", "middle")
            .attr("x", config.inner_vw / 2)
            .attr("y", config.vh - 10)
            .text('Conservation Status');
        const yScale = d3.scaleLinear()
            .domain([0, Math.max(...Object.values(cs_counts))])
            .range([config.inner_vh, 0])

        // tooltip
        // var tooltip_cs = d3.select("body")
        //     .append("div")
        //     .attr("class", "tooltip")
        //     .style("opacity", 0);
        const tooltip_cs = createEphemeralD3Tooltip("tooltip-2", {
            'background-color': "white",
            'padding': "2px",
            'border': "1px solid grey",
            'border-radius': "4px"
        });


        // blocks
        const tort_block = cs_svg.selectAll('image')
            .data(conservationData, d => d.c_name);

        const cs_node_size = config.node_size;
        // const cs_node_size = config.inner_vh / Math.max(...Object.values(cs_counts));
        tort_block
            .enter()
            .append('svg:image')
            .attr('class', 'tort-node')
            .attr('id', d => d.c_name + '-node')
            .attr('x', d => xScale(d.cons_status))
            .attr('y', d => yScale(d.cs_pos))
            .attr("transform", "translate(" + (xScale.bandwidth() / 2 - cs_node_size / 2) + "," + (-cs_node_size) + ")")
            .attr('width', cs_node_size)
            .attr('height', cs_node_size)
            .attr('xlink:href', d => d.img)
            .on("mouseover", function (event, d) {
                tooltip_cs.transition()
                    .duration(200)
                    .style("opacity", .8);
                tooltip_cs.html(d.c_name + ": " + cs_key[d.cons_status])
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY) + "px");
            })
            .on("mouseout", function (d) {
                tooltip_cs.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            .merge(tort_block)
            .transition()
            .delay(function (d, i) {
                return i / conservationData.length * config.anim_speed;
            })
            .attr('x', d => xScale(d.cons_status))
            .attr('xlink:href', d => d.img);

        // legend
        let cs_legend = cs_svg.append('g')
            .attr('class', 'legend');
        cs_legend = cs_legend
            .selectAll('text')
            .data(cs_mapping)
            .enter();
        cs_legend.append('text')
            .attr('x', config.inner_vw * 0.1)
            .attr('y', (d, i) => config.inner_vh * 0.1 + i * cs_node_size)
            .text(d => d.abbr + ': ' + d.full)
            .style("font-size", cs_node_size / 2)
            .style("font-weight", "bold")
            .style("fill", d => d.color)
            .attr("alignment-baseline", "middle")
    };

    // render data
    useEffect(() => {
        render_CS()
    }, [conservationData]);

    return (
        <>
            <svg id="cons-status-svg">
            </svg>
        </>
    )
};

export default SVG2;