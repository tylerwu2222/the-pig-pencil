import React, { ReactNode, useEffect } from 'react'
// import MDXContent from './[slug].mdx'; // Dynamically import mdx based on slug
import Beef from '@/app/posts/writing/2023-04-23-beef-everywhere-all-at-once/2023-04-23-beef-everywhere-all-at-once.mdx';

export default async function page({
    params,
}: {
    // params: Promise<{ slug: string }>
    params: { slug: string }
}) {
    const slug = (await params).slug;

    console.log('slug', slug);

    // useEffect(() => {
    //     const headerElements = document.querySelectorAll('.pres-header');
    //     // console.log('page loaded',headerElements);
    //     headerElements.forEach((elt, i) => {
    //         elt.innerText = sectionTitles[i];
    //         elt.setAttribute('id', 'section' + String(i));
    //     });
    // }, [sectionTitles]);

    if (!slug) {
        return <div>loading...</div>
    }

    // query the mdx based on the slug
    return (
        <Beef />
    )
}