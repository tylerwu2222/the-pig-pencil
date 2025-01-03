"use client";

import NavigableModal from "@/app/components/modals/NavigableModal/NavigableModal";
import { Art } from "@prisma/client";

import { formatDateToLongDate } from "@/lib/dateFormatting";

import React from "react";

interface CollaboratorInfoModal {
  arts: Art[];
  art: Art | undefined;
  isOpen: boolean;
  initialIndex: number;
  handleNextFn: () => void;
  handlePrevFn: () => void;
  onCloseFn: () => void;
}

const ArtModal = ({
  arts,
  art,
  isOpen = false,
  handleNextFn,
  handlePrevFn,
  onCloseFn,
  initialIndex,
}: CollaboratorInfoModal) => {
  const isMobile = window.innerWidth < 768;

  // define modal content
  let artContent;
  if (art) {
    if (isMobile) {
      artContent = (
        <div className="h-[60vh] overflow-y-scroll">
          <div className="grid grid-flow-row gap-2">
            {/* col 1: art */}
            <div className="w-full h-fit min-h-[45vh]">
              <img
                className="w-full rounded-lg shadow-md"
                src={art?.publicUrl}
                alt="thumbnail"
                loading="lazy"
              />
            </div>
            {/* col 2: desc */}
            <div className="flex flex-col rounded-lg bg-neutral-100 p-3 shadow-md">
              <p>
                <b>artist:</b> Tyler Wu
              </p>
              <p>
                <b>created:</b> {formatDateToLongDate(art.updateDate)}
              </p>
              {/* <p>
                <b>artist:</b> 
              </p> */}
              <p>
                <b>description:</b> {art.description}
              </p>
            </div>
          </div>
        </div>
      );
    }
    // desktop modal
    else {
      artContent = (
        <div className="max-h-[70vh]">
          <div className="grid grid-flow-col gap-2">
            {/* col 1: art */}
            <div className="flex items-center justify-center">
              <img
                className="max-h-[67vh] w-auto max-w-[50vw] rounded-lg shadow-md"
                src={art?.publicUrl}
                alt="thumbnail"
                loading="lazy"
              />
            </div>
            {/* col 2: desc */}
            <div className="flex flex-col rounded-lg bg-neutral-100 p-3 shadow-md">
              <p>
                <b>created:</b> {formatDateToLongDate(art.updateDate)}
              </p>
              {/* <p>
                <b>artist:</b> 
              </p> */}
              <p>
                <b>description:</b> {art.description}
              </p>
            </div>
          </div>
        </div>
      );
    }
  }

  if (art && artContent) {
    return (
      <NavigableModal
        allContent={arts}
        contentHeader={<p className="text-2xl">{art?.title}</p>}
        content={artContent}
        isOpen={isOpen}
        onClose={onCloseFn}
        handleNextFn={handleNextFn}
        handlePrevFn={handlePrevFn}
        initialIndex={initialIndex}
      />
    );
  }
};

export default ArtModal;
