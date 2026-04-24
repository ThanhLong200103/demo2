const CategoryModel = require("../models/category")
class CategoryService {
    getCategory = async ()=>{
        const data = await CategoryModel.getCategory()
        return data
    }
    getCategoryProduct = async (idCategory)=>{
        const data = await CategoryModel.getCategoryProduct(idCategory)
        if(data.parent_id === null){
            const dataNoParent = CategoryModel.getCategoryNoParentProduct(data.id);
            return dataNoParent
        }
        
            const dataParnet = CategoryModel.getCategoryParentProduct(data.id)
            return dataParnet
        
        
    }
}

module.exports = new CategoryService ()