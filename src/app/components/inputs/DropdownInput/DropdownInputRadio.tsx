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
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className='font-normal rounded-sm bg-transparent'>sort</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                    {options.map((o, i) => {
                        return <DropdownMenuRadioItem key={i} value={o} className='px-1 mx-0'>{o}</DropdownMenuRadioItem>
                    })}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
