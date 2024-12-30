import React from 'react'
import portfolioData from "../../site_data/portfolio_data.json";
const portfolio_image_folder = "/img/people/portfolio/";

export default function VisSection() {
  return (
    <>
    <div className="min-h-[100vh] px-[3%] sm:px-[20%]">
          <div className="floating-graf">
            <p>
              I decide to give this "visualizations for the web" thing a try
            </p>
            <p>
              I was able to build some freelance visualizations on this here
              blog, but a good amount were also made collaborating with a lot of
              other talented people at the Daily Bruin and Daily Californian --
              UCLA and UC Berkeley's student papers.
            </p>
            <p>Regardless, I made a lot of graphs:</p>
          </div>

          {/* BIG BANG DATA VIZ SECTION */}
          {/* ENTER FILTER, SEARCH OPTIONS */}
          <div className="viz-gallery-div">
            <div className="viz-gallery-navigation-div">
              <div className="viz-gallery-search-div">
                <p>Search (to add)</p>
              </div>
              <div className="viz-gallery-facet-div">
                <p>Chart Type (to add)</p>
                <p>Publication (to add)</p>
              </div>
              <div className="viz-gallery-sort-div">
                {/* <FormControl fullWidth>
                                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        Sort (to add):
                                    </InputLabel>
                                    <NativeSelect
                                        defaultValue={"default"}
                                        inputProps={{
                                            name: 'viz-sort',
                                            id: 'uncontrolled-native',
                                        }}
                                    >
                                        <option value={"default"}>--Select--</option>
                                        <option value={"date-descending"}>Date (Newest-Oldest)</option>
                                        <option value={"date-ascending"}>Date (Oldest-Newest)</option>
                                        <option value={"how-much-i-like"}>How much I like it</option>
                                    </NativeSelect>
                                </FormControl> */}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {portfolioData.visualizations.map((v, i) => {
                let vizTN;
                if (v.gif == "none") {
                  vizTN = (
                    <img
                      className="w-[80vw] transform outline outline-[1px] outline-black transition duration-100 ease-in-out hover:scale-105"
                      src={portfolio_image_folder + "viz_tns/" + v.thumbnail}
                      loading="lazy"
                    ></img>
                  );
                } else {
                  if (v.gif.endsWith(".gif")) {
                    vizTN = (
                      <img
                        className="w-[80vw] transform outline outline-[1px] outline-black transition duration-100 ease-in-out hover:scale-105"
                        src={portfolio_image_folder + "viz_gifs/" + v.gif}
                        loading="lazy"
                      ></img>
                    );
                  } else {
                    vizTN = (
                      <video
                        autoPlay
                        loop
                        muted
                        className="w-[80vw] transform outline outline-[1px] outline-black transition duration-100 ease-in-out hover:scale-105"
                        src={portfolio_image_folder + "viz_gifs/" + v.gif}
                        // loading="lazy"
                      ></video>
                    );
                  }
                }

                return (
                  <div
                    key={i}
                    className="m-[1vw] flex flex-1 flex-col bg-teal-300 pb-[2vh]"
                    // order={Math.round(Math.random() * 10)}
                  >
                    <div className="p-[2vw] text-sm">
                      <b>{v.title}</b>
                      <div className="viz-grid-card-source-div">
                        <i className="text-sm">{v.date}</i>
                      </div>
                      <p>{v.description}</p>
                    </div>
                    <div className="flex justify-center items-center">
                      <a href={v.url} target="_blank">
                        {vizTN}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        </>
  )
}
