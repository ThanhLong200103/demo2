import { Button, styled, TextField } from "@mui/material";

export const StyledButonUser = styled(Button)(() => ({
  maxHeight: "36px",
  minWidth: "92px",
}));

export const SearchUser = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 10,
    width: "360px",
    marginTop: "16px",
  },
}));
