import type { ProductType } from "../types/product";
import BaseService from "./BaseService";

export default class ProductService extends BaseService{
    async getAllProduct ():Promise<Array<ProductType>> {
        const res = await this.http.get("/admin/products");
        return res.data
    }
}