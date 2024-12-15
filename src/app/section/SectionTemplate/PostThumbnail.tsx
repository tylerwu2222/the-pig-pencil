"use client";

import React, { useState, useEffect } from "react";

// helpers
import { getSlugTitle } from "@/lib/stringFormatting";
import { formatDateToShortDate } from "@/lib/dateFormatting";

// next
import Link from "next/link";

// motions
// import { motion, AnimatePresence } from "framer-motion";

// components
import { Badge } from "@/components/ui/badge";

// types
import { Post } from "@/types/extendedPrismaTypes";

interface PostThumbnailProps {
  post: Post;
}

export default function PostThumbnail({
  post,
  // section, title, img, author, date, subPage, comingSoon
}: PostThumbnailProps) {
  // author date line
  let authorDate = "";
  if (post.publishDate) {
    authorDate = formatDateToShortDate(post.publishDate);
  }
  // display first author only
  if (post.authors.length > 0) {
    authorDate = post.authors[0] + " ∙ " + authorDate;
  }
  let title = post.title;
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  // define post thumbnail path
  useEffect(() => {
    const dynamicThumbnail = post.thumbnail
      ? `/img/thumbnails/${post.section.toLowerCase()}_thumbnails/${post.thumbnail}`
      : `/img/thumbnails/${post.section}_thumbnails/${post.slug}.png`;
    setImgSrc(dynamicThumbnail);
  }, []);

  // handle wip post
  if (post.visibility == "wip") {
    title = title + " (Coming Soon!)";
  }

  return (
    <>
      {/* <motion.div
        key={post.id}
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="m-[2vh] rounded-sm border-[1px] border-borderGrey p-[2vh] transition duration-700 ease-in-out hover:-translate-x-1 hover:-translate-y-1 hover:border-hoverLightPink hover:bg-highlightWhite hover:shadow-[0.35em_0.35em_0_0_#f2b0ca]"
        title={title}
      > */}
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
            {imgSrc ? (
              <img
                className="w-full object-cover xl:max-w-72"
                src={imgSrc}
                alt="post-thumbnail"
                loading="lazy"
                onError={() => {
                  setImgSrc("/img/thumbnails/coming_soon.png");
                }}
              />
            ) : (
              <div className="w-full xl:max-w-72"></div>
            )}
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
      {/* </motion.div> */}
    </>
  );
}

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
