import React from 'react'
// import { portfolioContext } from './Portfolio'

export default function PortfolioSection({ title = "Portfolio Section", summary = <p>Summary text</p>, content = " " }) {

    // const {image_folder, portfolioData} = useContext(portfolioContext);

    // format title for id
    const titleID = title.replace(' ','-');

    return (<>
        <section className='portfolio-section' id={titleID}>
            {/* {title ? <h2>{title}</h2>:<></>} */}
            {summary}
            {content}
        </section>
    </>
    )
}
