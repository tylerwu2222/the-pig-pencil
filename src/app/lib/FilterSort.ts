// type 
import { Tag } from "@prisma/client";
import { Author, Post } from "@/types/extendedPrismaTypes";
import { formatDateToLongDate } from "./dateFormatting";


function isPost(content: any): content is Post[] {
    return Array.isArray(content) && content.every(item => 'title' in item && 'slug' in item);
}

function isAuthor(content: any): content is Author[] {
    return Array.isArray(content) && content.every(item => 'name' in item && 'pigThoughts' in item);
}

interface filterContentProps {
    filterKeyword: string | undefined;
    selectedTags: string[];
    content: (Post | Author)[];
}

// filter for posts that include search keyword AND include selected tags
const filterContent = ({
    filterKeyword,
    selectedTags,
    content }: filterContentProps): (Post | Author)[] => {

    let filteredContent = content;

    if (filterKeyword && filterKeyword.length > 0) {
        const lowerKeyword = filterKeyword.toLowerCase()
        let contentMetaStrings: string[] = [];

        // get posts joined with authors and tags
        if (isPost(content)) {
            contentMetaStrings =
                content.map((p: Post) =>
                    (
                        p.authors.join(' ') + ' ' +
                        p.title + ' ' +
                        p.caption + ' ' +
                        formatDateToLongDate(p.publishDate) + ' ' +
                        p.tags.join(' ')
                    ).toLowerCase()
                );
        }
        else if (isAuthor(content)) {
            contentMetaStrings =
                content.map((a: Author) =>
                    (
                        a.name + ' ' +
                        a.role + ' ' +
                        a.pigThoughts + ' ' +
                        a.internalLink + ' ' +
                        a.email + ' ' +
                        a.quote + ' ' +
                        a.tags.join(' ')
                    ).toLowerCase()
                );
        }


        console.log('metastrings', contentMetaStrings);

        // check if keyword in any of contents' metastrings
        filteredContent = content.filter((p, i) => {
            return contentMetaStrings[i].includes(lowerKeyword);
        })
    }
    // if tags exist: check if any tag in selected tags list
    if (selectedTags && selectedTags.length > 0) {
        const postTags = content.map(p => p.tags);
        filteredContent = filteredContent.filter((p, i) => {
            return postTags[i].some(tag => selectedTags.includes(tag)); // check
        })
        // }
    }

    return filteredContent;
}


interface sortContentProps {
    sortOption: string;
    posts: (Post | Author)[];
    ascending: boolean;
    postsType: string;
}

// sort posts by an attribute
const sortContent = ({ sortOption, posts, ascending = true, postsType = "article" }: sortContentProps) => {
    let sortedPosts = [...posts];
    let internalSortOption = '';

    console.log('sorting by', sortOption);
    if (postsType == "article") {
        // format date data
        if (sortOption == 'date') {
            sortedPosts = sortedPosts.map(post => (
                { ...post, numericDate: post.publishDate }
            ));
        }
        // map sortOption using dictionary
        // internalSortOption = sortDictionary[sortOption];
    }

    // console.log('sorted before', sortedPosts);
    // sort ascending
    // if (ascending == true) {
    //     sortedPosts.sort((a, b) => (a[sortOption] > b[sortOption]) ? 1 : ((b[sortOption] > a[sortOption]) ? -1 : 0));
    // }
    // // descending
    // else {
    //     sortedPosts.sort((b, a) => (a[sortOption] > b[sortOption]) ? 1 : ((b[sortOption] > a[sortOption]) ? -1 : 0));
    // }

    // console.log('sorted after', sortedPosts);
    return sortedPosts;
};


interface filterSortProps {
    content: (Post | Author)[];
    filterKeyword: string | undefined;
    selectedTags: string[];
    sortParameter: string | null;
}

// a general function that:
// (1) filters array of objects by filter parameter
// (2) sorts AoO by a object key
export const filterSort = ({
    content = [],
    filterKeyword,
    selectedTags = [],
    sortParameter = null }: Partial<filterSortProps>) => {
    let FSContent: (Post | Author)[] = [...content];

    // filter array
    FSContent = filterContent({ filterKeyword, selectedTags, content });

    // // sort array
    // if (sortParameter) {
    //     FSContent = sortPosts(sortParameter, FSContent);
    // }
    console.log('FS', FSContent)

    return FSContent;
}