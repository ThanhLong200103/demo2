import { createTheme } from '@mui/material/styles';
import { darkPalette } from '../palette';
import { components } from '../components';
import { typography } from '../typography';

export const darkTheme = createTheme({
  cssVariables: true,
  palette: darkPalette,
  components: components,
  typography: typography,
});
