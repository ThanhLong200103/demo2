// src/services/websocket.ts

export type WebSocketMessage<T = unknown> = {
  event: string;
  data: T;
};

class WebSocketService {
  private socket: WebSocket | null = null;
  private reconnectInterval = 3000;
  private url: string;
  private isIntentionalDisconnect = false;
  private token: string;
  private onMessage?: (message: WebSocketMessage) => void;
  constructor(url: string ,token:string) {
    this.url = url;
    this.token = token;
  }

  connect(
    onMessage?: (message: WebSocketMessage) => void,
    onOpen?: () => void,
    onClose?: () => void,
    onError?: (error: Event) => void
  ) {
    if (this.socket){
       this.onMessage = onMessage;
        return; // Tránh việc tạo kết nối mới nếu đã có kết nối đang mở
    } 
     this.onMessage = onMessage;
    this.socket = new WebSocket(this.url + `?token=${this.token}`);

    this.socket.onopen = () => {
      console.log("WebSocket connected");
      onOpen?.();
    };

    this.socket.onmessage = (event) => {
      try {
        const parsedData: WebSocketMessage = JSON.parse(event.data);
        this.onMessage?.(parsedData);
      } catch (error) {
        console.error("Invalid WebSocket message:", error);
      }
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      onError?.(error);
    };

    this.socket.onclose = () => {
      console.log("WebSocket disconnected. Reconnecting...");
      onClose?.();
if (this.isIntentionalDisconnect) {
    this.isIntentionalDisconnect = false; // reset cờ
    return; 
  }
      setTimeout(() => {
        this.connect(onMessage, onOpen, onClose, onError);
      }, this.reconnectInterval);
    };
  }

  send<T>(event: string, data: T) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected");
      return;
    }

    const payload: WebSocketMessage<T> = {
      event,
      data,
    };

    this.socket.send(JSON.stringify(payload));
    console.log("Sent message:", payload);
  }

  disconnect() {
    if (this.socket) {
        this.isIntentionalDisconnect = true;
      this.socket.close();
      this.socket = null;
      console.log("Đã đóng connection WebSocket");
    }
  }
}

// Example usage:
// -----------------------------------------
// import WebSocketService from "@/services/websocket";
//
// const ws = new WebSocketService("ws://localhost:8080");
//
// ws.connect(
//   (message) => {
//     console.log("Received message:", message);
//
//     switch (message.event) {
//       case "chat_message":
//         console.log("Chat:", message.data);
//         break;
//
//       case "notification":
//         console.log("Notification:", message.data);
//         break;
//
//       default:
//         console.log("Unknown event:", message);
//     }
//   },
//   () => {
//     console.log("WebSocket Connected");
//
//     // Send message after connected
//     ws.send("join_room", {
//       roomId: "room_1",
//       userId: "user_123",
//     });
//   },
//   () => {
//     console.log("WebSocket Closed");
//   },
//   (error) => {
//     console.error("WebSocket Error:", error);
//   }
// );
//
// // Send chat message
// ws.send("chat_message", {
//   text: "Hello WebSocket",
//   sender: "Huy",
// });
//
// // Disconnect socket
// // ws.disconnect();

export default WebSocketService;
