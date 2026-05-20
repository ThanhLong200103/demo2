import { RepositoryFactory } from "../../service/FactoryService";
import type { RegisterUser, UpdateUserType } from "../../types/user";


  export const getAllUser = async ()=>{
    const data = await RepositoryFactory.get("user").getAllUser();
    return data
  }

   export const getOneUser = async (id:string)=>{
    const data = await RepositoryFactory.get("user").getOneUser(id);
    return data
  }
  export const deleteUser = async (id:string)=>{
    const data = await RepositoryFactory.get("user").deleteUser(id);
    return data
  }
    export const updateUser = async (data:UpdateUserType)=>{
    const res = await RepositoryFactory.get("user").updateUser(data);
    return res
  }

    export const registerUser = async (data:RegisterUser)=>{
    const res = await RepositoryFactory.get("user").registerUser(data);
    return res
  }


