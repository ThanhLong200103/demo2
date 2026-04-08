const db = require("../config/db");
class Cart {
    getCart = async (userId)=>{
        const 	user_id =userId
        const [cart] = await db.execute("SELECT id FROM carts WHERE user_id  = ?",[user_id])
        return cart[0]
    }
    createCart = async (userId)=>{
        const user_id = userId
        const [cart] = await db.execute("INSERT INTO carts (user_id) VALUES (?)",[user_id])
        return cart.insertId
    }
}

module.exports = new Cart()