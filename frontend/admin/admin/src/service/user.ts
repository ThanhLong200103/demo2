
import type { FormDataCreate, FormDataEdit, UserType } from "../types/user";
import BaseService from "./BaseService";

export default class UserService extends BaseService {
    async getAllUser ():Promise<Array<UserType>>  {
    const res =  await this.http.get("/admin/users");
    return res.data
    }
    async getAllCustomer ():Promise<Array<UserType>>  {
    const res =  await this.http.get("/admin/customers");
    return res.data
    }
     async createCustomer (data:FormDataCreate):Promise<Array<UserType>>  {
    const res =  await this.http.post("/admin/customerAdd",data);
    return res.data
    }
    async getOneCustomer (id:string):Promise<Array<FormDataEdit>>  {
    const res =  await this.http.get(`/admin/customerOne/${id}`);
    return res.data
    }
}