const { releaseConnection } = require("../config/db");
const ProductModel = require("../models/ProductModel");

class ProductService {
    getAllProduct = async (limit,cursor ,direction, page, locale)=>{
        const data = await ProductModel.getAllProduct(limit,cursor ,direction, page, locale);
        return data ;
    }
    getProduct = async (id , locale)=>{
        const data = await ProductModel.getProduct(id, locale);
        return data
    }
    createProduct = async (data)=>{
        const create = await ProductModel.createProduct(data);
        return create;
    }
    editProduct = async (data) =>{
        const edit = await ProductModel.editProduct(data);
        return edit
    }
    deleteProduct = async (id)=>{
        const dele = await ProductModel.deleteProduct(id);
        return dele;
    }
    searchProduct = async (name)=>{
        const data = await ProductModel.searchProduct(name);
        return data
    }
}
module.exports = new  ProductService ();