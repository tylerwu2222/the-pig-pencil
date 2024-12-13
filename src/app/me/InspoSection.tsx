import React from 'react'
import portfolioData from "../../site_data/portfolio_data.json";

const portfolio_image_folder = "/img/people/portfolio/";

export default function InspoSection() {
  return (
    <>
    <div className="min-h-[100vh] px-[20%]">
          <div className="floating-graf">
            <p>Ideally by the time you're reading this I've found purpose.</p>
            <p>One way I recenter my purpose is to be inspired.</p>
            <p>So I'll end with some of my favorite graph/multimedia makers:</p>
            <p>
              (There are many more to add, LA times, SF Chron, NY Times, WaPo,
              etc..., but I think I have a cool viz in mind for when I do add
              all that.)
            </p>
            <div className="grid grid-cols-4 gap-4">
              {portfolioData.inspo.map((inspo, i) => {
                return (
                  <div key={i} className="px-4 py-8">
                    <a href={inspo.url} target="_blank">
                      <p className="text-sm text-pink-400 underline">
                        {inspo.site}
                      </p>
                      <img
                        className="h-[6vh]"
                        src={
                          portfolio_image_folder + "fave_sites/" + inspo.image
                        }
                        alt={inspo.site}
                      ></img>
                    </a>
                  </div>
                );
              })}
            </div>
            {/* <ul>
                                <li><a href='https://flowingdata.com/' target='_blank'>Flowing Data</a></li>
                                <li><a href='https://www.reuters.com/graphics/' target='_blank'>Reuters Graphics</a></li>
                                <li><a href='https://pudding.cool/' target='_blank'>The Pudding</a></li>
                                <li><a href='https://www.youtube.com/Vice' target='_blank'>Vice</a></li>
                                <li><a href='https://www.youtube.com/@InsiderBusiness/' target='_blank'>Insider (Business)</a></li>
                            </ul> */}
          </div>
        </div>
    </>
  )
}
