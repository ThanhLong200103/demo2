const ChatModel = require("../models/chat");
const RoomMember = require("../models/mongoDB/RoomMember"); // Model Mongo
const Message = require("../models/mongoDB/message");
const mongoose = require("mongoose");
class ChatService {
  getrooms = async (userId) => {
    const myRooms = await RoomMember.find({ user_id: userId }).select(
      "room_id",
    );
    const roomIds = myRooms.map((item) => item.room_id);
    if (roomIds.length === 0) return [];
    const roomsFromSQL = await ChatModel.getRooms(roomIds);
    const fullRoomChats = await Promise.all(
      roomsFromSQL.map(async (room) => {
        const otherMember = await RoomMember.findOne({
          room_id: room.id,
          user_id: { $ne: userId }, // $ne nghĩa là Not Equal (không bằng userId hiện tại)
        }).select("user_id");
        const otherUserId = otherMember ? otherMember.user_id : null;
        const lastMsgDoc = await Message.findOne({ room_id: room.id }).sort({
          created_at: -1,
        });
        const otherUserName = await ChatModel.getUserById(otherUserId);
        return {
          id: room.id,
          type: room.type,
          other_user_id: otherUserId,
          other_user_name: otherUserName ,
          last_message: lastMsgDoc ? lastMsgDoc.content : null,
          last_message_time: lastMsgDoc ? lastMsgDoc.created_at : null,
        };
      }),
    );
    fullRoomChats.sort((a, b) => {
      const timeA = a.last_message_time
        ? new Date(a.last_message_time).getTime()
        : 0;
      const timeB = b.last_message_time
        ? new Date(b.last_message_time).getTime()
        : 0;
      return timeB - timeA;
    });
    return fullRoomChats;
  };
  GetMessagesByRoom = async (roomId) => {
    const data = await ChatModel.GetMessagesByRoom(roomId);
    return data;
  };

  addRoom = async (userIdConnect, userId, conn) => {
    // tạo mongo session
    const session = await mongoose.startSession();

    // bắt đầu transaction
    session.startTransaction();

    try {
      const newRoomId = await ChatModel.addRoom(conn);

      const newRoom1 = await RoomMember.insertMany(
        [
          {
            room_id: newRoomId,
            user_id: userIdConnect,

            nickname_in_room: null,

            settings: {
              is_muted: false,
              mute_until: null,
            },

            last_read_message_id: null,
          },
          {
            room_id: newRoomId,
            user_id: userId,

            nickname_in_room: null,

            settings: {
              is_muted: false,
              mute_until: null,
            },

            last_read_message_id: null,
          },
        ],
        
      );
      
      await session.commitTransaction();

      return {
        room_id: newRoomId,
        members: newRoom1,
      };
    } catch (error) {
      await session.abortTransaction();
       console.log(error);
    } finally {
      session.endSession();
    }
  };
}

module.exports = new ChatService();
