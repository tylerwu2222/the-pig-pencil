import React from "react";
import { Post } from "@/types/extendedPrismaTypes";
import { formatDateToLongDate } from "../../lib/dateFormatting";

interface PostHeaderProps {
  post: Post;
  showThumbnail?: boolean;
}

export default function PostHeader({
  post,
  showThumbnail = true,
}: PostHeaderProps) {
  return (
    <div className="justify-items-center pb-8">
      {/* define with to be half of screen width */}
      <div className="w-[60vh]">
        {/* title, caption */}
        <div className="justify-items-center pb-2">
          <h1 className="text-2xl">{post.title}</h1>
          <h2 className="text-lg italic">{post.caption}</h2>
          <p className="text-sm text-textGrey">
            {formatDateToLongDate(post.publishDate)}
          </p>
        </div>
        {/* thumbnail */}
        {showThumbnail && (
          <div className="justify-items-center pb-1">
            <img
              className="h-[60vh] w-[60vh] border-[1px] border-borderGrey object-contain"
              src={
                post.thumbnail
                  ? post.thumbnail
                  : `/img/thumbnails/${post.section}_thumbnails/${post.slug}.png`
              }
            ></img>
          </div>
        )}
        {/* author(s) */}
        <div className="justify-items-start">
          <p className="flex items-center justify-center text-sm">
            {post.authors.join(", ")}
          </p>
        </div>
        <div className="justify-between text-textLightGrey">
          {/* read-aloud if available */}
          <div></div>
          {/* read time */}
          {post.readingTime ? (
            <p className="text-xs">Reading time: {post.readingTime}</p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
