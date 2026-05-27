const db = require("../config/db");

class ChatModel {
   GetRoomChat = async (userId) => {
    const [rows] = await db.execute(`
        SELECT 
            cr.id,
            cr.type,
            u.name AS other_user_name,
            u.id AS other_user_id,
            m.content AS last_message,
            m.created_at AS last_message_time
        FROM rooms cr
        JOIN room_members crm 
            ON cr.id = crm.room_id
        JOIN room_members other_rm 
            ON cr.id = other_rm.room_id 
            AND other_rm.user_id != ?
        JOIN users u 
            ON u.id = other_rm.user_id
        LEFT JOIN messages m 
            ON m.id = cr.last_message_id
        WHERE crm.user_id = ?
        ORDER BY m.created_at DESC
    `, [userId, userId]);

    return rows;
}

GetMessagesByRoom = async (roomId) => {
    const [rows] = await db.execute(`
        SELECT 
 
            m.room_id,
            m.sender_id,
            u.name AS sender_name,
            m.content,
            m.is_deleted,
            m.created_at
        FROM messages m
        JOIN users u 
            ON u.id = m.sender_id
        WHERE m.room_id = ?
        ORDER BY m.created_at ASC
    `, [roomId]);

    return rows;
}

}

module.exports = new ChatModel();