
import type { FormDataCreate, FormDataEdit, RegisterUser, UpdateUserType, UserType } from "../types/user";
import BaseService from "./BaseService";

export default class UserService extends BaseService {
   
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
    async edittOneCustomer (data:FormDataEdit):Promise<Array<FormDataEdit>>  {
        
    const res =  await this.http.put("/admin/customerEdit",data);
    return res.data
    }

    async CustomerDelete (id:string)  {
        
    const res =  await this.http.patch(`/admin/customerDelele/${id}`);
    return res.data
    }


    //user
 async getAllUser ():Promise<Array<UserType>>  {
    const res =  await this.http.get("/admin/users");
    return res.data
    }
     async getOneUser (id:string):Promise<UpdateUserType> {
    const res =  await this.http.get(`/admin/getOneUser/${id}`);
    return res.data
    }

    async deleteUser (id:string)  {
    const res =  await this.http.patch(`/admin/deleteUser/${id}`);
    return res.data
    }

    async updateUser (data:UpdateUserType)  {
    const res =  await this.http.put("/admin/updateUser",data);
    return res.data
    }

    async registerUser (data:RegisterUser){
         const res =  await this.http.post("/register",data);
         return res.data
    }


}