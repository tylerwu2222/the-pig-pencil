import React from 'react'

export default function PDFIframe({ iframeSrc }: { iframeSrc: string }) {
    return (
        <div className='w-full h-[70vh]'>
            <iframe className='w-full h-[70vh]' src={iframeSrc}></iframe>
        </div>
    )
}
