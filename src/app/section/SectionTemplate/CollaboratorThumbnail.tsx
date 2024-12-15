"use client";

import React, { useEffect, useState } from "react";
import { Author } from "@/types/extendedPrismaTypes";
import { getSnakeCase } from "@/lib/stringFormatting";
import { Post } from "@prisma/client";

interface CollaboratorThumbnailProps {
  collaborator: Author;
}

export default function CollaboratorThumbnail({
  collaborator,
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

  return (
    <>
      <div
        className="group m-[2vh] rounded-sm border-[1px] border-borderGrey p-[2vh] transition duration-700 ease-in-out hover:border-hoverLightPink hover:bg-highlightWhite"
        title={collaborator.name}
      >
        {/* mugshot */}
        <img
          className="w-full lg:max-w-52 xl:max-w-72"
          src={mug}
          alt="thumbnail"
          loading="lazy"
        />
        {/* name */}
        <div className="xl:max-ww-72 w-full py-1 lg:max-w-52">
          <p className="text-lg text-textGrey transition duration-700 ease-in-out group-hover:text-hoverDeepPink 2xl:text-2xl">
            {collaborator.name}
          </p>
        </div>
        {/* role */}
        <div className="xl:max-ww-72 w-full py-1 lg:max-w-52">
          <p className="text-md italic text-textGrey transition duration-700 ease-in-out group-hover:text-hoverDeepPink 2xl:text-2xl">
            {collaborator.role}
          </p>
        </div>
        {/* link to most recent post */}

        <div className="text-xs text-textLightGrey">
          {newestPost ? (
            <p className="">
              <span className="font-semibold">Newest post: </span>
              <a
                className="hover:text-hoverDeepPink hover:underline"
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
    </>
  );
}
