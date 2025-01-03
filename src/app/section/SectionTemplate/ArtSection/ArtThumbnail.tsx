import { Art } from "@prisma/client";
import React from "react";

interface ArtThumbnailProps {
  art: Art;
  sortBadge?: string | undefined;
  onClickFn?: () => void;
}

export default function ArtThumbnail({
  art,
  sortBadge,
  onClickFn,
}: ArtThumbnailProps) {
  return <div>ArtThumbnail</div>;
}
