import { ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';

import { cyanTheme } from "./cyanTheme";

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={cyanTheme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />

      {children}
    </ThemeProvider>
  );
};
