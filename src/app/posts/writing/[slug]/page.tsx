import React, { ReactNode, useEffect } from 'react'

import prisma from '@/db';

// import MDXContent from './[slug].mdx'; // Dynamically import mdx based on slug
import Beef from '@/app/posts/writing/2023-04-23-beef-everywhere-all-at-once/2023-04-23-beef-everywhere-all-at-once.mdx';
import PostHeader from '../../PostHeader';
import { getPostBySlug } from '@/app/lib/prisma';
import { Post } from '@/types/extendedPrismaTypes';

export default async function page({
    params,
}: {
    // params: Promise<{ slug: string }>
    params: { slug: string }
}) {
    const slug = (await params).slug;

    console.log('slug', slug);

    // query the mdx from prisma based on the slug
    const postMetaData = await getPostBySlug(slug) as Post;
    // const postMetaData = await prisma.post.findFirst({
    //     where: {
    //         slug: slug
    //     }
    // })

    console.log('post metadata', postMetaData);

    return (
        <div className='py-5'>
            {/* header content (tn, caption, date, author) */}
            <PostHeader post={postMetaData} />
            {/* scrollspy if post has scrollspy */}

            {/* post content (queried via mdx) */}
            <Beef />
        </div>
    )
}