import axiosClien from "../api/axios";

class BaseService {
  protected http = axiosClien;
  constructor() {
    if (!this.http) {
      console.error("AxiosClient chưa được khởi tạo đúng!");
    }
  }
}
export default BaseService;