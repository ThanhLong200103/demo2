const ChatService = require("../services/chat");
const MessageService = require("../services/messages");
const runInTransaction = require("../utils/runTransaction");
const catchAsync = require("../utils/cachAsync");
const console = require("node:console");
const appEventEmitter = require("../utils/appEventEmitter");
class ChatController {
  getRooms = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const data = await ChatService.getrooms(userId);
    res.json(data);
  });
  GetMessagesByRoom = catchAsync(async (req, res) => {
    const { roomId } = req.params;
    const data = await MessageService.getMessagesByRoomId(roomId);
    res.json(data);
  });

    addRoom = catchAsync(async (req, res) => {
    const userIdConnect = req.user.id; // Người đăng nhập tạo phòng (User A)
    const { userId } = req.body;        // Người được kết nối (User B)

    const data = await runInTransaction(async (conn) => {
      return await ChatService.addRoom(userIdConnect, userId, conn);
    });
    
    // Lấy tên của cả hai người dùng
    const creatorName = req.user.name || await ChatService.getUserNameById(userIdConnect);
    const otherUserName = await ChatService.getUserNameById(userId);

    // Gửi thông tin của cả 2 user tham gia phòng
    appEventEmitter.emit("new_room", {
      room_id: data.room_id,
      room_type: await ChatService.getRoomType(data.room_id),
      user1: { id: userIdConnect, name: creatorName },
      user2: { id: userId, name: otherUserName }
    });
 
  });


    addMessage = catchAsync(async (req, res) => {
        const senderId = req.user.id;
        const name = req.user.role_name;
        // console.log("senderId:", senderId, "name:", req.user);
        const { roomId, content } = req.body;
        const newMessage = await ChatService.addmessage(roomId, senderId, name, content);

        appEventEmitter.emit("MESSAGE_CREATED", { message: newMessage });
    })


    addChatUserSupport = catchAsync(async (req, res) => {
      const userIdConnect = req.user.id; // Người đăng nhập tạo phòng (User A)
        const chatUser = await ChatService.addChatUser(userIdConnect);

        res.json(chatUser);
    })
}

module.exports = new ChatController();
