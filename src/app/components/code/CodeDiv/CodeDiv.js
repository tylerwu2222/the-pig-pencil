import React, {useState, useEffect} from 'react'

import './CodeDiv.css'

// import * as d3 from 'd3';


export default function CodeDiv({starterCode = 'console.log(c)', outputElt = <></>, language = 'language-javascript' }) {

    const [code, setCode] = useState(starterCode);

    // update code when changed
    const handleInputChange = (event) => {
        // setCode(event.target.value); // Update the state with the new content
        setCode(event.target.textContent); // Update the state with the new content
    };

    // evaluate code when changed
    useEffect(() => {
        outputElt.selectAll('*').remove();
        try{
            eval(code);
        }catch (error){
            console.log(error)
        }
    }, [code]);

    return (
        <div className='code-div' title='Edit me!'>
            <code
                className={"code-block-code " + language}
                contentEditable="true"
                onInput={handleInputChange}
            >
                {starterCode}
            </code>
        </div>
    )
}
