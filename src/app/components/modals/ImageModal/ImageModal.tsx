"use client";

import { useState, cloneElement, ReactElement } from "react";
import Image, { StaticImageData } from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ImageModalProps {
  imgTN: React.ReactNode;
  img: StaticImageData | React.ReactElement;
  alt?: string;
  desc: string;
  title: string;
}

const ImageModal = ({ imgTN, img, alt, desc, title }: ImageModalProps) => {
  const [open, setOpen] = useState(false);

//   console.log("img in ImageModal", img);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        {/* Thumbnail Trigger */}
        <DialogTrigger asChild>
          <div
            className="inline-block cursor-pointer transition duration-700 ease-in-out hover:scale-105"
            onClick={() => setOpen(true)}
          >
            {imgTN}
          </div>
        </DialogTrigger>

        {/* Modal Content */}
        <DialogContent className="z-50 sm:h-[80vh] sm:max-h-[90vh] sm:w-[80vw] sm:max-w-[80vw] sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            {img && "src" in img ? (
              <Image
                src={img.src}
                alt={alt || desc || "no alt provided"}
                width={img.width}
                height={img.height}
                className="h-full w-auto object-contain sm:max-h-[60vh]"
                fill={false} // Ensure it respects dimensions
              />
            ) : (
              img
            )}
            <p className="text-muted-foreground text-sm">{desc}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageModal;
