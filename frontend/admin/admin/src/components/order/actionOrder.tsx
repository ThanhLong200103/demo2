import { GridActionsCellItem, type GridRowParams } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DoneIcon from '@mui/icons-material/Done';
type action = {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCancel:(id:string)=>void;
  onRefund:(id:string)=>void;
  onComplete:(id:string)=>void;

};

export const TableActionOrder = ({ onEdit, onDelete ,onCancel , onRefund , onComplete }: action) => {
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
    <GridActionsCellItem
      icon={<CloseIcon />}
      label="Cancel"
      onClick={() => onCancel(String(params.id))}
      showInMenu
    />,
    <GridActionsCellItem
      icon={<CurrencyExchangeIcon />}
      label="Refund"
      onClick={() => onRefund(String(params.id))}
      showInMenu
    />,
    <GridActionsCellItem
      icon={<DoneIcon />}
      label="Complete"
      onClick={() => onComplete(String(params.id))}
      showInMenu
    />,
  ];
};
