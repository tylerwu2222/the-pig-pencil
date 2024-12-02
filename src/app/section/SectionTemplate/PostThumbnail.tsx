// style
import { Post } from '@/types/extendedPrismaTypes';

// formatting
import { getSlugTitle } from '@/app/lib/fileNameFormatting';
import { formatDateToShortDate } from '@/app/lib/dateFormatting';

// react
import Link from 'next/link';

// components
import { Badge } from "@/components/ui/badge"

interface PostThumbnailProps {
    post: Post
}

export const PostThumbnail1 = ({
    post
    // section, title, img, author, date, subPage, comingSoon
}: PostThumbnailProps) => {

    let authorDate = post.authors[0] + ' ∙ ' + formatDateToShortDate(post.publishDate);
    let title = post.title;

    let img;
    if (post.thumbnail) {
        img = '/img/thumbnails/' + post.section.toLowerCase() + '_thumbnails/' + post.thumbnail;
    }
    else {
        img = '/img/thumbnails/' + post.section.toLowerCase() + '_thumbnails/' + getSlugTitle({ date: post.publishDate, title: post.title }) + '.png';
    }

    // console.log('tn img', img);

    // handle wip
    if (post.visibility == 'wip') {
        title = title + ' (Coming Soon!)';
        // clickableLink = ' unclickable-link';
        // hoverableDiv = ' unhoverable-div';
        // unclickableTN = ' unclickable-tn';
        // authorDate = author;
    }
    return (
        <>
            <div className='p-[2vh] m-[2vh] rounded-sm border-[1px] border-borderGrey hover:border-hoverLightPink hover:bg-highlightWhite hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[0.35em_0.35em_0_0_#f2b0ca] transition ease-in-out duration-700' title={title}>
                <Link href={"/posts/" + post.section.toLowerCase() + "/" + getSlugTitle({ date: post.publishDate, title: post.title })} className=''>
                    {/* thumbnail */}
                    <img className='w-full lg:max-w-52 xl:max-w-72' src={img} alt="thumbnail" loading="lazy" />
                    {/* heading */}
                    <div className='py-1 min-h-[3em] w-full lg:max-w-52 xl:max-ww-72'>
                        <p className="text-lg 2xl:text-2xl text-textGrey">{title}</p>
                    </div>
                    {/* author(s) + date */}
                    <div className='text-textLightGrey text-xs'>
                        <p className="">{authorDate}</p>
                    </div>
                    {/* tag(s) */}
                    <div className=''>
                        {post.tags.map((t, i) => {
                            return (
                                <Badge
                                    key={i}
                                    className='text-white font-light bg-buttonGrey hover:bg-buttonGrey rounded-md mr-1 mb-[0.1rem]'
                                >{t}</Badge>)
                        })}
                    </div>
                </Link>
            </div>
        </>
    )
};

// export const PostThumbnailPeople = ({ img, author, role, date, quote, lastPost }) => {
//     return (
//         <>
//             <div className={"post-card-div hoverable-div"}>
//                 {/* <Link to={"/" + section.toLowerCase() + "/" + subPage} className={"blog-link" + clickableLink}> */}
//                 <img className={"post-card-thumbnail"} src={img} alt="thumbnail" loading="lazy" />
//                 <div className='post-card-name'>
//                     <b className="blog-title">{author} </b>
//                 </div>
//                 <div className='post-card-byline'>
//                     <p className='.'>{role}</p>
//                 </div>
//                 <div className='post-card-quote'>
//                     <p>"{quote}"</p>
//                 </div>
//                 <div className='post-card-quote'>
//                     <p>Latest post: <a>{lastPost}</a></p>
//                 </div>
//                 {/* </Link> */}
//             </div>
//         </>
//     )
// };