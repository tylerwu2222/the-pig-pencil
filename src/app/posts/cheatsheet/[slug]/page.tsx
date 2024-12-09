import React from 'react'

// dynamic imports
// import dynamic from 'next/dynamic';

// components
import PostHeader from '../../PostHeader';
// import Scrollspy from '@/app/components/Scrollspy/Scrollspy';
// import ImageModal from '@/app/components/modals/ImageModal/ImageModal';

// helpers
import { getPostBySlug } from '@/lib/prisma/prisma';

// types
import { Post } from '@/types/extendedPrismaTypes';

const cheatsheetCategories = ['d3', 'python', 'react', 'javascript'];

export default async function page({
    params,
}: {
    params: Promise<{ slug: string }>
    // params: { slug: string }
}) {
    const slug = (await params).slug;

    // query the mdx from prisma based on the slug
    const postMetaData = await getPostBySlug(slug) as Post;
    // console.log('pmd', postMetaData)

    // get the markdown dynamically based on the slug + include route group based on first tag
    let PostMarkdown;
    if (!cheatsheetCategories.includes(postMetaData.tags[0])) {
        const { default: markdown, metadata } = await import(`@/app/posts/cheatsheet/${slug}/${slug}.mdx`);
        PostMarkdown = markdown;
    }
    else {
        const { default: markdown, metadata } = await import(`@/app/posts/cheatsheet/(${postMetaData.tags[0]})/${slug}/${slug}.mdx`);
        PostMarkdown = markdown;
    }

    return (
        <div className='py-5 pb-20'>
            {/* header content (tn, caption, date, author) */}
            <PostHeader post={postMetaData} showThumbnail={false} />
            {/* post content (queried via mdx) */}
            <article className='prose max-w-none'>
                <PostMarkdown />
            </article>
        </div>
    )
}