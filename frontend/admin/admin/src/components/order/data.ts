import { RepositoryFactory } from "../../service/FactoryService";
import type { ListStatus, OrderPriceUpdate, OrderStatusUpdate } from "../../types/order";





export const getAllOrderStatus = async (status:ListStatus)=>{
  const data = await RepositoryFactory.get("order").getOrderStatus(status);
  return data
}
export const getAllOrder = async ()=>{
  const data = await RepositoryFactory.get("order").getAllOrder();
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