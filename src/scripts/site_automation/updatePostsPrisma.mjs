// npm run update-post -- --section="project" --slug="2024-07-20-magpie-a-notetaking-app"

// updates metadata in prisma based on metadata exported from MDX for specified post (section + slug)


// helpers
import { formateDateToISODate } from "@/lib/dateFormatting.js";
import { getPostMetadata } from "../../lib/getPostMetaData.ts";
import { updatePost } from "../../lib/prisma/prisma.ts";

// update prisma based on metadata from mdx for post(s)
const updatePostsPrisma = async () => {
  const section = process.env.npm_config_section || undefined;
  const slug = process.env.npm_config_slug || undefined;

  // if both section and slug undefined, update all posts
  // if section defined, update by section
  // if both, update single post
  if (section && slug) {
    if (section == "cheatsheets") {
      // add extra route group pathing
      return;
    } else {
      // get metadata from that file
      const metadata = await getPostMetadata(slug, section);
      // console.log("MDX metadata", metadata);

      // add updateDate

      // clean dates to ISOstring 
      metadata['publishDate'] = formateDateToISODate(metadata.publishDate);
      metadata['updateDate'] = new Date().toISOString();
      console.log('formatted MDX metadata', metadata);

      // update post
      console.log("updating post...");
      await updatePost(slug, metadata);
      console.log("updated post in prisma.");
    }
  }
};

updatePostsPrisma();
