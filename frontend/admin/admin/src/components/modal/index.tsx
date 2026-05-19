import * as React from "react";
import Modal from "@mui/material/Modal";
import { StyledBoxModal } from "./styled";
type Props = {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
};
export default function BasicModal({ open,
  handleClose,
  children,}: Props) {
 

  return (
    <div>

      <Modal open={open} onClose={handleClose}>
        <StyledBoxModal>
          {children}
        </StyledBoxModal>
      </Modal>
    </div>
  );
}
