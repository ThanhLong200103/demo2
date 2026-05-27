// src/context/SocketContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import WebSocketService, { type WebSocketMessage } from '../service/socket';

// 1. Định nghĩa kiểu dữ liệu cho cái "Tủ kính" Context
interface SocketContextType {
  socket: WebSocketService | null;
  initSocket: (token: string) => void;
}

// 2. Khởi tạo Context với giá trị mặc định ban đầu là undefined
const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<WebSocketService | null>(null);

  const initSocket = (token: string) => {
    if (socket) return;

    const ws = new WebSocketService("ws://localhost:3000", token);
    
     ws.connect((message: WebSocketMessage) => {
          switch (message.event) {
            case "WELCOME":
              console.log("User connected:", message);
              break;
            default:
              console.log("Received message:", message);
          }
        });
    setSocket(ws);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      initSocket(token);
    }
  }, [socket]);

  // 3. CHỈ DÙNG 1 PROVIDER: Ném cả socket và hàm initSoc ket vào đây
  return (
    <SocketContext.Provider value={{ socket, initSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

// 4. Sửa lại Custom hook để lấy đồ ra dùng một cách an toàn
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket phải được đặt bên trong SocketProvider");
  }
  return context; // Trả về object chứa { socket, initSocket }
};