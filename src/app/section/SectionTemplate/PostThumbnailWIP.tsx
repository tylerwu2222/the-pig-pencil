"use client";

import React, { useState, useEffect } from "react";

// helpers
import { getSlugTitle } from "@/lib/stringFormatting";
import { formatDateToShortDate } from "@/lib/dateFormatting";

// components
import { Badge } from "@/components/ui/badge";

// types
import { Post } from "@/types/extendedPrismaTypes";

interface PostThumbnailWIPProps {
  post: Post;
}

export default function PostThumbnailWIP({
  post,
  // section, title, img, author, date, subPage, comingSoon
}: PostThumbnailWIPProps) {
  // author date line
  let authorDate = "";
  if (post.publishDate) {
    authorDate = formatDateToShortDate(post.publishDate);
  }
  // display first author only
  if (post.authors.length > 0) {
    authorDate = post.authors[0] + " ∙ " + authorDate;
  }
  const title = "[WIP] " + post.title;
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  // define post thumbnail path
  useEffect(() => {
    const dynamicThumbnail = post.thumbnail
      ? `/img/thumbnails/${post.section.toLowerCase()}_thumbnails/${post.thumbnail}`
      : `/img/thumbnails/${post.section}_thumbnails/${post.slug}.png`;
    setImgSrc(dynamicThumbnail);
  }, []);

  return (
    <>
      <div
        className="m-[2vh] rounded-sm border-[1px] border-borderGrey p-[2vh] transition duration-700 ease-in-out hover:border-red-500"
        title={"coming soon"}
      >
        {/* thumbnail */}
        <div>
          {imgSrc ? (
            <img
              className="w-full object-cover xl:max-w-72 blur-[2px]"
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
        <div className="min-h-[3em] w-full py-1 lg:max-w-52">
          <p className="text-2xl text-textGrey sm:text-lg">{title}</p>
        </div>
        {/* author(s) + date */}
        <div className="text-sm sm:text-xs text-textGrey sm:text-textLightGrey">
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
      </div>
      {/* </motion.div> */}
    </>
  );
}
