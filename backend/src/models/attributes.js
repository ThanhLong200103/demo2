const db = require("../config/db")

class AttributesModel {
    getAttribute = async (productId)=>{
        const [row] = await db.query("SELECT id ,color ,size , quantity FROM attributes WHERE product_id = ?",[productId])
        return row
    }
    getOneAttribute = async (data)=>{
        const {productId , sizeAttribute , colorAttribute} = data;
        const [row] = await db.query("SELECT id ,quantity FROM attributes WHERE product_id = ? AND size = ? AND color = ?",[productId , sizeAttribute , colorAttribute])
        return row[0]
    }
};

module.exports = new AttributesModel();