import { Container, styled } from "@mui/material";

interface SideBarColor {
  color?: string;
}

const SideBar = styled(Container)<SideBarColor>(({ theme, color }) => ({
  backgroundColor: color || theme.palette.background.default,
  height: "100%",
  width: "25%",
  borderRight: "1px solid #ccc",
  position: "absolute",
}));

export default SideBar;
