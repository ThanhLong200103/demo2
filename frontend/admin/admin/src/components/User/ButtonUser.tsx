import { ListItemIcon, Typography, type ButtonProps } from "@mui/material";
import type { ReactElement } from "react";
import { StyledButonUser } from "./styled";

interface ButtonUser extends ButtonProps {
  text: string;
  icon: ReactElement;
}

const ButtonCustomer = ({ text, icon, ...props }: ButtonUser) => {
  return (
    <StyledButonUser {...props}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <Typography>{text}</Typography>
    </StyledButonUser>
  );
};

export default ButtonCustomer;
