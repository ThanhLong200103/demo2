import type { GridColDef } from "@mui/x-data-grid";
import { TableAction } from "../tableGird/tableActions";

type Props = {
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
};

export const ColumTableProduct = ({
  handleEdit,
  handleDelete,
}: Props): GridColDef[] => [
  {
    field: "id",
    headerName: "id",
    width: 50,
    type: "string",
  },
  {
    field: "name",
    headerName: "Tên sản phẩm",
    width: 200,
    type: "string",
  },
  {
    field: "img",
    headerName: "Ảnh",
    width: 100,
    type: "string",
  },
  {
    field: "quantity",
    headerName: "Số lượng",
    width: 80,
    type: "string",
    filterable: true,
  },
   {
    field: "price",
    headerName: "Giá",
    width: 100,
    type: "string",
    filterable: true,
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 100,
    type: "singleSelect",

    valueOptions: ["ACTIVE", "INACTIVE", "PENDING"],
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Action",
    width: 100,
    getActions: TableAction({
      onEdit: handleEdit,
      onDelete: handleDelete,
    }),
  },
];
