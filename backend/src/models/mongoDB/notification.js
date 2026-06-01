const mongoose = require("mongoose");
 

const notificationSchema = new mongoose.Schema({
    user_id: { type: Number, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    is_read: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
}, {
    timestamps: false, 
    versionKey: false  
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;