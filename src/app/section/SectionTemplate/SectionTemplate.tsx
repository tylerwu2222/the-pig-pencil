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
import { filterSort } from '@/lib/FilterSort';

// types
import { Post, Author } from '@/types/extendedPrismaTypes';
import CollaboratorThumbnail from './CollaboratorThumbnail';
import ArtThumbnail from './ArtThumbnail';


const searchKeywordMap: Record<string, string> = {
    'data': 'data stories',
    'writing': 'writing',
    'cheatsheets': 'cheatsheets',
    'tutorial': 'tutorials',
    'project': 'projects',
    'collaborators': 'collaborators'
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

    // update tab title
    const pathname = usePathname();
    const pathnameSegments = pathname.split('/')
    const pathNameLast = pathnameSegments[pathnameSegments.length - 1]
    const baseTitle = 'The Pig Pencil';

    const [loaded, setLoaded] = useState<boolean>(false);
    // search, filter, sort
    const [searchValue, setSearchValue] = useState<string>('');
    const [allTags, setAllTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [sortOption, setSortOption] = useState('date');
    // posts
    const [allContent, setAllContent] = useState<(Post | Author)[]>([])
    const [FSContent, setFSContent] = useState<(Post | Author)[]>([]);

    // update parameters depending on section
    let sortOptions = ['alphabetical', 'date - oldest', 'date - newest', 'author', 'views', 'oinks']
    if (section == 'collaborators') {
        sortOptions = ['alphabetical', 'newest post', 'total posts', 'total views', 'total oinks']
    }
    else if (section == 'art') {
        sortOptions = ['alphabetical', 'recently updated', 'views', 'oinks']
    }


    // update displayed posts when any search/filter parameter changes
    useEffect(() => {
        const subsetContent = filterSort({ content: allContent, filterKeyword: searchValue, selectedTags: selectedTags })
        setFSContent(subsetContent);
        // console.log(Filter)
    }, [searchValue, sortOption, selectedTags]);

    // initialize content for section
    useEffect(() => {
        const getSectionPosts = async () => {
            let res;
            if (section == 'collaborators') {
                res = await fetch('/api/authors');
            }
            // else if (section == 'art'){

            // }
            else {
                res = await fetch(`/api/${section}/posts`);
            }
            const posts = await res.json();
            console.log('FE: posts', posts);
            setAllContent(posts);
            setFSContent(posts);
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

    let contentSection;
    if (section == 'collaborators') {
        contentSection = <div className='grid grid-cols-3 justify-items-center'>
            {loaded ? (FSContent.length > 0 ?
                (FSContent as Author[]).map((author: Author) => {
                    // generic section page
                    return <CollaboratorThumbnail
                        key={author.name}
                        collaborator={author}
                    />
                })
                : <p style={{ display: FSContent.length === 0 ? 'block' : 'none' }}>No collaborators matched these filters 😔</p>
            ) :
                <></>
            }
        </div>
    }
    // else if (section == 'art') {
    //     contentSection = <div className='grid grid-cols-3 justify-items-center'>
    //         {loaded ? (FSContent.length > 0 ?
    //             FSContent.map((post: Post) => {
    //                 // generic section page
    //                 return <ArtThumbnail />
    //             })
    //             : <p style={{ display: FSContent.length === 0 ? 'block' : 'none' }}>No art series matched these filters 😔</p>
    //         ) :
    //             <></>
    //         }
    //     </div>
    // }
    else {
        contentSection = <div className='grid grid-cols-3 justify-items-center'>
            {loaded ? (FSContent.length > 0 ?
                (FSContent as Post[]).map((post: Post) => {
                    // generic section page
                    return <PostThumbnail1
                        key={post.title + post.publishDate}
                        post={post}
                    // img={'/img/thumbnails/' + section.toLowerCase() + '_thumbnails/' + post.thumbnail}
                    />
                })
                : <p style={{ display: FSContent.length === 0 ? 'block' : 'none' }}>No posts matched these filters 😔</p>
            ) :
                <></>
            }
        </div>
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
                                <i className='text-gray-500 min-h-[1em]'>{searchValue.length > 0 ? FSContent.length + " results for '" + searchValue + "'" : '\u00A0'}</i>
                            </div>
                        </div>
                        : <></>}
                    {sortPostsIncluded ?
                        <div className='col-span-1'>
                            <DropdownInputRadio
                                value={sortOption}
                                onValueChangeFn={(e) => { handleSortOptionChange(e.target.value) }}
                                options={sortOptions}
                            />
                        </div>
                        : <></>}
                </div>
                {contentSection}
                {/* tag box div */}
                {/* {tagBoxIncluded ? <div className='tags-div'>
                        <TagsBox posts={postData} onChangeFn={setSelectedTags} />
                    </div> : <></>} */}
            </div>
        </>
    )
}
