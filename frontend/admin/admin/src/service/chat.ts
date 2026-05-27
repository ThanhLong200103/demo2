
import type { RoomChatType } from "../types/chat";
import BaseService from "./BaseService";

export default class ChatService extends BaseService {
    async getRooms(): Promise<Array<RoomChatType>> {
        const res = await this.http.get("/admin/rooms");
        return res.data;
    }
    async getMessages(roomId: number) {
        const res = await this.http.get(`/admin/room/${roomId}/messages`);
        return res.data;
    }
};
