import { Box, FormControl, InputLabel, NativeSelect } from '@mui/material';

import { ThemeProvider } from '@mui/material/styles';
import { TPP_site_theme } from '../../../site_data/site_styles/TPP_site_theme.ts';


const DropdownMenu = ({ handleChange = () => { }, label = "Dropdown Label", options = [1, 2, 3], initialOption = 0, color = "#999", maxWidth = 300 }) => {
    return (
        <>
            <ThemeProvider theme={TPP_site_theme}>
                <Box sx={{
                    'minWidth': 120,
                    'maxWidth': maxWidth,
                    '&.MuiFormLabel-root ': {
                        color: color
                    },
                    '&.MuiNativeSelect-select ': {
                        borderColor: color
                    }
                }}>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            {label}
                        </InputLabel>
                        <NativeSelect
                            defaultValue={initialOption ? initialOption : options[0]}
                            inputProps={{
                                name: label,
                                id: 'uncontrolled-native-' + label,
                            }}
                            onChange={handleChange}
                        >
                            {options.map(o => {
                                return <option key={o} value={o}>{o}</option>
                            })}
                        </NativeSelect>
                    </FormControl>
                </Box>
            </ThemeProvider>
        </>
    )
}

export default DropdownMenu;