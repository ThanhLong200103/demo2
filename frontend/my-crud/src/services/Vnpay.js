import BaseService from "./BaseService";
export default class PayService extends BaseService {
    async createPayment(data) {
        return await this.http.post("/payment/vnpaycreate", data);
    }
    async createUrlPayment(data) {
        return await this.http.post("/payment/vnpay", data);
    }
}