import React from 'react'
import { Post } from '@/types/extendedPrismaTypes'
import { formatDateToLongDate } from '../lib/dateFormatting';

interface PostHeaderProps {
    post: Post;
}

export default function PostHeader({ post }: PostHeaderProps) {

    return (
        <div className='justify-items-center pb-8'>
            {/* define with to be half of screen width */}
            <div className='w-[60vh]'>
                {/* title, caption */}
                <div className='justify-items-center pb-2'>
                    <h1 className='text-2xl'>{post.title}</h1>
                    <h2 className='italic text-lg'>{post.caption}</h2>
                    <p className="text-sm text-textGrey">{formatDateToLongDate(post.publishDate)}</p>
                </div>
                {/* thumbnail */}
                <div className='justify-items-center pb-1'>
                    <img
                        className='border-[1px] border-borderGrey w-[60vh] h-[60vh]'
                        src={post.thumbnail ? post.thumbnail : `/img/thumbnails/${post.section}_thumbnails/${post.slug}.png`}
                    ></img>
                </div>
                {/* author(s) */}
                <div className='justify-items-start'>
                    <p className="text-sm flex justify-center items-center">{post.authors.join(', ')}</p>
                </div>
                <div className='text-textLightGrey justify-between'>
                    {/* read-aloud if available */}
                    <div></div>
                    {/* read time */}
                    <p className='text-xs'>Reading time: {post.readingTime}</p>
                </div>
            </div>
        </div>
    )
}
