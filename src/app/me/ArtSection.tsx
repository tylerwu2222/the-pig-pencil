import React, { useState } from "react";

// import ScrollGrowShrinkElement from '../components/animate/scroll_animate/ScrollGrowShrinkElement';

// dragging shenanigans
// import DraggableContent from "../components/draggables/DraggableContent";

import portfolioData from "../../site_data/portfolio_data.json";
// import DroppableArea from "../components/draggables/DroppableArea";

const portfolio_image_folder = "/img/people/portfolio/";

export default function ArtSection() {
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [featuredImageDescription, setFeaturedImageDescription] = useState<
    string | null
  >("");

  return (
    <>
      <div className="min-h-[100vh] px-[20%]" style={{ paddingBottom: "40vh" }}>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-[2px] border-[1px] border-solid border-gray-600 px-4 py-8">
            <p>Here are a few sketchbooks for proof.</p>
            <img
              className="h-[40vh]"
              src={portfolio_image_folder + "sketchbooks.png"}
              alt="my sketchbooks"
              title="(1/3 of ) my sketchbooks"
              loading="lazy"
            ></img>
          </div>
          <div className="rounded-[2px] border-[1px] border-solid border-gray-600 px-4 py-8">
            <p>
              I do it for 18 years, go to an arts high school, and deck out my
              grad cap:
            </p>
            <img
              className="h-[40vh]"
              src={portfolio_image_folder + "grad_cap.jpg"}
              alt="my grad cap"
              title="my over-the-top grad cap"
              loading="lazy"
            ></img>
          </div>
        </div>
        <div className="floating-graf">
          <p>Here are a few of the drawings I've made over the years.</p>
          <div className="flex flex-wrap gap-2">
            {portfolioData &&
              portfolioData.art.map((file, i) => {
                return (
                  <div key={i} className="h-auto w-[60px]">
                    <img
                      className="border-[1px] border-black hover:cursor-pointer"
                      onClick={() => {
                        setFeaturedImage(
                          portfolio_image_folder + "art_thumbnail/" + file,
                        );
                        setFeaturedImageDescription("this is art.");
                      }}
                      title={"click me :)"}
                      src={portfolio_image_folder + "art_thumbnail/" + file}
                      loading="lazy"
                    ></img>
                  </div>
                  // <DraggableContent
                  //   key={i}
                  //   id={file}
                  //   index={i}
                  //   children={
                  //   }
                  // />
                );
              })}
          </div>

          <div style={{ clear: "both" }}>
            <p>
              <span className="line-through">Drag</span> Click a drawing to
              enlarge, and read more about it.
            </p>

            {/* <DroppableArea /> */}
            <div className="flex">
              <div className="h-[80vh] w-[80vh] border-2 border-black">
                {featuredImage ? (
                  <img className="h-full" src={featuredImage} loading="lazy"></img>
                ) : (
                  <div className="flex justify-center">it'll show up here.</div>
                )}
              </div>
              <div className="px-2 py-4"><span className="underline">Description:</span> {featuredImageDescription}</div>
            </div>
          </div>
        </div>

        <p className="pt-10">
          OK, at this point it's probably time to go to a 2-year art college,
          right?
        </p>
        {[...Array(12).keys()].map((d) => {
          return <p key={d}>.</p>;
        })}
      </div>
    </>
  );
}
