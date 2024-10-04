import { createTheme, colors } from '@mui/material';


export const cyanTheme = createTheme({
  palette: {
    primary: {
      main: colors.cyan[800],
      dark: colors.cyan[900],
      light: colors.cyan[700],
      contrastText: '#ffffff'
    },
    secondary: {
      main: colors.orange[50],
    },
    error: {
      main: colors.red.A400,
    },
  },
});