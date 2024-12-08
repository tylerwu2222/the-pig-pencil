
// creates an empty template folder for the desired section

// run this script by typing: 
// npm run create-article -- --section="writing" --postName="string_with_underscore-dashed-content-allowed" --paramName="string with space"
// check createNewArticle() fn for params, paramName is : process.env.npm_config_paramName

const fs = require('fs-extra');
const path = require('path');

// string manipulation helper functions
function underscoreToDash(input) {
    return input.replaceAll('_', '-');
};
function snakeToCapital(snakeCaseString, delimiter = '') {
    return snakeCaseString
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(delimiter)
        .replace('-', '');
}
function sanitizeFileName(input) {
    // List of forbidden characters in file names
    const forbiddenCharacters = /[\/\?<>\\:\*\|"]/g;

    // Replace forbidden characters with an underscore or other safe character
    return input.replace(forbiddenCharacters, '');
}

// create folder to hold content of new post
function createPostFolder(
    section_name,
    post_name,
    worktime_days
) {
    // console.log('section name', section_name);
    // Get today's date
    const today = new Date();

    // Calculate the date [worktime_days] from today
    const estimatedPublicationDate = new Date(today.getTime() + (worktime_days * 24 * 60 * 60 * 1000));
    const estimatedPublicationDateYear = estimatedPublicationDate.getFullYear();
    const estimatedPublicationDateMonthNoZero = String(estimatedPublicationDate.getMonth() + 1);
    const estimatedPublicationDateMonth = estimatedPublicationDateMonthNoZero.padStart(2, '0');
    const estimatedPublicationDateDayNoZero = String(estimatedPublicationDate.getDate());
    const estimatedPublicationDateDay = estimatedPublicationDateDayNoZero.padStart(2, '0');

    // Construct the folder name
    const folderName = `${estimatedPublicationDateYear}-${estimatedPublicationDateMonth}-${estimatedPublicationDateDay}-${underscoreToDash(post_name)}`;

    const slashDate = `${estimatedPublicationDateMonthNoZero}/${estimatedPublicationDateDayNoZero}/${estimatedPublicationDateYear}`

    // Create the folder
    const folderPath = path.join(__dirname, '../../posts', section_name, folderName);
    fs.mkdirSync(folderPath, { recursive: true });
    console.log('folder path', folderPath);
    console.log(`Folder "${folderName}" created successfully.`);
    return [folderName, folderPath, slashDate]; // return folder path, so we can add files to it
}

// add content to post folder and subfolders
function addContent(files, folders, folderPath) {
    // create files and write content
    files.forEach(file => {
        const filePath = path.join(folderPath, file.name);
        if (file.content !== null) {
            fs.writeFileSync(filePath, file.content);
        } else {
            fs.closeSync(fs.openSync(filePath, 'w')); // Create empty file
        }
    });

    // create subfolders
    folders.forEach(subfolder => {
        const subfolderPath = path.join(folderPath, subfolder);
        fs.mkdirSync(subfolderPath);
        // create 1 svg for visual subfolder
        if (subfolder == 'visuals') {
            const visualFilePath = path.join(subfolderPath, 'svg1.js');
            fs.writeFileSync(visualFilePath, `import * as d3 from "d3";
const SVG1 = ({ data }) => {

};
export default SVG1;`
            );
        }
    });
};

// create new article and content in a folder
// sections: data, writing, tutorial, cheatsheet, project
function createNewArticle() {
    const section = process.env.npm_config_section || 'data';
    const post_name = process.env.npm_config_postName || 'new_post';
    const work_time = process.env.npm_config_workTime || 14;
    const template_type = process.env.npm_config_templateType || 'mdx';
    const author = process.env.npm_config_author || 'Tyler Wu';
    const scrollspy = process.env.npm_config_scrollspy || true;
    const visibilityStatus = 'false';

    // used for file name and context/variable names
    const sanitizedFileName = sanitizeFileName(post_name);

    // create folder
    const [post_full_name, post_folder_path, slashDate] = createPostFolder(section, sanitizedFileName, work_time);

    // defined content based on section
    let files, folders;
    // DATA
    if (section == 'data') {
        if (template_type == 'mdx') {
            files = [{
                name: `${underscoreToDash(post_full_name)}.mdx`, content: `---
Date: "${slashDate}"
Title: "${snakeToCapital(post_name, ' ')}"
Author:
- "${author}"
AuthorURL:
- "https://thepigpencil.com/collaborators"
MainTag: "main-tag"
Tags:
- "tag 1"
ReadingTime: "10 min"
Languages: "D3.js"
Caption: "caption here."
TemplateType: "${template_type}"
HasScrollspy: "${scrollspy}"
Hidden: "${visibilityStatus}"
---
` }
            ];
        }
        else if (template_type === 'js') {
            files = [{
                name: `${underscoreToDash(post_full_name)}.mdx`, content: `---
Date: "${slashDate}"
Title: "${snakeToCapital(post_name, ' ')}"
Author:
- "${author}"
AuthorURL:
- "https://thepigpencil.com/collaborators"
MainTag: "main-tag"
Tags:
- "tag 1"
ReadingTime: "10 min"
Languages: "D3.js"
Caption: "caption here."
TemplateType: "${template_type}"
HasScrollspy: "${scrollspy}"
Hidden: "${visibilityStatus}"
---
` },
            {
                name: `${underscoreToDash(post_full_name)}.js`, content: `import * as d3 from "d3";
import { createContext, useEffect, useState } from "react";
import SVG1 from "./visuals/svg1";
export const ${snakeToCapital(sanitizedFileName)}Context = createContext({});
const ${snakeToCapital(sanitizedFileName)} = () => {
    return (
        <${snakeToCapital(sanitizedFileName)}Context.Provider
            value={{
            }}>
            <div className='container-narrow'>
            {/* content here */}
            </div>
        </${snakeToCapital(sanitizedFileName)}Context.Provider>
    )
}
export default ${snakeToCapital(sanitizedFileName)};`
            }]
        }


        folders = ['data', 'visuals'];
    }
    // WRITING
    else if (section == 'writing') {
        files = [{
            name: `${underscoreToDash(post_full_name)}.mdx`, content: `---
Date: "${slashDate}"
Title: "${snakeToCapital(post_name, ' ')}"
Author:
- "${author}"
AuthorURL:
- "https://thepigpencil.com/collaborators"
MainTag: "main-tag"
Tags:
- "tag 1"
ReadingTime: "10 min"
Caption: "caption."
TemplateType: "${template_type}"
HasScrollspy: "${scrollspy}"
SectionTitles:
  - 'section1'
Hidden: "${visibilityStatus}"
---
` }];
        folders = [];
    }
    // TUTORIAL
    else if (section == 'tutorial') {
        // determine which tutorial type first
        // post_type
        files = [];
        folders = [];
    }
    // CHEATSHEET
    else if (section == 'cheatsheet') {
        // determine which tutorial type first
        // post_type
        files = [{
            name: `${underscoreToDash(post_full_name)}.mdx`, content: `---
Date: "${slashDate}"
Title: "${snakeToCapital(post_name, ' ')}"
Author:
- "${author}"
AuthorURL:
- "https://thepigpencil.com/collaborators"
MainTag: "main-tag"
Tags:
- "tag 1"
---
` }];
        folders = [];
    }
    // PROJECT
    else if (section == 'projects') {
        files = [{
            name: `${underscoreToDash(post_full_name)}.mdx`, content: `---
Date: "${slashDate}"
Title: "${snakeToCapital(post_name, ' ')}"
Author:
- "${author}"
AuthorURL:
- "https://thepigpencil.com/collaborators"
MainTag: "main-tag"
Tags:
- "tag 1"
ReadingTime: "10 min"
Caption: "caption."
HasScrollspy: "${scrollspy}"
SectionTitles:
    - 'section1'
Hidden: "${visibilityStatus}"
---
` }];
        folders = [];
    }
    // then add to folder
    addContent(files, folders, post_folder_path);
};

createNewArticle();