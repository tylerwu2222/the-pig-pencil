import { useState, useEffect, ReactElement } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Author, Post } from "@prisma/client";

interface PostModalProps {
  isOpen: boolean;
  allContent: (Post | Author)[];
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
      <DialogContent className="sm:h-[80vh] sm:max-h-[90vh] sm:w-[80vw] sm:max-w-[80vw]">
        <DialogHeader>
          <DialogTitle>{contentHeader}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-between">
          {/* prev button */}
          {currentIndex > 0 && (
            <Button variant="ghost" onClick={handlePrev}>
              &larr; Prev
            </Button>
          )}
          {/* allContent */}
          <div className="flex-grow px-4">{content}</div>
          {/* next button */}
          {currentIndex < allContent.length - 1 && (
            <Button variant="ghost" onClick={handleNext}>
              Next &rarr;
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
