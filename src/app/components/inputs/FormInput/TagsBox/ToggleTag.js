import React, { useState, useEffect, useContext } from 'react';
import { TagContext } from './TagsBox';

export default function ToggleTag({ tag_text = 'a', tag_count = 0, tag_order = 1, max_count = 1, onClickFn = () => { } }) {
    const [toggled, setToggled] = useState(true);

    const tagObject = useContext(TagContext);

    // when task_object changes, update toggled stat
    useEffect(() => {
        setToggled(tagObject.filter(t=>t.name==tag_text)[0].toggled)
    }, [tagObject]);
    
   

    const tag_content = tag_count == null ? tag_text : tag_text + ' (' + tag_count + ')'
    return <>
        <div className='tag-div' style={{ order: tag_order }} onClick={() => {
            onClickFn(); // run click fn
            // setClicked(!clicked); // toggle click
        }}>
            <div
                // className = {toggled ? 'tag-fill-div tag-fill-div-toggled':'tag-fill-div tag-fill-div-untoggled'}
                className = {'tag-fill-div'}
                style={{ width: String(tag_count / max_count * 95) + '%' }}
                title={'click to filter for ' + tag_text}
                text={tag_text}
            >
                <span className='tag-p'>
                    {tag_content}
                </span>
            </div>
        </div>
    </>
};
