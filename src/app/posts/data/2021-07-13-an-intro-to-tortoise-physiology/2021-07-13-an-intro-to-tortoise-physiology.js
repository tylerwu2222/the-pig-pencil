import SVG1 from "./visuals/svg1.js";
import SVG2 from "./visuals/svg2.js";
import { TTProvider } from './visuals/TTContext.js';
import data from './data/tort_data.csv';

import * as d3 from 'd3';
import { useEffect, useState } from "react";

import DropdownMenu from "../../../components/Modules/DropdownMenu/DropdownMenu.js";
import Scrollspy, { ScrollspyHeader } from "../../../components/Modules/Scrollspy/Scrollspy.js";

const w_width = window.innerWidth, w_height = window.innerHeight;
const article_width = (w_width <= 450) ? 0.95 : 0.6;
const article_height = 0.75; // ternary operator
const padding_v = 60, padding_h = 40;
var config = {
    "node_size": Math.max(30, (article_width * w_height - padding_v) / 16),
    "vw": article_width * w_width,
    "vh": article_height * w_height,
    "inner_vw": article_width * w_width - padding_h,
    "inner_vh": article_height * w_height - padding_v,
    "anim_speed": 3000,
    "colors": ['#969696', '#88c282', '#abc27d', '#bfc27a', '#c29975', '#c28072', '#3b2e2b']
};
const initialCC = {
    'VU': 0,
    'CR': 0,
    'EN': 0,
    'EX': 0,
    'NE': 0,
    'LC': 0,
    'NT': 0
};
let cs_counts;
const initialHC = {
    'tropical forest': 0,
    'deciduous forest': 0,
    'savanna': 0,
    'grassland': 0,
    'coastal': 0,
    'desert': 0,
    'mountain': 0,
    'island': 0
};
let habitat_counts;

const cs_key = {
    'NE': 'Not Evaluated',
    'LC': 'Least Concern',
    'NT': 'Near Threatened',
    'VU': 'Vulnerable',
    'EN': 'Endangered',
    'CR': 'Critically Endangered',
    'EX': 'Extinct'
}

const cs_mapping = Object.entries(cs_key).map(function (x, i) {
    return {
        abbr: x[0],
        full: x[1],
        color: config.colors[i]
    };
});


