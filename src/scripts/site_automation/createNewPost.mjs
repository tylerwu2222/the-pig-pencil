// example commands:
// for authors and tags (lists), simply enter as csv string: "tag1, tag2"

// WRITING
// npm run create-post -- --section="writing" --postName="Title: type it out naturally!" --tags="tag1,tag2" --caption="this"

// DATA
// npm run create-post -- --postName="data piece" --tags="tag1,tag2" --caption="this"

// PROJECT
// npm run create-post -- --section="project" --postName="" --postDate="2023-05-10" --tags="dev,full-stack,"

// TUTORIAL 
// npm run create-post -- --section="tutorial" --postName="" --postDate="2024-12-10" --tags="dev,front-end,tailwind,css"

// check createNewArticle() fn for params, paramName is : process.env.npm_config_paramName

// helpers
import {
  sanitizeFileName,
  getDashedString,
  quoteCommaSepString,
  // snakeToCamel,
} from "../../lib/stringFormatting.ts";

// fs
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

// prisma
import {
  createAuthorsPostConnection,
  createManyTags,
  createPost,
  createAuthorsTagsConnection,
  createPostTagsConnection,
  getAuthorIDByName,
  getTagIDByName,
} from "../../lib/prisma/prisma.js";

// create folder to hold content of new post
function createPostFolder(section_name, post_name, post_date, worktime_days) {
  console.log("creating post folder...");
  // if post date given, use that
  let postDate;
  if (post_date) {
    postDate = post_date;
  }
  // otherwise calculate using worktime
  else {
    // Get today's date
    const today = new Date();

    // Calculate the date [worktime_days] from today
    const estimatedPublicationDate = new Date(
      today.getTime() + worktime_days * 24 * 60 * 60 * 1000,
    );
    const estimatedPublicationDateYear = estimatedPublicationDate.getFullYear();
    const estimatedPublicationDateMonthNoZero = String(
      estimatedPublicationDate.getMonth() + 1,
    );
    const estimatedPublicationDateMonth =
      estimatedPublicationDateMonthNoZero.padStart(2, "0");
    const estimatedPublicationDateDayNoZero = String(
      estimatedPublicationDate.getDate(),
    );
    const estimatedPublicationDateDay =
      estimatedPublicationDateDayNoZero.padStart(2, "0");

    // Construct the folder/slug name: yyyy-mm-dd-dashed-post-name
    postDate = `${estimatedPublicationDateYear}-${estimatedPublicationDateMonth}-${estimatedPublicationDateDay}`;
  }
  const slug = postDate + `-${getDashedString(post_name)}`;

  // Create the folder
  // relative path 1: scripts, 2: src --> app -> posts
  const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
  const __dirname = path.dirname(__filename); // get the name of the directory
  const folderPath = path.join(
    __dirname,
    "../../app/posts",
    section_name,
    slug,
  );
  fs.mkdirSync(folderPath, { recursive: true });
  console.log(`folder created at: "${folderPath}"`);
  return [slug, folderPath, postDate]; // return folder path, so we can add files to it
}

// adds files to folder
function addContent(files, folders, folderPath) {
  console.log("adding files to folder...");
  console.log("files", files);
  // create files and write content
  files.forEach((file) => {
    const filePath = path.join(folderPath, file.name);
    if (file.content !== null) {
      fs.writeFileSync(filePath, file.content);
    } else {
      fs.closeSync(fs.openSync(filePath, "w")); // Create empty file
    }
  });

  // create subfolders
  folders.forEach((subfolder) => {
    const subfolderPath = path.join(folderPath, subfolder);
    fs.mkdirSync(subfolderPath);
    // create 1 svg for visual subfolder
    if (subfolder == "visuals") {
      const visualFilePath = path.join(subfolderPath, "svg1.js");
      fs.writeFileSync(
        visualFilePath,
        `'use client'
import * as d3 from "d3";
import { useEffect, useState } from "react";

// data
import { loadPublicCSV } from "@/lib/data_section/loadPublicCSV";

const SVG1 = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            loadPublicCSV({ fileName: '' })
                .then(dta => {
                    setData(dta);
                });
        }
        fetchData();
        console.log('data state', data);
    }, []);

    const render_s1 = () => {
        const stat_svg = d3.select("#stat-svg1");
        stat_svg
            .style("width", '100%')
            .style("height", '700px');
    };

    // initial render
    useEffect(() => {
        render_s1();
    }, [data]);

    return (
         <>
            {/* vis container */}
            <svg id="stat-svg1">
            </svg>
        </>
    )
};

export default SVG1;`,
      );
    }
  });

  console.log("files added to folder");
}

