
import { RepositoryFactory } from "../../service/FactoryService"

export const Revenue = async ()=>{
    const data = await RepositoryFactory.get("pay").getAllPay()
    const amount = data.reduce((total, item) => {
        return total + (item.amount || 0)
    }, 0)
    return {data, amount}
}

export const Order = async ()=>{
    const data = await RepositoryFactory.get("order").getAllOrder()
    return data
    
}
export const User = async ()=>{
    const data = await RepositoryFactory.get("user").getAllUser()
    return data
    
}

export const Product = async ()=>{
    const data = await RepositoryFactory.get("product").getAllProduct()
    return data
    
}


