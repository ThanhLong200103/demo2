import { Container } from "@mui/material";
import ListRoom from "../components/chat/ListRoom";
import TitelChat from "../components/chat/Titel";
import BasicModal from "../components/modal";
import { useState } from "react";
import ModalChatAdd from "../components/chat/modal";

export default function ChatComponent() {
  const [showModal, setShowModal] = useState(false);
  const handleAdd = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Container sx={{ margin: "63px 0" }}>
        <TitelChat handleAdd={handleAdd}></TitelChat>
        <BasicModal open={showModal} handleClose={handleClose}>
       <ModalChatAdd/>
        </BasicModal>
      </Container>
      <Container>
        <ListRoom handleClose={handleClose}></ListRoom>
      </Container>
    </>
  );
}
