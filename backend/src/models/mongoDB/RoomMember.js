const mongoose = require('mongoose');

const roomMemberSchema = new mongoose.Schema({
    room_id: { 
        type: Number, 
        required: true 
    },
    user_id: { 
        type: Number, 
        required: true 
    },
    nickname_in_room: { 
        type: String, 
        default: null 
    },
    settings: {
        is_muted: { type: Boolean, default: false },
        mute_until: { type: Date, default: null }
    },
    last_read_message_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Message', 
        default: null 
    },
    joined_at: { 
        type: Date, 
        default: Date.now 
    }
}, {
    timestamps: false, 
    versionKey: false  
});

// Đánh index để tối ưu truy vấn
roomMemberSchema.index({ user_id: 1 });
roomMemberSchema.index({ room_id: 1, user_id: 1 }, { unique: true });

const RoomMember = mongoose.model('RoomMember', roomMemberSchema);
module.exports = RoomMember;