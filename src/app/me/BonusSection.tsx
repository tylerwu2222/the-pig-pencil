import React from "react";

import portfolioData from "../../site_data/portfolio_data.json";
import PortfolioSection from "./PortfolioSection";

import ImageModal from "../components/modals/ImageModal/ImageModal";

const portfolio_image_folder = "/img/people/portfolio/";

export default function BonusSection() {
  return (
    <>
      <div className="min-h-[100vh] px-[3%] sm:px-[20%]">
        <PortfolioSection
          title="Misc"
          summary={
            <>
              <p>
                If you've made it this far, here's a lil piece of bonus media
                from one of my favorite games: Mini Motorways!
              </p>
              <p>
                Mini Motorways is a game about building roads to connect homes
                to destinations, and the game lets you export a gif of your
                completed map. So this is the result!
              </p>
              <p className="text-sm">
                (I forgot to do that with Tokyo, so you get a boring .png for
                now).
              </p>
            </>
          }
          content={
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* <div className='flex flex-wrap gap-[1vw]'> */}
              {portfolioData.games["mini motorways"].map((city, i) => {
                return (
                  <div key={i} className="flex flex-col items-center">
                    <p>{city.city}</p>
                    <ImageModal
                      imgTN={
                        <img
                          src={
                            portfolio_image_folder +
                            "games/mini_motorways/" +
                            city.image
                          }
                          className="ModalImageThumbnail w-[80vw] sm:w-[30vw]"
                          alt={"mm-" + city.city}
                          title={city.city}
                          loading="lazy"
                        />
                      }
                      img={
                        <img
                          src={
                            portfolio_image_folder +
                            "games/mini_motorways/" +
                            city.image
                          }
                          className="w-[80vw]"
                          alt={"mm-" + city.city}
                          loading="lazy"
                        />
                      }
                      desc={"Score: " + city.score}
                      title={city.city}
                    />
                  </div>
                );
              })}
            </div>
          }
        />
      </div>
    </>
  );
}
