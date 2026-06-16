import { createTheme } from '@mui/material/styles';
import { components } from './components';
import { lightPalette, darkPalette } from './palette';
import { typography } from './typography';
// Theme factory function that creates theme based on mode
export const createAppTheme = (mode:"light" | "dark") => {
  const palette = mode === 'dark' ? darkPalette : lightPalette;
  localStorage.setItem("mode",mode)
  return createTheme({
    cssVariables: true,
    palette: palette,
    components: components,
    typography: typography,
  });
  
};
