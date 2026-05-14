import { Button, Grid2, styled, TableCell, tableCellClasses, TableRow } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts";

export const StyledButtonDashBoard = styled(Button)(({}) => ({
  height: "150px",
  width: "250px",
  marginTop: "36px",
  backgroundColor: "rgba(243, 245, 247, 0.08)",
  position:"relative",
  boxShadow:"0 4px 12px rgba(0,0,0,0.2)",
  "&.Mui-selected": {
    
    "&.MuiListItemIcon-root":{
      
    }
  },
  "&:hover": {
    backgroundColor: "rgba(25, 118, 210, 0.12)",
  },
}));

export const StyledPieChatDashboard = styled(PieChart)(()=>(
  {
    
    "&.Mui-selected": {
      
      backgroundColor: "rgba(243, 245, 247, 0.08)",

    
    }
  }
))

export const StyledBarChart = styled(BarChart) (()=>(
  {
     
    "&.Mui-selected": {
  backgroundColor: "rgba(243, 245, 247, 0.08)",

    "& .MuiBarElement-root": {
              transform: "scaleX(0.8)",

              transformOrigin: "center",
            },
    }
  }
))


export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export const StyledGridRerentActivity = styled(Grid2)(()=>(
  {
     marginTop: "63px",
            padding: "18px 0 18px 0 ",
              boxShadow:"0 4px 12px rgba(0,0,0,0.2)",
            borderRadius: "18px",
              backgroundColor: "rgba(243, 245, 247, 0.08)",
  }
))