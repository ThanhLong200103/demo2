const db = require("../config/db");

class ChatModel {
   getRooms = async (roomIds) => {
   const [roomsFromSQL] = await db.execute(`
        SELECT id, type FROM rooms WHERE id IN (${roomIds.map(() => '?').join(',')})
    `, roomIds);
    return roomsFromSQL;
}

getUserById = async (otherUserId) => {
    let otherUserName = null;
   const [userRows] = await db.execute(`SELECT name FROM users WHERE id = ? LIMIT 1`, [otherUserId]);
            if (userRows.length > 0) {
                otherUserName = userRows[0].name;
            }
        return otherUserName;
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


addRoom = async (conn = db) => {
    const [result] = await conn.execute("INSERT INTO rooms () VALUES () ");
    return result.insertId; 
}

updateRoomLastMessage = async (roomId, lastMessage) => {
   const result = await db.execute(
        "UPDATE rooms SET last_message_id = ?, updated_at = NOW() WHERE id = ?",
        [lastMessage, roomId]
    );

    return result;
}

getAllSupporters = async () => {
    const [rows] = await db.execute(`
        SELECT u.id, u.name , r.name as role_name FROM users u JOIN roles r ON u.role_id = r.id WHERE r.name = 'customer_support'
    `);
    return rows;
}
}
module.exports = new ChatModel();