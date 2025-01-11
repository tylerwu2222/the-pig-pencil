"use client";

import * as d3 from "d3";
import { duration_cubic } from "@/app/components/d3/transitions/Transitions";
import dimensions from "@/app/components/d3/dimensions/Dimensions";

// helpers
import { addJitter, bernoulli } from "@/lib/data_section/mathFunctions";

import PlaybackSlider from "@/app/components/inputs/SliderInput/PlaybackSlider";

import React, { useState, useEffect, useRef } from "react";

type BirdNode = {
  species: string;
  emoji: string;
  x: number;
  y: number;
  id: string;
};

const CompetitiveExclusion = () => {
  const isMobile = window.innerWidth < 768;
  const svgExtinctionRef = useRef(null); // Ref to the container element
  const svgAdaptationRef = useRef(null); // Ref to the container element

  // vis. config constants
  const birdStepSize = 0.75;
  const birdDuration = 4.5;
  const birdPopulationSize = 20;
  const initialCentroid = { x: 200, y: 150 };
  const targetCentroid = { x: 200, y: 350 };
  const jitter = 60; // Define the jitter range
  const startingNicheColor = "#748dc0";
  const startingNicheTextColor = "#44639f";
  const endingNicheColor = "#e64f57";
  const endingNicheTextColor = "#c91a25";

  // generates initial data
  const generateBirdNodes = (
    numBirds: number,
    centroid: { x: number; y: number },
    species: string,
    emoji: string,
  ) => {
    const nodes = [];
    for (let i = 0; i < numBirds; i++) {
      const x = centroid.x + addJitter(jitter); // Random x position with jitter
      const y = centroid.y + addJitter(jitter); // Random y position with jitter
      nodes.push({ species, emoji, x, y, id: species + "-" + String(i) });
    }
    return nodes;
  };
  const dominantBirdNodes = generateBirdNodes(
    birdPopulationSize,
    initialCentroid,
    "dominant",
    "🐦‍⬛",
  );
  const recedingBirdNodes = generateBirdNodes(
    birdPopulationSize,
    initialCentroid,
    "receding",
    "🐦",
  );

  // initial data
  const initialBirdNodes = [...dominantBirdNodes, ...recedingBirdNodes];

  //   states for extinction demonstration
  const [birdsExtinctionProgress, setBirdsExtinctionProgress] =
    useState<number>(0);
  const [birdsExtinctionPlaying, setBirdsExtinctionPlaying] =
    useState<boolean>(false);
  const [birdsExtinctionNodes, setBirdsExtinctionNodes] =
    useState<BirdNode[]>(initialBirdNodes);

  // states for adaptation demonstration
  const [birdsAdaptationProgress, setBirdsAdaptationProgress] =
    useState<number>(0);
  const [birdsAdaptationPlaying, setBirdsAdaptationPlaying] =
    useState<boolean>(false);
  const [birdsAdaptationNodes, setBirdsAdaptationNodes] =
    useState<BirdNode[]>(initialBirdNodes);

  const renderExtinction = () => {
    // get svg
    const svg = d3.select(svgExtinctionRef.current);
    svg
      .style("width", isMobile ? dimensions.viz_width_m : "28vw")
      .style("height", isMobile ? "60vh" : "500px");
    // add circle around starting niche
    svg
      .selectAll(".starting-niche-ext")
      .data([1])
      .join("circle")
      .attr("class", "starting-niche-ext")
      .attr("r", jitter)
      .attr("cx", initialCentroid.x)
      .attr("cy", initialCentroid.y)
      .attr("fill", startingNicheColor)
      .attr("stroke", startingNicheColor)
      .attr("fill-opacity", 0.3);
    svg
      .selectAll(".starting-niche-text-adapt")
      .data([1])
      .join("text")
      .style("font-size", "15px")
      .attr("class", "starting-niche-text-adapt")
      .attr("x", initialCentroid.x - (jitter + 20))
      .attr("text-anchor", "end")
      .attr("y", initialCentroid.y)
      .attr("fill", startingNicheTextColor)
      .text("original niche");
    // add bird emojis as nodes
    svg
      .selectAll(".bird-label-ext")
      .data(birdsExtinctionNodes, (d) => (d as BirdNode).id)
      .join(
        (enter) =>
          enter
            .append("text")
            .attr("class", "bird-label-ext")
            .attr("id", (d) => d.id)
            .text((d) => d.emoji)
            // .style("font-size", "20px")
            // .transition(duration_cubic(500))
            .style("font-size", "25px")
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y),
        (update) =>
          update
            .transition(duration_cubic(500))
            .style("font-size", "25px")
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y),
        (exit) =>
          exit
            .transition(duration_cubic(500))
            .delay((d, i) => i * 10)
            .style("font-size", "0px")
            .text("☠️")
            .remove(),
      );
  };

  const renderAdaptation = () => {
    // get svg
    const svg = d3.select(svgAdaptationRef.current);
    svg
      .style("width", isMobile ? dimensions.viz_width_m : "28vw")
      .style("height", isMobile ? "80vh" : "500px");
    // add circle around starting niche
    svg
      .selectAll(".starting-niche-adapt")
      .data([1])
      .join("circle")
      .attr("class", "starting-niche-adapt")
      .attr("r", jitter)
      .attr("cx", initialCentroid.x)
      .attr("cy", initialCentroid.y)
      .attr("fill", startingNicheColor)
      .attr("stroke", startingNicheColor)
      .attr("fill-opacity", 0.3);
    svg
      .selectAll(".starting-niche-text-adapt")
      .data([1])
      .join("text")
      .style("font-size", "15px")
      .attr("class", "starting-niche-text-adapt")
      .attr("x", initialCentroid.x - (jitter + 20))
      .attr("text-anchor", "end")
      .attr("y", initialCentroid.y)
      .attr("fill", startingNicheTextColor)
      .text("original niche");

    // add circle for new niche (if progress reached end)
    svg
      .selectAll(".ending-niche-adapt")
      .data([1])
      .join("circle")
      .attr("class", "ending-niche-adapt")
      .attr("r", jitter)
      .attr("cx", targetCentroid.x)
      .attr("cy", targetCentroid.y)
      .attr("fill", endingNicheColor)
      .attr("stroke", endingNicheColor)
      .transition(duration_cubic(500))
      .attr("fill-opacity", (birdsAdaptationProgress / birdDuration) * 0.3)
      .attr("stroke-opacity", birdsAdaptationProgress / birdDuration);
    svg
      .selectAll(".ending-niche-text-adapt")
      .data([1])
      .join("text")
      .style("font-size", "15px")
      .attr("class", "ending-niche-text-adapt")
      .attr("x", targetCentroid.x - (jitter + 20))
      .attr("text-anchor", "end")
      .attr("y", targetCentroid.y)
      .attr("fill", endingNicheTextColor)
      .text("new niche")
      .transition(duration_cubic(500))
      .attr("fill-opacity", birdsAdaptationProgress / birdDuration);

    // add bird emojis as nodes
    svg
      .selectAll(".bird-label-adapt")
      .data(birdsAdaptationNodes, (d) => (d as BirdNode).id)
      .join(
        (enter) =>
          enter
            .append("text")
            .attr("class", "bird-label-adapt")
            .attr("id", (d) => d.id)
            .text((d) => d.emoji)
            .style("font-size", "20px")
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y),
        (update) =>
          update
            .transition(duration_cubic(500))
            .style("font-size", "25px")
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y),
      );
  };

  // initial render & rerender when data changes
  useEffect(() => {
    console.log("re-rendering ext. birds");
    renderExtinction();
  }, [birdsExtinctionNodes]);

  //   initial adaptation render and when bird nodes change
  useEffect(() => {
    renderAdaptation();
  }, [birdsAdaptationNodes]);

  // update bird emoji when extinction progress changes
  const updateBirdsExtinctionNodes = () => {
    const jitter = 40;
    // update dying birds
    // first remove dead
    const removeDead = birdsExtinctionNodes.filter(
      (bird) => bird.emoji !== "☠️",
    );
    const newBirds = removeDead.map((bird) => {
      const progressFactor = birdsExtinctionProgress / birdDuration; // Normalize to [0, 1]
      // use initial coords as reference when shifting (to preserve jitter)
      if (bird.species === "receding") {
        // survival boolean will be 0 on final step
        const survived = bernoulli(1 - progressFactor);
        if (!survived) {
          return { ...bird, emoji: "☠️" };
        }
        return bird;
      } else {
        const newX = bird.x + progressFactor * addJitter(jitter);
        const newY = bird.y + progressFactor * addJitter(jitter);
        return { ...bird, x: newX, y: newY }; // Dominant birds remain unchanged
      }
    });

    setBirdsExtinctionNodes(newBirds);
  };
  const resetBirdsExtinctionNodes = () => {
    setBirdsExtinctionNodes(initialBirdNodes);
  };
  const extinctionEvent = () => {
    const domOnly = birdsExtinctionNodes.filter(
      (bird) => bird.species === "dominant",
    );
    setBirdsExtinctionNodes(domOnly);
  };

  useEffect(() => {
    if (birdsExtinctionProgress == 0) {
      resetBirdsExtinctionNodes();
    } else if (
      birdsExtinctionProgress > 0 &&
      birdsExtinctionProgress < birdDuration
    ) {
      updateBirdsExtinctionNodes();
    } else if (birdsExtinctionProgress === birdDuration) {
      extinctionEvent();
    }
  }, [birdsExtinctionProgress]);

  // update bird position when adaptation progress changes
  const updateBirdsAdaptationNodes = () => {
    const jitter = 60;
    // update receding birds
    const newBirds = initialBirdNodes.map((bird) => {
      const progressFactor = birdsAdaptationProgress / birdDuration; // Normalize to [0, 1]
      // use initial coords as reference when shifting (to preserve jitter)
      if (bird.species === "receding") {
        const newX =
          bird.x + progressFactor * (targetCentroid.x - initialCentroid.x);
        const newY =
          bird.y + progressFactor * (targetCentroid.y - initialCentroid.y);
        return { ...bird, x: newX, y: newY };
      } else {
        const newX = bird.x + progressFactor * addJitter(jitter);
        const newY = bird.y + progressFactor * addJitter(jitter);
        return { ...bird, x: newX, y: newY }; // Dominant birds remain unchanged
      }
    });

    setBirdsAdaptationNodes(newBirds);
  };
  useEffect(() => {
    if (
      birdsAdaptationProgress >= 0 &&
      birdsAdaptationProgress <= birdDuration
    ) {
      updateBirdsAdaptationNodes();
    }
  }, [birdsAdaptationProgress]);

  return (
    <div className="my-2 grid h-[180vh] sm:h-[80vh] w-full grid-cols-1 grid-rows-2 gap-8 sm:gap-2 sm:grid-cols-2 sm:grid-rows-1 ">
      {/* adaptation event*/}
      <div className="flex flex-col border-[1px] border-black p-3">
        <p className="my-1 font-bold">Adaptation</p>
        <p className="my-1 text-sm">
          The 🐦‍⬛ bird out-competes the 🐦 bird. The 🐦 <i>learns</i> to adapt by
          developing a different niche.
        </p>
        {/* playback */}
        <PlaybackSlider
          duration={birdDuration}
          stepSize={birdStepSize}
          progress={birdsAdaptationProgress}
          setProgress={setBirdsAdaptationProgress}
          isPlaying={birdsAdaptationPlaying}
          setIsPlaying={setBirdsAdaptationPlaying}
        />
        <svg ref={svgAdaptationRef}></svg>
      </div>
      {/* extinction event */}
      <div className="flex flex-col border-[1px] border-black p-3">
        <p className="my-1 font-bold">Extinction</p>
        <p className="my-1 text-sm">
          The 🐦‍⬛ bird out-competes the 🐦 bird. The 🐦 <i>fails</i> to adapt,
          leading to local extinction
        </p>
        {/* playback */}
        <PlaybackSlider
          duration={birdDuration}
          stepSize={birdStepSize}
          progress={birdsExtinctionProgress}
          setProgress={setBirdsExtinctionProgress}
          isPlaying={birdsExtinctionPlaying}
          setIsPlaying={setBirdsExtinctionPlaying}
        />
        <svg ref={svgExtinctionRef}></svg>
      </div>
    </div>
  );
};

export default CompetitiveExclusion;
