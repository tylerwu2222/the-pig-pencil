// responsible for updating json metadata for the following sections:
// data, tool, tutorial, writing

// run this script by typing: npm run update-articles

const fs = require('fs-extra');
const path = require('path');
const grayMatter = require('gray-matter');

const sections = ['cheatsheet', 'data', 'projects', 'tutorial', 'writing'];
// const image_formats = ['.png', '.jpg', '.jpeg'];

// recursive function that collects metadata from all mdx files in given directory
const collectDataFromDirectory = (directory, currentIndex = 0) => {
  // get content of directory
  const content = fs.readdirSync(directory);

  // holds file content of directory
  let result = [];
  let visuals = [];

  // Check for MDX files in the current directory 
  const mdxFiles = content.filter((file) => file.endsWith('.mdx') && !file.includes('template.mdx'));

  // if directory is visuals, update visuals
  console.log('directory',directory);
  const splitDirectory = directory.split("\\")
  if (splitDirectory[splitDirectory.length - 1] == 'visuals'){
    visuals = content.filter((file) => file.startsWith('svg') && file.endsWith('.js'))
  }

  // if contains MDX file, then we know it's a "leaf" directory
  if (mdxFiles.length > 0) {
    // console.log('includes mdx files');
    // Process MDX files
    result = mdxFiles.map((mdxFile) => {
      const mdxContent = fs.readFileSync(path.join(directory, mdxFile), 'utf8');
      const { data, content } = grayMatter(mdxContent);
      const fileNameNoExt = mdxFile.split('.mdx')[0];
      let images = null;

      // this checks if the graymatter includes images
      // if (content.includes('images')) {
      //   console.log(content,'has images');
      //   images = fs.readdirSync(path.join(directory, 'images'));
      // }

      return {
        Id: currentIndex,
        FileName: mdxFile,
        FileNameNoExt: fileNameNoExt,
        Thumbnail: fileNameNoExt + '.png',
        Visuals: visuals,
        // ...(images ? { Images: images } : {}),
        ...data,
      };
    });

    currentIndex += mdxFiles.length;
  }

  // Recursively process subdirectories
  const subdirectories = content.filter((entry) =>
    fs.statSync(path.join(directory, entry)).isDirectory()
  );

  for (const subdirectory of subdirectories) {
    const subdirectoryPath = path.join(directory, subdirectory);
    const subdirectoryResult = collectDataFromDirectory(subdirectoryPath, currentIndex);
    result = result.concat(subdirectoryResult);
    currentIndex += subdirectoryResult.length;
  }
  console.log('result',result);
  return result;
}

function updateJsonFiles() {
  try {
    sections.forEach((section) => {
      // define section to look for post data (MDX files, file names, etc.)
      const sectionArticlesDirectory = path.resolve(__dirname, '../../posts/', section);
      // get file metadata from directory
      const jsonData = collectDataFromDirectory(sectionArticlesDirectory);
      // write file metadata to JSON (later should be database)
      const jsonFilePath = path.resolve(__dirname, '../../post_data/', `${section}_articles.json`);
      fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
      // notification message
      console.log(`JSON file for ${section} updated successfully. Find files at src/post_data/${section}_articles.json`);
    });
  } catch (error) {
    console.error('Error updating JSON file:', error);
  }
}

// function updateJsonFiles() {
//   // map data + visualization imports from articles to json: articlesData.json
//   try {
//     // get articles from each article folder
//     sections.forEach(section => {
//       // get section folder
//       const sectionArticlesDirectory = path.resolve(__dirname, '../../posts/', section);
//       // const visualsSubdirectory = path.resolve(__dirname, '../visuals/', section);
//       console.log('articles subdirectory', sectionArticlesDirectory);

//       // get article folders
//       let articleDirectories;
//       if (section == 'tutorial') {
//         // go down extra layer
//         articleDirectories = fs.readdirSync(sectionArticlesDirectory).map(topic => {
//           console.log('tutorial',topic);
//           const articleTopicDirectories = fs.readdirSync(path.join(sectionArticlesDirectory,topic))
//           articleTopicDirectories.map(topicDirectory => {
//             return topicDirectory
//           })
//           // return ;
//         })
//         // console.log('articleDirectories',);
//       }
//       else {
//         articleDirectories = fs.readdirSync(sectionArticlesDirectory);
//       }
//       console.log('AD', articleDirectories);


//       //  first filter for folders with content --> then map to json
//       const jsonData = articleDirectories.filter((articleDirectory, index) => {
//         articleDirectory = path.join(sectionArticlesDirectory, articleDirectory);
//         if (fs.lstatSync(articleDirectory).isFile()) {
//           console.log('not a directory')
//           return false;
//         }
//         const directoryContent = fs.readdirSync(articleDirectory);
//         console.log('section article directory', articleDirectory, directoryContent);
//         if (directoryContent.length == 0) {
//           console.log('no content');
//           return false;
//         }
//         return true;
//       }).map((articleDirectory, index) => {
//         articleDirectory = path.join(sectionArticlesDirectory, articleDirectory);
//         const directoryContent = fs.readdirSync(articleDirectory);
//         // get mdx content
//         const mdxFile = directoryContent.find(str => str.endsWith('.mdx'));
//         const mdxContent = fs.readFileSync(path.join(articleDirectory, mdxFile), 'utf8');
//         const { data, content } = grayMatter(mdxContent);

//         // get general article name
//         const fileNameNoExt = mdxFile.split('.mdx')[0];

//         // get iamges
//         let images = null;
//         if (directoryContent.includes('images')) {
//           images = fs.readdirSync(path.join(articleDirectory, 'images'));
//         }

//         // get visuals
//         // let visualizations = null;
//         // if (directoryContent.includes('visualizations')) {
//         //   visualizations = fs.readdirSync(path.join(articleDirectory, 'visualizations'));
//         // }

//         return ({
//           Id: index,
//           FileName: mdxFile,
//           FileNameNoExt: fileNameNoExt,
//           Thumbnail: fileNameNoExt + '.png',
//           ...(images ? { Images: images } : {}),
//           // ...(visualizations ? { Visualizations: visualizations } : {}),
//           ...data
//         });

//       });
//       // path to section articles data
//       const jsonFilePath = path.resolve(__dirname, '../../post_data/', section + '_articles.json');
//       fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2));
//       console.log('JSON file updated successfully. Find files at src/post_data/' + section + '_articles.json');
//     });


//   } catch (error) {
//     console.error('Error updating JSON file:', error);
//   }

// }

updateJsonFiles();