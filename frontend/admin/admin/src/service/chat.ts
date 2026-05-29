
import type { RoomChatType, UserAddChatType } from "../types/chat";
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
    async getRoomUsers():Promise<Array<UserAddChatType>> {
        const res = await this.http.get("/admin/room/getUsers");
       
        return res.data;
    }
    async addRoom(userId: number) {
        const res = await this.http.post("/admin/room/add",{userId});
        return res.data;
    }
};
