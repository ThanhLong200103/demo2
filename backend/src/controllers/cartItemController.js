const CartItemService = require("../services/cartItemService");
const cartItem = require("../models/CartItem")
class CartItemController {
  getCartItemAll = async (req, res) => {
    try {
      const all = await CartItemService.getAllCart();
      // console.log("DATA API:", all); 
      res.json(all);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  deleteCartitem = async (req,res)=>{
    try{
        const {id} = req.params
        const dele = await CartItemService.deleteCartItem(id);
        res.json(dele)
    }catch(err){
      res.status(500).json({ error: err.message });
    }
  };
  editCartItem = async (req , res) =>{
    try{
        const {id} = req.params;
        const {quantity} = req.body
        const edit = await CartItemService.updateCartItem({quantity,id})
        res.json(edit)
    }
    catch(err){
      res.status(500).json({ error: err.message });

    }
  }
  createCartItem = async (req , res )=>{
    try{
        const{productId ,quantityProduct} = req.body;
        const quantity = 1
        const craete = await CartItemService.createCartItem({productId  , quantityProduct,quantity})
        res.json(craete)
    }catch(err){
      res.status(500).json({ error: err.message });

    }
  }
  getCart = async (req,res)=>{
    try{
      const {id} = req.params
      const data = await CartItemService.checkDelete(id);
      res.json(data)
    }catch(err){
      res.status(500).json({ error: err.message });

    }
  }
}
module.exports = new CartItemController();
