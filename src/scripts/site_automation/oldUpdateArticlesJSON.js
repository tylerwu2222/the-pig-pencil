// responsible for updating json metadata for the following sections:
// data, tool, tutorial, writing

// run this script by typing: npm run update-articles

const fs = require('fs-extra');
const path = require('path');
const grayMatter = require('gray-matter');

// const sections = ['cheatsheet', 'data', 'writing'];
const sections = ['cheatsheet', 'data', 'projects', 'tutorial', 'writing'];
// const image_formats = ['.png', '.jpg', '.jpeg'];

const excludeExtensions = /\.(js|css|mdx)$/i;

// recursive function that collects metadata from all mdx files in given directory
const collectDataFromDirectory = (directory, section, currentIndex = 0) => {
  // get subfolders
  let content_folders;
  const subfolders = fs.readdirSync(directory).filter(file => !excludeExtensions.test(file));
  console.log('directory', directory);

  // create array of full file paths to each content folder
  // tutorial and cheatsheet have additional layer
  if (['tutorial', 'cheatsheet'].includes(section)) {
    content_folders = subfolders.map(folder => {
      return fs.readdirSync(path.resolve(directory, folder)).filter(file => !excludeExtensions.test(file)).map(content => {
        return path.resolve(directory, folder, content)
      }
      )
    }).flat();
  }
  else {
    content_folders = subfolders.map(folder => {
      return path.resolve(directory, folder)
    })
  }

  // holds metacontent for all content to return
  let result = [];

  // Check for content files in content directory
  let id = 0;
  for (const content_folder of content_folders) {
    const content = fs.readdirSync(content_folder);
    // console.log('content',content)
    // only include content with mdx file (mdx file is indicator of started project)
    const hasMDX = content.filter(file => file.endsWith('.mdx')).length >= 1;
    if (hasMDX) {
      // console.log('content', content);
      // get mdx file regardless of section
      const mdxFile = content.filter((file) => file.endsWith('.mdx') && !file.includes('template.mdx'))[0];
      const mdxContent = fs.readFileSync(path.join(content_folder, mdxFile), 'utf8');
      // console.log('mdxcont', mdxContent);
      const { data, _ } = grayMatter(mdxContent);
      // console.log('metadata',data);
      const fileNameNoExt = mdxFile.split('.mdx')[0];
      let visuals = null;
      let images = null;

      // check for visuals if data section
      if (section == 'data') {
        if (content.includes('visuals')) {
          visuals_content = fs.readdirSync(path.join(content_folder, 'visuals'))
          visuals = visuals_content.filter((file) => (file.startsWith('svg') && file.endsWith('.js')) || (file.startsWith('Basic') && file.endsWith('.js')))
        }
        // console.log('visuals', visuals);
      }

      // check for styles
      const cssFiles = content.filter((file) => file.endsWith('.css'));
      if (cssFiles.length > 0){
        styles = cssFiles;
      }

      // console.log('mdx', mdxFile);

      result.push({
        Id: id,
        FileName: mdxFile,
        FileNameNoExt: fileNameNoExt,
        Thumbnail: fileNameNoExt + '.png',
        ...(visuals ? { Visuals: visuals } : {}),
        ...(styles ? { Styles: styles } : {}),
        ...(images ? { Images: images } : {}),
        ...data,
      });

      id += 1;
    }

  }
  // console.log('results', result);

  return result;
}

function updateJsonFiles() {
  try {
    sections.forEach((section) => {
      // define section to look for post data (MDX files, file names, etc.)
      const sectionArticlesDirectory = path.resolve(__dirname, '../../posts/', section);
      // get file metadata from directory
      const jsonData = collectDataFromDirectory(sectionArticlesDirectory, section);
      // console.log('jsonData', section, jsonData)
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

updateJsonFiles();