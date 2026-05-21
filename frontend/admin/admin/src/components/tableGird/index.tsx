import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
} from "@mui/x-data-grid";

type Props = {
  rows?: any;
  checkbox: boolean;
  columns: GridColDef[];

  loading?: boolean;

  rowCount?: number;

  paginationModel: GridPaginationModel;

  onPaginationModelChange: (
    model: GridPaginationModel
  ) => void;
};

const DataGird = ({
  rows,
  checkbox,
  columns,
  loading,
  rowCount,
  paginationModel,
  onPaginationModelChange,
}: Props) => {
  return (
    <DataGrid
      sx={{
        width: "100%",
      }}
      rows={rows}
      columns={columns}
      loading={loading}
      rowCount={rowCount}
      paginationMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={
        onPaginationModelChange
      }
      pageSizeOptions={[5, 10]}
      checkboxSelection={checkbox}
    />
  );
};

export default DataGird;
