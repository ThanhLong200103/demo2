const db = require('../config/db')

class CartItem {
    getAllCartItem = async()=>{
        const[row]= await db.query("SELECT p.price , p.quantity as quantityProduct, p.img,p.name , c.quantity FROM products p INNER JOIN  cartitem c on p.id = c.product_id");
        console.log("ROW:", row); 
        return row;
    }
    createCartItem = async(data)=>{
        const {product_id ,quantity}=data;
        const[result] = await db.query("INSERT INTO  cartitem (product_id, quantity) VALUES (?,?)",[product_id ,quantity]);
        return result;
    }
    editCartItem = async(data)=>{
        const{id,quantity}= data;
        const[row] = await db.query("UPDATE cartitem SET quantity=? WHERE id=?",[id,quantity]);
        return row;
    }
    deleteCartItem = async(id , connection = db)=>{
        const[row] = await connection.query("DELETE FROM cartitem WHERE id = ?",[id]);
        return row;
    }
    checkUserID = async (productId , connection = db)=>{
        const [existingItem] = await connection.query("SELECT * FROM  cartitem WHERE product_id = ?",productId)
        return existingItem;
    }
   updownQuanTiTy = async( data)=>{
        const quantity = data.quantityProduct -1 ;
        const id = data.productId
        const[existingItem] = await db.query("UPDATE cartitem SET quantity=? WHERE id=?",[id,quantity])
        return existingItem;
    }
    getcart = async (id ,connection = db)=>{
        const [existingItem] = await connection.query();
        return existingItem;
    }
}
module.exports = new CartItem()