import type { GridColDef } from "@mui/x-data-grid";
import { TableAction } from "../../tableGird/tableActions";

type Props = {
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
};
export const ColumTableStaff = ({
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
    field: "role",
    headerName: "Chức vụ",
    width: 100,
    type: "singleSelect",
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

export const ColumTableStaffActivity = (): GridColDef[] => [
  {
    field: "id",
    headerName: "id",
    width: 100,
    type: "string",
  },
  {
    field: "employeeName",
    headerName: "Họ và tên",
    width: 200,
    type: "string",
  },
  {
    field: "productStatus",
    headerName: "Hoạt động",
    width: 200,
    type: "string",
  },
  {
    field: "productName",
    headerName: "id",
    width: 300,
    type: "string",
  },
  {
    field: "updatedAt",
    headerName: "Thời gian",
    width: 150,
    type: "string",
  },
];
