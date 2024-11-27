const sortDictionary = {
    'author': 'Author',
    'date': 'Date',
    'title': 'Title',
    'topic': 'MainTag'
};

// filter for posts that include search keyword AND include selected tags
const filterPosts = (filterKeyword, selectedTags, posts, allColumns = false) => {
    console.log('filtering posts');
    const lowerKeyword = filterKeyword.toLowerCase()
    let postText;

    // wider search (all post attributes)
    if (allColumns == true) {
        let columns = Object.keys(posts[0])
        postText = posts.map(p => {
            let text = '';
            columns.map(c => {
                text += ' ' + p[c]
            })
            return text.toLowerCase()
        })
    }
    // narrower search
    else {
        postText = posts.map(p =>
            (p.Author + ' ' +
                p.Title + ' ' +
                p.Caption + ' ' +
                p.Date + ' ' +
                p.Languages + ' ' +
                p.Tags).toLowerCase()
        );
    }

    console.log('post text', postText);

    // check if keyword in any of posts' attribute text
    let filteredPosts = posts.filter((p, i) => {
        return postText[i].includes(lowerKeyword);
    })

    // if tags exist: check if any tag in selected tags list
    if (selectedTags.length > 0) {
        // console.log('selected tags', selectedTags);
        const postTags = posts.map(p => p.Tags);

        filteredPosts = filteredPosts.filter((p, i) => {
            return postTags[i].some(t => selectedTags.includes(t.trim())); // check
        })
    }
    return filteredPosts;
}

// sort posts by an attribute
const sortPosts = (sortOption, posts, ascending = true, postsType = "article") => {
    let sortedPosts = [...posts];
    let internalSortOption;
    console.log('sorting by', sortOption);
    if (postsType == "article") {
        // format date data
        if (sortOption == 'date') {
            sortedPosts = sortedPosts.map(obj => (
                { ...obj, numericDate: Date.parse(obj['Date']) }
            ));
        }
        // map sortOption using dictionary
        internalSortOption = sortDictionary[sortOption];
    }

    // console.log('sorted before', sortedPosts);
    // sort ascending
    if (ascending == true) {
        sortedPosts.sort((a, b) => (a[internalSortOption] > b[internalSortOption]) ? 1 : ((b[internalSortOption] > a[internalSortOption]) ? -1 : 0));
    }
    // descending
    else {
        sortedPosts.sort((b, a) => (a[internalSortOption] > b[internalSortOption]) ? 1 : ((b[internalSortOption] > a[internalSortOption]) ? -1 : 0));
    }
    // console.log('sorted after', sortedPosts);
    return sortedPosts;
};

// a general function that:
// (1) filters array of objects (AoO) by filter parameter
// (2) sorts AoO by a object key
export const filterSort = (content = [{}], filterParameter, selectedTags = [], sortParameter = null) => {
    let FSContent = [...content];

    // filter array
    FSContent = filterPosts(filterParameter, selectedTags, content);
    // sort array
    if (sortParameter) {
        FSContent = sortPosts(sortParameter, FSContent);
    }
    // console.log('FS',FSContent)

    return FSContent;
}