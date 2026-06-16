const Notification = require("../models/mongoDB/notification");
const appEventEmitter = require("../utils/appEventEmitter");
class NotificationService {
  createNotification = async (data) => {
    console.log(data)
    const user_id = data.user_id
    const title =  `Khách hàng ${data.nameUser} đã đặt hàng `
    const content = `Đã đặt hàng thành công với mã đơn hàng #${data.orderId}`
    const newNotification = await Notification.create({ user_id, title, content });
    appEventEmitter.emit("add_notificaton",{newNotification:newNotification})
    return newNotification;
  };
  getNotifications = async (
  offset,
  limit 
) => {
  console.log(limit)
  const [notifications, total] = await Promise.all([
    Notification.find()
      .sort({ created_at: -1 })
      .skip(offset)
      .limit(limit),

    Notification.countDocuments(),
  ]);

  return {
    notifications,
    total,
  };
};
}
module.exports = new NotificationService();