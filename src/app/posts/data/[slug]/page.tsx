import React from 'react'

// dynamic imports
import dynamic from 'next/dynamic';

// components
import PostHeader from '../../PostHeader';

// helpers
import { getPostBySlug } from '@/app/lib/prisma/prisma';

// types
import { Post } from '@/types/extendedPrismaTypes';

export default async function page({
    params,
}: {
    // params: Promise<{ slug: string }>
    params: { slug: string }
}) {
    const slug = (await params).slug;

    // query the mdx from prisma based on the slug
    const postMetaData = await getPostBySlug(slug) as Post;

    // console.log('post metadata', postMetaData);

    // get the markdown dynamically based on the slug
    const PostMarkdown = dynamic(() => import(`@/app/posts/data/${slug}/${slug}.mdx`))

    return (
        <div className='py-5'>
            {/* header content (tn, caption, date, author) */}
            <PostHeader post={postMetaData} />
            {/* scrollspy if post has scrollspy */}

            {/* post content (queried via mdx) */}
            <article className='prose max-w-none'>
                <PostMarkdown />
            </article>
        </div>
    )
}