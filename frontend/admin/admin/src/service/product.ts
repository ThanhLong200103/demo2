import type {ProductTypePage } from "../types/product";
import BaseService from "./BaseService";

export default class ProductService extends BaseService{
    async getAllProduct (page:number ,pageSize:number):Promise<ProductTypePage> {
        const res = await this.http.get("/admin/products",{params:{page,pageSize}});
        return res.data
    }
}