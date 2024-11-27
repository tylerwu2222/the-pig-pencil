import React, { useEffect } from 'react'

import './InteractiveDragBox.css'

export default function InteractiveDragBox({ dragText = 'Yes, here.' }) {
    useEffect(() => {
        return () => {
        };
    }, []);

    return (
        <div className='drag-and-drop-area'>
            <p>{dragText}</p>
        </div>
    )
}
