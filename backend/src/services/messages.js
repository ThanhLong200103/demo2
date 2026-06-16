const Messager = require("../models/mongoDB/message");
class MessageService {
    getMessagesByRoomId = async (room_id) => {
        const messages = await Messager.find({ room_id }).sort({ createdAt: 1 });
        return messages;
    }

    
}

module.exports = new MessageService();