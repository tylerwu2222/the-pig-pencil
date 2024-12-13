import React from "react";

// scrolling shenanigans
// import ScrollMoveElement from '../components/animate/scroll_animate/ScrollMoveElement';
import ScrollDynamicStickyHeader from "../components/animate/scroll_animate/ScrollDynamicStickyHeader";

// sections
import IntroSection from "./IntroSection";
import BirthSection from "./BirthSection";
import ArtSection from "./ArtSection";
import CodeSection from "./CodeSection";
import ProjectsSection from "./ProjectsSection";
import VisSection from "./VisSection";
import InspoSection from "./InspoSection";
import BonusSection from "./BonusSection";

export default function Portfolio() {
  return (
    <>
      <div className="bg-gradient-to-b from-backgroundWhite to-pink-100">
        <IntroSection />

        <hr className="border-none outline-dashed outline-1 outline-black"></hr>

        {/* BIRTH */}
        <ScrollDynamicStickyHeader
          content={<p className="my-2 text-[#313030]">part 1: BIRTH</p>}
          // content={<p className='text-[#313030] my-2'>part 1: BIRTH (<img className="portfolio-icon" src={portfolio_image_folder + "icons/faucet.png"}></img>)</p>}
          topPosition={105}
        />
        <BirthSection />

        {/* ART */}
        <ScrollDynamicStickyHeader
          content={
            <>
              <p className="my-2 text-[#313030]">part 2: I LIKE DRAWING</p>
            </>
          }
          topPosition={135}
        />
        <ArtSection />

        {/* CODE */}
        <ScrollDynamicStickyHeader
          content={
            <p className="my-2 text-[#313030]">
              part 3: I DO CODE STUFF INSTEAD
            </p>
          }
          topPosition={165}
        />
        <CodeSection />

        {/* QUESTIONING (PROJECTS) */}
        <ScrollDynamicStickyHeader
          content={
            <p className="my-2 text-[#313030]">part 4: I QUESTION EVERYTHING</p>
          }
          topPosition={195}
        />
        <ProjectsSection />

        {/* DATA VIS */}
        <ScrollDynamicStickyHeader
          content={
            <p className="my-2 text-[#313030]">
              part 5: I MAKE A LOT OF GRAPHS
            </p>
          }
          topPosition={225}
        />
        <VisSection />

        {/* FUTURE NOW */}
        <ScrollDynamicStickyHeader
          content={
            <p className="my-2 text-[#313030]">part 6: I FIND PURPOSE?</p>
          }
          topPosition={255}
        />
        <InspoSection />

        {/* BONUS */}
        <BonusSection />
      </div>
    </>
  );
}
