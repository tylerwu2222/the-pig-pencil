// helpers
import { getPostMetadata } from "../../lib/getPostMetaData.ts";
import { upsertPost } from "../../lib/prisma/prisma.ts";

// fs
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

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
      console.log("got metadata", metadata);

      // upsert into post
    //   console.log("updating post...");
    //   await upsertPost(slug, metadata);
    //   console.log("updated post in prisma.");
    }
  }
};

updatePostsPrisma();
