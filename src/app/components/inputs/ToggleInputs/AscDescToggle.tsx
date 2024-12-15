import { Button } from "@/components/ui/button";
import React from "react";

import { ArrowUpNarrowWideIcon, ArrowDownWideNarrowIcon } from "lucide-react";

interface AscDescToggleProps {
  value: "asc" | "desc";
  onClickFn: () => void;
}

export default function AscDescToggle({
  value,
  onClickFn,
}: AscDescToggleProps) {
  const handleToggle = () => {
    onClickFn();
  };

  return (
    <Button
      onClick={handleToggle}
      variant="outline"
      className="bg-transparent hover:bg-highlightWhite active:border-hoverDeepPink"
      title={value == "asc" ? "change to descending" : "change to ascending"}
    >
      {value == "asc" ? <ArrowUpNarrowWideIcon /> : <ArrowDownWideNarrowIcon />}
    </Button>
  );
}
