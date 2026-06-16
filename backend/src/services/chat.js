const ChatModel = require("../models/chat");
const RoomMember = require("../models/mongoDB/RoomMember"); // Model Mongo
const Message = require("../models/mongoDB/message");
const mongoose = require("mongoose");
const Messager = require("../models/mongoDB/message");
const appEventEmitter = require("../utils/appEventEmitter");
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
          other_user_name: otherUserName,
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

  getRoomType = async (roomId) => {
    const rooms = await ChatModel.getRooms([roomId]);
    return rooms.length > 0 ? rooms[0].type : "direct";
  };

  getUserNameById = async (userId) => {
    return await ChatModel.getUserById(userId);
  };

  addRoom = async (userIdConnect, userId, conn) => {
    // tạo mongo session
    const session = await mongoose.startSession();

    // bắt đầu transaction
    session.startTransaction();

    try {
      const newRoomId = await ChatModel.addRoom(conn);

      const newRoom1 = await RoomMember.insertMany([
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
      ]);

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

  addmessage = async (roomId, senderId, name, content) => {
    const newMessage = await Message.create({
      room_id: roomId,
      sender: {
        user_id: senderId,
        name: name,
      },
      content: content,
    });
    console.log("New message created:", newMessage);
    const updateRoom = await ChatModel.updateRoomLastMessage(
      roomId,
      newMessage._id,
    );

    return newMessage;
  };
  addChatUser = async (userIdConnect) => {
    const supporters = await ChatModel.getAllSupporters();

    if (!supporters.length) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * supporters.length);

    const checkRoomUser = await RoomMember.findOne({
      user_id: userIdConnect,
    });
    console.log("checkRoomUser:", checkRoomUser);
    if (checkRoomUser) {
      const getMessages = await Messager.find({
        room_id: checkRoomUser.room_id,
      }).sort({ createdAt: 1 });
      return {
        idUser: userIdConnect,
        roomId: checkRoomUser.room_id,
        messages: getMessages,
      };
    } else {
      const supporter = supporters[randomIndex];
      const newRoomId = await ChatModel.addRoom();

      const newRoom1 = await RoomMember.insertMany([
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
          user_id: supporter.id,

          nickname_in_room: null,

          settings: {
            is_muted: false,
            mute_until: null,
          },

          last_read_message_id: null,
        },
      ]);
      
      appEventEmitter.emit("new_room", {
        room_id: newRoomId,
             room_type: await this.getRoomType(newRoomId),

        user1: { id: userIdConnect, name: await this.getUserNameById(userIdConnect) },
        user2: { id: supporter.id, name: supporter.name }
      });
      return newRoom1;
    }

    // return supporters;
  };
}

module.exports = new ChatService();
