const CategoryModel = require("../models/category")
class CategoryService {
    getCategory = async ()=>{
        const data = await CategoryModel.getCategory()
        return data
    }
}

module.exports = new CategoryService ()