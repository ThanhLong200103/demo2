import type { PaletteOptions } from "@mui/material";

// Light mode palette
export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#000',
    light: '#fff',
    dark: '#1565c0',
    contrastText: '#fff',
  },
  secondary: {
    main: '#7c3aed',
    light: '#a78bfa',
    dark: '#6d28d9',
    contrastText: '#fff',
  },
  background: {
    default: '#f5f5f5',
    paper: '#ffffff',
  },
  text: {
    primary: '#000000',
    secondary: '#000',
    disabled: '#bdbdbd',
  },
  divider: '#e0e0e0',
  action: {
    active: '#1976d2',
    hover: '#f5f5f5',
    selected: '#e3f2fd',
    disabled: '#bdbdbd',
    disabledBackground: '#f5f5f5',
  },
  success: {
    main: '#4caf50',
    light: '#81c784',
    dark: '#388e3c',
  },
  warning: {
    main: '#ff9800',
    light: '#ffb74d',
    dark: '#f57c00',
  },
  error: {
    main: '#f44336',
    light: '#ef5350',
    dark: '#d32f2f',
  },
  info: {
    main: '#2196f3',
    light: '#64b5f6',
    dark: '#1976d2',
  },
};

// Dark mode palette
export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#ffff',
    light: '#0000',
    dark: '#1976d2',
    contrastText: '#000',
  },
  secondary: {
    main: '#a78bfa',
    light: '#ddd6fe',
    dark: '#6d28d9',
    contrastText: '#fff',
  },
  background: {
    default: '#121212',
    paper: '#1e1e1e',
  },
  text: {
    primary: '#ffffff',
    secondary: '#fff',
    disabled: '#666666',
  },
  divider: '#424242',
  action: {
    active: '#90caf9',
    hover: '#2a2a2a',
    selected: '#1e1e1e',
    disabled: '#666666',
    disabledBackground: '#2a2a2a',
  },
  success: {
    main: '#66bb6a',
    light: '#81c784',
    dark: '#43a047',
  },
  warning: {
    main: '#ffa726',
    light: '#ffb74d',
    dark: '#f57c00',
  },
  error: {
    main: '#ef5350',
    light: '#e57373',
    dark: '#c62828',
  },
  info: {
    main: '#64b5f6',
    light: '#81d4fa',
    dark: '#1976d2',
  },
};

// Default palette (light mode)
export const palette: PaletteOptions = lightPalette;