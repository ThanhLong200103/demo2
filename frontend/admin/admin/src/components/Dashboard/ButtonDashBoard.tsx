import { Box,  Grid2, ListItemIcon, Typography, type ButtonProps } from "@mui/material";
import { StyledButtonDashBoard } from "./styled";
import type { ReactElement } from "react";

interface ButtonDashboardProps extends ButtonProps {
  title: string;
  text?: string;
  total?: string;
    icon?: ReactElement;
  
}

const ButtonDasdboard = ({
  text,
  title,
  total,
  icon,
  ...props
}: ButtonDashboardProps) => {
  return <Grid2 size={{ lg: 3, md: 6, xs: 12 }}>
    <StyledButtonDashBoard
     {...props}

        >
      
      <Box>
        <Typography>{title}</Typography>
        <Typography>{total}</Typography>
        <Typography sx={{
          fontSize:"10px",
          paddingTop:"36px"
        }}>{text}</Typography>

      </Box>
             
      
       {icon && <ListItemIcon sx={{position:"absolute" , top:"24px",right:"0"}}>{icon}</ListItemIcon>}
    </StyledButtonDashBoard>
    
  </Grid2>;
};

export default ButtonDasdboard
