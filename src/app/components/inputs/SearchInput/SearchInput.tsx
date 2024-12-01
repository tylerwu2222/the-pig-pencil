import React, { useState, ChangeEvent } from 'react'
import { Input } from '@/components/ui/input'

interface SearchInputProps {
    value: string;
    onValueChangeFn: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

export default function SearchInput({
    value,
    onValueChangeFn,
    placeholder = 'search'
}: Partial<SearchInputProps>) {
    // const [searchBarWidth, setSearchBarWidth] = useState<string>('w-50');

    return (
        <Input
            placeholder={placeholder}
            value={value}
            onChange={onValueChangeFn}
            className='placeholder-slate-400 focus:border-hoverDeepPink focus:bg-highlightWhite rounded-sm transition-colors duration-500 ease-in-out'
        />
    )
}