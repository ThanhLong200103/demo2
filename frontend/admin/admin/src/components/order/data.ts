import { RepositoryFactory } from "../../service/FactoryService";
import type { ListStatus, OrderPriceUpdate, OrderStatusUpdate } from "../../types/order";


export const getAllOrderStatus = async (status:ListStatus ,page:number ,pageSize:number)=>{
  const data = await RepositoryFactory.get("order").getOrderStatus(status ,page,pageSize);
  return data
}
export const getAllOrder = async (page:number , pageSize:number)=>{
  const data = await RepositoryFactory.get("order").getAllOrder(page,pageSize);
  return data
}
export const getAllOrders = async ()=>{
  const data = await RepositoryFactory.get("order").getAllOrders();
  return data
}

export const updateStatusOrder = async (data:OrderStatusUpdate)=>{
  const res = await RepositoryFactory.get("order").updateOrderStatus(data);
  return res
}

export const getOneOrder = async (id:string)=>{
  const res = await RepositoryFactory.get("order").getOneOrder(id);
  return res
}


export const updatePriceOrder = async (data:OrderPriceUpdate)=>{
  const res = await RepositoryFactory.get("order").updatePriceOrder(data);
  return res
}