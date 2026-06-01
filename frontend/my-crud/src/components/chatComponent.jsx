import { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { IoIosChatbubbles } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { RepositoryFactory } from "../services/FactoryService";
import WebSocketService from "../services/socket";

export default function ChatComponent() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState(false);
  const [messages, setMessages] = useState([]);
  const [idUser, setIdUser] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const token = localStorage.getItem("accessToken");
  const ws = new WebSocketService("ws://localhost:3000", token);
  const handleOpenChat = async () => {
    setOpen((prev) => !prev);

    try {
      const data = await RepositoryFactory.get("chat").getMessages();

      const sortedMessages =
        data?.messages?.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        ) || [];

      setMessages(sortedMessages);
      setIdUser(data?.idUser);
      setRoomId(data?.roomId);
      console.log("Messages:", data);
      console.log("Current User:", data?.idUser);
    } catch (error) {
      console.log("Error fetching messages:", error);
    }
  };

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      console.log("Gửi:", text);

      await RepositoryFactory.get("chat").sendMessage(roomId, text);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTitle((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (open) {
      ws.connect((message) => {
        if (message.event === "NEW_MESSAGE") {
          console.log("Received new message via WebSocket:", message);
          const newMessage = message.data;

          setMessages((prevMessages) => {
            const isDuplicate = prevMessages.some(
              (msg) => msg._id === newMessage._id,
            ); // Thay 'id' bằng key định danh của message nếu cần
            if (isDuplicate) return prevMessages;
            return [...prevMessages, newMessage];
          });
          setText("");
        }
      });
    } else {
      ws.disconnect();
    }
  }, [open]);

  return (
    <>
      {/* Icon Chat */}
      <div
        className="position-fixed bottom-0 end-0 m-4 d-flex align-items-center gap-2"
        style={{ cursor: "pointer", zIndex: 1001 }}
        onClick={handleOpenChat}
      >
        <div
          className={`px-3 py-1 rounded shadow ${
            open ? "d-none" : "bg-white text-black"
          } ${title ? "d-block" : "d-none"}`}
        >
          Nhấn vào để chat với chúng tôi
        </div>

        <IoIosChatbubbles size={60} color="#000000" />
      </div>

      {/* Chat Box */}
      {open && (
        <Card
          className="position-fixed bottom-0 end-0 shadow"
          style={{
            width: "380px",
            height: "500px",
            marginRight: "20px",
            marginBottom: "90px",
            borderRadius: "16px",
            zIndex: 1000,
          }}
        >
          {/* Header */}
          <Card.Header
            className="bg-white"
            style={{ borderBottom: "1px solid #ddd" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Chat hỗ trợ</h5>

              <IoMdClose
                size={24}
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(false)}
              />
            </div>
          </Card.Header>

          {/* Messages */}
          <Card.Body
            style={{
              overflowY: "auto",
              background: "#f5f5f5",
            }}
          >
            {messages.length > 0 ? (
              messages.map((msg) => {
                const isMe = msg?.sender?.user_id === idUser;

                return (
                  <div
                    key={msg._id}
                    className={`d-flex mb-3 ${
                      isMe ? "justify-content-end" : "justify-content-start"
                    }`}
                  >
                    <div
                      style={{
                        background: isMe ? "#2563eb" : "#e5e7eb",
                        color: isMe ? "#fff" : "#111",
                        padding: "12px 16px",
                        borderRadius: "18px",
                        maxWidth: "75%",
                        wordBreak: "break-word",
                      }}
                    >
                      {!isMe && (
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            marginBottom: 4,
                          }}
                        >
                          {msg.sender?.name}
                        </div>
                      )}

                      <div>{msg.content}</div>

                      <div
                        style={{
                          fontSize: 11,
                          marginTop: 4,
                          opacity: isMe ? 0.8 : 0.6,
                        }}
                      >
                        {new Date(msg.created_at).toLocaleString("vi-VN")}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-muted mt-4">
                Chưa có tin nhắn nào
              </div>
            )}
          </Card.Body>

          {/* Input */}
          <Card.Footer
            className="bg-white d-flex gap-2"
            style={{ borderTop: "1px solid #ddd" }}
          >
            <Form.Control
              placeholder="Nhập tin nhắn..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />

            <Button
              onClick={handleSend}
              style={{
                minWidth: "90px",
                borderRadius: "12px",
                background: "#000",
                border: "none",
              }}
            >
              Gửi
            </Button>
          </Card.Footer>
        </Card>
      )}
    </>
  );
}
