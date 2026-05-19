import type { PayData } from "../types/pay";
import BaseService from "./BaseService";

export default class Pay extends BaseService {
    async getAllPay () : Promise<Array<PayData>> {
    const res =  await this.http.get("/admin/pays");
    return res.data
    }
}