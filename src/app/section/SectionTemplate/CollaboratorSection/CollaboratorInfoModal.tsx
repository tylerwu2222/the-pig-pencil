"use client";
// import { Author } from "@prisma/client";
import { Author, Post } from "@/types/extendedPrismaTypes";
import React, { useEffect, useState } from "react";

// helpers
import { getSnakeCase } from "@/lib/stringFormatting";
import { formatDateToLongDate } from "@/lib/dateFormatting";

import NavigableModal from "@/app/components/modals/NavigableModal/NavigableModal";

interface CollaboratorInfoModal {
  collaborators: Author[];
  collaborator: Author;
  isOpen: boolean;
  initialIndex: number;
  handleNextFn: () => void;
  handlePrevFn: () => void;
  onCloseFn: () => void;
}

// shared info modal that can be navigated with left/right arrows
const CollaboratorInfoModal = ({
  collaborators,
  collaborator,
  isOpen = false,
  handleNextFn,
  handlePrevFn,
  onCloseFn,
  initialIndex,
}: CollaboratorInfoModal) => {
  let collaboratorContent;

  const [collaboratorPosts, setCollaboratorPosts] = useState<Post[]>([]);

  const fetchAllPosts = async (authorName: string) => {
    // get newest, visible post for author
    const res = await fetch(`/api/post/${authorName}`);
    const allPosts = await res.json();
    setCollaboratorPosts(allPosts);
  };

  useEffect(() => {
    if (collaborator && collaborator.posts.length > 0) {
      fetchAllPosts(collaborator.name);
    }
  }, [collaborator]);

  if (collaborator) {
    // define mug
    const mug =
      "/img/thumbnails/collaborator_mugs/" +
      getSnakeCase(collaborator.name) +
      ".png";

    // get all articles for collaborator

    const isMobile = window.innerWidth < 768;
    // mobile modal
    if (isMobile) {
      collaboratorContent = (
        <div className="max-h-[60vh] overflow-y-scroll">
          <div className="grid grid-flow-row gap-2">
            {/* row 1: profile pic */}
            <div>
              <img
                className="w-full rounded-lg shadow-md lg:max-w-52 xl:max-w-72"
                src={mug}
                alt="thumbnail"
                loading="lazy"
              />
            </div>
            {/* row 2 bio */}
            <div className="flex flex-col rounded-lg bg-neutral-100 p-3 shadow-md">
              <p>
                <b>joined on:</b> {formatDateToLongDate(collaborator.joinDate)}
              </p>
              <p>
                <b>email:</b> {collaborator.email}
              </p>
              <p>
                <b>role:</b> {collaborator.role}
              </p>
              <p>
                <b>favorite pig or pencil:</b> {collaborator.pigThoughts}
              </p>
              <p>
                <b>quote:</b>{" "}
                {collaborator.quote && <i>"{collaborator.quote}"</i>}
              </p>
            </div>
            {/* row 3: published articles */}
            <div className="flex flex-col">
              <h1 className="font-bold">published articles</h1>
              {collaboratorPosts.length > 0 ? (
                <div className="mb-5 mt-2 overflow-y-scroll rounded-lg bg-neutral-50 p-2">
                  {collaboratorPosts.map((p) => {
                    return (
                      <a
                        className="underline transition duration-300 hover:text-hoverDeepPink"
                        href={`/posts/${p.section}/${p.slug}`}
                        title={p.title}
                      >
                        {p.title}
                      </a>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      );
    }
    // desktop modal
    else {
      collaboratorContent = (
        <div className="grid max-h-[60vh] grid-rows-2 gap-3 sm:max-h-[90vh]">
          {/* row 1: profile pic + bio */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div>
              <img
                className="w-full rounded-lg shadow-md lg:max-w-52 xl:max-w-72"
                src={mug}
                alt="thumbnail"
                loading="lazy"
              />
            </div>
            <div className="flex flex-grow flex-col rounded-lg bg-neutral-100 p-3 shadow-md">
              <p>
                <b>joined on:</b> {formatDateToLongDate(collaborator.joinDate)}
              </p>
              <p>
                <b>email:</b> {collaborator.email}
              </p>
              <p>
                <b>role:</b> {collaborator.role}
              </p>
              <p>
                <b>favorite pig or pencil:</b> <i>{collaborator.pigThoughts}</i>
              </p>
              <p>
                <b>quote:</b> <i>"{collaborator.quote}"</i>
              </p>
            </div>
          </div>
          {/* row 2: published articles */}
          <div className="flex flex-col">
            <h1 className="font-bold">published articles</h1>
            <div className="mb-5 mt-2 rounded-lg bg-neutral-50 p-2 sm:flex-grow">
              {collaboratorPosts.length > 0 ? (
                <div className="mb-5 mt-2 h-[20vh] overflow-y-scroll rounded-lg bg-neutral-50 p-2">
                  {collaboratorPosts.map((p, i) => {
                    return (
                      <a href={`/posts/${p.section}/${p.slug}`} title={p.title}>
                        <div
                          className="group my-2 rounded-lg border-[1px] py-3 px-2 transition duration-300 hover:-translate-y-[2px] hover:border-hoverDeepPink"
                          key={i}
                        >
                          <p className="underline transition duration-300 group-hover:text-hoverDeepPink">
                            {formatDateToLongDate(p.publishDate)}: {p.title}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      );
    }
  }

  if (collaborator && collaboratorContent) {
    return (
      <NavigableModal
        allContent={collaborators}
        contentHeader={<p className="text-2xl">{collaborator.name}</p>}
        content={collaboratorContent}
        isOpen={isOpen}
        onClose={onCloseFn}
        handleNextFn={handleNextFn}
        handlePrevFn={handlePrevFn}
        initialIndex={initialIndex}
      />
    );
  }
};

export default CollaboratorInfoModal;
