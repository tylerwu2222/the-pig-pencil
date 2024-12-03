'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic';
import PostHeader from '../../PostHeader';

// 
import { getPostBySlug } from '@/app/lib/prisma/prisma';

// types
import { Post } from '@/types/extendedPrismaTypes';

export default function page({
    // export default async function page({
    // params,
}: {
        // params: Promise<{ slug: string }>
        // params: { slug: string }
    }) {
    const params = useParams()
    const slug = params.slug;
    const [postMetaData, setPostMetaData] = useState<Post | undefined>();

    // query the mdx from prisma based on the slug
    // const postMetaData = await getPostBySlug(slug) as Post;
    useEffect(() => {
        if (typeof slug === 'string') {
            const fetchPostMetaData = async () => {
                const post = await getPostBySlug(slug) as Post;
                setPostMetaData(post)
            };

            fetchPostMetaData();
        }
    }, [slug]);

    // console.log('post metadata', postMetaData);

    // get the markdown dynamically based on the slug
    const PostMarkdown = dynamic(() => import(`@/app/posts/data/${slug}/${slug}.mdx`));
    // console.log('post markdown', PostMarkdown)
    // const fileMetaData = dynamic(() => import(`@/app/posts/data/${slug}/${slug}.mdx`).then(module => module.metadata));
    // console.log('file MD', fileMetaData);

    // import visuals dynamically based on metadata


    return (
        <div className='py-5'>
            {/* header content (tn, caption, date, author) */}
            {postMetaData && <PostHeader post={postMetaData} />}
            {/* scrollspy if post has scrollspy */}

            {/* post content (queried via mdx) */}
            <article className='prose max-w-none'>
                <PostMarkdown />
            </article>
        </div>
    )
}