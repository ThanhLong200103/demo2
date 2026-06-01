const NotificationService = require("../services/notification");
const catchAsync = require("../utils/cachAsync");

class NotificationController {
  getNotifications = catchAsync(async (req, res) => {
    const notifications = await NotificationService.getNotifications();
    res.json(notifications);
  });
}
module.exports = new NotificationController();