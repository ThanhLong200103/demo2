const cartItem = require("../models/CartItem");
const AppError = require("../utils/AppError");
const db = require("../config/db")
const ProductModel = require("../models/ProductModel")
class CartItemService {
  getAllCart = async () => {
    const item = await cartItem.getAllCartItem();
    return item;
  };
  createCartItem = async (data) => {
    const conn = await db.getConnection()
    try {
      await conn.beginTransaction();
      const productId  = data.productId
      const checkProduct = await cartItem.checkproductID(productId , conn);
      const up =  await cartItem.updownQuanTiTyProduct(data ,conn);
      if(checkProduct.length > 0){
        const quantity = checkProduct[0].quantity + data.quantity
        const id = checkProduct[0].id;
        const edit = await cartItem.editCartItem({quantity,id},conn)
         await conn.commit();
        return [edit,up]
     
    }else{
        const create = await cartItem.createCartItem(data ,conn)
         await conn.commit();
        return [create ,up]
        
      }
       
    } catch (error) {
      await conn.rollback()
    }finally{
      conn.release();
    }
  };
  deleteCartItem = async (id) => {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();
      const data = await cartItem.getcart(id ,connection);
      const  idProduct = data.product_id
      const quantity = data.quantity
      const updateQuantityProduct = await ProductModel.editQuantityProduct(idProduct,quantity,connection);
      const dele = await cartItem.deleteCartItem(id ,connection)
      await connection.commit();
      return [updateQuantityProduct , dele]
    } catch (err) {
        await connection.rollback();
        throw err;
    }
    finally {
      
        connection.release();
    }
  };
  updateCartItem = async ( data ) => {
    const  conn =  await db.getConnection();
    try {
      await conn.beginTransaction();
      const id = data.id
      const row = await cartItem.getcart(id ,conn);
      if(row.quantity <=0){
        throw new Error("Đã đặt số lượng nhất định");
      }
      const upateCart = await cartItem.editCartItem(data , conn);
      const idProduct = row.product_id
      const quantity = data.quantityProduct
      const updateQuantityProduct= await ProductModel.editQuantityProduct(idProduct , quantity , conn)
      await conn.commit();
      console.log([upateCart , updateQuantityProduct])
     return [upateCart , updateQuantityProduct]

    } catch (error) {
      await conn.rollback();
        throw error
    } finally {
      
        conn.release();
    }

  };
  checkDelete = async (id) => {
    const data = await cartItem.getcart(id);
    return data
  };
}
module.exports = new CartItemService();