// creates post files and adds them to folder
function createPostFiles(
  section,
  post_name,
  slug,
  dash_date,
  authors,
  template_type,
  tags,
  caption,
  reading_time,
  scrollspy,
  visible,
  post_folder_path,
) {
  console.log("adding post files...");
  // console.log('tags in CPF', typeof tags, tags);

  // defined content based on section
  let files, folders;
  // DATA
  if (section == "data") {
    if (template_type == "mdx") {
      files = [
        {
          name: `${getDashedString(slug)}.mdx`,
          content: `export const metadata = {
    publishDate: "${dash_date}",
    title: "${post_name}",
    authors: [${quoteCommaSepString(authors)}]
    tags:  [${quoteCommaSepString(tags)}]
    readingTime: "${reading_time}",
    caption: "${caption}",
    templateType: "${template_type}",
    hasScrollspy: "${scrollspy}",
    visibility: "${visible}"
};

`,
        },
      ];
    } else if (template_type === "js") {
      files = [
        {
          name: `${getDashedString(slug)}.mdx`,
          content: `export const metadata = {
    publishDate: "${dash_date}",
    title: "${post_name}",
    authors: [${quoteCommaSepString(authors)}],
    tags:  [${quoteCommaSepString(tags)}],
    readingTime: "${reading_time}",
    caption: "${caption}",
    templateType: "${template_type}",
    hasScrollspy: "${scrollspy}",
    visibility: "${visible}"
};

`,
        },
        {
          name: `${getDashedString(slug)}.js`,
          content: `import * as d3 from "d3";
import { useEffect, useState } from "react";
import SVG1 from "./visuals/svg1";
export const PostContext = createContext({});
const Post = () => {
    return (
        <PostContext.Provider
            value={{
            }}>
            <div className='container-narrow'>
            {/* content here */}
            </div>
        </PostContext.Provider>
    )
};
export default Post;`,
        },
      ];
    }
    folders = ["visuals"]; // data now hosted in public folder
  }
  // WRITING
  else if (section == "writing") {
    files = [
      {
        name: `${getDashedString(slug)}.mdx`,
        content: `export const metadata = {
    publishDate: "${dash_date}",
    title: "${post_name}",
    authors: [${quoteCommaSepString(authors)}],
    tags:  [${quoteCommaSepString(tags)}],
    readingTime: "${reading_time}",
    caption: "${caption}",
    hasScrollspy: "${scrollspy}",
    visibility: "${visible}"
};

`,
      },
    ];
    folders = [];
  }
  // TUTORIAL
  else if (section == "tutorial") {
    // determine which tutorial type first
    // post_type
    files = [
      {
        name: `${getDashedString(slug)}.mdx`,
        content: `export const metadata = {
    publishDate: "${dash_date}",
    title: "${post_name}",
    authors: [${quoteCommaSepString(authors)}],
    tags:  [${quoteCommaSepString(tags)}],
    readingTime: "${reading_time}",
    caption: "${caption}",
    hasScrollspy: "${scrollspy}",
    visibility: "${visible}"
};

`,
      },
    ];
    folders = [];
  }
  // CHEATSHEET
  else if (section == "cheatsheet") {
    // determine which tutorial type first
    // post_type
    files = [
      {
        name: `${getDashedString(slug)}.mdx`,
        content: `export const metadata = {
    publishDate: "${dash_date}",
    title: "${post_name}",
    authors: [${quoteCommaSepString(authors)}],
    tags:  [${quoteCommaSepString(tags)}],
    visibility: "${visible}"
};

`,
      },
    ];
    folders = [];
  }
  // PROJECT
  else if (section == "project") {
    files = [
      {
        name: `${getDashedString(slug)}.mdx`,
        content: `export const metadata = {
    publishDate: "${dash_date}",
    title: "${post_name}",
    authors: [${quoteCommaSepString(authors)}],
    tags:  [${quoteCommaSepString(tags)}],
    readingTime: "${reading_time}",
    caption: "${caption}",
    hasScrollspy: "${scrollspy}",
    visibility: "${visible}"
};

`,
      },
    ];
    folders = [];
  }
  // then add content to folders
  addContent(files, folders, post_folder_path);
};

