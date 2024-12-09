"use client";

import React, { useState, ChangeEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropdownInputRadioProps {
  //   value: string;
  //   onValueChangeFn: (e: ChangeEvent<HTMLInputElement>) => void;
  options: string[];
}

export function DropdownInputRadio({
  // value,
  //   onValueChangeFn = () => {},
  options = ["1", "2"],
}: Partial<DropdownInputRadioProps>) {
  const [position, setPosition] = useState("bottom");

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-sm bg-transparent font-normal"
        >
          sort
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {options.map((o, i) => {
            return (
              <DropdownMenuRadioItem key={i} value={o} className="mx-0 px-1">
                {o}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
