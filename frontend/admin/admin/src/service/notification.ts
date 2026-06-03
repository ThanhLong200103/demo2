import type { GetNotificationData } from "../types/notification";
import BaseService from "./BaseService";

export default class NotificationService extends BaseService {
  async getNotifications(limit: number): Promise<GetNotificationData> {
    const res = await this.http.get("/admin/notifications", {
      params: {
        limit: limit.toString(),
      },
    });
    return res.data;
  }
}
