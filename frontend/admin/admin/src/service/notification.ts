import type { GetNotificationsResponse } from "../types/notification";
import BaseService from "./BaseService";

export default
class NotificationService extends BaseService {
    async getNotifications():Promise<Array<GetNotificationsResponse>> {
        const res = await this.http.get("/admin/notifications");
        return res.data;
    }
}