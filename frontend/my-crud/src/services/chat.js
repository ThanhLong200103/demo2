import BaseService from "./BaseService";
export default class ChatService extends BaseService {
  async getMessages() {
    return await this.http.post("/chat/messages");
  }
   async sendMessage(roomId, content) {
    const res = await this.http.post(`/admin/room/addMessage`, {
      roomId,
      content,
    });
    return res;
  }
}