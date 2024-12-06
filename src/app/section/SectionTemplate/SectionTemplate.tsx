'use client'

// import Head from 'next/head';
import { usePathname } from 'next/navigation';

// modules
import SearchInput from '@/app/components/inputs/SearchInput/SearchInput';
import { DropdownInputRadio } from '@/app/components/inputs/DropdownInput/DropdownInputRadio';
// import TagsBox from '../../Modules/FormInput/TagsBox/TagsBox.js';
import { PostThumbnail1 } from './PostThumbnail';

// react
import { useEffect, useState } from 'react';

// filter sort
import { filterSort } from '@/app/lib/FilterSort';

// types
import { Post } from '@/types/extendedPrismaTypes';


const searchKeywordMap: Record<string, string> = {
    'data': 'data stories',
    'cheatsheet': 'cheatsheets',
    'tutorial': 'tutorials',
    'project': 'projects'
}

interface SectionTemplateProps {
    section: string;
    contentType: string;
    searchBarIncluded: boolean;
    sortPostsIncluded: boolean;
    tagBoxIncluded: boolean;
    // postTemplateType = 1
}

export default function SectionTemplate(
    {
        section = '',
        contentType = '',
        searchBarIncluded = true,
        sortPostsIncluded = true,
        tagBoxIncluded = true,
        // postTemplateType = 1
    }: Partial<SectionTemplateProps>
) {

    const pathname = usePathname();
    const pathnameSegments = pathname.split('/')
    const pathNameLast = pathnameSegments[pathnameSegments.length - 1]
    console.log('path name last', pathNameLast);
    const baseTitle = 'The Pig Pencil';

    const [loaded, setLoaded] = useState<boolean>(false);
    // search, filter, sort
    const [searchValue, setSearchValue] = useState<string>('');
    const [allTags, setAllTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [sortOption, setSortOption] = useState('date');

    // posts
    const [allPosts, setAllPosts] = useState<Post[]>([])
    const [FSPosts, setFSPosts] = useState<Post[]>([]);

    // update displayed posts when any search/filter parameter changes
    useEffect(() => {
        const subsetPosts = filterSort({ posts: allPosts, filterKeyword: searchValue, selectedTags: selectedTags })
        setFSPosts(subsetPosts);
        // console.log(Filter)
    }, [searchValue, sortOption, selectedTags]);

    // initialize posts for section
    useEffect(() => {
        const getSectionPosts = async () => {
            const res = await fetch(`/api/${section}/posts`);

            const posts = await res.json();
            console.log('FE: posts', posts);
            setAllPosts(posts);
            setFSPosts(posts);
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
            <title>{baseTitle + ' | ' + pathNameLast.charAt(0).toUpperCase() + pathNameLast.slice(1)}</title>
            <div className='py-3 px-[3%] xl:px-[20%]'>
                {/* search + sort div */}
                <div className='grid grid-cols-6 gap-2 p-[2vh]'>
                    {searchBarIncluded ?
                        <div className='col-span-5'>
                            <SearchInput
                                value={searchValue}
                                onValueChangeFn={(e) => { handleSearchKeywordChange(e.target.value) }}
                                placeholder={'search ' + searchKeywordMap[section]}
                            />
                            <div className='px-3 pt-2'>
                                <i className='text-gray-500 min-h-[1em]'>{searchValue.length > 0 ? FSPosts.length + " results for '" + searchValue + "'" : '\u00A0'}</i>
                            </div>
                        </div>
                        : <></>}
                    {sortPostsIncluded ?
                        <div className='col-span-1'>
                            <DropdownInputRadio
                                value={sortOption}
                                onValueChangeFn={(e) => { handleSortOptionChange(e.target.value) }}
                                options={['date - oldest', 'date - newest', 'author', 'views', 'oinks']}
                            />
                        </div>
                        : <></>}
                </div>
                {/* content div */}
                <div className='grid grid-cols-3 justify-items-center'>
                    {loaded ? (FSPosts.length > 0 ?
                        FSPosts.map((post: Post) => {
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
