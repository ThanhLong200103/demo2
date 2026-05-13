import { Box, Grid, Typography, type ButtonProps } from "@mui/material";
import StyledButtonDashBoard from "./styled";

interface ButtonDashboardProps extends ButtonProps {
  title: string;
  text?: string;
  total?: number;
}

const ButtonDasdboard = ({
  text,
  title,
  total,
  ...props
}: ButtonDashboardProps) => {
  return <Grid size={{ lg: 3, md: 6, xs: 12 }}>
    <StyledButtonDashBoard
     {...props}

        >
      
      <Box>
        <Typography>{title}</Typography>
        <Typography>{total}</Typography>
        <Typography>{text}</Typography>

      </Box>
    </StyledButtonDashBoard>
  </Grid>;
};

export default ButtonDasdboard
