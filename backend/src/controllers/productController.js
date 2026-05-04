const attributeService = require("../services/attributeService");
const ProductService = require("../services/productService");
const CacthAsync = require("../utils/cachAsync");
class ProductController {
  getAllProduct = CacthAsync(async (req, res) => {
    const limit = Math.min(21, Number(req.query.limit) || 10);
  const cursor = req.query.cursor;
  const direction = req.query.direction
    const data = await ProductService.getAllProduct(limit,cursor , direction);
    res.json(data);
  });
  getProduct = CacthAsync(async (req, res) => {
    const { id } = req.params;
    // console.log(id)
    const data = await ProductService.getProduct(id);
    res.json(data);
  });
  deleteProduct = CacthAsync(async (req, res) => {
    const { id } = req.params;
    const data = await ProductService.deleteProduct(id);
    res.json(data);
  });
  editProduct = CacthAsync(async (req, res) => {
    const { id } = req.params;
    const { name, price, img, quantity } = req.body;
    const data = await ProductService.editProduct({
      name,
      price,
      img,
      quantity,
      id,
    });
    res.json(data);
  });
  createProduct = CacthAsync(async (req, res) => {
    const { name, price, img, quantity } = req.body;
    const data = await ProductService.createProduct({
      name,
      price,
      img,
      quantity,
    });
    res.json(data);
  });
  getAttributes = CacthAsync(
    async(req , res) =>{
      const {productId} = req.query;
      // console.log(productId)
      const data = await attributeService.getAttributes(productId)
      res.json(data)
    }
  )
  getOneAttributes = CacthAsync(
    async(req , res) =>{
      const {productId , sizeAttribute , colorAttribute} = req.query;
      // console.log(productId)
      const data = await attributeService.getOneAttributes({productId , sizeAttribute , colorAttribute})
      res.json(data)
    }
  )
  searchProduct = CacthAsync(
    async(req,res)=>{
       const { name } = req.query; 
      console.log("Name:",name)
      const data = await ProductService.searchProduct(name);
      res.json(data)
    }
  )
}
module.exports = new ProductController();
