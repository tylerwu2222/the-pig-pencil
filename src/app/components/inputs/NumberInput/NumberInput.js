import { TextField } from "@mui/material";

import { ThemeProvider } from "@mui/material/styles";
import { TPP_site_theme } from "../../../site_data/site_styles/TPP_site_theme.ts";


export default function NumberInput({
    label = "number",
    min = 0,
    max = null,
    stepSize = 1,
    value = 0,
    setValue = () => { },
    percentWidth = '30',
    marginH = 10 }) {
    // const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <ThemeProvider theme={TPP_site_theme}>
            <TextField
                label={label}
                type="number"
                value={value}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{ min: min, max: max, step: stepSize }}
                variant="standard"
                style={{
                    width: percentWidth + '%',
                    marginRight: marginH / 2,
                    marginLeft: marginH / 2
                }}
            />
        </ThemeProvider>
    )
}
