const ChatService = require("../services/chat");
const MessageService = require("../services/messages");
const runInTransaction = require("../utils/runTransaction");
const catchAsync = require("../utils/cachAsync");
const console = require("node:console");
const appEventEmitter = require("../utils/appEventEmitter");
class ChatController {
    getRooms = catchAsync(async (req, res) => {
        const userId = req.user.id;
        const data =  await ChatService.getrooms(userId);
        res.json(data);
    });
    GetMessagesByRoom = catchAsync(async (req, res) => {
        const { roomId } = req.params;
        const data = await MessageService.getMessagesByRoomId(roomId);
        res.json(data);
    });
    addRoom = catchAsync(async (req, res) => {
        const userIdConnect = req.user.id;
        const { userId } = req.body;
        console.log("userIdConnect:", userIdConnect, "userId:", userId);
        const data = await runInTransaction(async (conn) => {
            return await ChatService.addRoom(userIdConnect, userId, conn);
        });

        appEventEmitter.emit("new_room", {
            room_id: data.room_id,
            members: data.members,
        });

    });
}

module.exports = new ChatController();