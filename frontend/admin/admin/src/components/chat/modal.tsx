import { Container, Grid2, List, ListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getRoomUsers } from "./data";
import {
  ChatContent,
  ChatItem,
  ChatSidebar,
  LastMessage,
  UserName,
} from "./styled";
import type { UserAddChatType } from "../../types/chat";
import { useSocket } from "../../context/SocketContext";

export default function ModalChatAdd() {
  const [users, setUsers] = useState<UserAddChatType[]>();
  const {socket} = useSocket();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRoomUsers();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleAddRoom = (userId: number) => {
    console.log("Add room with user ID:", userId);
    socket?.send("add_room", {user_id: userId});
  }
  return (
    <>
    <Container sx={{ margin: "16px 0" }}>
      <Grid2 container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid2 size={6}>
          <Typography variant="h6">Select user to chat</Typography>
        </Grid2>
      </Grid2>
   
        <Grid2 container sx={{ display: "flex", justifyContent: "center" }}>
              <ChatSidebar size={12} sx={{height: "70vh",}}>
        <List>
          {users?.map((user) => (
            <ListItem key={user.id} disablePadding>
              <ChatItem onClick={() => {handleAddRoom(user.id)}}>
                <ChatContent>
                  <UserName>{user.name}</UserName>

                  <LastMessage>{user.role_name}</LastMessage>
                </ChatContent>
              </ChatItem>
            </ListItem>
          ))}
        </List>
      </ChatSidebar>
            </Grid2>
     </Container>
    </>
  );
}
