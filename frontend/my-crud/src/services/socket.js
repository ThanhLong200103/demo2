// src/services/websocket.js

class WebSocketService {
  constructor(url, token) {
    this.socket = null;
    this.reconnectInterval = 3000;
    this.url = url;
    this.token = token;
    this.isIntentionalDisconnect = false;
    this.onMessage = null;
  }

  connect(onMessage, onOpen, onClose, onError) {
    if (this.socket) {
      this.onMessage = onMessage;
      return;
    }

    this.onMessage = onMessage;

    this.socket = new WebSocket(
      `${this.url}?token=${this.token}`
    );

    this.socket.onopen = () => {
      console.log("WebSocket connected");
      if (onOpen) onOpen();
    };

    this.socket.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);

        if (this.onMessage) {
          this.onMessage(parsedData);
        }
      } catch (error) {
        console.error("Invalid WebSocket message:", error);
      }
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);

      if (onError) {
        onError(error);
      }
    };

    this.socket.onclose = () => {
      console.log("WebSocket disconnected");

      if (onClose) {
        onClose();
      }

      if (this.isIntentionalDisconnect) {
        this.isIntentionalDisconnect = false;
        return;
      }

      this.socket = null;

      setTimeout(() => {
        console.log("Reconnecting WebSocket...");

        this.connect(
          onMessage,
          onOpen,
          onClose,
          onError
        );
      }, this.reconnectInterval);
    };
  }

  send(event, data) {
    if (
      !this.socket ||
      this.socket.readyState !== WebSocket.OPEN
    ) {
      console.error("WebSocket is not connected");
      return;
    }

    this.socket.send(
      JSON.stringify({
        event,
        data,
      })
    );

    console.log("Sent:", { event, data });
  }

  disconnect() {
    if (this.socket) {
      this.isIntentionalDisconnect = true;

      this.socket.close();
      this.socket = null;

      console.log("WebSocket disconnected manually");
    }
  }

  isConnected() {
    return (
      this.socket &&
      this.socket.readyState === WebSocket.OPEN
    );
  }
}

export default WebSocketService;