import BaseService from "./BaseService";
export default class OrderService extends BaseService {
  async getAll() {
    return await this.http.get("/order");
  }
  async create(data) {
    return await this.http.post("/order/create", data);
  }
  async getItemOrder(ids) {
    return await this.http.post("/order/getItemOrder", { ids });
  }
  async cancelOrder(data) {
    return await this.http.post("/order/cancel", data);
  }
}