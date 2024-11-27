import './OpeningDialogue.css'

export default function OpeningDialogue() {
    const loops = 10;
    const fontSize = 18;
    const loopedDialogueIndex = Array.from({ length: loops }, (v, index) => index);

    const Dialogue = <>
        <li>
            <b>Q: </b>Why?
        </li>
        <li>
            <b>A: </b>Good question.
        </li>
        <li className='indented-li'>
            I think it will be a useful skill if I'm going to be a data analyst or data journalist one day.
        </li>
        <li>
            <b>Q: </b>How so?
        </li>
        <li>
            <b>A: </b>Well, I think with data I can really learn about anything -- I won’t have any regrets.
        </li>
        <li className='indented-li'>
            I made a lot of <a href='https://thepigpencil.com/art' target='_blank'>art</a> growing up and it was fueled by something primitively human.
        </li>
        <li>
            <b>Q: </b>Why?
        </li>
        <li>
            <b>A: </b>Maybe to find connection with other people. In the shared human experience.

        </li>
        <li className='indented-li'>
            I want to make things where people can lose themselves in and find something by the end of it.
        </li>
        <li className='indented-li'>
            A piece of art, literature, media that is truly immersive. One that you leave different from when you first entered.
        </li>
        <li>
            <b>Q: </b> Ok. That's great.
        </li>
        <li>
            <b>A: </b>Yup, I'm learning data visualization for the web.
        </li>
    </>;

    return (
        <>
            <p style={{ fontSize: fontSize, fontWeight: 600 }}>
                I'm learning data visualization for the web.
            </p>
            < ul className='opening-dialogue' >

                {loopedDialogueIndex.map((item, index) => {
                    return <span style={{ fontSize: fontSize - index * 2 }}>{Dialogue}</span>;
                })
                }
                <p>
                    ✨Congratulations, you made it to the end and now you know my story: I'm learning data visualization for the web.✨
                </p>
            </ul >
        </>
    )
}
