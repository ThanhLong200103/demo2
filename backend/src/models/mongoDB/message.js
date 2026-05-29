const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    room_id: { 
        type: Number, 
        required: true 
    },
    sender: {
        user_id: { type: Number, required: true },
        name: { type: String, required: true },       // Lưu sẵn tên để đỡ phải JOIN SQL

    },
    content: { 
        type: String, 
        required: true 
    },
    message_type: { 
        type: String, 
        enum: ['text', 'image', 'file', 'video', 'audio'], 
        default: 'text' 
    },
    // Trường này linh hoạt: Nếu gửi text thì để rỗng, nếu gửi ảnh/file thì lưu meta vào đây
    media_meta: {
        url: { type: String },
        file_size: { type: String },
        width: { type: Number },
        height: { type: Number }
    },
    is_deleted: { 
        type: Boolean, 
        default: false 
    }
}, {
    // Tự động sinh trường createdAt và updatedAt cho mỗi tin nhắn
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, 
    versionKey: false
});

// 🔥 ĐÁNH INDEX QUAN TRỌNG:
// Giúp bốc 20-50 tin nhắn mới nhất của một phòng chát ra với tốc độ ánh sáng
messageSchema.index({ room_id: 1, created_at: -1 });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;