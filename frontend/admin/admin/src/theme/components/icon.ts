import type { Components, Theme } from "@mui/material";

export const iconOderide: Components<Theme>['MuiSvgIcon'] = {
    styleOverrides: {
    root: ({ theme }) => ({
            color: theme.palette.text.secondary,

    }),
  },
}