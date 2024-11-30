// style
import { Post } from '@prisma/client';
import './PostThumbnails.css'

// formatting
import { getSlugTitle } from '@/app/lib/fileNameFormatting';

// react
// import { Link } from 'react-router-dom';
import Link from 'next/link';

interface PostThumbnailProps {
    post: Post
    // section: string;
    // title: string;
    // img: string;
    // author: string;
    // date: string;
    // subPage: string;
    // comingSoon: string;
}

export const PostThumbnail1 = ({
    post
    // section, title, img, author, date, subPage, comingSoon
}: PostThumbnailProps) => {

    // let authorDate =  + ' ∙ ' + date;
    let title = post.title;

    let img;
    if (post.thumbnail) {
        img = '/img/thumbnails/' + post.section.toLowerCase() + '_thumbnails/' + post.thumbnail;
    }
    else {
        img = '/img/thumbnails/' + post.section.toLowerCase() + '_thumbnails/' + getSlugTitle(post.publishDate, post.title) + '.png';
    }

    console.log('tn img', img);

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
            <div className='p-[2vh] m-[2vh] rounded-lg border-2 border-borderGrey hover:border-borderHoverPink hover:-translate-x-2 hover:-translate-y-3 hover:shadow-[0.35em_0.35em_0_0_#f2b0ca] hover:shadow-lg transition ease-in-out duration-500' title={title}>
                <Link href={"/" + post.section.toLowerCase() + "/"} className=''>
                    <img className='w-full lg:max-w-52 xl:max-w-72' src={img} alt="thumbnail" loading="lazy" />
                    <div className='py-1 w-full lg:max-w-52 xl:max-ww-72'>
                        <p className="text-lg 2xl:text-2xl text-textGrey">{title}</p>
                    </div>
                    {/* <div className='post-card-byline'>
                        <p className="">{authorDate}</p>
                    </div> */}
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