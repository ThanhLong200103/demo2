import type { Components } from "@mui/material";


export const buttonOverrides: Components['MuiButton'] = {
  styleOverrides: {
    root: {
      borderRadius: 10,
      fontWeight: 300,
      textTransform: 'none',
    //   background:"black"
    },
  },

  defaultProps: {
    disableElevation: true,
  },
};