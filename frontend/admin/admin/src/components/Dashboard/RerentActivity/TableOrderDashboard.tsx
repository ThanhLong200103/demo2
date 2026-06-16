import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../styled";
import type { OrderType } from "../../../types/order";


interface Rows {
    rows:OrderType[]
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
          {rows.map((row :OrderType) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.nameUser}</StyledTableCell>
              <StyledTableCell align="right">
                {new Date(row.created_at).toLocaleString("vi-VN")}
              </StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
      
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
};
