
import { RepositoryFactory } from "../../service/FactoryService"
import type { FormDataEdit } from "../../types/user"


export const GetCustomes = async (page: number, pageSize: number)=>{
    const data = await RepositoryFactory.get("user").getAllCustomer(page,pageSize)
    return data
}

export const getRole = async ()=>{
    const data = await RepositoryFactory.get("role").getAllRole()
    return data
}

export const getOneCustomer = async(id:string)=>{
    const data = await RepositoryFactory.get("user").getOneCustomer(id)
    return data
}

export const edittOneCustomer  = async(data:FormDataEdit)=>{
    const res = await RepositoryFactory.get("user").edittOneCustomer(data)
    return res
}

export const deleteCustomer = async (id:string)=>{
    const res = await RepositoryFactory.get("user").CustomerDelete(id)
    return res
}