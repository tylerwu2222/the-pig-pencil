import React, { useState, useCallback, useEffect } from 'react';

import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { basicLight, basicDark } from '@uiw/codemirror-theme-basic'
import { githubLight, githubDark } from '@uiw/codemirror-theme-github'
import { javascript } from '@codemirror/lang-javascript';
import { tags as t } from '@lezer/highlight';

// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';
// import 'codemirror/mode/xml/xml';
// import 'codemirror/mode/javascript/javascript';
// import 'codemirror/mode/css/css';
// import { Controlled as ControlledEditor } from 'react-codemirror2'

import './CodeModule.css'

export default function CodeInputModule({
    codeValue = "console.log('d3 chart')",
    language = 'javascript',
    codeTitle = 'header',
    onChange = null
}) {
    const [value, setValue] = useState(codeValue);
    const [currTheme, setCurrTheme] = useState(githubDark);

    if (onChange == null) {
        onChange = setValue;
    };


    // render code when it changes...
    useEffect(() => {
    }, []);

    // update code value
    const handleChange = useCallback((val, ViewUpdate) => {
        // console.log('val:', val);
        onChange(val);
    }, []);

    return (
        <>
            <div className='editor-container'>
                <div className='editor-title'>
                    {codeTitle}
                </div>
                <CodeMirror
                    className='code-mirror-wrapper'
                    value={value}
                    height="200px"
                    theme={currTheme}
                    extensions={[javascript({ jsx: true })]}
                    onChange={handleChange} />

            </div>

        </>
    );
}
