const WebSocket = require("ws");
const appEventEmitter = require("../../utils/appEventEmitter");

const initSocketBroadcast = (wss) => {
  appEventEmitter.on("MESSAGE_CREATED", ({ message }) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            event: "NEW_MESSAGEs",
            data: message,
          }),
        );
      }
    });
  });

  appEventEmitter.on("new_room", ({ room_id, room_type, user1, user2 }) => {
    console.log("new_room event emitted with:", {
      room_id,
      room_type,
      user1,
      user2,
    });
    wss.clients.forEach((client) => {
      // client.user.id lấy được từ middleware xác thực socketAuth
      if (client.readyState === WebSocket.OPEN && client.user) {
        const loggedInUserId = client.user.id;
        console.log("Checking client socket connection:", {
          loggedInUserId,
          loggedInUserType: typeof loggedInUserId,
          user1Id: user1.id,
          user1Type: typeof user1.id,
          user2Id: user2.id,
          user2Type: typeof user2.id,
          matchUser1: loggedInUserId == user1.id,
          matchUser2: loggedInUserId == user2.id,
        });

        // Chỉ gửi tin cho 2 thành viên thuộc phòng chat này (Sử dụng == để so sánh tránh lỗi khác kiểu dữ liệu string/number)
        if (loggedInUserId == user1.id || loggedInUserId == user2.id) {
          // Nếu client hiện tại là user1 thì đối phương là user2 và ngược lại
          const otherUser = loggedInUserId == user1.id ? user2 : user1;
          client.send(
            JSON.stringify({
              event: "NEW_ROOM",
              data: {
                members: {
                  id: room_id,
                  type: room_type,
                  other_user_id: otherUser.id,
                  other_user_name: otherUser.name,
                  last_message: null,
                  last_message_time: null,
                },
              },
            }),
          );
        }
      }
    });
  });

  appEventEmitter.on("MESSAGE_CREATED", ({ message }) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            event: "NEW_MESSAGE",
            data: message,
          }),
        );
      }
    });
  });
  appEventEmitter.on("add_notificaton",({newNotification})=>{
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            event: "new_notification",
            data: newNotification,
          }),
        );
      }
    });
  })
};

module.exports = initSocketBroadcast;
