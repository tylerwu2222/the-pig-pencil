"use client";

import * as d3 from "d3";
import { avg_cubic } from "@/app/components/d3/transitions/Transitions";
import dimensions from "@/app/components/d3/dimensions/Dimensions";

import React, { useState, useEffect, useRef } from "react";
import SliderInputWithUnits from "@/app/components/inputs/SliderInput/SliderInputWithUnits";

type SpeciesNode = {
  id: string;
  population: number;
  ratio: number;
  x: number;
  y: number;
};

// export const avg_cubic = d3.transition().duration(3000).ease(d3.easeCubic);

const DynamicFoodWeb = () => {
  const isMobile = window.innerWidth < 768;

  // initial food web nodes
  // population is static, modify ratio to modify displayed population
  const initialFoodWeb = {
    nodes: [
      {
        id: "Purple Sea Star",
        population: 50,
        ratio: 1,
        x: isMobile ? 100 : 300,
        y: 50,
        color: "purple",
      },
      {
        id: "California Mussel",
        population: 250,
        ratio: 1,
        x: isMobile ? 225 : 600,
        y: isMobile ? 90 : 175,
        color: "grey",
      },
      {
        id: "Algae",
        population: 1000,
        ratio: 1,
        x: isMobile ? 100 : 300,
        y: isMobile ? 175 : 350,
        color: "green",
      },
      {
        id: "Anemone",
        population: 300,
        ratio: 1,
        x: isMobile ? 300 : 700,
        y: isMobile ? 175 : 350,
        color: "orange",
      },
    ],
  };
  // food web links
  const foodWebLinks = [
    { source: "Purple Sea Star", target: "California Mussel" },
    { source: "California Mussel", target: "Algae" },
    { source: "California Mussel", target: "Anemone" },
  ];

  // population states (current and previous)
  const [foodWeb, setFoodWeb] = useState(initialFoodWeb);

  const svgRef = useRef(null); // Ref to the container element

  // Helper function to find node positions by ID
  function getNodePosition(id: string) {
    const node = initialFoodWeb.nodes.find((n) => n.id === id);
    if (node) {
      return { x: node.x, y: node.y };
    }
    return { x: 0, y: 0 };
  }

  const renderWeb = () => {
    const svg = d3.select(svgRef.current);
    svg
      .style(
        "width",
        isMobile ? dimensions.viz_width_m : dimensions.viz_width_d,
      )
      .style(
        "height",
        isMobile ? dimensions.viz_height_m : dimensions.viz_height_d,
      );
    // .style("background", "lightgrey");

    // const rScale = ();

    const populationScale = d3
      .scaleSqrt()
      .domain([0, 1000]) // Input range (e.g., 0 to 1000)
      .range([0, isMobile ? 50 : 100]); // output radius

    // create current population circles
    svg
      .selectAll(".species-node")
      .data(foodWeb.nodes, (d) => (d as SpeciesNode).id)
      .join(
        (enter) =>
          enter
            .append("circle")
            .style("fill-opacity", 0)
            .style("stroke-opacity", 0)
            .attr("class", "species-node")
            .attr("id", (d) => d.id)
            .attr("r", 0)
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            // .attr("stroke", "black")
            .attr("stroke", (d) => d.color)
            .attr("stroke-width", 1)
            .call((enter) =>
              enter
                .transition(avg_cubic())
                .delay((d, i) => i * 1000)
                .attr("r", (d) => populationScale(d.population * d.ratio))
                .style("fill", (d) => d.color)
                .style("fill-opacity", 0.4)
                .style("stroke-opacity", 0.8),
            ),
        (update) =>
          update.call((update) =>
            update
              .transition(avg_cubic())
              .delay((d, i) => i * 1000)
              .attr("r", (d) => populationScale(d.population * d.ratio)),
          ),
        (exit) =>
          exit.call((exit) =>
            exit
              .transition(avg_cubic())
              .delay((d, i) => i * 1000)
              .attr("r", 0)
              .style("opacity", 0)
              .remove(),
          ),
      );

    // add labels with population number
    svg
      .selectAll(".species-label")
      .data(foodWeb.nodes, (d) => (d as SpeciesNode).id)
      .join(
        (enter) =>
          enter
            .append("text")
            .attr("class", "species-label")
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y)
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em") // Center text vertically
            .style("opacity", 0)
            .text(
              (d) => d.id + " (n=" + Math.floor(d.population * d.ratio) + ")",
            )
            .call((enter) => enter.transition(avg_cubic()).style("opacity", 1)),
        (update) =>
          update
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y)
            .text(
              (d) => d.id + " (n=" + Math.floor(d.population * d.ratio) + ")",
            ),
        (exit) =>
          exit.call((exit) =>
            exit.transition(avg_cubic()).style("opacity", 0).remove(),
          ),
      );
    // add slider input

    // create directional arrows
    // define arrow marker
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 10) // Adjust to position arrow at the end of the line
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5") // Arrow shape
      .style("fill", "black");

    // Draw the links
    const centerOffset = 8;
    svg
      .selectAll(".link")
      .data(foodWebLinks)
      .join(
        (enter) =>
          enter
            .append("line")
            .attr("class", "link")
            .attr("x1", (d) => getNodePosition(d.source).x + centerOffset)
            .attr("y1", (d) => getNodePosition(d.source).y + centerOffset)
            .attr("x2", (d) => getNodePosition(d.target).x - centerOffset)
            .attr("y2", (d) => getNodePosition(d.target).y - centerOffset)
            .style("opacity", 0)
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("marker-end", "url(#arrowhead)") // Add arrow at the end
            .call((enter) => enter.transition(avg_cubic()).style("opacity", 1)),
        // (update) =>
        //   update
        //     .attr("x1", (d) => getNodePosition(d.source).x + centerOffset)
        //     .attr("y1", (d) => getNodePosition(d.source).y + centerOffset)
        //     .attr("x2", (d) => getNodePosition(d.target).x - centerOffset)
        //     .attr("y2", (d) => getNodePosition(d.target).y - centerOffset),
        // (exit) => exit.remove(),
      );
  };

  // initial render & rerender when data changes
  useEffect(() => {
    renderWeb();
  }, [foodWeb]);

  // return prey population based on predator population
  // I've successfully implemented a slider to adjust the sea star population. And the star node visually updates. Conceptually, how could I implement a function to update the populations of mussels and algae accordingly, since stars eat mussels, and mussels eat algae. (indicated by the links)
  const updatePrey = (predatorID: string, change: number) => {
    // get prey based on links
    const preyIDs = foodWebLinks
      .filter((l) => l.source == predatorID)
      .map((l) => l.target);
    // const oldRatio = foodWeb.nodes.find((n) => n.id === preyID)?.ratio;

    console.log("prey ids", preyIDs);
    if (preyIDs.length > 0) {
      preyIDs.forEach((id: string) => {
        setFoodWeb((prevFoodWeb) => ({
          ...prevFoodWeb, // Keep the rest of the foodWeb unchanged
          nodes: prevFoodWeb.nodes.map((node) =>
            node.id === id
              ? { ...node, ratio: 1 + change } // Update population for the sea star
              : node,
          ),
        }));
      });
    }
  };

  // helper fn that resets all populations
  const resetWeb = () => {
    setFoodWeb(initialFoodWeb);
  };

  // helper fn that sets the starfish ratio to 0
  const removeStarFish = () => {
    setFoodWeb((prevFoodWeb) => ({
      ...prevFoodWeb, // Keep the rest of the foodWeb unchanged
      nodes: prevFoodWeb.nodes.map((node) =>
        node.id === "Purple Sea Star"
          ? { ...node, ratio: 0 } // Update population for the sea star
          : node,
      ),
    }));
    // determine mussel pop. from sea star pop (increase mussel by decrease in star)
    updatePrey("Purple Sea Star", 1 * 2);
    // determine algae pop. from mussels (decrease algae by decrease in star)
    updatePrey("California Mussel", -1);
  };

  // update sea star population (when slider value changes)
  const updateSeaStarPopulation = (newPercentage: number) => {
    // calculate population
    const newStarRatio = newPercentage * 0.01;

    // determine mussel pop. from sea star pop (increase mussel by decrease in star)
    updatePrey("Purple Sea Star", 2 * (1 - newStarRatio));
    // determine algae pop. from mussels (decrease algae by decrease in star)
    updatePrey("California Mussel", newStarRatio - 1);

    // update new populations
    setFoodWeb((prevFoodWeb) => ({
      ...prevFoodWeb, // Keep the rest of the foodWeb unchanged
      nodes: prevFoodWeb.nodes.map((node) =>
        node.id === "Purple Sea Star"
          ? { ...node, ratio: newStarRatio } // Update population for the sea star
          : node,
      ),
    }));
  };

  return (
    <div className="my-2 h-[90vw] w-full md:h-[85vh]">
      <div className="flex gap-2">
        <button
          onClick={resetWeb}
          className="rounded-sm border-[1px] border-black bg-gray-300 px-1"
        >
          reset populations
        </button>
        <button
          onClick={removeStarFish}
          className="rounded-sm border-[1px] border-black bg-purple-200 px-1"
        >
          chuck the starfish
        </button>
      </div>
      <SliderInputWithUnits
        label={"sea star population"}
        value={foodWeb.nodes[0].ratio * 100}
        onChangeFn={(newPercentage) => {
          updateSeaStarPopulation(newPercentage as number);
        }}
        min={0}
        max={100}
        step={5}
        unit={"%"}
        includeUnitInChange={false}
      />
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default DynamicFoodWeb;
