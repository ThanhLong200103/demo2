import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { deleteUser } from "./data";




type Props ={
    open:boolean,
    setOpen:(V:boolean)=>void,
    id:string
}
export default function UserDelete({open , setOpen ,id}:Props) {
  

  

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
   

    try {

         await deleteUser(id);
        setOpen(false);
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <Box>
   

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa không ?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          <Button
            onClick={handleConfirm}
            color="error"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}