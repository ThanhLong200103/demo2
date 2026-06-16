const NotificationService = require("../services/notification");
const catchAsync = require("../utils/cachAsync");

class NotificationController {
  getNotifications = catchAsync(async (req, res) => {
    const limit = req.query.limit || 10
    const offset = req.query.offset || 0
    
    const notifications = await NotificationService.getNotifications(offset , limit);
    res.json(notifications);
  });
}
module.exports = new NotificationController();