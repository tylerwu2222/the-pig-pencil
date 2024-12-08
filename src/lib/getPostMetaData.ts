export async function getPostMetadata(slug: string, section: string) {
  try {
    const file = await import(`@/app/posts/${section}/${slug}/${slug}.mdx`);
    console.log("file..", file);
    if (file?.metadata) {
      console.log("got metadata", file.metadata);
      return file.metadata;
    } else {
      throw new Error(`Unable to find metadata for ${slug}.mdx`);
    }
  } catch (error: any) {
    console.error(error?.message);
    return;
  }
}