// adds new article as entry to prisma (Post, Author, Tags)
async function addToPrisma(metadata, authors, tags) {
  // 1) create row in Post
  console.log("creating post...");
  const post = await createPost(metadata);
  console.log("created post", post);
  const postId = post.id;

  // 2) create Post-Author connection
  // if Author not in authors, create authors..
  console.log("adding author-post connections...");
  const authorIds = await Promise.all(
    authors.map(async (a) => await getAuthorIDByName(a)),
  );
  await createAuthorsPostConnection(authorIds, postId);

  // 3) create Tag-Post connection
  // first create new tags
  console.log("adding tag-post connections...");
  await createManyTags(tags);
  // then create connections
  const tagIds = await Promise.all(
    tags.map(async (t) => await getTagIDByName(t)),
  );
  await createPostTagsConnection(tagIds, postId);

  // 4) create Tag-Author connection
  console.log("adding tag-author connections...");
  await createAuthorsTagsConnection(tagIds, authorIds);
  console.log("created new post and connections in prisma.");
}

// create files for new post and add entry to prisma
const createNewPost = () => {
  // get params from
  const section = process.env.npm_config_section || "data";
  const post_name = process.env.npm_config_postName || "new_post";
  const post_date = process.env.npm_config_postDate || undefined; //yyyy-mm-dd
  const work_time = process.env.npm_config_workTime || 14;
  let authors = process.env.npm_config_authors || "Tyler Wu";
  const template_type = process.env.npm_config_templateType || "mdx";
  let tags = process.env.npm_config_tags || "tag";
  const caption = process.env.npm_config_caption || "caption";
  const reading_time = process.env.npm_config_readingTime || "8 min";
  const scrollspy = process.env.npm_config_scrollspy || true;
  const visibility = "visible";

  // create folders
  const sanitizedFileName = sanitizeFileName(post_name);
  const [slug, post_folder_path, dash_date] = createPostFolder(
    section,
    sanitizedFileName,
    post_date,
    work_time,
  );

  // create files
  createPostFiles(
    section,
    post_name,
    slug,
    dash_date,
    authors,
    template_type,
    tags,
    caption,
    reading_time,
    scrollspy,
    visibility,
    post_folder_path,
  );

  // add post and connections to prisma (for section mapping)
  const postMetaData = {
    title: post_name,
    slug,
    section,
    caption,
    readingTime: reading_time,
    hasScrollspy: scrollspy,
    publishDate: new Date(dash_date).toISOString(), // publish date formatted to ISO
    updateDate: new Date(dash_date).toISOString(), // update date formatted to ISO
    visibility,
  };

  if (typeof authors === "string") {
    authors = authors.split(",");
  }
  if (typeof tags === "string") {
    tags = tags.split(",");
  }

  //   console.log("authors", authors, "tags", tags, typeof tags);

  addToPrisma(postMetaData, authors, tags);
};

createNewPost();
