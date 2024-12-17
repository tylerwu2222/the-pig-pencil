"use client";

import React, { useEffect, useState } from "react";

// components
import { Badge } from "@/components/ui/badge";
import IconWithText from "@/app/components/icons/IconWithText";
import { Eye, FileText, PiggyBank } from "lucide-react";

// types
import { Post } from "@prisma/client";
import { Author } from "@/types/extendedPrismaTypes";

// helpers
import { differenceInDays } from "date-fns";
import { getSnakeCase } from "@/lib/stringFormatting";
import { formatDateToShortDate } from "@/lib/dateFormatting";

interface CollaboratorThumbnailProps {
  collaborator: Author;
  sortBadge?: string | undefined;
}

const validSortOptions = ["total posts", "total views", "total oinks"];

export default function CollaboratorThumbnail({
  collaborator,
  sortBadge,
}: CollaboratorThumbnailProps) {
  const [newestPost, setNewestPost] = useState<Post | undefined>(undefined);

  // define collaborator mug
  const mug =
    "/img/thumbnails/collaborator_mugs/" +
    getSnakeCase(collaborator.name) +
    ".png";

  //   console.log("post id");

  useEffect(() => {
    const fetchPostById = async () => {
      console.log(
        "first post id in FE fetch",
        collaborator.name,
        // collaborator.posts,
        collaborator.posts[0],
      );
      const res = await fetch(
        `/api/post/id/${collaborator.posts.slice(-1)[0]}`,
      );
      const postData = await res.json();
      // console.log("new post", postData);
      setNewestPost(postData);
    };
    if (collaborator.posts.length > 0) {
      // console.log('co')
      fetchPostById();
    }
  }, [collaborator]);

  // const newestPost = getPostById(collaborator.posts[0]);
  // console.log('newest post', newestPost);

  console.log("sort badge", sortBadge);

  const isNew =
    differenceInDays(new Date(), collaborator.joinDate) <= 7 &&
    differenceInDays(new Date(), collaborator.joinDate) > 0;

  return (
    <>
      <div
        className={`group relative m-[2vh] rounded-sm border-[1px] border-borderGrey p-[2vh] transition duration-700 ease-in-out hover:border-hoverLightPink hover:bg-highlightWhite ${isNew && sortBadge === "date joined" ? "border-orange-400" : ""} ${sortBadge === "total oinks" ? "border-hoverLightPink" : ""}`}
        title={collaborator.name}
      >
        {/* badges */}
        {sortBadge === "date joined" && isNew && (
          <Badge className="absolute left-0 top-0 m-[1vh] rounded-full bg-orange-400 text-xs text-white transition duration-700 ease-in-out group-hover:bg-hoverLightPink">
            <p>new member!</p>
          </Badge>
        )}
        {typeof sortBadge === "string" &&
          validSortOptions.includes(sortBadge) && (
            <Badge
              className={`absolute left-0 top-0 m-[1vh] rounded-full bg-borderGrey text-xs text-white transition duration-700 ease-in-out group-hover:bg-hoverLightPink ${sortBadge === "total oinks" ? "bg-hoverLightPink" : ""}`}
            >
              <div className="flex">
                {sortBadge === "total posts" && (
                  <IconWithText
                    icon={<FileText size={18} />}
                    text={String(collaborator.postCount)}
                  />
                )}
                {sortBadge === "total views" && (
                  <IconWithText
                    icon={<Eye size={18} />}
                    text={String(collaborator.viewCount)}
                  />
                )}
                {sortBadge === "total oinks" && (
                  <IconWithText
                    icon={<PiggyBank size={18} />}
                    text={String(collaborator.oinkCount)}
                  />
                )}
              </div>
            </Badge>
          )}
        {/* content */}
        <div>
          {/* mugshot */}
          <img
            className="w-full lg:max-w-52 xl:max-w-72"
            src={mug}
            alt="thumbnail"
            loading="lazy"
          />
          {/* name, role, join date */}
          <div className="xl:max-ww-72 w-full py-1 transition duration-700 ease-in-out group-hover:text-hoverDeepPink lg:max-w-52">
            <p className="text-lg text-textGrey">{collaborator.name}</p>
            <p className="text-sm italic text-textLightGrey">
              {collaborator.role}
            </p>
            <p className="text-xs text-textLightGrey">
              Joined: {formatDateToShortDate(collaborator.joinDate)}
            </p>
          </div>
          {/* link to most recent post */}
          <div className="pt-2 text-sm">
            {newestPost ? (
              <p className="">
                <span className="font-semibold">Newest post: </span>
                <a
                  className="underline hover:text-hoverDeepPink"
                  href={`/posts/${newestPost.section}/${newestPost.slug}`}
                  title={newestPost.title}
                >
                  {newestPost.title}
                </a>
              </p>
            ) : (
              <p>Has not written anything yet, but let 'em cook🧑‍🍳</p>
            )}
          </div>

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
      </div>
    </>
  );
}
