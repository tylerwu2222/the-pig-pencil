"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// types
import { Post } from "@/types/extendedPrismaTypes";

// helpers
import { formatDateToLongDate } from "../../lib/dateFormatting";

// components
import { Button } from "@/components/ui/button";
import ShareIcon from "../components/icons/ShareIcon";
import ShareModal from "../components/modals/ShareModal/ShareModal";
import OinkButton from "../components/buttons/iconButtons/OinkButton";
import { Eye } from "lucide-react";

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
  const pathname = usePathname();

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
    setOinks((prev) => prev + 1); // total oinks
    setPendingOinks((prev) => prev + 1); // user-contributed oinks for this session
  };

  // Sync oinks on 5 second debounce
  const syncOinks = async () => {
    console.log("debounced sycning oinks", pendingOinks);
    await fetch(`/api/post/id/${post.id}/oinks`, {
      method: "POST",
      body: JSON.stringify({ increment: pendingOinks }),
      headers: { "Content-Type": "application/json" },
    });
    setPendingOinks(0); // Reset pending oinks after successful sync
  };

  useEffect(() => {
    if (pendingOinks > 0) {
      const timer = setTimeout(() => {
        syncOinks();
      }, 2000);

      return () => clearTimeout(timer); // Cleanup on re-render
    }
  }, [pendingOinks, post.id]);

  // Sync oinks on navigation away or tab/browser close
  const syncOinksBeforeUnload = () => {
    if (pendingOinks > 0) {
      fetch(`/api/post/id/${post.id}/oinks`, {
        method: "POST",
        body: JSON.stringify({ increment: pendingOinks }),
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      });
    }
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      alert("Are you sure you want to leave?");
    };
    // Attach the beforeunload event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // return () => {
    //   // Cleanup the beforeunload event listener
    //   window.removeEventListener("beforeunload", handleBeforeUnload);
    // };
  }, [pendingOinks, post.id]);

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
          <div className="flex flex-row gap-3">
            {/* views */}
            {post.showViews ? (
              <div className="flex flex-row items-center text-sm italic text-stone-400">
                <div title="views">
                  <Eye size={25} className="p-1" />
                </div>
                <p>{post.views}</p>
              </div>
            ) : (
              <></>
            )}
            {/* oinks */}
            {oinks !== undefined && (
              <div className="group flex flex-row items-center text-sm italic text-stone-400">
                <OinkButton
                  className="text-stone-400 transition-all duration-300 ease-in-out hover:scale-[1.25] active:scale-[1.4] group-active:text-hoverLightPink"
                  size={25}
                  onClickFn={handleOink}
                />
                <p className="group-active:text-hoverLightPink">{oinks}</p>
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
                    link={'thepigpencil.com/' + pathname}
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
