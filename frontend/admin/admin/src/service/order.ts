import type {
  ListStatus,
  OrderPriceUpdate,
  OrderResponse,
  OrderStatusUpdate,
  OrderType,
} from "../types/order";
import BaseService from "./BaseService";

export default class Order extends BaseService {
  async getAllOrder(page: number, pageSize: number): Promise<OrderResponse> {
    const res = await this.http.get("/admin/order", {
      params: {
        page,
        pageSize,
      },
    });
    return res.data;
  }
  async getAllOrders(): Promise<Array<OrderType>> {
    const res = await this.http.get("/admin/orders");
    return res.data;
  }
  async getOneOrder(id: string): Promise<OrderType> {
    const res = await this.http.get(`admin/oneOrder/${id}`);
    return res.data.data;
  }

  async getOrderStatus(
    status: ListStatus,
    page: number,
    pageSize: number,
  ): Promise<OrderResponse> {
    const params = new URLSearchParams();
    status.forEach((item) => params.append("status", item));
    params.append("page", page.toString());

    params.append("pageSize", pageSize.toString());
    const res = await this.http.get("admin/orderByStatus", { params });
    return res.data;
  }

  async updateOrderStatus(data: OrderStatusUpdate): Promise<Array<OrderType>> {
    const res = await this.http.patch("admin/updateStatusOrder", data);
    return res.data;
  }

  async updatePriceOrder(data: OrderPriceUpdate) {
    const res = await this.http.patch("admin/updatePriceOrder", data);
    return res.data;
  }
}
