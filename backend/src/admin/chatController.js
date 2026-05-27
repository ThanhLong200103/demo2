const ChatService = require("../services/chat");
class ChatController {
    getRooms = async (req, res) => {
        const userId = req.user.id;
        const data = await ChatService.getrooms(userId);
        res.json(data);
    }
    GetMessagesByRoom = async (req, res) => {
        const { roomId } = req.params;
        const data = await ChatService.GetMessagesByRoom(roomId);
        res.json(data);
    }
}

module.exports = new ChatController();