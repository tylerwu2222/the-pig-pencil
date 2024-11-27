import React, { useState } from 'react'

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider } from '@mui/material/styles';


import { TPP_site_theme } from '../../../../site_data/site_styles/TPP_site_theme.ts';


const sortOptions = [
    'author',
    'date',
    // to add
    // 'topic', 
    // 'views'
];

export const CustomSelect = ({ label = "Sort", sortOption = sortOptions[0], onChangeFn = () => { } }) => {

    return (
        <div>
            <ThemeProvider theme={TPP_site_theme}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel id="demo-simple-select-standard-label">Sort by</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        variant="standard"
                        value={sortOption}
                        label={label}
                        onChange={(e) => { onChangeFn(e.target.value) }}
                        MenuProps={{
                            disableScrollLock: true,
                        }}
                    >
                        {sortOptions.map(o => {
                            return <MenuItem value={o}>{o}</MenuItem>
                        })
                        }
                    </Select>
                </FormControl>
            </ThemeProvider>
        </div>
    )
}
