const http = require("http");
const WebSocket = require("ws");
const { socketAuth } = require("./middleware/socketAuth");
const messageController = require("./controllers/messageController");
const initSocketBroadcast = require("./service/initSocketBroadcast");

const websocket = (app) => {
  ///http.createServer() tạo ra một lớp vỏ bảo vệ (HttpServer gốc của Node.js) chịu trách nhiệm mở cổng 3000.
  const server = http.createServer(app);
  const wss = new WebSocket.Server({ noServer: true });
  initSocketBroadcast(wss);
  server.on("upgrade", (request, socket, head) => {
    socketAuth(socket, request, (err) => {
      // Nếu có lỗi (Ví dụ: không có token hoặc token sai)
      if (err) {
        socket.end("HTTP/1.1 401 Unauthorized\r\nConnection: close\r\n\r\n");
        return;
      }
      try {
        wss.handleUpgrade(request, socket, head, (ws) => {
          // Lưu thông tin user vào đối tượng ws để các sự kiện sau này sử dụng
          ws.user = socket.user;
          wss.emit("connection", ws, request);
        });
      } catch (error) {
        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
        socket.destroy();
      }
    });
  });

  // Chỉ chạy một interval duy nhất cho toàn bộ server thay vì mỗi client một interval
  const interval = setInterval(() => {
    wss.clients.forEach((ws) => {
      if (ws.isAlive === false) {
        console.log("Client mất kết nối ngầm, đang tiến hành dọn dẹp RAM...");
        return ws.terminate();
      }

      ws.isAlive = false;
      ws.ping();
    });
  }, 30000);

  wss.on("connection", (ws) => {
    console.log("THông tin user đã xác thực:", ws.user);
    ws.send(
      JSON.stringify({
        event: "WELCOME",
        data: {
          text: `Hello ${ws.user.name}`,
        },
      }),
    );
    ws.isAlive = true;
    ws.on("pong", () => {
      ws.isAlive = true;
    });

    ws.on("message", async (message) => {
      try {
        const parsedMessage = JSON.parse(message.toString());
        const { event, data } = parsedMessage;
        console.log("Received event:", event, "with data:", data);
        switch (event) {
          case "chat":
            await messageController(ws, data);

            break;


          default:
            ws.send(
              JSON.stringify({
                event: "ERROR",
                data: {
                  text: "Event không hợp lệ",
                },
              }),
            );
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    });

    ws.on("close", () => {
      console.log(" Client ngắt kết nối");
    });
  });

  wss.on("close", () => {
    clearInterval(interval);
  });

  return server;
};

module.exports = websocket;
