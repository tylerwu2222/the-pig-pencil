import { ThemeOptions, createTheme } from '@mui/material/styles';

const customTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#f081ab',
    },
    secondary: {
      main: '#4C4439',
    },
    background: {
      default: '#FDFBF8',
    },
  },
};

export const TPP_site_theme = createTheme(customTheme);