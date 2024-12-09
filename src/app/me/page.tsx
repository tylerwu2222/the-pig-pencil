"use client";
// import { useEffect, useState } from "react";

import portfolioData from "../../site_data/portfolio_data.json";
import PortfolioSection from "./PortfolioSection";

// scrolling shenanigans
// import ScrollMoveElement from '../components/animate/scroll_animate/ScrollMoveElement';
// import ScrollGrowShrinkElement from '../components/animate/scroll_animate/ScrollGrowShrinkElement';
import ScrollDynamicStickyHeader from "../components/animate/scroll_animate/ScrollDynamicStickyHeader";
// import DraggableImage from '../components/draggables/DraggableImage';
import InteractiveDragBox from "../components/animate/scroll_animate/InteractiveDragBox";

// images
// import ImageModal from '../../Modules/ImageModal/ImageModal';
import ImageModal from "../components/modals/ImageModal/ImageModal";

// import { useWindowSize } from "../../lib/useWindowSize";
import Link from "next/link";
// import Image from 'next/image';

const image_folder = "/img/people/";
const portfolio_image_folder = "/img/people/portfolio/";

const Me = () => {
  // console.log('rendering me');
  // hide navbar on Portfolio, just keep icon returning to main site.

  // const { width } = useWindowSize();
  // const isMobile = width <= 1024;

  // const [scrollHeight, setScrollHeight] = useState(0);
  // const [innerHeight, setInnerHeight] = useState(0);

  // update documentHeight
  // useEffect(() => {
  //   const handleResize = () => {
  //     // Update maxScroll when the body height changes (e.g., after page load)
  //     // setScrollHeight(document.body.scrollHeight);
  //     // setInnerHeight(window.innerHeight);
  //   };

  //   // Initial setup
  //   handleResize();

  //   // Add event listener for window resize
  //   window.addEventListener("resize", handleResize);

  //   // Clean up event listener on component unmount
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  // const [artTNs, setArtTNs] = useState([]);

  // get art TNs from json
  // useEffect(() => {
  //     // Fetch your JSON data containing image URLs
  //     fetch('../../../site_data/portfolio_data.json')
  //         .then((response) => response.json())
  //         .then((data) => {
  //             // Extract image URLs from the JSON data
  //             const art_TNs = data.art;
  //             // const art_TNs = data.art.map((item) => item);
  //             setArtTNs(art_TNs);

  //             // Preload images
  //             preloadImages(art_TNs);
  //         })
  //         .catch((error) => console.error('Error fetching JSON:', error));
  // }, []);

  // const preloadImages = (srcs) => {
  //     srcs.forEach((src) => {
  //         const img = new Image();
  //         img.src = src;
  //     });
  // };

  // const handleImageLoad = (url) => {
  //     // Do something when a specific image is loaded
  //     console.log(`Image loaded: ${url}`);
  // };

  // // random numbers
  // const randomNumbers = Array.from({ length: 80 }, () => Math.floor(Math.random() * 80));

  return (
    <>
      <div id="me-container-div">
        {/* return to blog */}
        <Link href="/" title="go to blog">
          <div className="fixed left-0 top-2 z-20 transform opacity-80 transition ease-in-out hover:translate-x-1 hover:scale-110 hover:opacity-100 lg:w-[4vw] lg:max-w-[80px]">
            <img
              className="ml-[-10px] h-auto rounded-md"
              src="/img/pigpencil.png"
              loading="lazy"
            />
            {/* <img className='' src={portfolio_image_folder + 'icons/go_to_blog.png'}> */}
            <p className="h-auto text-xs">go to blog</p>
          </div>
        </Link>
        {/* <img id='hover-reminder-icon' src={portfolio_image_folder + 'icons/hover_reminder.png'}></img> */}
        {/* STARTING faucet */}
        {/* <div className='relative h-[100vh] ml-[25vw]'> */}
        <div className="relative ml-[15vw] h-[100vh]">
          {/* <ScrollGrowShrinkElement
                        type="img"
                        startSize={isMobile ? 50 : 100}
                        startVertical={isMobile ? 15 : 15}
                        startHorizontal={isMobile ? -5 : 0}
                        maxScroll={isMobile ? window.innerHeight / 4 : window.innerHeight / 2}
                        src={portfolio_image_folder + "icons/faucet_animation.gif"}
                        position="relative"
                        title={"When I think of inspiration, I think of a faucet."}
                        loading='lazy'
                    /> */}
          <img
            className="h-[100%] pt-10"
            src={portfolio_image_folder + "icons/faucet_animation.gif"}
            alt="me-faucet"
          />
          <h1
            id="title-header"
            className='absolute right-[10vw] top-[65vh] z-10 pl-0 font-["Baskerville"] text-2xl font-bold text-[#676464] 2xl:text-6xl'
          >
            {" "}
            HOW I FOUND DATA VISUALIZATION ♱
          </h1>
        </div>

        <hr className="border-none outline-dashed outline-1 outline-black"></hr>

        {/* GRAFS */}
        {/* BIRTH */}
        <ScrollDynamicStickyHeader
          content={<p className="my-2 text-[#313030]">part 1: BIRTH</p>}
          // content={<p className='text-[#313030] my-2'>part 1: BIRTH (<img className="portfolio-icon" src={portfolio_image_folder + "icons/faucet.png"}></img>)</p>}
          topPosition={105}
        />
        <div className="min-h-[100vh] px-[20%]">
          <div className="intro-graf">
            <p>First, I was born into this world.</p>

            <p>I loved pretending to know how to read.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[2px] border-[1px] border-solid border-gray-600 px-4 py-8">
                <p>
                  I definitely could not read any Chinese characters at this
                  point.
                </p>
                <img
                  className="h-[40vh]"
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
                  className="h-[40vh]"
                  src={image_folder + "me_bb2.jpg"}
                  alt="me, baby"
                  title="me, baby, lounging"
                  loading="lazy"
                ></img>
              </div>
              <div className="rounded-[2px] border-[1px] border-solid border-gray-600 px-4 py-8">
                <p>I have no idea what's going on here.</p>
                <img
                  className="h-[40vh]"
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

        {/* <hr className='border-none outline-1 outline-black outline-dashed'></hr> */}

        {/* ART */}
        <ScrollDynamicStickyHeader
          content={
            <>
              <p className="my-2 text-[#313030]">part 2: I LIKE DRAWING</p>
            </>
          }
          topPosition={135}
        />
        <div
          className="min-h-[100vh] px-[20%]"
          style={{ paddingBottom: "40vh" }}
        >
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
            {/* <DraggableImage /> */}

            <p>Here are a few of the drawings I've made over the years.</p>
            <div>
              {/* {scrollHeight > 0 && portfolioData && portfolioData.art.map((file, i) => {
                                return (<DraggableImage
                                    key={i}
                                    // id={'art-square-' + file}
                                    content={
                                        // <div>
                                        <div className='draggable-art' style={{ top: i * 5 }}>
                                            <img className="art-thumbnail" title={"drag me :)"} src={portfolio_image_folder + "art_thumbnail/" + file} loading='lazy'></img>
                                        </div>
                                    } />
                                )
                            })} */}
            </div>

            <div style={{ clear: "both" }}>
              <p>
                Drag a drawing to the green box below to learn more about it.
                (jk you can only drag them for now, the green box doesn't do
                anything yet).
              </p>
              <InteractiveDragBox />
              <div className="art-description-area"></div>
            </div>
          </div>

          <p>
            OK, at this point it's probably time to go to a 2-year art college,
            right?
          </p>
        </div>

        {/* <hr className='border-none outline-1 outline-black outline-dashed'></hr> */}

        {/* DATA */}
        <ScrollDynamicStickyHeader
          content={
            <p className="my-2 text-[#313030]">
              part 3: I DO CODE STUFF INSTEAD
            </p>
          }
          topPosition={165}
        />
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
            As I learn to code, I consider the possibility of making a website
            for selling art.
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

        {/* QUESTIONING (PROJECTS) */}
        <ScrollDynamicStickyHeader
          content={
            <p className="my-2 text-[#313030]">part 4: I QUESTION EVERYTHING</p>
          }
          topPosition={195}
        />
        <div className="min-h-[100vh] px-[20%]">
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
                      Unfortunately, all of these were hosted using Heroku when
                      it was still free (no longer the case now), and I've been
                      too lazy to migrate them to other free services like
                      Vercel. But maybe one day ;)
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-start gap-[1vw]">
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
                                className="max-h-[70vh] w-auto"
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

        {/* <hr className='border-none outline-1 outline-black outline-dashed'></hr> */}

        {/* DATA VIS */}
        <ScrollDynamicStickyHeader
          content={
            <p className="my-2 text-[#313030]">
              part 5: I MAKE A LOT OF GRAPHS
            </p>
          }
          topPosition={225}
        />
        <div className="min-h-[100vh] px-[20%]">
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
            <div className="grid grid-cols-2">
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
                    <div className="viz-grid-card-media-div">
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
        {/* <hr className='border-none outline-1 outline-black outline-dashed'></hr> */}

        {/* FUTURE NOW */}
        <ScrollDynamicStickyHeader
          content={
            <p className="my-2 text-[#313030]">part 6: I FIND PURPOSE?</p>
          }
          topPosition={255}
        />
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
        <div className="min-h-[100vh] px-[20%]">
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
              <div className="grid grid-cols-3 gap-6">
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
                            className="ModalImageThumbnail w-[30vw]"
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
      </div>
    </>
  );
};

export default Me;
