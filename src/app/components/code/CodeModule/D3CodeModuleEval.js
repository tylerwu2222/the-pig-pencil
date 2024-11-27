import React, { useState, useEffect, useRef } from 'react';

import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

import * as d3 from 'd3';

import '../CodeDiv/CodeDiv.css';

// import CodeDiv from '../CodeDiv/CodeDiv';
export default function D3CodeModuleEval({ chartCode = "console.log('c2');", codeDivID = "codeDiv" ,chartDivID = "chartDiv" }) {
    window.Prism = window.Prism || {};
    window.Prism.manual = true;

    const [code, setCode] = useState(chartCode);

    // highlight all code
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    // reset code
    const resetCode = () => {
        const codeBlock = document.querySelector('.code-block-code>code');
        codeBlock.innerHTML = chartCode;
        setCode(chartCode);
        Prism.highlightAll();
    }

    // update code when changed
    const handleInputChange = (event) => {
        setCode(event.target.textContent); // Update the state with the new content
        
    };

    const executeD3Code = (code) => {

    }

    // evaluate code when changed
    useEffect(() => {
        const chartDiv = d3.select('#' + chartDivID);
        chartDiv.selectAll('*').remove();
        try {
            // console.log('gvar',gvar)
            eval(`(function(d3) { console.log('passed in d3',d3.select('#')) })(d3)`)
            eval(code);
        } catch (error) {
            setCode('')
            console.log(error)
        }
    }, [code]);

    return <>
        <div>
            <div className='code-div' title='Edit me!'>
                <span className='reset-button-span'>
                    <input
                        type='button'
                        value='reset code'
                        onClick={resetCode}></input>
                </span>
                <pre
                    id={chartDivID + '-pre'}
                    className="code-block-code language-javascript"
                    contentEditable="true"
                    onInput={handleInputChange}
                >
                    <code>
                        {chartCode}
                    </code>
                </pre>
            </div>
            <div id={chartDivID}>
            </div>
        </div>
    </>;
}
