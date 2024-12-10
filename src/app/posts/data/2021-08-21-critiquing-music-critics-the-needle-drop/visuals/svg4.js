"use client";
import { useState, useEffect } from "react";
import * as d3 from "d3";

// data
import { loadPublicCSV } from "@/lib/data_section/loadPublicCSV.ts";

// styles
import config from "./config.js";

// components
import SearchInput from "@/app/components/inputs/SearchInput/SearchInput";
import DropdownInputSelect from "@/app/components/inputs/DropdownInput/DropdownInputSelect";
import NumberInput from "@/app/components/inputs/NumberInput/NumberInput";

const parseTime = d3.timeParse("%d-%b-%y");

export default function SVG4() {
  // transformed initial state data variables
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [allArtistStats, setAllArtistStats] = useState([]);

  // displayed data (joined from above 2)
  const [filteredData, setFilteredData] = useState([]);

  // filter states
  const [dataSearchKeyword, setDataSearchKeyword] = useState("");
  const [minNumberReviews, setMinNumberReviews] = useState(1);
  const [numberDisplayedArtists, setNumberDisplayedArtists] = useState(10);
  const [highestFirst, setHighestFirst] = useState(true);

  // const [displayedArtistQuantiles, setDisplayedArtistQuantiles] = useState([]);
  const [displayedArtists, setDisplayedArtists] = useState([]);

  const stats4 = ["Number of reviews", "Median", "Mean", "Variance"];
  const [selectedStat, setSelectedStat] = useState(stats4[0]);

  // initial load data
  useEffect(() => {
    async function fetchData() {
      loadPublicCSV({
        fileName: "2021-08-21-critiquing-music-critics-the-needle-drop",
      }).then((dta) => {
        dta.forEach((d) => {
          d.Year = +d.Year; // year to numeric
          d.Score = +d.Score; // year to numeric
          d.Date = parseTime(d.Date); // format to date
          d.Artists = d.Artists.split("<,>");
          d.Genres = d.Genres.split(",");
        });

        // // group albums by artist:
        let albums_by_artist = [];
        dta.forEach((album, i) => {
          album.Artists.forEach((artist) => {
            let row = { ...dta[i] }; // deep copy
            row.Artist = artist;
            albums_by_artist.push(row);
          });
        });
        // let max_reviews = 0;
        let grouped_by_artist = d3.group(albums_by_artist, (d) => d.Artist);
        // console.log('gba',grouped_by_artist, typeof(grouped_by_artist));
        // convert InternMap to object of arrays
        let artist_albums_dict = Array.from(
          grouped_by_artist,
          ([name, value]) => [name, value],
        );
        artist_albums_dict = Object.fromEntries(artist_albums_dict);
        // console.log('gba, aad', grouped_by_artist, artist_albums_dict);
        setArtistAlbums(artist_albums_dict);

        // calculate stats to sort artist by
        let gba_stats = d3.rollup(
          albums_by_artist,
          (v) => {
            let scores = v.map((g) => g.Score);
            let Q1 = d3.quantile(
              v
                .map((g) => {
                  return g.Score;
                })
                .sort(d3.ascending),
              0.25,
            );
            let median = d3.quantile(
              v
                .map(function (g) {
                  return g.Score;
                })
                .sort(d3.ascending),
              0.5,
            );
            let Q3 = d3.quantile(
              v
                .map(function (g) {
                  return g.Score;
                })
                .sort(d3.ascending),
              0.75,
            );
            let IQR = Q3 - Q1;
            let min0 = d3.min(v.map((g) => g.Score));
            let max0 = d3.max(v.map((g) => g.Score));
            let min = Math.max(Q1 - 1.5 * IQR, d3.min(v.map((g) => g.Score)));
            let max = Math.min(Q3 + 1.5 * IQR, d3.max(v.map((g) => g.Score)));
            let mean = d3.mean(v.map((g) => g.Score));
            let variance = d3.variance(v.map((g) => g.Score));
            let n = v.length;
            // if (n > max_reviews) {
            //     max_reviews = n;
            // }
            let artist = v.map((g) => g.Artist)[0];
            return {
              scores: scores,
              Q1: Q1,
              median: median,
              Q3: Q3,
              IQR: IQR,
              mean: mean,
              var: variance,
              min0: min0,
              max0: max0,
              min: min,
              max: max,
              n: n,
              artist: artist,
            };
          },
          (d) => d.Artist,
        );
        gba_stats = Array.from(gba_stats, ([name, value]) => ({ value })).map(
          (g) => g.value,
        );
        setAllArtistStats(gba_stats);
        // setDisplayedArtistQuantiles(gba_stats.slice(0, 10))
        // console.log('artist album stats', gba_stats);
        // console.log('artist albums', artist_albums_dict);
      });
    }
    fetchData();
  }, []);

  // flatten artist data
  const flatten_artists = (data) => {
    let flat = [];
    data.map((d_outer) =>
      d_outer.map((d_inner) => {
        let row = {};
        row.artist = d_inner.Artist;
        row.album = d_inner.Album;
        row.score = d_inner.Score;
        flat.push(row);
      }),
    );

    // console.log('og data', data, 'flattened data', flat);
    return flat;
  };

  // select subset of data based on inputs
  const filter_join_data = () => {
    // filter for artists with minimum n reviews
    let filteredReviewArtistStats = allArtistStats.filter(
      (a) => a.n >= minNumberReviews,
    );

    // and includes search keyword
    filteredReviewArtistStats = filteredReviewArtistStats.filter((a) =>
      a.artist.includes(dataSearchKeyword),
    );

    // SORT
    // create sortable item
    let sortableArtistAlbums = [];
    if (selectedStat == "Number of reviews") {
      filteredReviewArtistStats.forEach((a) =>
        sortableArtistAlbums.push([a.artist, a.n]),
      );
    } else if (selectedStat == "Median") {
      filteredReviewArtistStats.forEach((a) =>
        sortableArtistAlbums.push([a.artist, a.median]),
      );
    } else if (selectedStat == "Mean") {
      filteredReviewArtistStats.forEach((a) =>
        sortableArtistAlbums.push([a.artist, a.mean]),
      );
    } else if (selectedStat == "Variance") {
      filteredReviewArtistStats.forEach((a) =>
        sortableArtistAlbums.push([a.artist, a.var]),
      );
    }

    // sort artists descending (highest first) or ascending by stat, then select top n
    if (highestFirst) {
      sortableArtistAlbums.sort((a, b) => {
        return b[1] - a[1];
      });
    } else {
      sortableArtistAlbums.sort((a, b) => {
        return a[1] - b[1];
      });
    }

    // FILTER for top n artists
    sortableArtistAlbums = sortableArtistAlbums.slice(
      0,
      numberDisplayedArtists,
    );
    // console.log('sortable artist albums', sortableArtistAlbums);

    // SELECT top n artists from artist albums dict
    const selectedArtists = sortableArtistAlbums.map((a) => {
      return artistAlbums[a[0]];
    });

    // flatten to one array for D3
    const flattened_selected_artists = flatten_artists(selectedArtists);

    return flattened_selected_artists;
  };

  const get_unique_artists = (data) => {
    return [...new Set(data.map((d) => d.artist))];
  };

  // when stat, number displayed, update data
  useEffect(() => {
    const filtered_data = filter_join_data();
    setFilteredData(filtered_data);
    setDisplayedArtists(get_unique_artists(filtered_data));
  }, [
    artistAlbums,
    dataSearchKeyword,
    minNumberReviews,
    numberDisplayedArtists,
    highestFirst,
    selectedStat,
  ]);

  // when data changes, rerender
  useEffect(() => {
    render_s4();
  }, [filteredData]);

  // render artists and album scores
  const render_s4 = () => {
    const t = d3.transition().duration(config.anim_speed).ease(d3.easeCubic);
    let svg4 = d3.select("#stat-svg4");
    svg4.style("width", config.vw + "px").style("height", config.vh + "px");

    // axes + scales
    var xScale = d3
      .scaleBand()
      .range([config.vw - config.inner_vw * 0.95, config.inner_vw])
      .domain(displayedArtists)
      // .domain(displayedArtistQuantiles.map(a => a.artist))
      .paddingInner(1)
      .paddingOuter(0.5);
    const xAxis = d3.axisBottom().scale(xScale);
    svg4.append("g").attr("class", "xaxis");
    svg4
      .select("g.xaxis")
      .attr("transform", "translate(0," + config.small_inner_vh + ")")
      .transition(t)
      .call(xAxis)
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(30)")
      .style("text-anchor", "start");
    const xLabel = svg4.append("text").attr("class", "xlabel");
    svg4
      .select(".xlabel")
      .attr("text-anchor", "left")
      .attr("x", config.vw / 2)
      .attr("y", config.small_vh - 10)
      .text("Artist");

    var yScale = d3
      .scaleLinear()
      .domain([-1, 10])
      .range([
        config.small_inner_vh,
        config.small_vh - config.small_inner_vh * 0.95,
      ]);
    svg4
      .append("g")
      .attr("transform", "translate(" + (config.vw - config.inner_vw) + ",0)")
      .transition(t)
      .call(d3.axisLeft(yScale));
    const yLabel = svg4.append("text").attr("class", "ylabel");
    svg4
      .select(".ylabel")
      .attr("text-anchor", "middle")
      .attr("x", -config.small_vh / 2)
      .attr("y", 20)
      .attr("transform", "rotate(-90)")
      .text("Score");
    // change label size
    d3.selectAll(".xaxis>.tick>text").each(function () {
      d3.select(this).style("font-size", "13px");
    });

    // add points
    svg4
      .selectAll(".artist-score-circle")
      .data(filteredData, (d) => d.artist)
      .join(
        (enter) =>
          enter
            .append("circle")
            .attr("class", "artist-score-circle")
            .attr("artist", (d) => d.artist)
            .attr("r", 5)
            .attr("cx", (d) => xScale(d.artist) + (Math.random() - 1) * 10)
            .attr("cy", (d) => yScale(d.score + (Math.random() - 1) * 0.25))
            .attr("stroke", "black")
            .attr("fill", config.color1)
            .attr("opacity", 0.7)
            .append("svg:title")
            .text((d) => d.album + ": " + d.score),
        (update) =>
          update
            .attr("stroke", "green")
            .attr("artist", (d) => d.artist)
            .attr("r", 5)
            .attr("cx", (d) => xScale(d.artist))
            .attr("cy", (d) => yScale(d.score))
            .attr("stroke", "black")
            .attr("fill", config.color1)
            .attr("opacity", 0.7)
            .append("svg:title")
            .text((d) => d.album + ": " + d.score),
        (exit) =>
          exit
            .attr("stroke", "red")
            .call((exit) =>
              exit.transition().duration(500).style("opacity", 0).remove(),
            ),
      );
  };

  return (
    <>
      <div id="stats-menu4a">
        <SearchInput
          value={dataSearchKeyword}
          onValueChangeFn={(e) => {
            setDataSearchKeyword(e.target.value);
          }}
          placeholder="search artists"
        />
      </div>
      <div id="stats-menu4b" style={{ display: "flex" }}>
        <NumberInput
          label="minimum number of reviews"
          min={1}
          max={12}
          value={minNumberReviews}
          // setValue={setMinNumberReviews}
          onChange={(n) => {
            setMinNumberReviews(n);
          }}
        />
        <NumberInput
          label="number of artists"
          min={10}
          max={30}
          stepSize={5}
          value={numberDisplayedArtists}
          // setValue={setNumberDisplayedArtists}
          onChange={(n) => {
            setNumberDisplayedArtists(n);
          }}
        />
        <DropdownInputSelect
          label={"Sort by"}
          options={stats4}
          // initialOption={selectedStat}
          value={selectedStat}
          // setSelectedOption={setSelectedStat}
          onChange={(s)=>{setSelectedStat(s)}}
        />
      </div>

      <svg id="stat-svg4"></svg>
      {/* <svg ref={svgRef}>
            </svg> */}
    </>
  );
}
