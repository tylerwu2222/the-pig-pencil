// responsible for updating json metadata for the art section


const fs = require('fs-extra');
const path = require('path');


function updateArtJson() {
    // map data + visualization imports from articles to json: articlesData.json
    try {
        const artPostsDirectory = path.resolve(__dirname, '../../posts/art');
        // const visualsSubdirectory = path.resolve(__dirname, '../visuals/', section);
        console.log('art subdirectory', artPostsDirectory);
    } catch (error) {
        console.error('Error updating JSON file:', error);
    }

}

updateArtJson();