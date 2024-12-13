import React from "react";

const portfolio_image_folder = "/img/people/portfolio/";

export default function CodeSection() {
  return (
    <>
      <div className="min-h-[100vh] px-[20%]">
        <p>I go to UCLA and major in Data Theory and Cognitive Science.</p>
        <img
          className="width-[80%] max-w-[600px]"
          src={portfolio_image_folder + "icons/surface.png"}
          loading="lazy"
        ></img>
        <p>
          It's pretty cool; I learn stats ➗, I learn to code 🧑‍💻, and I learn
          more about our nervous system 🧠.
        </p>
        <p>
          As I learn to code, I consider the possibility of making a website for
          selling art.
        </p>
        <i className="text-sm text-gray-500">
          "And I get to tend the rabbits." "An ... Look down there acrost the
          river, like you can almost see the place." - Of Mice and Men
        </i>
        {/* <hr className='border-none outline-1 outline-black outline-dashed'></hr> */}
        <p>
          I haven't figured out the selling the art part yet, but at least I
          learned how to make a website.
        </p>
      </div>
    </>
  );
}
