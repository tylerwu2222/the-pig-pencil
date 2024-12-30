import React from "react";

const image_folder = "/img/people/";

export default function BirthSection() {
  return (
    <>
      <div className="min-h-[100vh] px-[3%] sm:px-[20%]">
        <div className="intro-graf">
          <p>First, I was born into this world.</p>

          <p>I loved pretending to know how to read.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-[2px] border-[1px] border-solid border-gray-600 px-4 py-8">
              <p>
                I definitely could not read any Chinese characters at this
                point.
              </p>
              <img
                className="h-[40vh] w-auto"
                src={image_folder + "me_bb.jpg"}
                alt="me, baby"
                title="me, baby, with larger baby"
                loading="lazy"
              ></img>
            </div>
            <div className="rounded-[2px] border-[1px] border-solid border-gray-600 px-4 py-8">
              <p>
                Maybe I could manage some Dr. Seuss. (This was also when my
                terrible posture began.)
              </p>
              <img
                className="h-[40vh] w-auto"
                src={image_folder + "me_bb2.jpg"}
                alt="me, baby"
                title="me, baby, lounging"
                loading="lazy"
              ></img>
            </div>
            <div className="rounded-[2px] border-[1px] border-solid border-gray-600 px-4 py-8">
              <p>I have no idea what's going on here.</p>
              <img
                className="h-[40vh] w-auto"
                src={image_folder + "me_bb3.jpg"}
                alt="me, baby"
                title="me, baby, party mode"
                loading="lazy"
              ></img>
            </div>
            <div className="rounded-[2px] border-[1px] border-solid border-gray-600 px-4 py-8">
              <b>
                But much more than reading, I really found out that I liked
                drawing.
              </b>
              <p>
                insert image of me drawing as a kid (or my earliest drawings)
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
