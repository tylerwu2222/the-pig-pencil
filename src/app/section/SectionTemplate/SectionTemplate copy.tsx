// style
import './SectionTemplate.css'
import '../Art/Art.css';
import '../Data/Data.css';
import '../Writing/Writing.css';
import '../Learning/Cheatsheets.css';
import '../People/Collaborators.css'

// modules
import { filterSort } from '@/app/lib/FilterSort';
import { CustomTextField } from '../../Modules/FormInput/CustomTextField/CustomTextField.js';
import { CustomSelect } from '../../Modules/FormInput/CustomSelect/CustomSelect.js';
import TagsBox from '../../Modules/FormInput/TagsBox/TagsBox.js';


import { PostThumbnail1, PostThumbnailPeople } from './PostThumbnail.jsx';

// react
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Post } from '@prisma/client';

interface SectionTemplateProps {
    postData: Post[];
    section: string;
    contentType: string;
    searchBarIncluded: boolean;
    sortPostsIncluded: boolean;
    tagBoxIncluded: boolean;
    // postTemplateType = 1
}

export default function SectionTemplate(
    {
        postData,
        section = '',
        contentType = '',
        searchBarIncluded = true,
        sortPostsIncluded = true,
        tagBoxIncluded = true,
        // postTemplateType = 1
    }: SectionTemplateProps
) {
    const location = useLocation();

    // set section title
    useEffect(() => {
        const route = location.pathname;
        console.log('route', route, 'section', section.toLowerCase());
        // Set the title based on the route
        if (route.includes(section.toLowerCase())) {
            // console.log(route, section);
            document.title = 'The Pig Pencil | ' + section;
        };
    }, [])

    // search & sort
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [sortOption, setSortOption] = useState('date');
    const [FSPosts, setFSPosts] = useState([]);

    // update displayed posts when any parameter changes
    useEffect(() => {
        console.log('post data', postData);
        setFSPosts(filterSort(postData, searchKeyword, selectedTags, sortOption));
        // console.log(Filter)
    }, [searchKeyword, sortOption, selectedTags]);

    return (
        <>
            <div className='container containerBottom container-top'>
                <div className="blog-container">
                    <div className='posts-navigation-div'>
                        {searchBarIncluded ? <CustomTextField contentType={' ' + contentType} onChangeFn={setSearchKeyword} /> : <></>}
                        {sortPostsIncluded ? <CustomSelect sortOption={sortOption} onChangeFn={setSortOption} /> : <></>}
                    </div>
                    <div className='empty-grid-div'>
                    </div>
                    <div className='posts-div'>

                        {
                            FSPosts.map(post => {
                                let comingSoon = false;
                                let displayPost = false;
                                if (!("Hidden" in post) || post.Hidden === "false") {
                                    displayPost = true;
                                }
                                else if (post.Hidden === "wip") {
                                    displayPost = true;
                                    comingSoon = true
                                }
                                // only display if hidden = T or W (WIP)
                                if (displayPost) {
                                    // generic section page
                                    if (postTemplateType == 1) {
                                        return <PostThumbnail1
                                            key={post.Title + post.Date}
                                            section={section}
                                            title={post.Title}
                                            img={'/img/thumbnails/' + section.toLowerCase() + '_thumbnails/' + post.Thumbnail}
                                            author={post[author]}
                                            date={post[date]}
                                            subPage={post.FileNameNoExt}
                                            comingSoon={comingSoon} />
                                    }
                                    // for collaborators page
                                    else if (postTemplateType == 2) {
                                        return <PostThumbnailPeople
                                            img={'/img/thumbnails/' + section.toLowerCase() + '_thumbnails/' + post.Name.toLowerCase().replace(' ', '_') + '.png'}
                                            author={post[author]}
                                            role={post[role]}
                                            date={post[date]}
                                            quote={post.Quote}
                                            lastPost={""}
                                        />
                                    }
                                }

                            })

                        }
                        <p style={{ display: FSPosts.length === 0 ? 'block' : 'none' }}>No posts matched these filters 😔</p>
                    </div>
                    {/* {tagBoxIncluded ? <div className='tags-div'>
                        <TagsBox posts={postData} onChangeFn={setSelectedTags} />
                    </div> : <></>} */}
                </div>
            </div>
        </>
    )
}
