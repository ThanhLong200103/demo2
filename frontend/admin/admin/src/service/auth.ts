import type { AuthLogin, LoginData } from "../types/auth";
import BaseService from "./BaseService";

export default class AuthService extends BaseService {
   async login({email,password}: AuthLogin): Promise<LoginData> {
    const res = await this.http.post("/admin/login", {email,password});
    return res.data;
    }
    async logout() {
    return await this.http.post("/logout");
  }
};
