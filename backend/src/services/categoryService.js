const client = require("../config/redis");
const CategoryModel = require("../models/category")
class CategoryService {
    getCategory = async (locale)=>{
        const redisKey = `categories:${locale}`;

    
    const cachedData = await client.get(redisKey);
    // console.log("Dữ liệu category trong redis :",cachedData)
    if (cachedData) {
        return JSON.parse(cachedData);
    }
    else{
        const data = await CategoryModel.getCategory(locale)
        await client.set(redisKey, JSON.stringify(data));
        return data
    }
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