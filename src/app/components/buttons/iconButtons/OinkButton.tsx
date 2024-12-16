import React from "react";
import { PiggyBankIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OinkButtonProps {
  size: number;
  onClickFn: () => void;
}

const OinkButton = ({ size = 25, onClickFn }: OinkButtonProps) => {
  return (
    <button
      className={
        "rounded-full bg-transparent p-1 text-stone-400 transition-all duration-300 ease-in-out hover:scale-125 active:scale-150 active:text-hoverLightPink"
      }
      onClick={onClickFn}
      title="oink"
    >
      <PiggyBankIcon size={size} />
    </button>
  );
};

export default OinkButton;
