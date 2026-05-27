import { useEffect, useState } from "react";
import { getMessages } from "./data";
import { ChatContainer, ChatInput, ChatInputContainer, MessageBubble, MessageRow, MessageTime } from "./styled";
import { Button, Typography } from "@mui/material";
import type { MessageType } from "../../types/chat";
import SendIcon from '@mui/icons-material/Send';
type BoxRoomProps = {
  roomId: number | null;
  userId: number | null;
  userName: string | null;
};
export default function BoxRoom({ roomId, userId, userName }: BoxRoomProps) {
      const [messages, setMessages] = useState<MessageType[]>([]);
    const [text, setText] = useState("");
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
const handleSendMessage = () => {
  if (!text.trim()) return;

  console.log(text);

  // call api send message here

  setText("");
};
  return (
    <>
    <Typography variant="h6" sx={{ marginBottom: "16px" ,borderBottom:"1px solid #ccc", paddingBottom:"8px"}}>
      {userName ? ` ${userName}` : "Select a room to start chatting"}
    </Typography>
     <ChatContainer>
      {messages.map((msg, index) => {
        const isMe = msg.sender_id === userId;
       
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
