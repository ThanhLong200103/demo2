
import type {  ListStatus, OrderPriceUpdate, OrderStatusUpdate, OrderType } from "../types/order";
import BaseService from "./BaseService";

export default class Order extends BaseService {
    async getAllOrder (): Promise<Array<OrderType>> {
    const res =  await this.http.get("/admin/order");
    return res.data
    }
    async getOneOrder (id:string): Promise<OrderType> {
    const res =  await this.http.get(`admin/oneOrder/${id}`);
    return res.data.data
    }

     async getOrderStatus (status:ListStatus): Promise<Array<OrderType>> {
    const params = new URLSearchParams();
    status.forEach((item) => params.append("status", item));
    const res = await this.http.get("admin/orderByStatus", { params });
    return res.data.data;
    }
    
     async updateOrderStatus (data:OrderStatusUpdate): Promise<Array<OrderType>> {
    const res =  await this.http.patch("admin/updateStatusOrder",data);
    return res.data
    }

     async updatePriceOrder (data:OrderPriceUpdate) {
    const res =  await this.http.patch("admin/updatePriceOrder",data);
    return res.data
    }


}