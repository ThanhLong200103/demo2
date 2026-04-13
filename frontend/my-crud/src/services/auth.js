import BaseService from "./BaseService";
 export default class AuthService extends BaseService {
  async login(data) {
    return await this.http.post("/login", data);
  }
  async register(data) {
    return await this.http.post("/register", data);
  }
  async logout() {
    return await this.http.post("/logout");
  }
  async profile() {
    return await this.http.get("/profile");
  }
}