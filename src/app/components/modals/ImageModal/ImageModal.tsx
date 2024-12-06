'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface ImageModalProps {
    imgTN: React.ReactNode;
    img: React.ReactNode;
    desc: string;
    title: string
}

const ImageModal = ({ imgTN, img, desc, title }: ImageModalProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                {/* Thumbnail Trigger */}
                <DialogTrigger asChild>
                    <div
                        className="cursor-pointer inline-block hover:scale-105 transition ease-in-out duration-700"
                        onClick={() => setOpen(true)}
                    >
                        {imgTN}
                    </div>
                </DialogTrigger>

                {/* Modal Content */}
                <DialogContent className="w-fit h-fit max-w-[80vw] max-h-[80vh] p-6 z-50">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center gap-4">
                        {img}
                        <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ImageModal;
