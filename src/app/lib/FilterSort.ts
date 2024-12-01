// type 
import { Tag } from "@prisma/client";
import { Post } from "@/types/extendedPrismaTypes";
import { formatDateToLongDate } from "./dateFormatting";

// const sortDictionary = {
//     'author': 'Author',
//     'date': 'Date',
//     'title': 'Title',
//     'topic': 'MainTag'
// };

interface filterPostsProps {
    filterKeyword: string | undefined;
    selectedTags: string[];
    posts: Post[];
}

// filter for posts that include search keyword AND include selected tags
const filterPosts = ({
    filterKeyword,
    selectedTags,
    posts }: filterPostsProps): Post[] => {

    let filteredPosts = posts;

    if (filterKeyword && filterKeyword.length > 0) {
        const lowerKeyword = filterKeyword.toLowerCase()
        let postStrings = [];

        // get posts joined with authors and tags

        postStrings =
            posts.map(p =>
                (
                    p.authors.join(' ') + ' ' +
                    p.title + ' ' +
                    p.caption + ' ' +
                    formatDateToLongDate(p.publishDate) + ' ' +
                    p.tags.join(' ')
                ).toLowerCase()
            );

        console.log('post strings', postStrings);

        // check if keyword in any of posts' attribute text
        filteredPosts = posts.filter((p, i) => {
            return postStrings[i].includes(lowerKeyword);
        })
    }
    // if tags exist: check if any tag in selected tags list
    if (selectedTags && selectedTags.length > 0) {
        const postTags = posts.map(p => p.tags);
        filteredPosts = filteredPosts.filter((p, i) => {
            return postTags[i].some(tag => selectedTags.includes(tag)); // check
        })
        // }
    }

    return filteredPosts;
}


interface sortPostsProps {
    sortOption: string;
    posts: Post[];
    ascending: boolean;
    postsType: string;
}

// sort posts by an attribute
const sortPosts = ({ sortOption, posts, ascending = true, postsType = "article" }: sortPostsProps) => {
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
    posts: Post[];
    filterKeyword: string | undefined;
    selectedTags: string[];
    sortParameter: string | null;
}

// a general function that:
// (1) filters array of objects by filter parameter
// (2) sorts AoO by a object key
export const filterSort = ({
    posts = [],
    filterKeyword,
    selectedTags = [],
    sortParameter = null }: Partial<filterSortProps>) => {
    let FSContent = [...posts];

    // filter array
    FSContent = filterPosts({ filterKeyword, selectedTags, posts });

    // // sort array
    // if (sortParameter) {
    //     FSContent = sortPosts(sortParameter, FSContent);
    // }
    console.log('FS',FSContent)

    return FSContent;
}