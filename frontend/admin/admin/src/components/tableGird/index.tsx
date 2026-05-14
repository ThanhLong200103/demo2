import { DataGrid } from "@mui/x-data-grid";
import { ColumTable } from "./columns";
export const handleEdit = (id: string) => {
  return console.log("id", id);
};
export const handleDelete = (id: string) => {
  return console.log("id", id);
};
const paginationModel = { page: 0, pageSize: 5 };

type Props = {
  rows?:any,
  checkbox:boolean 
}

const DataGird = ({rows ,checkbox}:Props) => {
  
  return (
    <DataGrid
      sx={{
        width: "100%",
      }}
      rows={rows}
      columns={ColumTable({ handleEdit, handleDelete })}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
        checkboxSelection ={
        checkbox
      }
    />
  );
};

export default DataGird;
