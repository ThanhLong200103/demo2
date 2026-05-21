
import { RepositoryFactory } from "../../service/FactoryService"

export const Revenue = async ()=>{
    const data = await RepositoryFactory.get("pay").getAllPay()
    const amount = data.reduce((total, item) => {
        return total + (item.amount || 0)
    }, 0)
    return {data, amount}
}

export const Order = async ()=>{
    const data = await RepositoryFactory.get("order").getAllOrders()
    return data
    
}
export const User = async ()=>{
    const data = await RepositoryFactory.get("user").getAllUser()
    return data
    
}

export const Product = async (page:number ,pageSize:number)=>{
    const data = await RepositoryFactory.get("product").getAllProduct(page,pageSize)
    return data
    
}


