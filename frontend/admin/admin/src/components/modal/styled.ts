import { Box, styled } from "@mui/material";

export const StyledBoxModal = styled(Box)(({theme}) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background:theme.palette.primary.contrastText,
  width: 400,
  borderRadius: 2,
  boxShadow: "24",
  padding: 4,
}));
