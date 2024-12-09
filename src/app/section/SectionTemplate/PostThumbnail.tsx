// style
import { Post } from "@/types/extendedPrismaTypes";

// formatting
import { getSlugTitle } from "@/lib/stringFormatting";
import { formatDateToShortDate } from "@/lib/dateFormatting";

// react
import Link from "next/link";

// components
import { Badge } from "@/components/ui/badge";

interface PostThumbnailProps {
  post: Post;
}

export const PostThumbnail1 = ({
  post,
  // section, title, img, author, date, subPage, comingSoon
}: PostThumbnailProps) => {
  let authorDate = "";
  if (post.publishDate) {
    authorDate = formatDateToShortDate(post.publishDate);
  }
  if (post.authors.length > 0) {
    authorDate = post.authors[0] + " ∙ " + authorDate;
  }
  let title = post.title;

  let img;
  if (post.thumbnail) {
    img =
      "/img/thumbnails/" +
      post.section.toLowerCase() +
      "_thumbnails/" +
      post.thumbnail;
  } else {
    img =
      "/img/thumbnails/" +
      post.section.toLowerCase() +
      "_thumbnails/" +
      getSlugTitle({ date: post.publishDate, title: post.title }) +
      ".png";
  }

  // console.log('tn img', img);

  // handle wip
  if (post.visibility == "wip") {
    title = title + " (Coming Soon!)";
    // clickableLink = ' unclickable-link';
    // hoverableDiv = ' unhoverable-div';
    // unclickableTN = ' unclickable-tn';
    // authorDate = author;
  }
  return (
    <>
      <div
        className="m-[2vh] rounded-sm border-[1px] border-borderGrey p-[2vh] transition duration-700 ease-in-out hover:-translate-x-1 hover:-translate-y-1 hover:border-hoverLightPink hover:bg-highlightWhite hover:shadow-[0.35em_0.35em_0_0_#f2b0ca]"
        title={title}
      >
        <Link
          href={
            "/posts/" +
            post.section.toLowerCase() +
            "/" +
            getSlugTitle({ date: post.publishDate, title: post.title })
          }
          className=""
        >
          {/* thumbnail */}
          <div>
            <img
              className="w-full object-cover xl:max-w-72"
              src={img}
              alt="thumbnail"
              loading="lazy"
            />
          </div>
          {/* heading */}
          <div className="xl:max-ww-72 min-h-[3em] w-full py-1 lg:max-w-52">
            <p className="text-lg text-textGrey 2xl:text-2xl">{title}</p>
          </div>
          {/* author(s) + date */}
          <div className="text-xs text-textLightGrey">
            <p className="">{authorDate}</p>
          </div>
          {/* tag(s) */}
          <div className="text-wrap xl:max-w-72">
            {post.tags.map((t, i) => {
              return (
                <Badge
                  key={i}
                  className="mb-[0.1rem] mr-1 rounded-md bg-buttonGrey font-light text-white hover:bg-buttonGrey"
                >
                  {t}
                </Badge>
              );
            })}
          </div>
        </Link>
      </div>
    </>
  );
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
