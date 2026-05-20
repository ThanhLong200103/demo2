export interface OrderType {
    created_at:string,
    created_by:number,
    id:number,
    status:string,
    total_price:number,
    user_id:number,
    nameUser:string
}

export interface OrderStatusUpdate {
    status:string,
    id:string
}
export interface OrderPriceUpdate {
     total_price:number,
    id:string
}


export type ListStatus = string[]

