import BaseService from "./BaseService";
export default class ProductService extends BaseService {
  async getAll() {
    return await this.http.get("/products");
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
}