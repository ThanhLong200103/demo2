const mongoose = require('mongoose');
const RoomMember = require('../models/mongoDB/RoomMember'); 
const Message = require('../models/mongoDB/message');       

async function fakeData() {
    try {
        await RoomMember.deleteMany({});
        await Message.deleteMany({});
        console.log("🧹 Đã dọn dẹp dữ liệu cũ.");

        // Fake dữ liệu room_members (đã bỏ role từ bước trước)
        const fakeMembers = [
            { room_id: 1, user_id: 1 },
            { room_id: 1, user_id: 4 },
            { room_id: 2, user_id: 3 },
            { room_id: 2, user_id: 4 },
            { room_id: 3, user_id: 27 },
            { room_id: 3, user_id: 29 }
        ];
        await RoomMember.insertMany(fakeMembers);
        console.log("👥 Đã fake thành công 6 thành viên phòng.");

        // 💬 Fake dữ liệu messages (Đã loại bỏ hoàn toàn avatar_url)
        const fakeMessages = [
            {
                room_id: 1,
                sender: { user_id: 1, name: "ser" },
                content: "Chào bạn, mình là role 5, mình có thể chat với bạn...",
                message_type: "text"
            },
            {
                room_id: 1,
                sender: { user_id: 4, name: "User 4" },
                content: "Được chứ, hệ thống phân quyền cho phép tụi mình kết nối...",
                message_type: "text"
            },
            {
                room_id: 2,
                sender: { user_id: 3, name: "Staff Quản Lý" },
                content: "Chào tài khoản UserTestUpdate, mình là Staff quản lý...",
                message_type: "text"
            },
            {
                room_id: 2,
                sender: { user_id: 4, name: "UserTestUpdate" },
                content: "Vâng chào Staff, mình đang đợi hỗ trợ kỹ thuật ạ.",
                message_type: "text"
            },
            {
                room_id: 3,
                sender: { user_id: 29, name: "Khách hàng 29" },
                content: "Shop ABC xin chào, tài khoản của mình có vấn đề gì...",
                message_type: "text"
            },
            {
                room_id: 3,
                sender: { user_id: 27, name: "Shop ABC" },
                content: "Mình thông báo tài khoản Shop đã được duyệt hoạt độ...",
                message_type: "text"
            }
        ];
        await Message.insertMany(fakeMessages);
        console.log("💬 Đã fake thành công 6 tin nhắn (Không có avatar).");

        console.log("🎉 Hoàn thành quá trình fake dữ liệu siêu tinh gọn!");
    } catch (error) {
        console.error("❌ Lỗi khi fake dữ liệu:", error);
    }
}

module.exports = fakeData;