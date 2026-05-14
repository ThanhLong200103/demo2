import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../styled";

interface OrderTable {
    order:string,
    customer:string,
    date:string,
    status:string
}
interface Rows {
    rows:OrderTable[]
}
export default function TableOrderDashboard({rows}:Rows) {
    return(
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Order</StyledTableCell>
            <StyledTableCell align="right">Customer</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row :OrderTable) => (
            <StyledTableRow key={row.order}>
              <StyledTableCell component="th" scope="row">
                {row.order}
              </StyledTableCell>
              <StyledTableCell align="right">{row.customer}</StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
      
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
};
