// import NewsletterForm from '../NewsletterForm/NewsletterForm';
import './Me.css';
// import './Portfolio.css';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import portfolioData from '../../../site_data/portfolio_data.json';
import PortfolioSection from './PortfolioModules/PortfolioSection';

// scrolling shenanigans
import ScrollMoveElement from '../../Modules/ScrollMoveElements/ScrollMoveElement';
import ScrollGrowShrinkElement from '../../Modules/ScrollMoveElements/ScrollGrowShrinkElement';
import ScrollDynamicStickyHeader from '../../Modules/ScrollMoveElements/ScrollDynamicStickyHeader';
import DraggableImage from '../../Modules/DraggableElements/DraggableImage';
import InteractiveDragBox from '../../Modules/ScrollMoveElements/InteractiveDragBox';

// images
import ImageModal from '../../Modules/ImageModal/ImageModal';

// MUI
import { FormControl, InputLabel, NativeSelect } from '@mui/material';

import { useWindowSize } from '../../Functions/useWindowSize';
import { hideNavbarFooter } from '../../NavBar/NavBar';

const image_folder = "/img/people/"
const portfolio_image_folder = "/img/people/portfolio/"

const Me = () => {
    // console.log('rendering me');
    // hide navbar on Portfolio, just keep icon returning to main site.

    const location = useLocation();
    // set title, hide navbar and footer
    useEffect(() => {
        const route = location.pathname;
        // Set the title based on the route
        if (route == '/me') {
            document.title = 'The Pig Pencil | Portfolio';

        }

        // hide navbar (instead show pig icon that returns home)
        hideNavbarFooter();

    }, [])

    const { width } = useWindowSize();
    const isMobile = width <= 1024;

    const [scrollHeight, setScrollHeight] = useState(0);
    const [innerHeight, setInnerHeight] = useState(0);

    // update documentHeight
    useEffect(() => {
        const handleResize = () => {
            // Update maxScroll when the body height changes (e.g., after page load)
            setScrollHeight(document.body.scrollHeight);
            setInnerHeight(window.innerHeight);
        };

        // Initial setup
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const [artTNs, setArtTNs] = useState([]);

    // get art TNs from json 
    useEffect(() => {
        // Fetch your JSON data containing image URLs
        fetch('../../../site_data/portfolio_data.json')
            .then((response) => response.json())
            .then((data) => {
                // Extract image URLs from the JSON data
                const art_TNs = data.art;
                // const art_TNs = data.art.map((item) => item);
                setArtTNs(art_TNs);

                // Preload images
                preloadImages(art_TNs);
            })
            .catch((error) => console.error('Error fetching JSON:', error));
    }, []);

    const preloadImages = (srcs) => {
        srcs.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    };

    const handleImageLoad = (url) => {
        // Do something when a specific image is loaded
        console.log(`Image loaded: ${url}`);
    };

    // random numbers 
    const randomNumbers = Array.from({ length: 80 }, () => Math.floor(Math.random() * 80));

    return (
        <>
            <div id="me-container-div">
                {/* return to blog */}
                <div id='pig-home-div'>
                    <a href='/' title='Return to blog'>
                        <img id='pig-home-icon' src='img/pigpencil.png' loading='lazy'>
                        </img>
                    </a>
                    <img id='home-arrow-icon' src={portfolio_image_folder + 'icons/go_to_blog.png'}>
                    </img>
                </div>
                {/* <img id='hover-reminder-icon' src={portfolio_image_folder + 'icons/hover_reminder.png'}></img> */}
                {/* STARTING SLIDE */}
                <div className='container-narrow'>
                    <ScrollGrowShrinkElement
                        id="starting-faucet"
                        type="img"
                        startSize={isMobile ? 50 : 95}
                        startVertical={isMobile ? 15 : 0}
                        startHorizontal={isMobile ? -5 : 0}
                        maxScroll={isMobile ? window.innerHeight / 4 : window.innerHeight / 2}
                        src={portfolio_image_folder + "icons/faucet_animation.gif"}
                        position="relative"
                        title={"When I think of inspiration, I think of a faucet."}
                        loading='lazy'
                    />
                    <h1 id='title-header' style={{ zIndex: 1 }}> HOW I FOUND DATA VISUALIZATION ♱</h1>
                </div>

                <hr className='portfolio-hr'></hr>

                {/* GRAFS */}
                {/* BIRTH */}
                <ScrollDynamicStickyHeader
                    content={<p className='sub-header'>part 1: BIRTH</p>}
                    // content={<p className='sub-header'>part 1: BIRTH (<img className="portfolio-icon" src={portfolio_image_folder + "icons/faucet.png"}></img>)</p>}
                    topPosition={75}
                />
                <div className='part-div'>
                    <div className='intro-graf'>
                        <p>First, I was born into this world.</p>

                        <p>I loved pretending to know how to read.</p>
                        <div className='baby-grid'>
                            <div>
                                <p>I definitely could not read any Chinese characters at this point.</p>
                                <img className="med-img" src={image_folder + "me_bb.jpg"} alt="me, baby" title='me, baby, with larger baby' loading='lazy'></img>
                            </div>
                            <div>
                                <p>Maybe I could manage some Dr. Seuss. (This was also when my terrible posture began.)</p>
                                <img className="med-img" src={image_folder + "me_bb2.jpg"} alt="me, baby" title='me, baby, lounging' loading='lazy'></img>
                            </div>
                            <div>
                                <p>I have no idea what's going on here.</p>
                                <img className="med-img" src={image_folder + "me_bb3.jpg"} alt="me, baby" title='me, baby, party mode' loading='lazy'></img>
                            </div>
                            <div>
                                <b>But much more than reading, I really found out that I liked drawing.</b>
                                <p>insert image of me drawing as a kid (or my earliest drawings)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <hr className='portfolio-hr'></hr> */}

                {/* ART */}
                <ScrollDynamicStickyHeader
                    content={
                        <>
                            <p className='sub-header' style={{ margin: 0 }}>part 2: I LIKE DRAWING</p>
                        </>
                    }
                    topPosition={105}
                />
                <div className='part-div' style={{ paddingBottom: '40vh' }}>
                    <div className='art-grid'>
                        <div>
                            <p>Here are a few sketchbooks for proof.</p>
                            <img className="med-img" src={portfolio_image_folder + "sketchbooks.png"} alt="my sketchbooks" title='(1/3 of ) my sketchbooks' loading='lazy'>
                            </img>
                        </div>
                        <div>
                            <p>I do it for 18 years, go to an arts high school, and deck out my grad cap:</p>
                            <img className="med-img" src={portfolio_image_folder + "grad_cap.jpg"} alt="my grad cap" title='my over-the-top grad cap' loading='lazy'>
                            </img>
                        </div>
                    </div>
                    <div className='floating-graf'
                    >
                        {/* <DraggableImage /> */}


                        <p>Here are a few of the drawings I've made over the years.</p>
                        <div>
                            {scrollHeight > 0 && portfolioData && portfolioData.art.map((file, i) => {
                                // return (<DraggableImage />
                                // )
                                return (<DraggableImage
                                    id={'art-square-' + file}
                                    content={
                                        // <div>
                                        <div className='draggable-art' style={{ top: i * 5 }}>
                                            <img className="art-thumbnail" title={"drag me :)"} src={portfolio_image_folder + "art_thumbnail/" + file} loading='lazy'></img>
                                        </div>
                                        // <img className="art-thumbnail" title={"art"} src={portfolio_image_folder + "art_thumbnail/" + file}></img>
                                        // <p>{file}</p>
                                    } />
                                )
                            })}
                        </div>

                        <div style={{ clear: 'both' }}>
                            <p>Drag a drawing to the green box below to learn more about it. (jk you can only drag them for now, the green box doesn't do anything  yet).</p>
                            <InteractiveDragBox />
                            <div className='art-description-area'>

                            </div>
                        </div>
                    </div>


                    <p>OK, at this point it's probably time to go to a 2-year art college, right?</p>
                </div>

                {/* <hr className='portfolio-hr'></hr> */}

                {/* DATA */}
                <ScrollDynamicStickyHeader
                    content={<p className='sub-header'>part 3: I DO CODE STUFF INSTEAD</p>}
                    topPosition={135}
                />
                <div className='part-div'>
                    <p>I go to UCLA and major in Data Theory and Cognitive Science.</p>
                    <img className="medium-icon" src={portfolio_image_folder + "icons/surface.png"} loading='lazy'></img>
                    <p>I end up learning to code because I want to make a website for selling art.</p>
                    <i className='miniature-text'>"And I get to tend the rabbits." "An ... Look down there acrost the river, like you can almost see the place." - Of Mice and Men</i>
                    {/* <hr className='portfolio-hr'></hr> */}
                    <p>I haven't figured out the selling the art part yet, but I learned to make a website.</p>
                    <p className='miniature-text'>-- I mean, clearly, otherwise you wouldn't be reading this right now.</p>
                </div>

                {/* QUESTIONING (PROJECTS) */}
                <ScrollDynamicStickyHeader
                    content={<p className='sub-header'>part 4: I QUESTION EVERYTHING</p>}
                    topPosition={165}
                />
                <div className='part-div'>
                    <p>Mid-undergrad, the pandemic happens and I start to reevaluate what I want to do.</p>
                    <ul>
                        <li>I make a blog.</li>
                        <li>I try <a href="https://thepigpencil.com/writing" target="_blank">writing</a>. Not writing well exactly, but writing.</li>
                        <li>I learn to make <a href="https://tylerwu2222.wixsite.com/website/selected-work-3" target='_blank'>pixel art</a>. It's kind of fun.</li>
                        <li>I make random websites for various purposes:</li>
                    </ul>
                    <PortfolioSection
                        title='Projects'
                        summary={<></>}
                        content={
                            <>
                                <h4>Random sites</h4>
                                <div>
                                    <div>
                                        <p>Unfortunately, all of these were hosted using Heroku when it was still free (no longer the case now),
                                            and I've been too lazy to migrate them to other free services like Vercel. But maybe one day ;)</p>
                                    </div>
                                </div>
                                <div className='projects-grid-div'>
                                    {portfolioData.projects.map(project => {
                                        if (project.type == "web app") {
                                            return (
                                                <div className='project-div'>
                                                    <div>
                                                        <p>{project.title}</p>
                                                        <ImageModal
                                                            imgTN={<img
                                                                className="project-img ModalImageThumbnail"
                                                                src={portfolio_image_folder + project.thumbnail}
                                                                title={project.title}
                                                                alt={project.thumbnail}
                                                                loading='lazy'
                                                            ></img>}
                                                            img={<img
                                                                className="mm-gif-large ModalImageThumbnail"
                                                                src={portfolio_image_folder + project.thumbnail}
                                                                title={project.title}
                                                                alt={project.thumbnail}
                                                                loading='lazy'
                                                            ></img>}
                                                            desc={project.description}
                                                            title={project.title}
                                                        />

                                                        <p className='publication-summary'>{project.description}</p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                                <h4>Tools</h4>
                                <p>UCLA Library Business Services: <a href="https://github.com/tylerwu2222/UCLA-Invoice-Helper" target='_blank'>Invoice Automation App</a></p>
                                <div className='projects-grid-div'>
                                    {portfolioData.projects.map(project => {
                                        if (project.type == "tool") {
                                            return (
                                                <div className='project-div'>
                                                    <div>
                                                        <p>{project.title}</p>
                                                        <img
                                                            className="project-img"
                                                            src={portfolio_image_folder + project.thumbnail}
                                                            title={project.title}
                                                            alt={project.thumbnail}
                                                            loading='lazy'
                                                        ></img>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                                <h4>Competitions</h4>
                                <p>
                                    <a href="https://devpost.com/software/moodz-b6mn70" target="_blank">CalHacks - Most Fun Award: 2023</a>
                                </p>
                                <img
                                    className="med-img"
                                    src={portfolio_image_folder + "moodz.png"}
                                    alt="the data vis. I created"
                                    title='my contribution to Moodz'
                                    loading='lazy'
                                ></img>
                                <div className='projects-grid-div'>
                                    {portfolioData.projects.map(project => {
                                        if (project.type == "competition") {
                                            return (
                                                <div className='project-div'>
                                                    <div>
                                                        <p>{project.title}</p>
                                                        <img
                                                            className="project-img"
                                                            src={portfolio_image_folder + project.thumbnail}
                                                            title={project.title}
                                                            alt={project.thumbnail}
                                                            loading='lazy'
                                                        ></img>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                                <p>More projects on my <a href='https://github.com/tylerwu2222?tab=repositories' target='_blank'>Github</a></p>
                            </>
                        }
                    />
                </div>


                {/* <hr className='portfolio-hr'></hr> */}

                {/* DATA VIS */}
                <ScrollDynamicStickyHeader
                    content={<p className='sub-header'>part 5: I MAKE A LOT OF GRAPHS</p>}
                    topPosition={195}
                />
                <div className='part-div'>
                    <div className='floating-graf'>
                        <p>I decide to give this "visualizations for the web" thing a try</p>
                        <p>I was able to build some freelance visualizations on this site,
                            but a good amount were also made collaborating with a lot of other talented people at the Daily Bruin and Daily Californian -- UCLA and UC Berkeley's student papers.</p>
                        <p>Regardless, I made a lot of graphs:</p>
                    </div>

                    {/* BIG BANG DATA VIZ SECTION */}
                    {/* ENTER FILTER, SEARCH OPTIONS */}
                    <div className='viz-gallery-div'>
                        <div className='viz-gallery-navigation-div'>
                            <div className='viz-gallery-search-div'>
                                <p>Search (to add)</p>
                            </div>
                            <div className='viz-gallery-facet-div'>
                                <p>Chart Type (to add)</p>
                                <p>Publication (to add)</p>
                            </div>
                            <div className='viz-gallery-sort-div'>
                                <FormControl fullWidth>
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
                                </FormControl>
                            </div>
                        </div>
                        <div className='viz-grid-div'>
                            {
                                portfolioData.visualizations.map((v, i) => {
                                    let vizTN;
                                    if (v.gif == "none") {
                                        vizTN = <img
                                            className="viz-grid-img"
                                            src={portfolio_image_folder + 'viz_tns/' + v.thumbnail}
                                            loading="lazy"
                                        ></img>;
                                    }
                                    else {
                                        if (v.gif.endsWith('.gif')) {
                                            vizTN = <img
                                                className="viz-grid-img"
                                                src={portfolio_image_folder + 'viz_gifs/' + v.gif}
                                                loading="lazy"
                                            ></img>;
                                        }
                                        else {
                                            vizTN = <video
                                                autoPlay
                                                loop
                                                muted
                                                className="viz-grid-img viz-grid-vid" src={portfolio_image_folder + 'viz_gifs/' + v.gif}
                                                loading="lazy"
                                            ></video>;
                                        }
                                    }

                                    return (
                                        <><div className='viz-grid-card' order={Math.round(Math.random() * 10)}>
                                            <div className='viz-grid-card-desc-div'>
                                                <b>{v.title}</b>
                                                <p>{v.description}</p>
                                            </div>
                                            <div className='viz-grid-card-media-div'>
                                                <a href={v.url} target='_blank'>
                                                    {vizTN}
                                                </a>
                                            </div>
                                            <div className='viz-grid-card-source-div'>
                                                <p className='miniature-text'>{v.date}</p>
                                            </div>
                                        </div><br></br>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                {/* <hr className='portfolio-hr'></hr> */}

                {/* FUTURE NOW */}
                <ScrollDynamicStickyHeader
                    content={<p>part 6: I FIND PURPOSE (?)</p>}
                    topPosition={225}
                />
                <div className='part-div'>
                    <div className='floating-graf'>
                        <p>Ideally by the time you're reading this I've found purpose.</p>
                        <p>One way I recenter my purpose is to be inspired.</p>
                        <p>So I'll end with some of my favorite graph/multimedia makers:</p>
                        <p>(There are many more to add, LA times, SF Chron, NY Times, WaPo, etc..., but I think I have a cool viz in mind for when I do add all that.)</p>
                        <div className='inspo-grid'>
                            {portfolioData.inspo.map((i) => {
                                return <div>
                                    <a href={i.url} target='_blank'>
                                        <p className='.miniature-text'>{i.site}</p>
                                        <img
                                            className="inspo-logo"
                                            src={portfolio_image_folder + 'fave_sites/' + i.image}
                                            alt={i.site}
                                        ></img>
                                    </a>
                                </div>
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
                <div className='part-div'>
                    <PortfolioSection
                        title='Misc'
                        summary={<>
                            <p>If you've made it this far, here's a lil piece of bonus media from one of my favorite games: Mini Motorways!</p>
                            <p>Mini Motorways is a game about building roads to connect homes to destinations, and the game lets you export a gif of your completed map. So this is the result!</p>
                            <p className='miniature-text'>(I forgot to do that with Tokyo, so you get a boring .png for now).</p>
                        </>}
                        content={
                            <div className='mm-flexbox'>
                                {
                                    portfolioData.games['mini motorways'].map((city, index) => {
                                        if (city.complete == false) {
                                            return <></>
                                        }
                                        else {
                                            return (<div className='mm-item'>
                                                <p>{city.city}</p>
                                                <ImageModal
                                                    imgTN={<img
                                                        src={portfolio_image_folder + 'games/mini_motorways/' + city.image}
                                                        className="mm-gif ModalImageThumbnail"
                                                        alt={"mm-" + city.city}
                                                        title={city.city}
                                                        loading="lazy" />}
                                                    img={<img
                                                        src={portfolio_image_folder + 'games/mini_motorways/' + city.image}
                                                        className="mm-gif-large"
                                                        alt={"mm-" + city.city}
                                                        loading="lazy" />}
                                                    desc={'Score: ' + city.score}
                                                    title={city.city}
                                                />
                                            </div>

                                            )
                                        }
                                    })
                                }
                            </div>
                        }
                    />
                </div>
            </div >
        </>
    )
};

export default Me;