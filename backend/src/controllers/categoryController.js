const CategoryService = require("../services/categoryService")
const CacthAsync = require("../utils/cachAsync");

class CategoryController 
{
    getCategory = CacthAsync(
        async (req,res)=>{
        const locale = req.language || "vi";
        console.log("LOCALE:", req.language);
        const data = await CategoryService.getCategory(locale)
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