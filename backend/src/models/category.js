const db = require("../config/db");
class CategoryModel {
    getCategory = async ()=>{
        const [row] = await db.query("SELECT `id`, `name`, `parent_id` FROM `category` WHERE 1  ");
        return row  
    }
    getCategoryProduct = async (idCategory)=>{
        const [row] = await db.query("SELECT `id`, `name`, `parent_id` FROM category c WHERE c.id = ?   " ,[idCategory])
        return row[0]
    }

    getCategoryNoParentProduct = async (id) =>{
        const [row] = await db.query("SELECT c.id as category_id, c.name , c.parent_id ,p.name, p.id as id ,p.price ,p.img ,p.status FROM category c JOIN products p ON c.id = p.category_id  WHERE c.parent_id= ?  ",[id])
        return row
    }
    getCategoryParentProduct = async (id) =>{
        const [row] = await db.query("SELECT c.id as category_id, c.name , c.parent_id ,p.name, p.id as id ,p.price ,p.img FROM category c JOIN products p ON c.id = p.	category_id  WHERE c.id = ?  ",[id])
        return row
    }
}

module.exports = new CategoryModel()