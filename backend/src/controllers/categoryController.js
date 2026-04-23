const CategoryService = require("../services/categoryService")

class CategoryController 
{
    getCategory = async (req,res)=>{
        const data = await CategoryService.getCategory()
        res.json(data)
    }

}

module.exports = new CategoryController()