const TortoiseTaxonomy = () => {
    const img_folder = '/img/data/tortoise_taxonomy/tortoise_taxonomy';
    // let tortData = null;
    const [tortData, setTortData] = useState(null);

    useEffect(() => {
        d3.csv(data)
            .then(dta => {
                habitat_counts = structuredClone(initialHC);
                cs_counts = structuredClone(initialCC);
                dta.forEach((d, i) => {
                    d.dist_list = d.dist.split(",");
                    d.coords = d.coords.split(",").map(x => +x);
                    d.c_name = eval(d.c_name)[0];
                    d.s_name = d.sci_name.replace(' ', '');
                    d.length = +d.length;
                    d.age = +d.avg_age;
                    d.img = "/img/data/tortoise_taxonomy/tort_imgs/tort_icons/" + d.s_name + ".jpg";
                    d.cs = d.cons_status;
                    d.cs_pos = cs_counts[d.cs];
                    cs_counts[d.cs] = cs_counts[d.cs] + 1;
                    d.h_pos = habitat_counts[d.habitat];
                    habitat_counts[d.habitat] = habitat_counts[d.habitat] + 1;
                    // console.log('HC update', i, d.habitat, habitat_counts[d.habitat]);
                });
                setTortData(dta);
            });

    }, []);

    const sectionTitles = [
        'Tortoises vs. Turtles',
        'Where are Tortoises in the Great Turtle Tree?',
        'Why Do Tortoises Retract There Necks Anyway?',
        'Why are Some Tortoises Huge and Others So Small?',
        'What is the Biggest Threat to Tortoises today?'
    ];

    return (
        <>
            <TTProvider value={{
                config,
                habitat_counts,
                cs_counts,
                cs_key,
                cs_mapping,
                DropdownMenu
            }}>
                <Scrollspy sectionTitles={sectionTitles} />
                <div className='container-narrow containerBottom'>
                    <p style={{ whiteSpace: "pre-line" }}></p>

                    <ScrollspyHeader />
                    <p>
                        People often confuse tortoises and turtles, and who can blame them, the nomenclature is inherently confusing. A <b>tortoise</b> refers specifically to a land-dweller (so pretty safe naming there), but when it comes to <b>turtles</b>, turtles either refer to aquatic turtles, <i>or</i> the larger order which includes both turtles of the land and aquatic type.
                        So slightly confusing, but moving on.
                    </p>

                    <ScrollspyHeader />
                    <p>
                        This is where tortoises land:
                    </p>
                    <ul>
                        <li>Kingdom: Animalia</li>
                        <li>Phylum:	Chordata</li>
                        <li>class:	Reptilia</li>
                        <li>Order:	Testudines (tortoises & turtles)</li>
                        <li><b>Family:	Testudinidae (Tortoises)</b></li>
                    </ul>
                    <img className="articleImg" src={img_folder + '1.png'} alt={img_folder + '1.png'}></img>

                    <ScrollspyHeader />
                    <p>
                        As we can see, tortoises are part of the <b>Cryptodira</b> suborder. Also known as the Order of the Hidden-Necks (very cloak-and-dagger). This means they retract their neck back into their shell, like so:
                    </p>
                    <img className="articleImg" src={img_folder + '2.png'} alt={img_folder + '2.png'}></img>
                    <p>
                        This type of neck retraction is the one that probably comes to mind first when people imagine tortoises and turtles.
                    </p>
                    <p>
                        Meanwhile, we also have these weird side-necked turtles just letting it all hang out:
                    </p>
                    <img className="articleImg" src={img_folder + '3.png'} alt={img_folder + '3.png'}></img>
                    <p>
                        OK not that much, more like this:
                    </p>
                    <img className="articleImg" src={img_folder + '4.png'} alt={img_folder + '4.png'}></img>
                    <p>
                        Scientists say the difference in this mechanism is due to different skeletal structures of these two suborders, but I like to believe it's the side-eye being used as am effective defense-mechanism.
                    </p>
                    <p>
                        Anyway, to answer the original question, of why the neck retraction mechanism came about, paleontologists have found that it was likely not used originally for defense, but actually for <i>hunting</i> <a href="https://www.smithsonianmag.com/science-nature/real-reason-turtle-learned-hide-its-head-180962233/" title="Turtle neck retraction" target="_blank" rel="noreferrer">[1]</a>.
                        When they found fossil records of turtles with only partial retraction, it supported the idea that turtles, at this time still solely aquatic, would retract and launch it's head foward to surprise and capture its prey, (since partial retraction doesn't really seem like a great safety measure, it must be used for something else, and that something else we hypothesize to be hunting).
                        It was only later on, that full retraction would evolve from this into a true defensive mechanism.
                    </p>
                    {/* <h2>Where Are Tortoises in the World?</h2>
                        <p>Tortoises can come from a variety habitats. Deserts, grasslands, and forests, temperate and tropical. Here are the centroids of each species' ranges:</p>
                        <div className="d3-geomap" id="map">
                            <svg id="map-svg">
                            </svg> */}

                    <ScrollspyHeader />
                    <div id="stats-menu">
                    </div>
                    <p>
                        The largest known tortoise is a male <a href={'https://nationalzoo.si.edu/animals/aldabra-tortoise'} target={'_blank'} rel="noreferrer">Aldabra tortoise</a> named Esmeralda.
                        He comes in at 670 pounds and as of 2021 is 177 years old.
                        Meanwhile, the <a href={'https://www.inaturalist.org/taxa/606111-Chersobius-signatus'} target={'_blank'} rel="noreferrer">Speckled Cape tortoise</a> maxes out at 3 inches as an adult.
                    </p>
                    <img className="articleImg" src={img_folder + '5.png'} alt={img_folder + '5.png'}></img>
                    <img className="articleImg" src={img_folder + '6.png'} alt={img_folder + '6.png'}></img>
                    <p>
                        The variation in tortoise sizes is not random, however.
                        One study has found "strong support for different optimal sizes in turtles and tortoises that occupy different habitats" <a href="https://royalsocietypublishing.org/doi/10.1098/rsbl.2010.1084" title="Turtle body size" target="_blank" rel="noreferrer">[2]</a>.
                        Particularly, that marine turtles (not shown below) and island tortoises have much larger sizes than mainland tortoises and freshwater turtles.
                        We can take a look at that difference here:
                    </p>
                    {tortData && tortData != [] && <SVG1 data={tortData} />}
                    <p>
                        As usual, there does seem to be an evolutionary reason for physiological differences.
                        Since islands are more susceptible to adverse conditions than mainland, the larger size of island tortoises (<a href="https://en.wikipedia.org/wiki/Island_gigantism" title="Island gigantism" target="_blank" rel="noreferrer">Island Gigantism</a>), may be a way to deal with periods of drought (more volume for storing nutrients) and also aid in faster travel.
                        Sea tortoises have a similar reason in that many are migratory, and larger size is also more anti-predatory.
                    </p>
                    <p>
                        For mainland tortoises and turtles, the reasons for their smaller size are much more variable.
                        Generally smaller-sized organisms require less resources and burn less energy, but there are also many other factors in play,
                        such as the size of their predators and prey, as well as what the terrain they inhabit and the tasks they need to accomplish (e.g. burrowing).
                    </p>

                    <ScrollspyHeader />
                    {tortData && tortData != [] && <SVG2 data={tortData} />}
                    <p>
                        As we can see, of the tortoise species listed on reptile-database.org, the majority are at a conservation status of Vulnerable or worse.
                    </p>
                    <p className="last-content">
                        Like many other rare pets, a major reason for this is habitat destruction and the pet trade.
                        Currently, many tortoises that are available in local Petsmarts/Petcos are caught <a href="https://www.change.org/p/petsmart-and-petco-stop-selling-wild-caught-russian-tortoises-agrionemys-horsfieldii" target="_blank" rel="noreferrer">straight from the wild</a>.
                        This not only means the tortoise may be more likely to carry parasites, but more importantly directly threatens the stability of wild populations.
                        A much better alternative is to purchase tortoises from a breeder at a reptile convention or adopt from a rescue center.
                        While this will certainly be more expensive, these tortoise will be captive-bred, meaning they do not source directly from the already vulnerable wild populations.
                        If you would like to contribute to this cause, you can donate <a href="https://www.turtleconservancy.org/donate" title="Donate" target="_blank" rel="noreferrer">here</a> to help protect our endangered tortoises.
                    </p>
                </div>
            </TTProvider>
            {/* </div> */}
        </>
    )
}

export default TortoiseTaxonomy;
