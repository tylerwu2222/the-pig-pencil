"use client";

import React, { useState, useEffect } from "react";
import { Post } from "@/types/extendedPrismaTypes";
import { formatDateToLongDate } from "../../lib/dateFormatting";

import { Button } from "@/components/ui/button";
import ShareIcon from "../components/buttons/iconButtons/ShareIcon";
import ShareModal from "../components/modals/ShareModal/ShareModal";
import OinkButton from "../components/buttons/iconButtons/OinkButton";

interface PostHeaderProps {
  post: Post;
  showThumbnail?: boolean;
}

export default function PostHeader({
  post,
  // showThumbnail = true,
}: PostHeaderProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [oinks, setOinks] = useState<number>(0);
  const [pendingOinks, setPendingOinks] = useState<number>(0);

  useEffect(() => {
    const dynamicThumbnail = post.thumbnail
      ? `/img/thumbnails/${post.section.toLowerCase()}_thumbnails/${post.thumbnail}`
      : `/img/thumbnails/${post.section}_thumbnails/${post.slug}.png`;
    setImgSrc(dynamicThumbnail);
  }, []);

  // get initial oinks
  useEffect(() => {
    const fetchOinksForPost = async () => {
      const res = await fetch(`/api/post/id/${post.id}/oinks`);
      const oinks = await res.json();
      console.log("oinks FE", oinks);
      setOinks(oinks);
    };
    fetchOinksForPost();
  }, []);

  // FE update for oinks
  const handleOink = () => {
    setOinks((prev) => prev + 1);
    setPendingOinks((prev) => prev + 1);
  };

  // Sync oinks on page exit
  // useEffect(() => {
  //   const handleUnload = async () => {
  //     if (pendingOinks > 0) {
  //       navigator.sendBeacon(
  //         `/api/oinks`,
  //         JSON.stringify({ id: post.id, increment: pendingOinks }),
  //       );
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleUnload);
  //   return () => window.removeEventListener("beforeunload", handleUnload);
  // }, [pendingOinks, post.id]);

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
        {post.showHeaderImage && (
          <div className="justify-items-center pb-1">
            {imgSrc && (
              <img
                className="h-[60vh] w-[60vh] border-[1px] border-borderGrey object-contain"
                src={imgSrc}
                alt="post-header-img"
                loading="lazy"
                onError={() => {
                  setImgSrc("/img/thumbnails/coming_soon.png");
                }}
              ></img>
            )}
          </div>
        )}
        {/* author(s)  + reading time*/}
        <div>
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
        {/* interactive buttons (oink, share, read aloud) */}
        <div className="flex flex-row items-center justify-between gap-2">
          {/* metrics */}
          <div className="flex flex-row">
            {/* views */}
            {post.showViews ? (
              <div className="flex flex-row items-center text-sm italic text-stone-400">
                <p>views: {post.views}</p>
              </div>
            ) : (
              <></>
            )}
            {/* oinks */}
            {oinks !== undefined && (
              <div className="flex flex-row items-center text-sm italic text-stone-400">
                <OinkButton size={25} onClickFn={handleOink} />
                <p>{oinks}</p>
              </div>
            )}
          </div>
          {/* actions */}
          <div className="flex flex-row">
            {/* share */}
            {post.isSharable ? (
              post.slug && (
                <div>
                  <ShareModal
                    shareTrigger={
                      <Button
                        variant={"ghost"}
                        className="aspect-square h-fit w-fit rounded-full border-[1px] border-stone-400 p-[.35rem] text-stone-400 transition duration-500 hover:border-hoverLightPink hover:bg-highlightWhite hover:text-hoverLightPink"
                        title="share"
                      >
                        <ShareIcon size={15} />
                      </Button>
                    }
                    link={post.slug}
                  />
                </div>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
