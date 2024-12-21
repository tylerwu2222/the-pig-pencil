import React from "react";

// components
import PostHeader from "../../PostHeader";
import Scrollspy from "@/app/components/Scrollspy/Scrollspy";
import PageViewTracker from "../../PageViewTracker";

// helpers
import { getPostBySlug } from "@/lib/prisma/prisma";

// types
import { Post } from "@/types/extendedPrismaTypes";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
  // params: { slug: string }
}) {
  const slug = (await params).slug;

  // query the mdx from prisma based on the slug
  const post = (await getPostBySlug(slug)) as Post;

  // console.log('post metadata', post);

  // get the markdown dynamically based on the slug
  const { default: PostMarkdown } = await import(
    `@/app/posts/tutorial/${slug}/${slug}.mdx`
  );

  return (
    <div className="py-5 pb-20">
      {process.env.NODE_ENV !== "development" && (
        <PageViewTracker postId={post.id} />
      )}
      {/* header content (tn, caption, date, author) */}
      <PostHeader post={post} />
      {/* post content (queried via mdx) */}
      <article className="prose max-w-none">
        <PostMarkdown />
      </article>
      {/* scrollspy if post has scrollspy */}
      {post.hasScrollspy ? <Scrollspy /> : <></>}
    </div>
  );
}
