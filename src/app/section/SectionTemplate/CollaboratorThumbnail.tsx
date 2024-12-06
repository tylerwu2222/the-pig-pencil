import React from 'react'
import { Author } from '@/types/extendedPrismaTypes'
import { getSnakeCase } from '@/app/lib/stringFormatting'


interface CollaboratorThumbnailProps {
    collaborator: Author
}

export default function CollaboratorThumbnail({ collaborator }: CollaboratorThumbnailProps) {

    const mug = '/img/thumbnails/collaborator_mugs/' + getSnakeCase(collaborator.name) + '.png';

    return (
        <>
            <div className='p-[2vh] m-[2vh] rounded-sm border-[1px] border-borderGrey hover:border-hoverLightPink hover:bg-highlightWhite hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[0.35em_0.35em_0_0_#f2b0ca] transition ease-in-out duration-700' title={collaborator.name}>
                {/* mugshot */}
                <img className='w-full lg:max-w-52 xl:max-w-72' src={mug} alt="thumbnail" loading="lazy" />
                {/* name */}
                <div className='py-1 min-h-[3em] w-full lg:max-w-52 xl:max-ww-72'>
                    <p className="text-lg 2xl:text-2xl text-textGrey">{collaborator.name}</p>
                </div>
                {/* role */}
                {/* most recent post */}
                <div className='py-1 min-h-[3em] w-full lg:max-w-52 xl:max-ww-72'>
                    <p className="text-lg 2xl:text-2xl text-textGrey">{collaborator.role}</p>
                </div>
                {collaborator.posts.length > 0 ?
                    <div className='text-textLightGrey text-xs'>
                        <p className="">Newest post: {collaborator.posts[0]}</p>
                    </div> : <></>
                }
                {/* post tag(s) */}
                {/* <div className=''>
                        {post.tags.map((t, i) => {
                            return (
                                <Badge
                                    key={i}
                                    className='text-white font-light bg-buttonGrey hover:bg-buttonGrey rounded-md mr-1 mb-[0.1rem]'
                                >{t}</Badge>)
                        })}
                    </div> */}
                {/* </Link> */}
            </div>
        </>
    )
}
