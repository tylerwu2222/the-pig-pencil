"use client"

import React, { useState, ChangeEvent } from "react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DropdownInputRadioProps {
    value: string;
    options: string[];
    onValueChangeFn: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function DropdownInputRadio({
    value,
    options = ['1', '2'],
    onValueChangeFn = () => { } }: Partial<DropdownInputRadioProps>) {
    const [position, setPosition] = useState("bottom")

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Sort by</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                    {options.map((o, i) => {
                        return <DropdownMenuRadioItem key={i} value={o}>{o}</DropdownMenuRadioItem>
                    })}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
