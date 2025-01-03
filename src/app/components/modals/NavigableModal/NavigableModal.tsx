import { useState, useEffect, ReactElement } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { MoveLeft, MoveRight } from "lucide-react";

import { Art, Author, Post } from "@prisma/client";

interface PostModalProps {
  isOpen: boolean;
  allContent: (Post | Author | Art)[];
  handleNextFn: () => void;
  handlePrevFn: () => void;
  onClose?: () => void;
  contentHeader?: ReactElement;
  content: ReactElement;
  initialIndex?: number;
}

export default function NavigableModal({
  isOpen,
  onClose,
  handleNextFn,
  handlePrevFn,
  allContent,
  contentHeader,
  content,
  initialIndex = 0,
}: PostModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : allContent.length - 1));
    handlePrevFn();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < allContent.length - 1 ? prev + 1 : 0));
    handleNextFn();
  };

  // make modal visible with initial index
  useEffect(() => {
    if (isOpen) setCurrentIndex(initialIndex);
  }, [isOpen, initialIndex]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:h-[80vh] sm:max-h-[90vh] sm:w-[80vw] sm:max-w-[80vw]">
        <DialogHeader className="h-fit">
          <DialogTitle >{contentHeader}</DialogTitle>
        </DialogHeader>
        {/* content */}
        <div className="flex items-center justify-center">
          <div className="px-4 sm:flex-grow">{content}</div>
        </div>
        {/* prev button */}
        {currentIndex > 0 && isOpen && (
          <button
            onClick={handlePrev}
            className="absolute left-2 bottom-2 z-50 rounded-full bg-gray-200 p-2 hover:bg-gray-300 focus:outline-none sm:left-0 sm:bottom-1/2 sm:-translate-x-12"
          >
            <MoveLeft size={15} />
          </button>
        )}
        {/* next button */}
        {currentIndex < allContent.length - 1 && isOpen && (
          <button
            onClick={handleNext}
            className="absolute right-2 bottom-2 z-50 rounded-full bg-gray-200 p-2 hover:bg-gray-300 focus:outline-none sm:right-0 sm:bottom-1/2 sm:translate-x-12"
          >
            <MoveRight size={15} />
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
}
