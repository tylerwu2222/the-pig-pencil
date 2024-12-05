// import { TextField } from "@mui/material";

// import { ThemeProvider } from "@mui/material/styles";
// import { TPP_site_theme } from "../../../site_data/site_styles/TPP_site_theme.ts";


// export default function NumberInput({
//     label = "number",
//     min = 0,
//     max = null,
//     stepSize = 1,
//     value = 0,
//     setValue = () => { },
//     percentWidth = '30',
//     marginH = 10 }) {
//     // const [value, setValue] = useState('');

//     const handleChange = (event) => {
//         setValue(event.target.value);
//     };

//     return (
//         <ThemeProvider theme={TPP_site_theme}>
//             <TextField
//                 label={label}
//                 type="number"
//                 value={value}
//                 onChange={handleChange}
//                 InputLabelProps={{
//                     shrink: true,
//                 }}
//                 inputProps={{ min: min, max: max, step: stepSize }}
//                 variant="standard"
//                 style={{
//                     width: percentWidth + '%',
//                     marginRight: marginH / 2,
//                     marginLeft: marginH / 2
//                 }}
//             />
//         </ThemeProvider>
//     )
// }

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type NumberInputProps = {
    label?: string;
    min?: number;
    max?: number | null;
    stepSize?: number;
    value: number;
    setValue: (value: number) => void;
    percentWidth?: string;
    marginH?: number;
};

const NumberInput: React.FC<NumberInputProps> = ({
    label = "number",
    min = 0,
    max = null,
    stepSize = 1,
    value = 0,
    setValue = () => { },
    percentWidth = "30",
    marginH = 10,
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.valueAsNumber;
        if (!isNaN(newValue)) {
            setValue(newValue);
        }
    };

    return (
        <div
            style={{
                width: `${percentWidth}%`,
                marginRight: `${marginH / 2}px`,
                marginLeft: `${marginH / 2}px`,
            }}
        >
            {label && (
                <Label htmlFor="number-input" className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </Label>
            )}
            <Input
                id="number-input"
                type="number"
                value={value}
                onChange={handleChange}
                min={min}
                max={max ?? undefined}
                step={stepSize}
                className="w-full"
            />
        </div>
    );
};

export default NumberInput;
