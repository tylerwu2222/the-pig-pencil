import React from "react";

interface ImageIconProps {
  src?: string;
  size?: number;
  blackWhite?: boolean;
}

const ImageIcon = ({ src, size, blackWhite = false }: ImageIconProps) => {
  return (
    <div>
      <img
        src={src}
        className={`aspect-square h-auto w-full max-w-8 rounded-full ${blackWhite ? "grayscale" : ""}`}
      ></img>
    </div>
  );
};

export default ImageIcon;
