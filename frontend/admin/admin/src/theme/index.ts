import { createTheme } from '@mui/material/styles';
import { components } from './components';
import { palette } from './palette';
import { typography } from './typography';

// Create a theme instance.
const theme = createTheme({
  cssVariables: true,
  components:components,
  palette:palette,
  typography:typography
});

export default theme;