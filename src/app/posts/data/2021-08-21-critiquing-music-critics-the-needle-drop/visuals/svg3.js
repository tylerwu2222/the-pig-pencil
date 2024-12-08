'use client'
import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

import { loadPublicCSV } from "@/lib/data_section/loadPublicCSV.js";

// components
import config from "./config.js";
import CheckboxGroup from "@/app/components/inputs/CheckboxGroup/CheckboxGroup.tsx";
// import CheckboxGroup from "../../../../components/Modules/CheckboxGroup/CheckboxGroup.js";
import DropdownInputSelect from "@/app/components/inputs/DropdownInput/DropdownInputSelect.tsx";

// Things I need to modularize
const parseTime = d3.timeParse("%d-%b-%y");

const cb_genres = [
    'pop', 'hip hop', 'r&b', 'funk', 'soul', 'jazz',
    'electronic', 'dance', 'house', 'techno',
    'rock', 'punk', 'metal',
    'psychedelic', 'ambient', 'experimental',
    'singer-songwriter', 'folk', 'country'
]
const cb_graphs = ['boxplots', 'individual points'];
const boxWidth = 20; // width of boxplots
const jitterWidth = 10; // jitter of individual points

const SVG3 = () => {
    // console.log('SVG3 data',data);

    // transformed initial state data variables 
    const [allQuantiles, setAllQuantiles] = useState([]);
    const [albumsByGenre, setAlbumsByGenre] = useState([]);

    // data state variables
    const [checkedGenres, setCheckedGenres] = useState(cb_genres);
    const [checkedCheckboxes, setCheckedCheckBoxes] = useState(new Array(checkedGenres.length).fill(true));
    const [checkedGraphs, setCheckedGraphs] = useState(cb_graphs[0]); // temporarily just boxplots
    const [checkedGraphCheckboxes, setCheckedGraphCheckBoxes] = useState([true, true]); // temporarily just boxplots
    // const [selectedQuantiles, setSelectedQuantiles] = useState([]);

    const [filteredQuantiles, setFilteredQuantiles] = useState([]);
    const [filteredData, setFilteredData] = useState([]);


    const svg3Ref = useRef(null); // Ref to the container element

    // stat parameters
    const stats3 = ['Number of reviews', 'Median', 'Mean', "Variance"];
    const [selectedStat, setSelectedStat] = useState(stats3[0]);

    // load data
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
                    // group albums by genre (1 row per genre)
                    let albums_by_genre = [];
                    dta.forEach((album, i) => {
                        album.Genres.forEach((genre) => {
                            let row = { ...dta[i] }; // deep copy
                            row.Genre = genre;
                            albums_by_genre.push(row);
                        });
                    });
                    let grouped_by_genre = d3.group(albums_by_genre, d => d.Genre);
                    // convert InternMap to object of arrays
                    let genre_albums_dict = Array.from(grouped_by_genre, ([name, value]) => [name, value]);
                    genre_albums_dict = Object.fromEntries(genre_albums_dict);
                    delete genre_albums_dict[''];
                    setAlbumsByGenre(genre_albums_dict);

                    let gbg_quantiles = d3.rollup(albums_by_genre, v => {
                        let Q1 = d3.quantile(v.map(g => { return g.Score; }).sort(d3.ascending), .25);
                        let median = d3.quantile(v.map(function (g) { return g.Score; }).sort(d3.ascending), .5);
                        let Q3 = d3.quantile(v.map(function (g) { return g.Score; }).sort(d3.ascending), .75);
                        let IQR = Q3 - Q1;
                        let min0 = d3.min(v.map(g => g.Score));
                        let max0 = d3.max(v.map(g => g.Score));
                        let min = Math.max(Q1 - 1.5 * IQR, d3.min(v.map(g => g.Score)));
                        let max = Math.min(Q3 + 1.5 * IQR, d3.max(v.map(g => g.Score)));
                        let mean = d3.mean(v.map(g => g.Score));
                        let variance = d3.variance(v.map(g => g.Score))
                        let n = v.length;
                        let genre = v.map(g => g.Genre)[0];
                        return ({ Q1: Q1, median: median, Q3: Q3, IQR: IQR, mean: mean, var: variance, min0: min0, max0: max0, min: min, max: max, n: n, genre: genre })
                    }, d => d.Genre);
                    gbg_quantiles.delete('');
                    gbg_quantiles = Array.from(gbg_quantiles, ([name, value]) => ({ value })).map(g => g.value);
                    // console.log('TNDGBG',typeof gbg_quantiles,gbg_quantiles);
                    setAllQuantiles(gbg_quantiles)
                    // setSelectedQuantiles(gbg_quantiles);
                    console.log('all quantiles', gbg_quantiles)
                }
                );
        }
        fetchData();
        return undefined;
    }, []);

    // 
    // render svg3 based on state variables
    const render_s3 = () => {
        // if (!svg3Ref.current) return;
        const t = d3.transition().duration(config.anim_speed).ease(d3.easeCubic);

        let svg3 = d3.select(svg3Ref.current);
        svg3
            .style("width", config.vw + 'px')
            .style("height", config.vh + 'px');

        // console.log('albumsbyGenre', albumsByGenre);
        // console.log('selectedQuantiles', selectedQuantiles);

        // axes + scales
        const xScale = d3.scaleBand()
            .range([(config.vw - config.inner_vw * 0.95), config.inner_vw])
            .domain(checkedGenres)
            .paddingInner(1)
            .paddingOuter(.5)
        const xAxis = d3.axisBottom().scale(xScale);
        svg3.append("g").attr('class', 'xaxis');
        svg3.select('g.xaxis')
            .attr("transform", "translate(0," + config.small_inner_vh + ")")
            .transition(t)
            .call(xAxis).selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(30)")
            .style("text-anchor", "start");
        const xLabel = svg3.append("text")
            .attr("class", "xlabel");
        svg3.select('.xlabel')
            .attr("text-anchor", "left")
            .attr("x", config.vw / 2)
            .attr("y", config.small_vh - 10)
            .text('Genre');
        const yScale = d3.scaleLinear()
            .domain([-1, 10])
            .range([config.small_inner_vh, (config.small_vh - config.small_inner_vh * 0.95)])
        svg3.append("g")
            .attr("transform", "translate(" + (config.vw - config.inner_vw) + ",0)")
            .transition(t)
            .call(d3.axisLeft(yScale))
        const yLabel = svg3.append("text")
            .attr("class", "ylabel");
        svg3.select('.ylabel')
            .attr("text-anchor", "middle")
            .attr("x", -config.small_vh / 2)
            .attr("y", 20)
            .attr("transform", "rotate(-90)")
            .text('Score');
        // change label size
        d3.selectAll(".xaxis>.tick>text")
            .each(function (d, i) {
                d3.select(this).style("font-size", "13px");
            });

        // add boxplots
        // vertical lines
        svg3
            .selectAll('.boxplot-vert')
            .data(filteredQuantiles, d => d.genre)
            .join(
                enter =>
                    enter.append('line')
                        .attr("class", "boxplot-vert")
                        // .attr('stroke', 'green')
                        .attr('genre', d => d.genre)
                        .attr("x1", d => xScale(d.genre))
                        .attr("x2", d => xScale(d.genre))
                        .attr("y1", d => yScale(d.min))
                        .attr("y2", d => yScale(d.min))
                        .call(enter => enter.transition(t)
                            .attr("x1", d => xScale(d.genre))
                            .attr("x2", d => xScale(d.genre))
                            .attr("y2", d => yScale(d.max))
                            .attr("stroke", "black")
                            .style("width", 40)
                        )
                ,
                update => update
                    .attr("class", "boxplot-vert")
                    .attr('genre', d => d.genre)
                    // .attr('stroke', 'green')
                    .call(update => update.transition(t)
                        .attr("y1", d => yScale(d.min))
                        .attr("y2", d => yScale(d.max))
                        .attr("x1", d => xScale(d.genre))
                        .attr("x2", d => xScale(d.genre))
                        .attr('stroke', 'black')
                    )
                ,
                exit => exit
                    .attr("class", "boxplot-vert")
                    .attr('genre', d => d.genre)
                    .call(exit => exit.transition().duration(500)
                        .style("opacity", 0)
                        .remove()
                    )
            );
        // quantile box
        svg3
            .selectAll('.boxplot-box')
            .data(filteredQuantiles, d => d.genre)
            .join(
                enter => {
                    enter.append('rect')
                        .attr("class", "boxplot-box")
                        .attr('genre', d => d.genre)
                        .attr("x", d => xScale(d.genre) - boxWidth / 2)
                        .attr("y", d => yScale(d.Q1))
                        .attr("width", boxWidth)
                        .attr("height", 0)
                        .style("fill", config.color1)
                        .call(enter => enter.transition(t)
                            .attr("height", d => yScale(d.Q1) - yScale(d.Q3))
                            .attr("y", d => yScale(d.Q3))
                            .attr("stroke", "black")
                        )

                },
                update => update
                    .attr("class", "boxplot-box")
                    .attr('genre', d => d.genre)
                    // .attr('stroke', 'green')
                    .call(update => update.transition(t)
                        .attr("x", d => xScale(d.genre) - boxWidth / 2)
                        .attr("y", d => yScale(d.Q3))
                        .attr("width", boxWidth)
                        .attr("height", d => yScale(d.Q1) - yScale(d.Q3))
                        .attr("stroke", "black")
                        .style("fill", config.color1)
                    ),
                exit => exit
                    .attr("class", "boxplot-box")
                    .attr('genre', d => d.genre)
                    // .attr('stroke', 'red')
                    .call(exit => exit.transition().duration(500)
                        .style("opacity", 0)
                        .remove()
                    )
            );
        // horizontal median line
        svg3
            .selectAll('.boxplot-median')
            .data(filteredQuantiles, d => d.genre)
            .join(
                enter => {
                    enter.append('line')
                        .attr("class", "boxplot-median")
                        .attr('genre', d => d.genre)
                        .attr("x1", d => xScale(d.genre))
                        .attr("x2", d => xScale(d.genre))
                        .attr("y1", d => yScale(d.Q1))
                        .attr("y2", d => yScale(d.Q1))
                        .attr("stroke", "black")
                        .call(enter => enter.transition(t)
                            .attr("x1", d => xScale(d.genre) - boxWidth / 2)
                            .attr("x2", d => xScale(d.genre) + boxWidth / 2)
                            .attr("y1", d => yScale(d.median))
                            .attr("y2", d => yScale(d.median))
                        )
                },
                update => update
                    .attr("class", "boxplot-median")
                    .attr('genre', d => d.genre)
                    .call(update => update.transition(t)
                        .attr("x1", d => xScale(d.genre) - boxWidth / 2)
                        .attr("x2", d => xScale(d.genre) + boxWidth / 2)
                        .attr("y1", d => yScale(d.median))
                        .attr("y2", d => yScale(d.median))
                        .attr("stroke", "black")
                    ),
                exit => exit
                    // .attr('stroke', 'red')
                    .call(exit => exit.transition().duration(500)
                        .style("opacity", 0)
                        .remove()
                    )
            );

        // hide or show boxplots
        if (!checkedGraphs.includes('boxplots')) {
            // hide boxplots
            svg3.selectAll(".boxplot-vert")
                .style("visibility", "hidden");
            svg3.selectAll(".boxplot-box")
                .style("visibility", "hidden");
            svg3.selectAll(".boxplot-median")
                .style("visibility", "hidden");
        }
        else {
            svg3.selectAll(".boxplot-vert")
                .style("visibility", "visible");
            svg3.selectAll(".boxplot-box")
                .style("visibility", "visible");
            svg3.selectAll(".boxplot-median")
                .style("visibility", "visible");
        }

        // indiv points
        // svg3
        //     .selectAll("circle")
        //     .data(filteredData, d => {
        //         return (d.Artists[0] + d.Album + d.Genre)
        //     })
        //     .join(
        //         enter => enter.append("circle")
        //             .style('opacity', 0)
        //             .attr("class", "boxplot-points-genre")
        //             .attr("id", d => d.Artists[0] + d.Album)
        //             .attr("r", 0)
        //             .attr("cx", d => { return (xScale(d.Genre) - jitterWidth / 2 + Math.random() * jitterWidth) })
        //             .attr("cy", d => { return (yScale(d.Score) - jitterWidth / 2 + Math.random() * jitterWidth) })
        //             .attr("stroke", "black")
        //             .attr("stroke-width", 0.5)
        //             .call(enter => enter.transition(t)
        //                 .attr("r", 3)
        //                 .style("fill", config.color1)
        //                 .style("opacity", 0.2)
        //             )
        //         ,
        //         update => update
        //             .call(update => update.transition(t)
        //                 .attr("r", 3)
        //                 .style("fill", config.color1)
        //                 .style("opacity", 0.2)
        //                 .attr("cx", d => { return (xScale(d.Genre) - jitterWidth / 2 + Math.random() * jitterWidth) })
        //                 .attr("cy", d => { return (yScale(d.Score) - jitterWidth / 2 + Math.random() * jitterWidth) })
        //                 .attr("stroke", "black")
        //                 .attr("stroke-width", 0.5)
        //             )
        //         ,
        //         exit => exit
        //             .call(exit => exit.transition(t)
        //                 .attr('r', 0)
        //                 .style('opacity', 0)
        //                 .remove()
        //             )
        //     )
        // if (!checkedGraphs.includes('individual points')) {
        //     svg3.selectAll(".boxplot-points-genre")
        //         .style("visibility", "hidden");
        // }
        // else {
        //     svg3.selectAll(".boxplot-points-genre")
        //         .style("visibility", "visible");
        // }
    };


    const filter_quantiles = (checked_genres) => {
        // console.log('checked genres', checked_genres);
        // filter for genres in checkboxes
        const filtered_quantiles = allQuantiles.filter(a => checked_genres.includes(a.genre));
        return filtered_quantiles
    };

    const flatten_data = (data) => {
        return Object.entries(data).flatMap(([genre, items]) =>
            items.map(item => ({ ...item, genre }))
        );
    };

    const filter_data = (checked_genres) => {
        // select checked genres from albums by genre
        const filtered_genre_dict = Object.fromEntries(
            Object.entries(albumsByGenre).filter(([key]) => checked_genres.includes(key))
        );

        const flattened_data = flatten_data(filtered_genre_dict);
        // console.log('FGD',filtered_genre_dict);
        // console.log('FLAT',flatten_data);
        return flattened_data;
    };

    const sort_genres = (data) => {
        // sort genre based on stat
        let sortableGenres = [];
        // if (selectedStat == "Number of reviews") {
        if (selectedStat == "Number of reviews") {
            // selectedQuantiles.forEach()
            data.forEach(g =>
                sortableGenres.push([g.genre, g.n])
            );
        }
        else if (selectedStat == 'Median') {
            data.forEach(g =>
                sortableGenres.push([g.genre, g.median])
            );
        }
        else if (selectedStat == 'Mean') {
            data.forEach(g =>
                sortableGenres.push([g.genre, g.mean])
            );
        }
        else if (selectedStat == 'Variance') {
            data.forEach(g =>
                sortableGenres.push([g.genre, g.var])
            );
        }
        sortableGenres.sort(function (a, b) {
            return b[1] - a[1]; // descending
        });
        sortableGenres = sortableGenres.map(a => a[0])
        return sortableGenres
    }

    // update data when any filters changed
    useEffect(() => {
        if (allQuantiles) {
            // 1) filter and sort data based on checked genres
            let checked_genres = cb_genres.filter((g, i) => checkedCheckboxes[i]);
            const filtered_quantiles = filter_quantiles(checked_genres);
            const filtered_data = filter_data(checked_genres);
            // 2) get sorted genres from new data
            const sorted_genres = sort_genres(filtered_quantiles);

            // data and axes (for sorting)
            setFilteredQuantiles(filtered_quantiles);
            setFilteredData(filtered_data);
            setCheckedGenres(sorted_genres);
        }
    }, [allQuantiles, albumsByGenre, checkedCheckboxes, selectedStat]);

    // rerender when data or selected stat changes (triggered by above)
    useEffect(() => {
        render_s3();
    }, [allQuantiles, albumsByGenre, svg3Ref.current, filteredQuantiles]);


    const selectAllGenres = () => {
        setCheckedCheckBoxes(new Array(cb_genres.length).fill(true));
    };

    const deselectAllGenres = () => {
        setCheckedCheckBoxes(new Array(cb_genres.length).fill(false));
    };

    return (
        <>
            <h4 className="sub-header">Selected Genres:</h4>
            <div id="stats-menu3a" style={{ display: 'inline' }}>
                <CheckboxGroup
                    labels={cb_genres}
                    checked={checkedCheckboxes}
                    updateChecked={setCheckedCheckBoxes}
                    fillColor={`bg-yellow-200`}
                />
                <input
                    id="select-all-btn"
                    className="btn-type1"
                    type="button"
                    value="Select All"
                    onClick={selectAllGenres} />
                <input
                    id="deselect-all-btn"
                    className="btn-type1"
                    type="button"
                    value="Deselect All"
                    onClick={deselectAllGenres}
                />
            </div>
            <h4 className="sub-header">Graph Components:</h4>
            <div id="stats-menu3b" >
                <CheckboxGroup
                    labels={cb_graphs}
                    checked={checkedGraphCheckboxes}
                    updateChecked={setCheckedGraphCheckBoxes}
                    fillColor={`bg-yellow-200`}
                />
                <DropdownInputSelect
                    // handleChange={e => { setSelectedStat(e.target.value) }} 
                    label={'Sort by'}
                    options={stats3}
                    initialOption={selectedStat}
                    selectedOption={selectedStat}
                    setSelectedOption={setSelectedStat}
                />
            </div>
            <svg ref={svg3Ref}>
            </svg>
        </>
    )
};

export default SVG3;