const db = require("../config/db");
class CategoryModel {
    getCategory = async ()=>{
        const [row] = await db.query("SELECT `id`, `name`, `parent_id` FROM `category` WHERE 1  ");
        return row  
    }
}

module.exports = new CategoryModel()