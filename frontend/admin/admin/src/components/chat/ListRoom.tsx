import {
  Grid2,
  List,
  ListItem
} from "@mui/material";
import BoxRoom from "./BoxRoom";
import { useEffect, useState } from "react";
import type { RoomChatType } from "../../types/chat";
import { getRooms } from "./data";
import { ChatContent, ChatItem, ChatSidebar, LastMessage, UserName } from "./styled";

export default function ListRoom() {
  const [rooms, setRooms] = useState<RoomChatType[]>();
const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
const [idUserChat, setIdUserChat] = useState<number | null>(null);
const [nameUserChat, setNameUserChat] = useState<string | null>(null);
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms();
        console.log("Fetched rooms:", data);
        setRooms(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRooms();
  }, []);

  const handleSelectRoom = (roomId: number, userId: number, userName: string) => {
    // console.log("Selected room ID:", roomId);
    setSelectedRoomId(roomId);
    setIdUserChat(userId);
    setNameUserChat(userName);
  }
  return (
    <Grid2 container sx={{
        display:"flex",
        justifyContent:"space-between",
        margin:"0 36px"
    }}>
      <ChatSidebar size={5} >
        <List>
          {rooms?.map((room) => (
            <ListItem key={room.id} disablePadding>
              <ChatItem onClick={() => {handleSelectRoom(room.id ,room.other_user_id ,room.other_user_name)}}>
                <ChatContent>
                  <UserName>{room.other_user_name}</UserName>

                  <LastMessage>{room.last_message}</LastMessage>
                </ChatContent>
              </ChatItem>
            </ListItem>
          ))}
        </List>
      </ChatSidebar>
      <Grid2 size={5}>
        <BoxRoom roomId={selectedRoomId} userId={idUserChat} userName={nameUserChat} />
      </Grid2>
    </Grid2>
  );
}
