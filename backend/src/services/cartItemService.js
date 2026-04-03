const cartItem = require("../models/CartItem");
const AppError = require("../utils/AppError");
const UserModel = require("../models/UserModel");
const db = require("../config/db")
class CartItemService {
  getAllCart = async () => {
    const item = await cartItem.getAllCartItem();
    return item;
  };
  createCartItem = async (data) => {
    const checkUserId = await cartItem.checkUserID(data.productId);
    const quantityDown = await cartItem.updownQuanTiTy(data);
    if (checkUserId.length > 0) {
      const quantity = checkUserId[0].quantity + data.quantity;
      const id = checkUserId[0].id;
      const up = await cartItem.editCartItem({ id, quantity });
      return [up, quantityDown];
    } else {
      const craete = await cartItem.createCartItem(data);
      return [craete, quantityDown];
    }
  };
  deleteCartItem = async (id) => {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();
      const data = await cartItem.getcart(id ,connection);
      const quantity = data[0].quantity + data[0].user.quantity;
      const idUser = data[0].user.id
      const updateUser = await UserModel.editUserQuanTiTy(idUser ,quantity ,connection)
      const dele = await cartItem.deleteCartItem(id ,connection)
      await connection.commit();
      return [updateUser , dele]
    } catch (err) {
        await connection.rollback();
        throw err;
    }
    finally {
      
        connection.release();
    }
  };
  updateCartItem = async (data) => {
    if (data.quantity <= 0) {
      throw new AppError("Số lượng không được thấp hơn 0 ", 400);
    }
    const tp = await cartItem.editCartItem(data);
    return tp;
  };
  checkDelete = async (id) => {
    const data = await cartItem.getcart(id);
    return data
  };
}
module.exports = new CartItemService();
