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
                        className="cursor-pointer inline-block"
                        onClick={() => setOpen(true)}
                    >
                        {imgTN}
                    </div>
                </DialogTrigger>

                {/* Modal Content */}
                <DialogContent className="max-w-fit p-6">
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
