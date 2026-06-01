// SocketContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import WebSocketService, {
  type WebSocketMessage,
} from "../service/socket";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

interface SocketContextType {
  socket: WebSocketService | null;
  initSocket: (token: string) => void;
  lastMessage: WebSocketMessage | null;
}

const SocketContext = createContext<SocketContextType | undefined>(
  undefined
);

export const SocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] =
    useState<WebSocketService | null>(null);

  const [lastMessage, setLastMessage] =
    useState<WebSocketMessage | null>(null);
 const token = useSelector((state: RootState) => state.auth.token);
  const initSocket = (token: string) => {
    if (socket) return;

    const ws = new WebSocketService(
      "ws://localhost:3000",
      token
    );

    ws.connect((message: WebSocketMessage) => {
      // console.log("WS EVENT:", message);

      setLastMessage(message);
    });

    setSocket(ws);
  };

 
  useEffect(() => {
    if (token) {
      // Nếu đã có socket cũ đang chạy, ngắt kết nối trước khi tạo cái mới
      if (socket) {
        socket.disconnect();
      }
      const ws = new WebSocketService("ws://localhost:3000", token);
      ws.connect((message: WebSocketMessage) => {
        setLastMessage(message);
      });
      setSocket(ws);
    } else {
      // Khi không có token (Logout) -> Ngắt kết nối socket hiện tại
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
    // Cleanup khi component unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [token]); // Chạy lại hiệu ứng mỗi khi Token thay đổi

  return (
    <SocketContext.Provider
      value={{
        socket,
        initSocket,
        lastMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error(
      "useSocket must be used inside SocketProvider"
    );
  }

  return context;
};