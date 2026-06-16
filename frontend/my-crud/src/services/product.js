import BaseService from "./BaseService";
export default class ProductService extends BaseService {
  async getAll({ limit, cursor, direction, page }) {
    return await this.http.get("/products", {
      params: { limit, cursor, direction, page },
    });
  }
  async getById(id) {
    return await this.http.get(`/product/${id}`);
  }
  async create(data) {
    return await this.http.post("/product/create", data);
  }
  async update(id, data) {
    return await this.http.put(`/product/edit/${id}`, data);
  }
  async delete(id) {
    return await this.http.delete(`/product/delete/${id}`);
  }
  async getAttributes(data) {
    return await this.http.get(`/attributes`, { params: data });
  }
  async getOneAttributes(data) {
    return await this.http.get(`/attribute`, { params: data });
  }
  async searchProduct(name) {
    return await this.http.get("/searchProduct", { params: { name } });
  }
}
