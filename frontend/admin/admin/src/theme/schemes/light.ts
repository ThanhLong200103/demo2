import { createTheme } from '@mui/material/styles';
import { lightPalette } from '../palette';
import { components } from '../components';
import { typography } from '../typography';

export const lightTheme = createTheme({
  cssVariables: true,
  palette: lightPalette,
  components: components,
  typography: typography,
});
