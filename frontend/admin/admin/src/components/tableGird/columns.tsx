import type { GridColDef } from "@mui/x-data-grid";
import { TableAction } from "./tableActions";

type Props = {
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
};

export const ColumTable = ({
  handleEdit,
  handleDelete,
}: Props): GridColDef[] => [
  {
    field: "id",
    headerName: "id",
    width: 100,
    type: "string",
  },
  {
    field: "name",
    headerName: "Họ và tên",
    width: 200,
    type: "string",
  },
  {
    field: "phone",
    headerName: "Số điện thoại",
    width: 100,
    type: "string",
  },
  {
    field: "email",
    headerName: "Email",
    width: 300,
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
