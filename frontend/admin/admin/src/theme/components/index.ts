


import type { Components, Theme } from '@mui/material';
import { buttonOverrides } from './button';
import { iconOderide } from './icon';

export const components: Components<Theme> = {
  MuiButton: buttonOverrides,
  MuiSvgIcon: iconOderide,
};

