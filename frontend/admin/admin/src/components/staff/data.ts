import { RepositoryFactory } from "../../service/FactoryService"


export const GetCustomes = async ()=>{
    const data = await RepositoryFactory.get("user").getAllCustomer()
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
