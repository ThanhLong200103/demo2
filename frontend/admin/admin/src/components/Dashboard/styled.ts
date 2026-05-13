import { Button, styled } from "@mui/material";

const StyledButtonDashBoard = styled(Button)(({}) => ({
  height: "150px",
  width: "250px",
  marginTop: "36px",
  backgroundColor: "rgba(25, 118, 210, 0.08)",
  "&.Mui-selected": {},
  "&:hover": {
    backgroundColor: "rgba(25, 118, 210, 0.12)",
  },
}));

export default StyledButtonDashBoard;
