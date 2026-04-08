const CartItemService = require("../services/cartItemService");
const cartItem = require("../models/CartItem")
class CartItemController {
  getCartItemAll = async (req, res) => {
    try {
      const {id} = req.params
      const all = await CartItemService.getAllCart(id);
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
        const {quantity , quantityProduct} = req.body
        const edit = await CartItemService.updateCartItem({id , quantity ,quantityProduct})
        res.json(edit)
    }
    catch(err){
      res.status(500).json({ error: err.message });

    }
  }
  createCartItem = async (req , res )=>{
    try{
        const{productId  , quantity ,cartId} = req.body;
        console.log(productId , quantity ,cartId)
        const craete = await CartItemService.createCartItem({productId ,cartId ,quantity})
        res.json(craete)
    }catch(err){
      res.status(500).json({ error: err.message });

    }
  }
  getCartItem = async (req,res)=>{
    try{
      const {id} = req.params
      const data = await CartItemService.checkDelete(id);
      res.json(data)
    }catch(err){
      res.status(500).json({ error: err.message });

    }
  }
  getCart = async (req, res)=>{
    try {
      const userId = req.user.id;
      const data = await CartItemService.getCart(userId)
      res.json(data)
    } catch (error) {
      res.status(500).json({ error: error.message });
      
    }
  }
  createCart = async (req, res) =>{
    try {
      const userId = req.user.id;
      const data = await CartItemService.createCart(userId)
      res.json(data)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
module.exports = new CartItemController();
