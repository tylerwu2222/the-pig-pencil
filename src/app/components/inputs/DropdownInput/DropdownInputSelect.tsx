'use client';

import { SetStateAction, Dispatch } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type DropdownInputSelectProps = {
    handleChange?: (value: string | number) => void;
    label?: string;
    options?: (string | number)[];
    // initialOption?: string | number;
    value: string | number;
    onChange: (value: string) => void;
    // setSelectedOption: Dispatch<SetStateAction<string | number>>;
    color?: string; // Hex or tailwind color
    width?: number | string | undefined;
};

const DropdownInputSelect = ({
    // handleChange = () => { },
    label = 'Label',
    options = [1, 2, 3],
    // initialOption = 0,
    value,
    // setSelectedOption,
    onChange,
    color = 'text-gray-500',
    width = 'w-[300px]',
}: DropdownInputSelectProps) => {
    // const [selectedValue, setSelectedValue] = useState(initialOption || options[0]);

    const handleChange = (newValue: string) => {
        // setSelectedOption(value);
        // handleChange(value);
        onChange(newValue);
    };

    return (
        <div className={`${width}`} >
            <Label className={`${color} mb-[0.15rem] mt-2 block text-sm font-medium`}>{label}</Label>
            <Select
                value={String(value)}
                onValueChange={handleChange}
            >
                <div className='group'>
                    <SelectTrigger className="w-full border border-gray-300 text-sm bg-transparent group-hover:border-hoverDeepPink group-hover:bg-highlightWhite data-[state=open]:border-hoverLightPink data-[state=open]:bg-highlightWhite rounded-sm transition-colors duration-500 ease-in-out">
                        <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent className='group-focus-within:block group-hover:block'>
                        {options.map((o) => (
                            <SelectItem key={o} value={String(o)}>
                                {o}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </div>
            </Select>
        </div>
    );
};

export default DropdownInputSelect;
