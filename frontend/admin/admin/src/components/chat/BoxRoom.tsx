import { useEffect, useState } from "react";
import { getMessages, sendMessage } from "./data";
import { ChatContainer, ChatInput, ChatInputContainer, MessageBubble, MessageRow, MessageTime } from "./styled";
import { Button, Typography } from "@mui/material";
import type { MessageType } from "../../types/chat";
import SendIcon from '@mui/icons-material/Send';
import { useSocket } from "../../context/SocketContext";

type BoxRoomProps = {
  roomId: number | null;
  userId: number | null;
  userName: string | null;
};
export default function BoxRoom({ roomId, userId, userName }: BoxRoomProps) {
      const [messages, setMessages] = useState<MessageType[]>([]);
    const [text, setText] = useState("");
    const {lastMessage} = useSocket();
  console.log(lastMessage);
  useEffect(() => {
    const fetchMessages = async () => {
      if (roomId !== null) {
        try {
          const data = await getMessages(roomId);
          console.log("Messages for room ID", roomId, ":", data);
           const sortedMessages = data.sort(
            (a: MessageType, b: MessageType) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
          );
          setMessages(sortedMessages);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchMessages();
  }, [roomId]);


// 1. Lắng nghe tin nhắn mới từ WebSocket thông qua useEffect
useEffect(() => {
  if (lastMessage?.event === "NEW_MESSAGE") {
    const newMessage = lastMessage.data as MessageType;
    console.log("New message received via WebSocket:", newMessage);

    // Kiểm tra tin nhắn mới có thuộc về room hiện tại không
    if (newMessage.room_id === roomId) {
      setMessages((prev: MessageType[]) => {
        // (Tùy chọn) Tránh trùng lặp tin nhắn nếu tin nhắn đã tồn tại
        const isDuplicate = prev.some(msg => msg._id === newMessage._id); // Thay 'id' bằng key định danh của message nếu cần
        if (isDuplicate) return prev;

        return [...prev, newMessage];
      });
       setText("");
    }
  }
}, [lastMessage, roomId]);

// 2. Hàm gửi tin nhắn (chỉ đảm nhận việc gửi và xóa input)
const handleSendMessage = async () => {
  if (!text.trim() || roomId === null || userId === null) return;

  console.log("Sending message:", text, "to room ID:", roomId, "from user ID:", userId);

  try {
    await sendMessage(roomId, text);
   
  } catch (error) {
    console.log("Error sending message:", error);
  }
};



  return (
    <>
    <Typography variant="h6" sx={{ marginBottom: "16px" ,borderBottom:"1px solid #ccc", paddingBottom:"8px"}}>
      {userName ? ` ${userName}` : "Select a room to start chatting"}
    </Typography>
     <ChatContainer>
      {messages.map((msg, index) => {
        const isMe = msg.sender.user_id === userId;
       
        return (
          <MessageRow key={index} isMe={isMe}>
            <MessageBubble isMe={isMe}>
              <Typography fontSize={14}>
                {msg.content}
              </Typography>

              <MessageTime>
                {new Date(msg.created_at).toLocaleString("vi-VN")}
              </MessageTime>
            </MessageBubble>
          </MessageRow>
        );
      })}
    </ChatContainer>
   {userId &&  <ChatInputContainer>
  <ChatInput
    placeholder="Nhập tin nhắn..."
    size="small"
    value={text}
    onChange={(e) => setText(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        handleSendMessage();
      }
    }}
  />

  <Button
    variant="contained"
    onClick={handleSendMessage}
    endIcon={<SendIcon />}
  >
    Gửi
  </Button>
</ChatInputContainer>}

    </>
  );
}
