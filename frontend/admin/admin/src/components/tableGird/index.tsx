import { DataGrid, type GridColDef } from "@mui/x-data-grid";
export const handleEdit = (id: string) => {
  return console.log("id", id);
};
export const handleDelete = (id: string) => {
  return console.log("id", id);
};
const paginationModel = { page: 0, pageSize: 5 };


// interface setGirdCol  extends GridColDef[] {

// } 
type Props = {
  rows?:any,
  checkbox:boolean,
  columns:GridColDef[] 
}

const DataGird = ({rows ,checkbox ,columns }:Props) => {
  
  return (
    <DataGrid
      sx={{
        width: "100%",
      }}
      rows={rows}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
        checkboxSelection ={
        checkbox
      }
    />
  );
};

export default DataGird;
