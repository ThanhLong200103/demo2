const db = require("../config/db")

class ProductModel {
    getAllProduct = async ()=>{
        const [row] = await db.query("SELECT * FROM  products");
        return row;
     };
    getProduct = async (id)=>{
        const [existingItem] = await db.query("SELECT * FROM  products WHERE id = ?",[id]);
        return existingItem;
    }
    createProduct = async (data)=>{
        const {name, price, img, quantity} = data
        const [existingItem] = await db.query("INSERT INTO products (name, price, img, quantity) VALUES (?,?,?,?)",[name, price, img, quantity]);
        return existingItem
    }
    editProduct = async (data) =>{
         const {name, price, img, quantity ,id} = data
        const [existingItem] = await db.query("UPDATE products SET name=?,price =?,img=?,quantity= ? WHERE id = ?",[name, price, img, quantity ,id]);
        return existingItem
    
    }
    deleteProduct = async (id)=>{
        const [existingItem] = await db.query("DELETE FROM products WHERE id = ?",[id]);
        return existingItem
    }
}
module.exports = new ProductModel ()