
import type { OrderType } from "../types/order";
import BaseService from "./BaseService";

export default class Order extends BaseService {
    async getAllOrder (): Promise<Array<OrderType>> {
    const res =  await this.http.get("/admin/order");
    return res.data
    }
}