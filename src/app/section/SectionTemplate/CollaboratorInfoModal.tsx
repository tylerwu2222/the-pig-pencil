import { Author } from "@prisma/client";
import React from "react";

// helpers
import { getSnakeCase } from "@/lib/stringFormatting";
import { formatDateToLongDate } from "@/lib/dateFormatting";

import NavigableModal from "@/app/components/modals/NavigableModal/NavigableModal";

interface CollaboratorInfoModal {
  collaborators: Author[];
  collaborator: Author | undefined;
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

  if (collaborator) {
    const mug =
      "/img/thumbnails/collaborator_mugs/" +
      getSnakeCase(collaborator.name) +
      ".png";

    collaboratorContent = (
      <div className="grid grid-rows-2 gap-3">
        {/* row 1: profile pic + bio */}
        <div className="flex gap-3">
          <div>
            <img
              className="w-full rounded-lg lg:max-w-52 xl:max-w-72"
              src={mug}
              alt="thumbnail"
              loading="lazy"
            />
          </div>
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
              <b>thoughts on pigs:</b> <i>{collaborator.pigThoughts}</i>
            </p>
            <p>
              <b>thoughts on everything else:</b> <i>"{collaborator.quote}"</i>
            </p>
          </div>
        </div>
        {/* row 2: published articles */}
        <div className="w-full flex flex-col">
          <h1 className="font-bold">published articles</h1>
          <div className="flex-grow overflow-y-scroll rounded-lg bg-neutral-50 p-2 mt-2 mb-5">
            here...
          </div>
        </div>
      </div>
    );
  }

  if (collaborator && collaboratorContent) {
    return (
      <NavigableModal
        allContent={collaborators}
        contentHeader={<p>{collaborator.name}</p>}
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
