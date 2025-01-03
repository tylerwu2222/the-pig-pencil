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
      className="cursor-pointer transition duration-700 hover:-translate-y-1 hover:shadow-lg"
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
    </div>
  );
};

export default ArtGalleryThumbnail;
