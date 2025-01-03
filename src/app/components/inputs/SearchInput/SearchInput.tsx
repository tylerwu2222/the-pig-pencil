import React, { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  value: string;
  onValueChangeFn: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export default function SearchInput({
  value,
  onValueChangeFn,
  placeholder = "search",
}: Partial<SearchInputProps>) {
  // const [searchBarWidth, setSearchBarWidth] = useState<string>('w-50');

  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={onValueChangeFn}
      className="rounded-sm placeholder-slate-400 transition-colors duration-500 ease-in-out hover:bg-highlightWhite focus:border-hoverDeepPink focus:bg-highlightWhite"
    />
  );
}
