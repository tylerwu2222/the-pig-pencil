import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ReactNode } from "react";

interface ShareModalProps {
  shareTrigger: ReactNode;
  link: string;
}

const ShareModal = ({ shareTrigger, link }: ShareModalProps) => {
  // console.log("share modal trigger", shareTrigger);

  return (
    <Dialog>
      <DialogTrigger asChild>{shareTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share this article</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Input defaultValue={link} readOnly={true}></Input>
          Messenger, Discord, Reddit
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
