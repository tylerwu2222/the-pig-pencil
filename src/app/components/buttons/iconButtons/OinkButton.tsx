import React from "react";
import { PiggyBankIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface OinkButtonProps {
  size: number;
  onClickFn: () => void;
  className:string;
}

const OinkButton = ({ size = 25, onClickFn, className }: OinkButtonProps) => {
  return (
    <button
      className={
        cn("rounded-full bg-transparent p-1", className)
      }
      onClick={onClickFn}
      title="oink"
    >
      <PiggyBankIcon size={size} />
    </button>
  );
};

export default OinkButton;
