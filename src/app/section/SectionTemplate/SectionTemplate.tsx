'use client'

// import prisma from '@/db';

// modules
import { filterSort } from '@/app/lib/FilterSort';
import SearchInput from '@/app/components/inputs/SearchInput/SearchInput';
import { DropdownInputRadio } from '@/app/components/inputs/DropdownInput/DropdownInputRadio';
// import { CustomTextField } from '../../Modules/FormInput/CustomTextField/CustomTextField.js';
// import { CustomSelect } from '../../Modules/FormInput/CustomSelect/CustomSelect.js';
// import TagsBox from '../../Modules/FormInput/TagsBox/TagsBox.js';


import { PostThumbnail1 } from './PostThumbnail';

// react
// import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Tag } from '@prisma/client';
import { Post } from '@/types/extendedPrismaTypes';

interface SectionTemplateProps {
    // postData: Post[];
    section: string;
    contentType: string;
    searchBarIncluded: boolean;
    sortPostsIncluded: boolean;
    tagBoxIncluded: boolean;
    // postTemplateType = 1
}

export default function SectionTemplate(
    {
        // postData,
        section = '',
        contentType = '',
        searchBarIncluded = true,
        sortPostsIncluded = true,
        tagBoxIncluded = true,
        // postTemplateType = 1
    }: Partial<SectionTemplateProps>
) {
    // const location = useLocation();

    // // set section title
    // useEffect(() => {
    //     const route = location.pathname;
    //     console.log('route', route, 'section', section.toLowerCase());
    //     // Set the title based on the route
    //     if (route.includes(section.toLowerCase())) {
    //         // console.log(route, section);
    //         document.title = 'The Pig Pencil | ' + section;
    //     };
    // }, [])


    const [loaded, setLoaded] = useState<boolean>(false);
    // search, filter, sort
    const [searchValue, setSearchValue] = useState<string>('');
    const [allTags, setAllTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [sortOption, setSortOption] = useState('date');

    // posts
    const [allPosts, setAllPosts] = useState<Post[]>([])
    const [FSPosts, setFSPosts] = useState<Post[]>([]);

    // update displayed posts when any parameter changes
    useEffect(() => {
        // setFSPosts(filterSort(postData, searchKeyword, selectedTags, sortOption));
        // console.log(Filter)
    }, [searchValue, sortOption, selectedTags]);

    // initialize posts for section
    useEffect(() => {
        const getSectionPosts = async () => {
            const res = await fetch(`/api/${section}/posts`);

            const posts = await res.json();
            console.log('FE: posts', posts);
            setAllPosts(posts);
            setLoaded(true);
        }
        getSectionPosts();
    }, []);

    const handleSearchKeywordChange = (newSearchValue: string) => {
        setSearchValue(newSearchValue);
    }

    const handleSortOptionChange = (newSortOption: string) => {
        setSortOption(newSortOption)
    }

    return (
        <>

            <div className='py-3 px-[3%] xl:px-[20%]'>
                {/* search + sort div */}
                <div className='grid grid-cols-6 gap-2 p-[2vh]'>
                    {searchBarIncluded ?
                        <div className='col-span-5'>
                            <SearchInput value={searchValue} onValueChangeFn={(e) => { handleSearchKeywordChange(e.target.value) }} placeholder={'search ' + section} />
                            <div className='px-3 pt-2'>
                                <i className='text-gray-500 min-h-[1em]'>{searchValue.length > 0 ? "Results for '" + searchValue + "'" : '\u00A0'}</i>
                            </div>
                        </div>
                        : <></>}
                    {sortPostsIncluded ?
                        <div className='col-span-1'>
                            <DropdownInputRadio value={sortOption} onValueChangeFn={(e) => { handleSortOptionChange(e.target.value) }} />
                        </div>
                        : <></>}
                </div>
                {/* content div */}
                <div className='grid grid-cols-3 justify-items-center'>
                    {loaded ? (allPosts.length > 0 ?
                        allPosts.map((post: Post) => {
                            // generic section page
                            return <PostThumbnail1
                                key={post.title + post.publishDate}
                                post={post}
                            // img={'/img/thumbnails/' + section.toLowerCase() + '_thumbnails/' + post.thumbnail}
                            />
                        })
                        : <p style={{ display: FSPosts.length === 0 ? 'block' : 'none' }}>No posts matched these filters 😔</p>
                    ) :
                        <></>
                    }
                </div>
                {/* tag box div */}
                {/* {tagBoxIncluded ? <div className='tags-div'>
                        <TagsBox posts={postData} onChangeFn={setSelectedTags} />
                    </div> : <></>} */}
            </div>
        </>
    )
}
