import BaseService from "./BaseService";
export default class CartService extends BaseService {
    async getCartItem(id) {
        return await this.http.get(`/cartitem/${id}`);
    }
    async getCart() {
        return await this.http.get("/cart");
    }
    async deleteCartItem(id) {
        return await this.http.delete(`/cartitem/delete/${id}`);
    }
    async updateCartItem(id, data) {
        return await this.http.put(`/cartitem/update/${id}`, data);
    }
    async createCartItem(data) {
        return await this.http.post("/cartitem/create", data);
    }
    async getCartItemByCartId(id) {
        return await this.http.get(`/cartitem/${id}`);
    }
}