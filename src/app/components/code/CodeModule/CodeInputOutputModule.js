import React, { useState } from 'react';

import CodeOutputModule from './CodeOutputModule';

import './CodeModule.css'

export default function CodeInputOutputModule({
    htmlCode = null,
    jsCode = null,
    cssCode = null,
    outputModule = null,

}) {
    
    const srcCode = `<html>
        <body>${htmlCode}</body>
        <style>${cssCode}</style>
        <script>${jsCode}</script>
    </html>`;

    return (
        <>
            <div className='editor-container'>
                <CodeOutputModule srcDoc = {srcCode}/>
            </div>

        </>
    );
}
