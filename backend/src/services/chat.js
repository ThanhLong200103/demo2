const ChatModel = require("../models/chat");
class ChatService {
    getrooms = async (userId) => {
        const data = await ChatModel.GetRoomChat(userId);
        return data;
    }
    GetMessagesByRoom = async (roomId) => {
        const data = await ChatModel.GetMessagesByRoom(roomId);
        return data;
    }
}

module.exports = new ChatService();