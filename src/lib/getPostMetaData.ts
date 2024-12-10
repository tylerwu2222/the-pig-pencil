import fs from "fs/promises";
import path from "path";

export async function getPostMetadata(slug: string, section: string) {
  try {
    // load all mdxContent
    const filePath = path.resolve(`./src/app/posts/${section}/${slug}/${slug}.mdx`);
    const mdxContent = await fs.readFile(filePath, "utf8");

    // get matching group from: export const metadata = ({metadata content here})
    const metadataMatch = mdxContent.match(/export\s+const\s+metadata\s*=\s*({[\s\S]*?}\s*);/);   
    if (!metadataMatch) {
      throw new Error('No metadata found in the MDX file');
    }

    // evaluate metadata string to object
    const metadata = eval(`(${metadataMatch[1]})`);

    return metadata;
  } catch (error: any) {
    console.error(error?.message);
    return;
  }
}
