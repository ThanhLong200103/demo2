const Notification = require("../models/mongoDB/notification");

class NotificationService {
  createNotification = async (user_id, title, content) => {
    const newNotification = Notification.create({ user_id, title, content });
    return newNotification;
  };
  getNotifications = async () => {
    const notifications = Notification.find().limit(10).sort({ created_at: -1 });
    return notifications;
  };
}
module.exports = new NotificationService();