import React from 'react'

// components
import PostHeader from '../../PostHeader';
import Scrollspy from '@/app/components/Scrollspy/Scrollspy';
// import ImageModal from '@/app/components/modals/ImageModal/ImageModal';

// helpers
import { getPostBySlug } from '@/lib/prisma/prisma';

// types
import { Post } from '@/types/extendedPrismaTypes';

export default async function page({
    params,
}: {
    params: Promise<{ slug: string }>
    // params: { slug: string }
}) {
    const slug = (await params).slug;

    // query the mdx from prisma based on the slug
    const postMetaData = await getPostBySlug(slug) as Post;
    // console.log('post metadata', postMetaData);

    // get the markdown dynamically based on the slug
    const { default: PostMarkdown, metadata } = await import(
        `@/app/posts/data/${slug}/${slug}.mdx`
    );
    // console.log('post metadata', metadata);

    return (
        <div className='py-5'>
            {/* header content (tn, caption, date, author) */}
            <PostHeader post={postMetaData} />
            {/* post content (queried via mdx) */}
            <article className='prose max-w-none'>
                <PostMarkdown />
            </article>
            {/* scrollspy if post has scrollspy */}
            {postMetaData.hasScrollspy ?
                <Scrollspy />
                : <></>
            }
        </div>
    )
}