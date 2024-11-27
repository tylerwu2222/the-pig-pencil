import React, { useState, useEffect, createContext } from 'react'
import chroma from "chroma-js";

import ToggleTag from './ToggleTag';

import './TagsBox.css'
import { filter, select } from 'd3';

// context for tags object
export const TagContext = createContext();

export function getTags() {

};

// tag box component
export default function TagsBox({ posts, onChangeFn = () => { } }) {
    console.log('tag posts', posts);

    // get tags from data
    // filter for nonhidden posts (hidden not True)
    const nonhidden_data = posts.filter(d => d.Hidden != 'true');
    // console.log('tag postasda', nonhidden_data);
    // compile total tag list
    const nonhidden_tags_list = nonhidden_data.map(d => d.Tags);
    const nonhidden_tags = nonhidden_tags_list.flat();
    console.log('nht', nonhidden_tags);
    // compress all tags into dict of unique tags with count
    let tag_counts = {};
    nonhidden_tags.map(tag => {
        tag_counts[tag] = tag_counts[tag] ? tag_counts[tag] + 1 : 1
    })
    // create tag dictionary with name, count, order metric, and toggle
    const max_count = Math.max(...(Object.values(tag_counts))) // get max count for order metric
    let tag_object = Object.entries(tag_counts).map(t => {
        return { 'name': t[0], 'count': t[1], 'order': max_count - t[1], 'toggled': true }
    })

    // initialize selected tags
    const initial_all_tags = tag_object.map(t => t.name);
    const [selectedTags, setSelectedTags] = useState(initial_all_tags);
    const [tagObject, setTagObject] = useState(tag_object);
    // all filters selected
    const [allTagsSelected, setAllTagsSelected] = useState(true);

    // resets all tags to true
    const resetTags = () => {
        console.log('reseting tags');
        setTagObject(tagObject.map(t => {
            t.toggled = true;
            return t;
        }))
        setAllTagsSelected(true); // and set state variable to true
    };

    // toggles single tag
    const handleClick = (tag) => {
        // if all tags selected, only select clicked tag (set all other tags false, then set allTagsSelected false)
        if (allTagsSelected) {
            setTagObject(tagObject.map(t => {
                if (t.name != tag.name) {
                    t.toggled = false
                }
                return t
            }))
            setAllTagsSelected(false)
        }
        // else toggle tag in object
        else {
            // tag_object = tag_object.map(t => {
            setTagObject(tagObject.map(t => {
                if (t.name == tag.name) {
                    // console.log('clicked to toggle', t.name);
                    t.toggled = !t.toggled;
                }
                return t;
            }))
            // if last remaining tag (selectedTags[0]) is selected, reset tags
            if (selectedTags.length == 1 && tag.name == selectedTags[0]) {
                resetTags()
            }
        }
        // console.log('new TO', tagObject);
    };


    // when tags change, handle effects with onChangeFn (e.g. filter posts)
    useEffect(() => {
        onChangeFn(selectedTags)
    }, [selectedTags]);

    // sets allTagsSelectedTags to true if all tags are selected 
    // and update toggletag class for css purposes
    useEffect(() => {
        if (selectedTags.sort().join(',') == initial_all_tags.sort().join(',')) {
            setAllTagsSelected(true);
        }
    }, [selectedTags]);


    // when selectedTag changes, update class name list for toggletag
    useEffect(() => {
        let allToggles = document.querySelectorAll('.tag-fill-div');
        if (allTagsSelected == true) {
            allToggles.forEach(t => {
                t.classList.remove('tag-fill-div-untoggled');
                t.classList.remove('tag-fill-div-toggled');
            })
        }
        else {
            allToggles.forEach(t => {
                if (selectedTags.includes(t.getAttribute('text'))) {
                    t.classList.remove('tag-fill-div-untoggled');
                    t.classList.add('tag-fill-div-toggled');
                }
                else {
                    t.classList.remove('tag-fill-div-toggled');
                    t.classList.add('tag-fill-div-untoggled');
                }
            })
        }
    }, [selectedTags]);

    // updates selected tags list whenever selected tags change
    useEffect(() => {
        // console.log('new tags for ST');
        setSelectedTags(tagObject.filter(t => t.toggled == true).map(t => t.name))
    }, [tagObject]);

    // render
    return (
        <div className='tag-box-div'>
            <h4>Tags <span style={{ fontWeight: 400 }}>(click to filter)</span></h4>
            <div className='tag-box-btn-div'>
                {/* <input
                    className='tag-box-btn'
                    type='button'
                    value='sort A-Z'
                ></input>
                <input
                    className='tag-box-btn'
                    type='button'
                    value='sort ascending'
                ></input> */}
                {/* resets all tags to true; visible when not all tags selected */}
                <input
                    className='tag-box-btn'
                    type='button'
                    value='reset tags'
                    disabled={allTagsSelected ? true : false}
                    onClick={resetTags}
                ></input>
            </div>
            <TagContext.Provider value={tagObject}>
                <div className='tag-box-tag-div'>
                    {
                        tag_object.map(tag => {
                            return <ToggleTag
                                key={tag.name}
                                tag_text={tag.name}
                                tag_count={tag.count}
                                tag_order={tag.order}
                                max_count={max_count}
                                onClickFn={() => handleClick(tag)} />
                        })
                    }
                </div>
            </TagContext.Provider>
        </div>
    )
}
