import {
  Grid2,
  List,
  ListItem
} from "@mui/material";
import BoxRoom from "./BoxRoom";
import { useEffect, useState } from "react";
import type { MessageType, RoomChatType } from "../../types/chat";
import { getRooms } from "./data";
import { ChatContent, ChatItem, ChatSidebar, LastMessage, UserName } from "./styled";
import { useSocket } from "../../context/SocketContext";

type Props = {
  handleClose: () => void;
};
export default function ListRoom({ handleClose }: Props) {
  const [rooms, setRooms] = useState<RoomChatType[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [idUserChat, setIdUserChat] = useState<number | null>(null);
  const [nameUserChat, setNameUserChat] = useState<string | null>(null);
  const {lastMessage} = useSocket();
  console.log("lastMessage in ListRoom:", lastMessage);
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms();
        console.log("Fetched rooms:", data);
        setRooms(data ?? []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRooms();
  }, []);

 useEffect(() => {
    

    if (lastMessage?.event === "NEW_ROOM") {
      console.log("lastMessage received in ListRoom:", lastMessage);
      const newRoom = (lastMessage.data as { members: RoomChatType }).members;
      console.log("Parsed newRoom:", newRoom);
      if (!newRoom) {
        console.log("NEW_ROOM event received, but 'members' data is missing or structured differently!");
        return;
      }
      setRooms((prev: RoomChatType[]) => {
        // Tránh trùng lặp phòng nếu phòng đã tồn tại
        const isDuplicate = prev?.some(room => room && room.id === newRoom.id);
        if (isDuplicate) return prev;

        return [...(prev ?? []), newRoom];
      });
      handleClose();
       // Đóng modal sau khi nhận được phòng mới qua WebSocket
    }

    if (lastMessage?.event === "NEW_MESSAGE") {
      const newMessage = lastMessage.data as MessageType;
      console.log("New message received in ListRoom via WebSocket:", newMessage);
     setRooms((prev) => {
    const updatedRooms = prev.map((room) =>
      room.id === newMessage.room_id
        ? {
            ...room,
            last_message: newMessage.content,
            last_message_time: newMessage.created_at,
          }
        : room
    );

    return updatedRooms.sort(
      (a, b) =>
        new Date(b.last_message_time).getTime() -
        new Date(a.last_message_time).getTime()
    );
  });
    }
    
}, [lastMessage]);
// useEffect(() => {
//   console.log("rooms", rooms);
// }, [rooms]);

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
