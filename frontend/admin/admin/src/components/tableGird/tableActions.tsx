import { GridActionsCellItem, type GridRowParams } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
type action = {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export const TableAction = ({ onEdit, onDelete }: action) => {
  return (params: GridRowParams) => [
    <GridActionsCellItem
      icon={<EditIcon />}
      label="Edit"
      onClick={() => onEdit(String(params.id))}
      showInMenu
    />,
    <GridActionsCellItem
      icon={<DeleteIcon />}
      label="Delete"
      onClick={() => onDelete(String(params.id))}
      showInMenu
    />,
  ];
};
