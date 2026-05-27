import { Container, Typography } from "@mui/material";
import ListRoom from "../components/chat/ListRoom";
import TitelChat from "../components/chat/Titel";
import BasicModal from "../components/modal";
import { useState } from "react";

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
          <Typography variant="h5">Danh sách người dùng</Typography>
        </BasicModal>
      </Container>
      <Container>
        <ListRoom></ListRoom>
      </Container>
    </>
  );
}
