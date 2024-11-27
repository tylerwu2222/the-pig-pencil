import React from 'react'
import Scrollspy, { ScrollspyHeader } from '../../../../components/Modules/Scrollspy/Scrollspy.js';
import CodeOutputModule from '../../../../components/Modules/CodeModule/CodeOutputModule.js';
import CodeInputModule from '../../../../components/Modules/CodeModule/CodeInputModule.js';
import CodeInputOutputModule from '../../../../components/Modules/CodeModule/CodeInputOutputModule.js';


import './2023-09-20-d3js-intro-part-1.css'

export default function D3JsIntroPart1() {
    const sectionTitles = [
        'Notes',
        'How D3 works',
        'SVGs and basic D3 functions',
        'Loading Data'
    ];

    const chart1HTMLCode = `<div id='chartDivSVG'><p>Test paragraph</p></div>`;

    const chart1D3Code = `const chartDiv = d3.select('#chartDivSVG';
chartDiv.append("svg")
    .attr("id","chartDivSVG")
    .style("width","200px")
    .style("height","200px")
    .style("background-color","#F2B0C9");`;


    const chart2Code = `d3.select('#chartDivSVG').append('svg');`

    return (
        <>
            <Scrollspy sectionTitles={sectionTitles} />
            <div className='container-narrow'>
                <ScrollspyHeader />
                <p>notes notes notes</p>
                <ScrollspyHeader />
                <p>So you're here to learn D3.js or Data-driven-documents-dot-js</p>
                <p>If you've had experience with typical plotting packages in R or Python like ggplot or matplotlib,
                    this will be a bit of a different experience.
                </p>
                <p>Unlike something like ggplot, which plots by adding layers (geoms) on top of a canvas,
                    D3 connects each data mark (i.e. a point, bar, or line) to an element in the HTML document.
                    So it kind of works something like this:</p>
                <img src='d3_js_intro_part_1_image1.png' alt='d3-p1-image'></img>
                <ScrollspyHeader />
                <p>The "canvas" of a D3 visualization is the <code>svg</code> element.</p>
                <p>Let's try creating an SVG element. The below code selects
                    the <code>&lt;div&gt;</code> with id <code>#d3-chart-div-1</code> (outlined in red), and appends (inserts)
                    an <code>svg</code> into it, (which I filled as pink for visibility). Feel free to play around with
                    the width/height/color to see how the <code>svg</code> changes!</p>

                <CodeInputModule
                    codeValue={chart1HTMLCode}
                    language='xml'
                    codeTitle='D3 chart HTML' />

                <CodeInputModule
                    codeTitle='SVG in D3' />

                <CodeInputOutputModule
                    outputModule={<CodeOutputModule />}
                />


                <p>In the above cell, the <code>append()</code> function takes the <code>&lt;div&gt;</code> element
                    and inserts an <code>&lt;svg&gt;</code> into its body, so the <code>&lt;svg&gt;</code> becomes its child,
                    (I now realize this sounds like conception).</p>
                <p>You'll also notice that there are many other functions "chained" onto this expression,
                    i.e. after the <code>append()</code> part. This is pretty common in D3.</p>
                <p>The <code>attr()</code> function can specify properties like width, height, (radius for circles), class, id, etc...
                    <code>style()</code> is another option that can be used with shape, size, color, and it will override any CSS styling.</p>
                <p>Speaking of CSS, it's usually preferred that any styling of marks (points, bars, lines) and the SVG,
                    are styled directly with <code>attr()</code> or <code>style()</code> rather than in CSS.</p>


                <p>The last common function you'll see with D3 is the <code>select()</code> function.</p>
                <p>Try using it to select the div from the first code module using it's ID
                    and change it's background color</p>
                {/* <CodeModule
                    chartCode={chart2Code}/> */}

                <ScrollspyHeader />
                <p>The last thing we'll cover with today's lesson is loading data.</p>
                {/* <D3CodeModule
                    chartCode={chart3Code}
                    codeDivID='d3-code-div-3'
                    chartDivID='d3-chart-div-3'
                /> */}
            </div>


        </>
    )
}
