import React from "react";

import PortfolioSection from "./PortfolioSection";
import portfolioData from "../../site_data/portfolio_data.json";

import ImageModal from "../components/modals/ImageModal/ImageModal";

const portfolio_image_folder = "/img/people/portfolio/";

export default function ProjectsSection() {
  return (
    <>
      <div className="min-h-[100vh] px-[3%] sm:px-[20%]">
        <p>
          Mid-undergrad, the pandemic happens and I start to reevaluate what I
          want to do.
        </p>
        <ul>
          <li className="list-disc">I make a blog.</li>
          <li className="list-disc">
            I try{" "}
            <a
              className="text-pink-400 underline"
              href="https://thepigpencil.com/writing"
              target="_blank"
              title="writing section of pig pencil"
            >
              writing
            </a>
            . Not writing well exactly, but writing nonetheless.
          </li>
          <li className="list-disc">
            I learn to make{" "}
            <a
              className="text-pink-400 underline"
              href="https://tylerwu2222.wixsite.com/website/selected-work-3"
              target="_blank"
              title="pixel art by tyler wu"
            >
              pixel art
            </a>
            . It's kind of fun.
          </li>
          <li className="list-disc">
            I make random websites for various purposes:
          </li>
        </ul>
        <PortfolioSection
          title="Projects"
          summary={<></>}
          content={
            <>
              <h4 className="font-bold">Random sites</h4>
              <div>
                <div>
                  <p>
                    Unfortunately, all of these were hosted using Heroku when it
                    was still free (no longer the case now), and I've been too
                    lazy to migrate them to other free services like Vercel. But
                    maybe one day ;)
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 items-start gap-[1vw] sm:grid-cols-3">
                {portfolioData.projects.map((project, i) => {
                  if (project.type == "web app") {
                    return (
                      <div
                        key={i}
                        className="m-3 aspect-square hover:bg-slate-300"
                      >
                        <p className="font-bold">{project.title}</p>
                        <ImageModal
                          imgTN={
                            <img
                              className="h-auto w-fit"
                              src={portfolio_image_folder + project.thumbnail}
                              title={"click me! " + project.title}
                              alt={project.thumbnail}
                              loading="lazy"
                            ></img>
                          }
                          img={
                            <img
                              className="max-h-[80vh] w-auto sm:w-[60vw]"
                              src={portfolio_image_folder + project.thumbnail}
                              title={project.title}
                              alt={project.thumbnail}
                              loading="lazy"
                            ></img>
                          }
                          desc={project.description}
                          title={project.title}
                        />

                        <p className="publication-summary">
                          {project.description}
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
              <h4 className="font-bold">Tools</h4>
              <p>
                UCLA Library Business Services:{" "}
                <a
                  className="text-pink-700 underline"
                  href="https://github.com/tylerwu2222/UCLA-Invoice-Helper"
                  target="_blank"
                >
                  Invoice Automation App
                </a>
              </p>
              <div className="grid grid-cols-3 items-end gap-[1vw]">
                {portfolioData.projects.map((project, i) => {
                  if (project.type == "tool") {
                    return (
                      <div key={i} className="project-div">
                        <div>
                          <p>{project.title}</p>
                          <img
                            className="project-img"
                            src={portfolio_image_folder + project.thumbnail}
                            title={project.title}
                            alt={project.thumbnail}
                            loading="lazy"
                          ></img>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              <h4 className="font-bold">Competitions</h4>
              <p>
                <a
                  className="text-pink-700 underline"
                  href="https://devpost.com/software/moodz-b6mn70"
                  target="_blank"
                >
                  CalHacks - Most Fun Award: 2023
                </a>
              </p>
              <img
                className="h-[25vh]"
                src={portfolio_image_folder + "moodz.png"}
                alt="the data vis I created for CalHacks"
                title="my contribution to Moodz"
                loading="lazy"
              ></img>
              <div className="grid grid-cols-3 items-end gap-[1vw]">
                {portfolioData.projects.map((project, i) => {
                  if (project.type == "competition") {
                    return (
                      <div key={i} className="project-div">
                        <div>
                          <p>{project.title}</p>
                          <img
                            className="h-[25vh]"
                            src={portfolio_image_folder + project.thumbnail}
                            title={project.title}
                            alt={project.thumbnail}
                            loading="lazy"
                          ></img>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              <p>
                More projects on my{" "}
                <a
                  className="font-semibold text-pink-700 underline"
                  href="https://github.com/tylerwu2222?tab=repositories"
                  target="_blank"
                >
                  Github
                </a>
              </p>
            </>
          }
        />
      </div>
    </>
  );
}
