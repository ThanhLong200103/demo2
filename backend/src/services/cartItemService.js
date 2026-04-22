const cartItem = require("../models/CartItem");
const AppError = require("../utils/AppError");
const db = require("../config/db");
const ProductModel = require("../models/ProductModel");
const Cart = require("../models/cart");
class CartItemService {
  getAllCart = async (id) => {
    const cart_id = id;
    const item = await cartItem.getAllCartItem(cart_id);
    return item;
  };
  createCartItem = async (data, conn) => {
      const productId = data.productId;
      const cartId = data.cartId;
      const attributesId = data.attributesId
      const checkProduct = await cartItem.checkproductID(
        productId,
        cartId,
        attributesId,
        conn,
      );
      console.log("CHECK PRODUCT:", checkProduct);
        const up = await cartItem.updownQuanTiTyProduct(data, conn);
      console.log("UP:", up);
      if (checkProduct.length > 0) {
        const quantity = checkProduct[0].quantity + data.quantity;
        const id = checkProduct[0].id;
        const edit = await cartItem.editCartItem({ quantity, id }, conn);
        console.log("EDIT:", edit);

        return [edit, up];
      } else {
        const create = await cartItem.createCartItem(data, conn);
        console.log("CREATE:", create);
    
        return [create, up];
      }
  };
  deleteCartItem = async (id, conn) => {
      const data = await cartItem.getcart(id, conn);
      const idProduct = data.product_id;
      const quantity = data.quantity;
      const 	attributesId = data.attributes_id 
      const updateQuantityProduct = await ProductModel.editQuantityProductAttributes(
        attributesId,
        quantity,
        conn,
      );
      const dele = await cartItem.deleteCartItem(id, conn);
      return [updateQuantityProduct, dele];
  };
  updateCartItem = async (data, conn) => {
      const id = data.id;
      const row = await cartItem.getcart(id, conn);
      if (row.quantity <= 0) {
        throw new Error("Đã đặt số lượng nhất định vui lòng xóa giỏ hàng",422);
      }
      const upateCart = await cartItem.editCartItem(data, conn);
      const attributesId = row.attributes_id;
      const quantity = data.quantityProduct;
      const getProduct = await ProductModel.getProducUpdateCartAttributes(attributesId, conn);
      console.log("GET Quantity PRODUCT:", getProduct.quantity);
      if(getProduct.quantity<1){
        throw new Error("Số lượng sản phẩm không đủ" ,422);
      }
      const updateQuantityProduct = await ProductModel.editQuantityProductAttributes(
        attributesId,
        quantity,
        conn,
      );
      
      console.log([upateCart, updateQuantityProduct]);
      return [upateCart, updateQuantityProduct];
  };
  checkDelete = async (id) => {
    const data = await cartItem.getcart(id);
    return data;
  };

  getCart = async (userId) => {
    const data = await Cart.getCart(userId);
    return data;
  };
  createCart = async (userId) => {
    const cartId = await Cart.getCart(userId);
    if (cartId) {
      return cartId;
    }
    const data = await Cart.createCart(userId);
    return data;
  };
}
module.exports = new CartItemService();
