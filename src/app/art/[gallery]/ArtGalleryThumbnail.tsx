import { Art } from "@prisma/client";
import React from "react";
import Image from "next/image";

interface ArtGalleryThumbnailProps {
  art: Art;
  sortBadge?: string | undefined;
  onClickFn?: () => void;
}

const ArtGalleryThumbnail = ({
  art,
  sortBadge,
  onClickFn,
}: ArtGalleryThumbnailProps) => {
  return (
    <div
      className="group relative cursor-pointer transition duration-700 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
      title={art.title}
      onClick={onClickFn}
    >
      <Image
        className="rounded-md"
        src={art.publicUrl}
        alt={art.title}
        width={300}
        height={300}
      />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[1em] transform rounded-t-lg bg-black opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-70">
        <p className="px-4 py-2 text-center font-bold text-white">
          {art.title}
        </p>
      </div>
    </div>
  );
};

export default ArtGalleryThumbnail;
