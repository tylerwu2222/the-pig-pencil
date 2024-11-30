// type 
import { Post, Tag } from "@prisma/client";

// const sortDictionary = {
//     'author': 'Author',
//     'date': 'Date',
//     'title': 'Title',
//     'topic': 'MainTag'
// };

interface filterPostsProps {
    filterKeyword: string;
    selectedTags: Tag[];
    posts: Post[];
    allColumns: boolean;
}

// filter for posts that include search keyword AND include selected tags
const filterPosts = ({ filterKeyword, selectedTags, posts, allColumns = false }: filterPostsProps) => {
    // console.log('filtering posts');

    const lowerKeyword = filterKeyword.toLowerCase()
    let postText = '';

    // get posts joined with authors and tags

    // wider search (all post attributes)
    if (allColumns == true) {
        // let columns = Object.keys(posts[0])
        // postText = posts.map(p => {
        //     let text = '';
        //     columns.map(c => {
        //         text += ' ' + p[c]
        //     })
        //     return text.toLowerCase()
        // })
    }
    // narrower search
    else {
        // postText = 
        posts.map(p =>
            (
                // p.Author + ' ' +
                p.title + ' ' +
                p.caption + ' '
                // p.publishDate + ' ' +
                // p.Tags.join('')
            ).toLowerCase()
        );
    }

    console.log('post text', postText);

    // check if keyword in any of posts' attribute text
    let filteredPosts = posts.filter((p, i) => {
        return postText[i].includes(lowerKeyword);
    })

    // if tags exist: check if any tag in selected tags list
    // if (selectedTags.length > 0) {
    //     // console.log('selected tags', selectedTags);
    //     const postTags = posts.map(p => p.Tags);

    //     filteredPosts = filteredPosts.filter((p, i) => {
    //         return postTags[i].some(t => selectedTags.includes(t.trim())); // check
    //     })
    // }

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
    content: {}[];
    filterKeyword: string;
    selectedTags: Tag[];
    sortParameter: string | null;
}

// a general function that:
// (1) filters array of objects (AoO) by filter parameter
// (2) sorts AoO by a object key
export const filterSort = ({ content = [{}], filterKeyword, selectedTags = [], sortParameter = null }: filterSortProps) => {
    let FSContent = [...content];

    // filter array
    // FSContent = filterPosts({filterKeyword, selectedTags, content});

    // // sort array
    // if (sortParameter) {
    //     FSContent = sortPosts(sortParameter, FSContent);
    // }
    // console.log('FS',FSContent)

    return FSContent;
}