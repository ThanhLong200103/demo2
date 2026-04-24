const CategoryService = require("../services/categoryService")
const CacthAsync = require("../utils/cachAsync");

class CategoryController 
{
    getCategory = CacthAsync(
        async (req,res)=>{
        const data = await CategoryService.getCategory()
        res.json(data)
        }
    ) 
    
    getCategoryProduct = CacthAsync(
        async (req , res)=>{
        const {idCategory} = req.params
        const data = await CategoryService.getCategoryProduct(idCategory)
        res.json(data)
    }

    ) 
}

module.exports = new CategoryController()