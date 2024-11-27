import React, { ReactNode } from 'react'
// import { portfolioContext } from './Portfolio'

interface PortfolioSectionProps{
    title: string,
    summary: ReactNode,
    content: ReactNode
}

export default function PortfolioSection({ title = "Portfolio Section", summary = <p>Summary text</p>, content = <></> }) {

    // const {image_folder, portfolioData} = useContext(portfolioContext);

    // format title for id
    const titleID = title.replace(' ','-');

    return (<>
        <section className='m-[1vh] px-[1vh] py-[2vh] bg-slate-300' id={titleID}>
            {/* {title ? <h2>{title}</h2>:<></>} */}
            {summary}
            {content}
        </section>
    </>
    )
}
