import type { GridColDef } from "@mui/x-data-grid";
import { TableActionOrder } from "./actionOrder";

type Props = {
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
  handleCancel: (id: string) => void;
  handleRefund: (id: string) => void;
  handleComplete: (id: string) => void;
};

export const ColumTableOrder = ({
  handleEdit,
  handleDelete,
  handleCancel,
  handleRefund,
  handleComplete,
}: Props): GridColDef[] => [
  {
    field: "id",
    headerName: "id",
    width: 100,
    type: "string",
  },
  {
    field: "name",
    headerName: "Họ tên khách",
    width: 150,
    type: "string",
  },
  {
    field: "total",
    headerName: "Tổng tiền",
    width: 100,
    type: "string",
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 100,
    type: "singleSelect",

    valueOptions: ["pending", "completed", "cancelled"],
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Action",
    width: 100,
    getActions: TableActionOrder({
      onEdit: handleEdit,
      onDelete: handleDelete,
      onCancel: handleCancel,
      onRefund: handleRefund,
      onComplete: handleComplete,
    }),
  },
];
